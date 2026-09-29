// ══════════════════════════════════════════════════════════════════
// AI Interviewer — "many candidates → AI → shortlist" funnel
// Ported from the AI Interviewer site's final CTA section. Renders an
// animated SVG into every .ai-funnel element (size it with CSS width).
// Avatars: Assets/AI Interviewer/cand-01..14 (in) + cand-15..17 (shortlist).
// ══════════════════════════════════════════════════════════════════
(function(){
  var A = '../Assets/AI Interviewer/';
  var IN  = [[32,40],[86,15],[144,30],[28,102],[82,88],[142,104],[28,166],[82,152],[142,168],[28,230],[82,218],[142,232],[56,290],[112,278]];
  var OUT = [80,178,276];
  var HUB = [250,178], R = 20;
  function pad(n){ return (n<10?'0':'')+n; }

  function build(id){
    var d = '', paths = '', dots = '', nodes = '';
    IN.forEach(function(p,i){
      var x = p[0], y = p[1], sx = x+22, mx = +(sx + (HUB[0]-sx)*.6).toFixed(1);
      d += '<clipPath id="'+id+'l'+i+'"><circle cx="'+x+'" cy="'+y+'" r="'+R+'"/></clipPath>';
      paths += '<path id="'+id+'lp'+i+'" d="M'+sx+','+y+'C'+mx+','+y+' '+mx+','+HUB[1]+' '+HUB[0]+','+HUB[1]+'" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="1.4"/>';
      var b = (i*.18).toFixed(2)+'s';
      dots += '<circle r="3" fill="rgba(255,255,255,0.9)" opacity="0"><animateMotion dur="2.2s" repeatCount="indefinite" begin="'+b+'"><mpath href="#'+id+'lp'+i+'"/></animateMotion><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.88;1" dur="2.2s" repeatCount="indefinite" begin="'+b+'"/></circle>';
      nodes += '<g><g clip-path="url(#'+id+'l'+i+')" filter="url(#'+id+'gs)" opacity="0.75"><image href="'+A+'cand-'+pad(i+1)+'.png" x="'+(x-R)+'" y="'+(y-R)+'" width="40" height="40"/></g><circle cx="'+x+'" cy="'+y+'" r="'+R+'" fill="none" stroke="rgba(255,255,255,0.2)"/></g>';
    });
    OUT.forEach(function(y,i){
      var b1 = (1.8+i*.4).toFixed(1)+'s', b2 = (i*.9).toFixed(1)+'s', cx = 458;
      d += '<clipPath id="'+id+'r'+i+'"><circle cx="'+cx+'" cy="'+y+'" r="'+R+'"/></clipPath>';
      paths += '<path id="'+id+'rp'+i+'" d="M320,178C378,178 378,'+y+' 436,'+y+'" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="2"/>';
      dots += '<circle r="4" fill="#17B591" opacity="0"><animateMotion dur="1.3s" repeatCount="indefinite" begin="'+b1+'"><mpath href="#'+id+'rp'+i+'"/></animateMotion><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="1.3s" repeatCount="indefinite" begin="'+b1+'"/></circle>';
      nodes += '<g><circle cx="'+cx+'" cy="'+y+'" fill="none" stroke="rgba(255,255,255,0.45)"><animate attributeName="r" values="24;33;24" dur="2.6s" repeatCount="indefinite" begin="'+b2+'"/><animate attributeName="opacity" values="0.4;0;0.4" dur="2.6s" repeatCount="indefinite" begin="'+b2+'"/></circle>'
        + '<g clip-path="url(#'+id+'r'+i+')"><image href="'+A+'cand-'+pad(15+i)+'.png" x="'+(cx-R)+'" y="'+(y-R)+'" width="40" height="40"/></g>'
        + '<circle cx="'+cx+'" cy="'+y+'" r="'+R+'" fill="none" stroke="rgba(255,255,255,0.55)" stroke-width="1.5"/>'
        + '<circle cx="'+(cx+14.4)+'" cy="'+(y+14.4)+'" r="7.6" fill="#17B591"/><path d="M'+(cx+8.8)+','+(y+14.4)+' L'+(cx+13.6)+','+(y+18.8)+' L'+(cx+21.2)+','+(y+10)+'" stroke="#fff" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>';
    });
    var hub = '<g><rect x="255" y="148" width="60" height="60" rx="14" fill="#17B591" filter="url(#'+id+'gw)"><animate attributeName="opacity" values="0.38;0.08;0.38" dur="2.2s" repeatCount="indefinite"/></rect>'
      + '<rect x="255" y="148" width="60" height="60" rx="14" fill="#17B591" filter="url(#'+id+'g)"><animate attributeName="opacity" values="0.18;0.55;0.18" dur="2.2s" repeatCount="indefinite"/></rect>'
      + '<image href="'+A+'ai-mark.svg" x="255" y="148" width="60" height="60"/></g>';
    var defs = '<defs>'+d
      + '<filter id="'+id+'g" x="-120%" y="-120%" width="340%" height="340%"><feGaussianBlur stdDeviation="12"/></filter>'
      + '<filter id="'+id+'gw" x="-160%" y="-160%" width="420%" height="420%"><feGaussianBlur stdDeviation="24"/></filter>'
      + '<filter id="'+id+'gs"><feColorMatrix type="saturate" values="0"/></filter>'
      + '<radialGradient id="'+id+'cg" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#17B591" stop-opacity="0.18"/><stop offset="100%" stop-color="#17B591" stop-opacity="0"/></radialGradient></defs>';
    return '<svg viewBox="0 -12 570 372" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:auto;overflow:visible" aria-hidden="true">'
      + defs + '<ellipse cx="285" cy="178" rx="210" ry="170" fill="url(#'+id+'cg)"/>' + paths + dots + nodes + hub + '</svg>';
  }

  var els = document.querySelectorAll('.ai-funnel');
  for (var i = 0; i < els.length; i++) els[i].insertAdjacentHTML('afterbegin', build('aif'+i+'-'));
})();
