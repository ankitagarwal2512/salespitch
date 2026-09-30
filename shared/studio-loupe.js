/* Loupe: a live, scaled clone of the board follows the pointer over the product screens */
(function(){
  var stage = document.getElementById('stage'), board = document.querySelector('.board');
  var Z = 2.1, R = 150, BX = board.offsetLeft, BY = board.offsetTop;   // zoom, lens radius, board position on stage
  var lens = document.createElement('div'); lens.className = 'loupe';
  lens.innerHTML = '<div class="lz"></div><i class="dot"></i>';
  stage.appendChild(lens);
  var lz = lens.firstChild, built = false;
  function build(){
    var c = board.cloneNode(true);
    c.removeAttribute('id'); c.classList.remove('zoomable');
    c.querySelectorAll('[id]').forEach(function(n){ n.removeAttribute('id'); });
    c.style.cssText = 'position:absolute;left:0;top:0;animation:none';
    lz.appendChild(c); built = true;
  }
  function onMove(e){
    var over = e.target.closest && e.target.closest('.shot, .phone');
    if (!over) { lens.classList.remove('on'); return; }
    if (!built) build();
    var r = stage.getBoundingClientRect(), k = r.width / 1920;
    var x = (e.clientX - r.left) / k, y = (e.clientY - r.top) / k;
    lens.style.left = x + 'px'; lens.style.top = y + 'px';
    lz.style.transform = 'translate(' + (R - (x - BX) * Z) + 'px,' + (R - (y - BY) * Z) + 'px) scale(' + Z + ')';
    lens.classList.add('on');
  }
  board.addEventListener('mousemove', onMove);
  board.addEventListener('mouseleave', function(){ lens.classList.remove('on'); });
})();
