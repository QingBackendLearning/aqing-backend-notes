import assert from 'node:assert/strict';
import { loadNotes, markdown, categories } from './build.mjs';
import '../src/filters.js';
const notes=await loadNotes();
assert.ok(notes.length>=120,'Expanded library must retain at least 120 notes');
for(const category of categories)assert.ok(notes.filter(q=>q.category===category).length>=10,`Insufficient coverage: ${category}`);
for(const q of notes){
  assert.equal(q.toc.length,7,`Seven reading sections: ${q.id}`);
  assert.ok(q.references.includes('href="https://'),`Missing references: ${q.id}`);
  for(const section of q.text.split(/^## /m).slice(1))assert.ok(section.split('\n').slice(1).join('\n').trim().length>15,`Empty section: ${q.id}`);
  assert.ok(q.text.includes(q.plain)&&q.text.includes(q.exercise),`Metadata/body disagree: ${q.id}`);
}
const {selectNotes,paginate}=globalThis.NoteLibrary;
const fixture=[
  {id:'c',category:'Java',grade:'C',title:'实现',plain:'复杂场景',tags:['边界'],text:'BODY_ONLY',reason:'深入',exercise:'验证'},
  {id:'b',category:'Java',grade:'B',title:'CAS',plain:'原子更新',tags:['并发'],text:'mechanism',reason:'机制',exercise:'实验'},
  {id:'a',category:'Java',grade:'A',title:'基础',plain:'先理解',tags:['入门'],text:'example',reason:'开始',exercise:'练习'},
  {id:'other',category:'Redis',grade:'A',title:'缓存',plain:'加速读取',tags:['数据'],text:'cache',reason:'开始',exercise:'练习'}
];
assert.deepEqual(selectNotes(fixture).map(q=>q.id),['a','other','b','c']);
assert.deepEqual(selectNotes(fixture,{category:'Java',grade:'B',status:'review',term:'cas',states:{b:'review'}}).map(q=>q.id),['b']);
assert.equal(selectNotes(fixture,{term:'body_only',plainOnly:true}).length,0);
assert.equal(selectNotes(fixture,{term:'body_only'}).length,1);
assert.deepEqual(selectNotes(fixture,{category:'Java',status:'new',states:{a:'done',b:'review'}}).map(q=>q.id),['c']);
assert.deepEqual(selectNotes(fixture,{status:'done',states:{a:'done'}}).map(q=>q.id),['a']);
const sorted=selectNotes(notes),collected=[];
for(let page=1;page<=paginate(sorted).pages;page++)collected.push(...paginate(sorted,page).items);
assert.deepEqual(collected.map(q=>q.id),sorted.map(q=>q.id),'Pagination must not omit or duplicate notes');
assert.equal(paginate(sorted,999).page,Math.ceil(notes.length/20));
assert.equal(paginate([],99).page,1);
assert.equal(paginate(sorted,0).page,1);
const originalIds=['java-equals','java-hashcode','java-hashmap','java-pass-value','concurrent-volatile','concurrent-lock','concurrent-pool','concurrent-deadlock','jvm-memory','jvm-reachable','jvm-classloader','jvm-oom','mysql-btree','mysql-covering','mysql-prefix','mysql-isolation','redis-types','redis-persistence','redis-eviction','redis-atomic','network-handshake','network-timewait','network-idempotent','network-cache'];
for(const id of originalIds)assert.ok(notes.some(q=>q.id===id),`Existing link lost: ${id}`);
const sample=markdown('## Test\n\n<script>alert(1)</script>\n\n`<img>`\n\n[bad](javascript:alert)\n\n```java\n<a>\n```');
assert.ok(!sample.html.includes('<script>'));assert.ok(!sample.html.includes('<img>'));assert.ok(!sample.html.includes('href="javascript:'));
assert.ok(markdown('[method](https://example.com/api#equals(java.lang.Object))').html.includes('href="https://example.com/api#equals(java.lang.Object)"'),'Java method anchors must retain balanced parentheses');
console.log(`Valid: ${notes.length} notes, ${categories.length} categories; grading, composite filters, search modes, pagination, existing links and HTML escaping passed.`);
