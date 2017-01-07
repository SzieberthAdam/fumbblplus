$(document).ready(function() {

  var $menu = $('.topnav ul');
  $.each(menu, function(item) {
    $menu.append('<li><div><a href="'+this['url']+'">'+item+'</a></div>');
  });

  var originalNav = $('.topnav .selected');
  var originalNav2 = $('.topnav2').clone().html();
  var displayOriginal = 1;

  $('.topnav li').hoverIntent(function() {
    $('.topnav li').removeClass('selected');
    $(this).addClass('selected');
    var item = $(this).children('div').text();

    var sublinks = menu[item]['sublinks'];

    var line = '<span id="links">';
    for (var sublinkindex in sublinks){
      var sitem = sublinks[sublinkindex];
      if (sitem.length == 2){
        line += '<a class="nav" href="' + sitem[1] + '">' + sitem[0] + '</a> ';
      }
      else if (sitem.length == 1 && sitem[0] === "__SPACER__"){
        line += '<span id="spacer">&bull;</span>';
      }
      else if (sitem.length == 1){
        line += '<span id="header">' + sitem[0] + '</span> ';
      }
    }
    line += '</span>';

    //$('.topnav2').children('a').remove();
    //$('.topnav2').children('b').remove();
    //$('.topnav2').children('.spacer').remove();
    $('.topnav2 #links').remove();
    $('.topnav2').children('.dyk').remove();
    $(line).appendTo('.topnav2');
    displayOriginal = 0;
  }, function() {
  });

  $(document).mousemove(function(event) {
    var y = event.pageY;

    if (y > 200 && displayOriginal == 0) {
      $('.topnav li').removeClass('selected');
      originalNav.addClass('selected');
      $('.topnav2').children().remove();
      $(originalNav2).appendTo('.topnav2');
      displayOriginal = 1;
    }
  });

});
