function moveTooltip(e) {
  if (!tooltipState)
    return;

  var xcorr = (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
  var ycorr = (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
  //console.info([0, xcorr, ycorr]);

  if (typeof event != "undefined" && event.clientX) {
    x = event.clientX + xcorr;
    y = event.clientY + ycorr;
    //console.info([1, x, y, event.clientX, event.clientY]);
  }
  else
  if (typeof e != "undefined" && e.pageX) {
    x = e.pageX;
    y = e.pageY;
    //console.info([2, x, y]);
  }
  else
  if (typeof e != "undefined" && e.clientX) {
    x = e.clientX + xcorr;
    y = e.clientY + ycorr;
    //console.info([3, x, y, e.clientX, e.clientY]);
  }
  else
    return;

  el = document.getElementById('fumbbl_tooltip');

  el.style.top = (y + 10) + 'px';
  if (x < window.innerWidth/2) {
        el.style.left = (x + 10) + 'px';
        el.style.right='auto';
  }
  else {
    el.style.left = (x - 10 - el.clientWidth) + 'px';
  }
}

function showTooltip($text) {
  el = document.getElementById('fumbbl_tooltip');
  if (el) {
    document.onmousemove = moveTooltip;
    el.innerHTML = $text;
    el.style.display='block';
    tooltipState = 1;
  }
}

function hideTooltip() {
  tooltipState = 0;
  el = document.getElementById('fumbbl_tooltip');

  if (el) {
    el.style.display='none';
  }
}
