import { readdir, readFile, mkdir, writeFile, copyFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const categories = ['Java', '并发', 'JVM', 'MySQL', 'Redis', '计算机网络'];
export const escapeHtml = text => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function inline(text) {
  const tokens = [];
  const token = html => { tokens.push(html); return `\u0000${tokens.length-1}\u0000`; };
  let s = text.replace(/`([^`]+)`/g, (_, c) => token(`<code>${escapeHtml(c)}</code>`));
  s = s.replace(/\[([^\]]+)\]\((https:\/\/[^\s)]+)\)/g, (_, label, url) => token(`<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)}</a>`));
  s = escapeHtml(s).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  return s.replace(/\u0000(\d+)\u0000/g, (_, n) => tokens[Number(n)]);
}
export function markdown(source) {
  const output = [], toc = []; let paragraph = [], list = [], code = null, section = 0;
  const flush = () => { if (paragraph.length) { output.push(`<p>${inline(paragraph.join(' '))}</p>`); paragraph=[]; } if(list.length){output.push(`<ul>${list.map(x=>`<li>${inline(x)}</li>`).join('')}</ul>`);list=[];} };
  for(const line of source.replace(/\r/g,'').split('\n')) {
    if(line.startsWith('```')) { flush(); if(code!==null){output.push(`<pre><code>${escapeHtml(code.join('\n'))}</code></pre>`);code=null;}else{code=[];} continue; }
    if(code!==null){code.push(line);continue;}
    if(!line.trim()){flush();continue;}
    if(line.startsWith('## ')){flush();const title=line.slice(3),id=`section-${++section}`;toc.push({title,id});output.push(`<h2 id="${id}">${inline(title)}</h2>`);continue;}
    if(line.startsWith('- ')){if(paragraph.length)flush();list.push(line.slice(2));continue;}
    if(line.startsWith('> ')){flush();output.push(`<blockquote>${inline(line.slice(2))}</blockquote>`);continue;}
    if(list.length)flush();paragraph.push(line);
  }
  if(code!==null)throw new Error('Unclosed code block');flush();return {html:output.join('\n'),toc};
}
export async function loadNotes() {
  const files=(await readdir(path.join(root,'content'))).filter(x=>x.endsWith('.md')).sort();
  const notes=[]; const ids=new Set();
  for(const file of files){
    const source=(await readFile(path.join(root,'content',file),'utf8')).replace(/\r/g,'');
    const match=source.match(/^---\n([^]*?)\n---\n([^]*)$/);
    if(!match)throw new Error(`Missing JSON front matter: ${file}`);
    const meta=JSON.parse(match[1]);
    if(!/^[a-z0-9-]+$/.test(meta.id)||ids.has(meta.id))throw new Error(`Invalid or duplicate id: ${file}`);
    if(!categories.includes(meta.category)||!meta.title||!meta.summary||!Array.isArray(meta.tags)||!meta.updated)throw new Error(`Invalid metadata: ${file}`);
    for(const heading of ['先这样回答','把原理拆开','继续追问','容易说错的地方','参考资料'])if(!match[2].includes(`## ${heading}`))throw new Error(`Missing ${heading}: ${file}`);
    ids.add(meta.id);notes.push({...meta,...markdown(match[2]),text:match[2],minutes:Math.max(2,Math.ceil(match[2].length/350))});
  }
  return notes;
}
export async function build() {
  const notes=await loadNotes(),dist=path.join(root,'dist');await mkdir(dist,{recursive:true});
  for(const f of ['index.html','styles.css','app.js','favicon.svg'])await copyFile(path.join(root,'src',f),path.join(dist,f));
  await writeFile(path.join(dist,'data.js'),`window.NOTES = ${JSON.stringify(notes).replace(/</g,'\\u003c')};\nwindow.CATEGORIES = ${JSON.stringify(categories)};\n`);
  await writeFile(path.join(dist,'.nojekyll'),'');
  await writeFile(path.join(dist,'reading.html'),`<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>全部题目 · 阿青的后端面试笔记</title><link rel="stylesheet" href="./styles.css"></head><body><main><p style="margin:24px 0"><a href="./index.html">← 返回交互版</a></p><h1>后端面试笔记</h1><nav style="display:block">${notes.map(q=>`<p><a href="#${q.id}">${escapeHtml(q.title)}</a></p>`).join('')}</nav>${notes.map(q=>`<article id="${q.id}" class="markdown" style="max-width:760px;margin:60px 0"><h1 style="font-size:28px">${escapeHtml(q.title)}</h1>${q.html.replace(/id="section-\d+"/g,'')}</article>`).join('')}</main></body></html>`);
  console.log(`Built ${notes.length} notes into dist/`);
}
if(process.argv[1] && path.resolve(process.argv[1])===fileURLToPath(import.meta.url))await build();
