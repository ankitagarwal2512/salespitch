/* ══════════════════════════════════════════════════════════════════
   HROne slide runtime — shared by every slide in every deck.
   Load at the end of <body>, just before the slide's own <script>:
     <script src="../shared/slide.js"></script>

   - Scales #stage to fit the window          (opt out: data-own-fit)
   - Wires #prevBtn / #nextBtn to the shell   (opt out: data-own-nav)
   - Keeps the bottom-right ".nav-cnt" counter in sync with the shell
   Opt-outs go on the script tag, for slides with custom behaviour:
     <script src="../shared/slide.js" data-own-nav></script>
   ══════════════════════════════════════════════════════════════════ */
(function(){
  var me = document.currentScript;
  var ownFit = me && me.hasAttribute('data-own-fit');
  var ownNav = me && me.hasAttribute('data-own-nav');

  function send(key){ if (parent !== window) parent.postMessage({type:'nav-key', key:key}, '*'); }

  // Stage scaling — global so slide scripts can call fit()
  if (!ownFit) {
    window.fit = function(){
      var s = Math.min(innerWidth/1920, innerHeight/1080);
      document.getElementById('stage').style.transform = 'scale('+s+')';
    };
    fit(); addEventListener('resize', fit);
  }

  // Prev / next buttons → shell
  if (!ownNav) {
    var prev = document.getElementById('prevBtn'), next = document.getElementById('nextBtn');
    if (prev) prev.onclick = function(){ send('ArrowLeft'); };
    if (next) next.onclick = function(){ send('ArrowRight'); };
  }

  // Counter sync from shell
  addEventListener('message', function(e){
    if (e.data && e.data.type === 'set-counter') {
      var el = document.querySelector('.nav-cnt');
      if (el) el.textContent = e.data.text;
    }
  });
})();
