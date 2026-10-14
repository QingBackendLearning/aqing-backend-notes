(() => {
  const ranks={A:0,B:1,C:2};
  function selectNotes(notes, {category='全部题目',grade='all',status='all',term='',states={},plainOnly=false}={}) {
    const query=term.trim().toLocaleLowerCase();
    return notes.filter(q=>{
      if(category!=='全部题目'&&q.category!==category)return false;
      if(grade!=='all'&&q.grade!==grade)return false;
      if(status==='new'&&states[q.id])return false;
      if(['review','done'].includes(status)&&states[q.id]!==status)return false;
      const searchable=plainOnly?`${q.title} ${q.plain} ${q.category} ${q.tags.join(' ')}`:`${q.title} ${q.plain} ${q.reason} ${q.exercise} ${q.text} ${q.category} ${q.tags.join(' ')}`;
      return !query||searchable.toLocaleLowerCase().includes(query);
    }).sort((a,b)=>ranks[a.grade]-ranks[b.grade]);
  }
  function paginate(notes,page=1,size=20){
    const pages=Math.max(1,Math.ceil(notes.length/size));
    const current=Math.min(pages,Math.max(1,page));
    return {items:notes.slice((current-1)*size,current*size),page:current,pages,total:notes.length};
  }
  globalThis.NoteLibrary=Object.freeze({selectNotes,paginate});
})();
