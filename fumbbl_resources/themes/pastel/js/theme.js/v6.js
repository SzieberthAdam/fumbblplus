(function() {

var enableNotifications = false;

$(function() {
	var originalNav = $('.topnav .selected');
	var originalNav2 = $('.topnav2').clone().html();
	var displayOriginal = 1;

	$('.topnav li').hoverIntent(function() {
		$('.topnav li').removeClass('selected');
		$(this).addClass('selected');
		var item = $(this).children('div').text();

		var sublinks = menu[item]['sublinks'];

		var line = '<span id="links">';
		for ( var link in sublinks) {
			if (sublinks[link].length > 0) {
				line += '<a class="nav" href="' + sublinks[link] + '">' + link + '</a> ';
			}
			else if (link.indexOf("__SPACER__") === 0) {
				line += '<span id="spacer">&bull;</span>';
			}
			else {
				line += '<span id="header">'+link+'</span> ';
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

	var message = $('.messagewrapper');

	if (message) {
		message.delay(2000).fadeOut('fast', function() { $(this).remove(); });
	}

	fixThemeImages();

	if (window.webkitNotifications) {
		$('.themebottom').click(function() { window.webkitNotifications.requestPermission(); });
	}

	if (typeof(Storage)!=="undefined" && (window.Notification || window.webkitNotifications)) {
		enableNotifications = true;
	}

	setTimeout(getNotifications, 5000);
});

var lastNotificationTag;
function getNotifications() {

	$.post('/xml:notifications', function(data) {

		$('.bbtime').text($(data).find('tick time').text());

		if (enableNotifications) {
			runIfNotificationRequired(function() {
				var notifications = $(data).find('tick notifications').children();
				notifications.each(function() {
					var title = $(this).find('title').text();
					var message = $(this).find('message').text();
					var tag = $(this).find('tag').text();
					if (tag != lastNotificationTag) {
						notify(title, {body: message, tag: tag});
						lastNotificationTag = tag;
					}
				});
			});
		}
	});

	setTimeout(getNotifications, 10000);
}

function fixThemeImages() {
    $('.pagecontent img').each(function() {
        var width = $(this).width();
        var height = $(this).height();
        var maxWidth = 960;
        if ($(this).parents('.forumpost').length > 0)
			maxWidth = 690;
        if (width > maxWidth) {
                var scale = maxWidth/width;
                var x = Math.round(width*scale);
                var y = Math.round(height*scale);
                $(this).css({ width: x, height: y });
        }
    });
}

$(window).load(function() {
	fixThemeImages();
});

})();