/* ══════════════════════════════════════════════════════════════════
   Studio-in-HROne slides — anchors callouts to the UI they point at.
     <div data-ring="#target">            ring drawn around #target
     <div class="mk" data-mk="#target" data-at="tr|tl|r|l">  marker on #target
     <div class="co" data-from="#ring">   dashed leader from #ring to this callout
   Coordinates use offsetLeft/Top (ignores entrance transforms).
   ══════════════════════════════════════════════════════════════════ */
(function(){
  var stage = document.getElementById('stage');
  function box(el){
    var x = 0, y = 0, n = el;
    while (n && n !== stage) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; }
    return { x:x, y:y, w:el.offsetWidth, h:el.offsetHeight };
  }
  function put(el, x, y, w, h){
    el.style.left = x + 'px'; el.style.top = y + 'px';
    if (w != null) { el.style.width = w + 'px'; el.style.height = h + 'px'; }
  }
  function place(){
    document.querySelectorAll('[data-ring]').forEach(function(el){
      var t = document.querySelector(el.dataset.ring); if (!t) return;
      var b = box(t), p = 4; put(el, b.x - p, b.y - p, b.w + p*2, b.h + p*2);
    });
    document.querySelectorAll('[data-mk]').forEach(function(el){
      var t = document.querySelector(el.dataset.mk); if (!t) return;
      var b = box(t), s = el.offsetWidth / 2, at = el.dataset.at || 'tr';
      var x = at.indexOf('l') > -1 ? b.x : b.x + b.w;
      var y = at.indexOf('t') > -1 ? b.y : b.y + b.h / 2;
      if (at === 'r') x += 14; if (at === 'l') x -= 14;
      put(el, x - s, y - s);
    });
    var svg = document.getElementById('leads');
    if (svg) {
      svg.innerHTML = '';
      document.querySelectorAll('[data-from]').forEach(function(co){
        var f = document.querySelector(co.dataset.from); if (!f) return;
        var a = box(f), c = box(co);
        var x1 = a.x + a.w, y1 = a.y + a.h / 2, x2 = c.x, y2 = c.y + c.h / 2, m = (x1 + x2) / 2;
        svg.insertAdjacentHTML('beforeend',
          '<path d="M'+x1+' '+y1+' C '+m+' '+y1+', '+m+' '+y2+', '+x2+' '+y2+'"/>' +
          '<circle cx="'+x1+'" cy="'+y1+'" r="5"/>');
      });
    }
  }
  place();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(place);
  addEventListener('load', place);
})();
