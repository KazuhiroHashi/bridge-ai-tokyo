/* Bridge AI — site.js(ヘッダーの線、出現、文書ページの目次) */
(function(){
  var root=document.documentElement; root.classList.add('js');
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var hd=document.querySelector('.hd');
  if(hd){ var st=function(){ hd.classList.toggle('stuck', window.scrollY>4); }; st(); window.addEventListener('scroll',st,{passive:true}); }

  var rv=[].slice.call(document.querySelectorAll('.rv'));
  if(reduce||!('IntersectionObserver' in window)){ rv.forEach(function(e){ e.classList.add('in'); }); }
  else{
    var io=new IntersectionObserver(function(es){ es.forEach(function(x){ if(x.isIntersecting){ x.target.classList.add('in'); io.unobserve(x.target); } }); },{threshold:.1,rootMargin:'0px 0px -5% 0px'});
    rv.forEach(function(e){ io.observe(e); });
  }

  // 文書ページ:h2 から目次を作り、読んでいる位置を示す
  var doc=document.querySelector('.doc'), toc=document.querySelector('.toc ol');
  if(doc&&toc){
    var hs=[].slice.call(doc.querySelectorAll('h2'));
    hs.forEach(function(h,i){
      if(!h.id) h.id='s'+(i+1);
      var li=document.createElement('li'), a=document.createElement('a');
      a.href='#'+h.id; a.textContent=h.textContent; li.appendChild(a); toc.appendChild(li);
    });
    if('IntersectionObserver' in window){
      var ls=[].slice.call(toc.querySelectorAll('a'));
      var spy=new IntersectionObserver(function(es){ es.forEach(function(x){ if(x.isIntersecting){ ls.forEach(function(a){ a.classList.toggle('on', a.getAttribute('href')==='#'+x.target.id); }); } }); },{rootMargin:'-15% 0px -75% 0px'});
      hs.forEach(function(h){ spy.observe(h); });
    }
  }
})();
