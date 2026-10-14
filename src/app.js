(() => {
  'use strict';
  const notes=window.NOTES, categories=window.CATEGORIES, grades=window.GRADES;
  const {selectNotes,paginate}=window.NoteLibrary;
  const $=id=>document.getElementById(id);
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const progressKey='aqing-notes-progress-v1', preferencesKey='aqing-notes-preferences-v1';
  let states={},category='全部题目',grade='all',status='all',plainOnly=false,page=1;
  let practice=false,revealed=true,toastTimer,storageAvailable=true,theme='light';
  try {
    const saved=JSON.parse(localStorage.getItem(progressKey)||'{}');
    if(saved&&typeof saved==='object')for(const q of notes)if(['review','done'].includes(saved[q.id]))states[q.id]=saved[q.id];
    const preferences=JSON.parse(localStorage.getItem(preferencesKey)||'{}');
    plainOnly=preferences?.plainOnly===true;
    theme=preferences?.theme==='dark'?'dark':'light';
  } catch {storageAvailable=false;}
  function notify(message){$('toast').textContent=message;$('toast').hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').hidden=true,2800);}
  function savePreferences(){try{localStorage.setItem(preferencesKey,JSON.stringify({plainOnly,theme}));}catch{}}
  function saveProgress(){try{localStorage.setItem(progressKey,JSON.stringify(states));storageAvailable=true;}catch{storageAvailable=false;notify('浏览器禁止保存；标记仅在当前页面有效');}}
  function selected(){return selectNotes(notes,{category,grade,status,plainOnly,term:$('search').value,states});}
  function badge(q){return `<span class="grade-badge grade-${q.grade}">${q.grade} · ${esc(grades[q.grade].name)}</span>`;}
  function updateProgress(){
    const done=notes.filter(q=>states[q.id]==='done').length;
    $('mastered-count').textContent=done;$('progress').value=done;
    $('review-count').textContent=notes.filter(q=>states[q.id]==='review').length;
    $('grade-cards').innerHTML=Object.entries(grades).map(([letter,info])=>{
      const group=notes.filter(q=>q.grade===letter),learned=group.filter(q=>states[q.id]==='done').length;
      return `<button class="grade-card" data-path-grade="${letter}"><span class="grade-letter grade-${letter}">${letter}</span><strong>${esc(info.name)}</strong><p>${esc(info.description)}</p><div class="grade-card-foot"><span>${group.length} 道题</span><span>${learned} 已掌握 ↗</span></div><progress max="${group.length||1}" value="${learned}" aria-label="${letter} 级已掌握比例"></progress></button>`;
    }).join('');
  }
  function renderCategories(){
    const icons=['{ }','↳','▣','≡','◈','⌁','▤','✳','⇢','⋈','⊞','◇'];
    $('categories').innerHTML=['全部题目',...categories].map((c,i)=>`<button data-category="${esc(c)}" aria-pressed="${category===c}"><span><span class="cat-icon">${i?icons[i-1]:'▦'}</span>${esc(c)}</span><span>${c==='全部题目'?notes.length:notes.filter(q=>q.category===c).length}</span></button>`).join('');
  }
  function renderList(){
    const result=selected(),slice=paginate(result,page);page=slice.page;
    $('result-count').textContent=`${result.length} / ${notes.length} 道题`;
    $('empty').hidden=!!result.length;$('list-random').disabled=!result.length;
    $('pagination').hidden=!result.length;$('page-info').textContent=`${page} / ${slice.pages} 页`;
    $('page-prev').disabled=page===1;$('page-next').disabled=page===slice.pages;
    $('view-description').textContent=plainOnly?'人话视图：搜索题目、解释和标签；点击题目还可以展开完整原理。':'按 A → B → C 排序。首轮练习时间为编辑估计，不包含深入阅读与反复练习。';
    $('plain-toggle').setAttribute('aria-pressed',plainOnly);
    document.querySelectorAll('[data-grade]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.grade===grade));
    document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.filter===status));
    $('question-list').innerHTML=slice.items.map(q=>`<a class="question-row ${plainOnly?'plain-row':''}" href="#q/${q.id}"><span class="question-num">${String(notes.indexOf(q)+1).padStart(2,'0')}</span><div class="question-copy"><h3>${esc(q.title)}</h3><div class="question-meta">${badge(q)}<span class="tag">${esc(q.category)}</span><span>${q.tags.filter(tag=>tag!==q.category).map(esc).join(' · ')}</span><span>首轮练习约 ${q.effort} 分钟</span></div>${plainOnly?`<p class="row-plain">${esc(q.plain)}</p>`:`<p class="row-summary">${esc(q.summary)}</p>`}</div>${states[q.id]?`<span class="question-state">${states[q.id]==='done'?'✓ 已掌握':'○ 待复习'}</span>`:''}<span class="row-arrow" aria-hidden="true">↗</span></a>`).join('');
    renderCategories();updateProgress();
  }
  function setState(q,state){
    if(states[q.id]===state)delete states[q.id];else states[q.id]=state;
    saveProgress();renderList();renderArticle(q,false);
    if(storageAvailable)notify(states[q.id]==='done'?'已标记掌握':states[q.id]==='review'?'已加入待复习':'已取消标记');
  }
  function random(pool=selected()){
    if(!pool.length){notify('当前没有可抽的题目，请调整筛选');return;}
    const alternatives=pool.filter(q=>`#q/${q.id}`!==location.hash),eligible=alternatives.length?alternatives:pool;
    const q=eligible[Math.floor(Math.random()*eligible.length)];practice=true;revealed=false;
    if(location.hash===`#q/${q.id}`)renderArticle(q);else location.hash=`q/${q.id}`;
  }
  function renderArticle(q,focus=true){
    if(!q)return;
    const state=states[q.id],hide=practice&&!revealed;
    let pool=selected();if(!pool.some(item=>item.id===q.id))pool=selectNotes(notes,{category:q.category});
    const index=pool.findIndex(item=>item.id===q.id);
    const toc=plainOnly?[{id:'plain-speaking',title:'说人话'},{id:'plain-exercise',title:'动手试一遍'}]:q.toc;
    const body=plainOnly?`<h2 id="plain-speaking">说人话</h2><p class="plain-explanation">${esc(q.plain)}</p><h2 id="plain-exercise">动手试一遍</h2><p>${esc(q.exercise)}</p><button class="button" id="expand-full">展开完整笔记 →</button><div class="plain-references">${q.references}</div>`:q.html;
    $('article-view').innerHTML=`<div class="article-top"><a href="#library">← 返回题目目录</a><span>${esc(q.category)} / ${index+1} · ${pool.length} 道题</span></div><div class="article-layout"><article><header class="article-header"><p class="eyebrow">${esc(q.category)} / ${q.tags.filter(tag=>tag!==q.category).map(esc).join(' · ')}</p><h1 class="question-header" tabindex="-1">${esc(q.title)}</h1><p class="article-subtitle">知识整理 · 更新于 ${esc(q.updated)} · ${q.minutes} 分钟阅读</p><div class="learning-info">${badge(q)}<p>${esc(q.reason)}</p><small>首轮练习约 ${q.effort} 分钟 · 编辑估计，深度掌握需要反复练习</small></div></header>${practice?`<div class="practice-banner"><div><p>先试着用自己的话回答。</p><small>${hide?'想好之后，再展开笔记对照。':'看看哪里还没说清楚。'}</small></div><button class="button" id="reveal">${hide?'展开答案':'重新自测'}</button></div>`:''}<div class="article-actions"><button data-state="review" aria-pressed="${state==='review'}">${state==='review'?'○ 已加入待复习':'○ 待复习'}</button><button data-state="done" aria-pressed="${state==='done'}">${state==='done'?'✓ 已掌握':'✓ 标记掌握'}</button><button id="article-plain" aria-pressed="${plainOnly}">${plainOnly?'读完整笔记':'只看说人话'}</button><button id="share">复制题目链接</button><button id="next-random">⇄ 再抽一题</button></div><div class="markdown" ${hide?'hidden':''}>${body}</div><div class="article-bottom">${index>0?`<a class="button" href="#q/${pool[index-1].id}">← 上一题</a>`:'<span></span>'}${index<pool.length-1?`<a class="button" href="#q/${pool[index+1].id}">下一题 →</a>`:'<a class="button" href="#library">回到目录 →</a>'}</div></article><aside class="article-aside"><p>这一题怎么读</p><div class="toc" ${hide?'hidden':''}>${toc.map(t=>`<a href="#${t.id}" data-section="${t.id}">${esc(t.title)}</a>`).join('')}</div><div class="aside-note">${q.grade} 级：${esc(grades[q.grade].name)}<br>学习优先级，不是面试命中率。<br><br>先讲清意思，再补原理与边界。<br>练完仍不熟，就标记待复习。</div></aside></div>`;
    $('article-view').querySelectorAll('[data-state]').forEach(b=>b.addEventListener('click',()=>setState(q,b.dataset.state)));
    $('next-random').addEventListener('click',()=>random());
    if($('reveal'))$('reveal').addEventListener('click',()=>{revealed=!revealed;renderArticle(q,false);});
    const toggle=()=>{plainOnly=!plainOnly;savePreferences();renderList();renderArticle(q,false);};
    $('article-plain').addEventListener('click',toggle);
    if($('expand-full'))$('expand-full').addEventListener('click',toggle);
    $('share').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(location.href);notify('题目链接已复制');}catch{notify('请复制浏览器地址栏中的题目链接');}});
    $('article-view').querySelectorAll('[data-section]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();$(a.dataset.section)?.scrollIntoView({behavior:'smooth'});}));
    document.title=`${q.title} · 阿青的后端面试笔记`;
    if(focus){window.scrollTo({top:0,behavior:'instant'});$('article-view').querySelector('h1').focus({preventScroll:true});}
  }
  function route(){
    const match=location.hash.match(/^#q\/([a-z0-9-]+)$/),q=match&&notes.find(q=>q.id===match[1]);
    if(q){$('home-view').hidden=true;$('article-view').hidden=false;renderArticle(q);return;}
    $('home-view').hidden=false;$('article-view').hidden=true;document.title='阿青的后端面试笔记';practice=false;revealed=true;renderList();
    if(match){notify('这道题暂时不存在，已返回目录');history.replaceState(null,'',location.pathname+location.search+'#library');}
    if(location.hash==='#library'||match)setTimeout(()=>$('library').scrollIntoView(),0);
    else if(location.hash==='#about')setTimeout(()=>$('about').scrollIntoView(),0);
    else window.scrollTo({top:0,behavior:'instant'});
  }
  function chooseGrade(letter){grade=letter;page=1;renderList();if(location.hash==='#library')$('library').scrollIntoView();else location.hash='library';}
  function applyTheme(){document.documentElement.dataset.theme=theme;$('theme-toggle').setAttribute('aria-label',theme==='dark'?'切换浅色模式':'切换深色模式');}
  $('categories').addEventListener('click',e=>{const b=e.target.closest('[data-category]');if(b){category=b.dataset.category;page=1;renderList();}});
  document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{status=b.dataset.filter;page=1;renderList();}));
  document.querySelectorAll('[data-grade]').forEach(b=>b.addEventListener('click',()=>chooseGrade(b.dataset.grade)));
  $('grade-cards').addEventListener('click',e=>{const b=e.target.closest('[data-path-grade]');if(b)chooseGrade(b.dataset.pathGrade);});
  $('start-a').addEventListener('click',()=>{category='全部题目';status='all';$('search').value='';chooseGrade('A');});
  $('search').addEventListener('input',()=>{page=1;renderList();});
  $('plain-toggle').addEventListener('click',()=>{plainOnly=!plainOnly;page=1;savePreferences();renderList();});
  $('reset').addEventListener('click',()=>{category='全部题目';grade='all';status='all';$('search').value='';page=1;renderList();});
  $('review-nav').addEventListener('click',()=>{category='全部题目';grade='all';status='review';$('search').value='';page=1;if(location.hash==='#library')route();else location.hash='library';});
  $('hero-random').addEventListener('click',()=>random());$('list-random').addEventListener('click',()=>random());
  $('page-prev').addEventListener('click',()=>{page--;renderList();$('library-title').scrollIntoView({behavior:'instant'});});
  $('page-next').addEventListener('click',()=>{page++;renderList();$('library-title').scrollIntoView({behavior:'instant'});});
  $('theme-toggle').addEventListener('click',()=>{theme=theme==='dark'?'light':'dark';applyTheme();savePreferences();});
  document.addEventListener('keydown',e=>{if(e.key==='/'&&!['INPUT','TEXTAREA'].includes(document.activeElement.tagName)&&!document.activeElement.isContentEditable){e.preventDefault();if($('home-view').hidden){location.hash='library';setTimeout(()=>$('search').focus(),0);}else $('search').focus();}});
  document.addEventListener('click',e=>{if(e.target.closest('a[href^="#q/"]')){practice=false;revealed=true;}});
  window.addEventListener('hashchange',route);
  window.addEventListener('storage',e=>{if(e.key===progressKey){states={};try{const saved=JSON.parse(e.newValue||'{}');if(saved&&typeof saved==='object')for(const q of notes)if(['review','done'].includes(saved[q.id]))states[q.id]=saved[q.id];}catch{}renderList();if(!$('article-view').hidden)renderArticle(notes.find(q=>`#q/${q.id}`===location.hash),false);}});
  $('total-count').textContent=notes.length;$('topic-count').textContent=categories.length;$('progress-total').textContent=notes.length;$('progress').max=notes.length;
  applyTheme();route();
})();
