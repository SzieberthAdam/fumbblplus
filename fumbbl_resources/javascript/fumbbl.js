var tooltipState = 0;
var instanceToken = Math.random() + ':' + (new Date()); // Generate random token for this browser window/tab

$.ajaxSetup({
  cache: false,
  type: 'POST',
  data: {},
  headers: {
    "cache-control": "no-cache"
  }
});

function el(e) {
	return document.getElementById(e);
}

function html(string) {
  return $('<div/>').text(string).html();
}

function addEvent(obj, evType, fn){
	if (obj.addEventListener){
		obj.addEventListener(evType, fn, true);
		return true;
	} else if (obj.attachEvent){
		var r = obj.attachEvent("on"+evType, fn);
		return r;
	} else {
		alert("Handler could not be attached");
	}
} 

function addLoadEvent(func) { 
	addEvent(window, 'load', func);
} 

function getParameter(k) {
	var query = window.location.search.substring(1);
	var parms = query.split('&');
	for (var i=0; i<parms.length; i++) {
		var pos = parms[i].indexOf('=');
		if (pos > 0) {
			var key = parms[i].substring(0,pos);
			if (key != k)
				continue;
			var val = parms[i].substring(pos+1);
			return val;
		}
	}
}

function moveTooltip(e) {
	if (!tooltipState)
		return;
	
	if (typeof event != "undefined" && event.clientX) {
		x = event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
		y = event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
	}
	else if (typeof e != "undefined" && e.pageX) {
		x = e.pageX;
		y = e.pageY;
	}
	else if (typeof e != "undefined" && e.clientX) {
		x = e.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
		y = e.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
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

function getElementWidth(obj) {
   if (typeof obj.clip !== "undefined") {
      return obj.clip.width;
   } else {
      if (obj.offsetWidth !== "undefined") {
          return obj.offsetWidth;
      } else {
          return obj.style.pixelWidth;
      }
   }
}

function getElementHeight(obj) {
   if (typeof obj.clip !== "undefined") {
      return obj.clip.height;
   } else {
      if (obj.style.pixelHeight) {
         return obj.style.pixelHeight;
      } else {
         return obj.offsetHeight;
      }
   }
}

function getAbsoluteLeft(obj) {
	var curleft = 0;
	if (obj.offsetParent) {
		curleft = obj.offsetLeft;
		while (obj = obj.offsetParent) {
			curleft += obj.offsetLeft;
		}
	}
	return curleft;
}

function getAbsoluteTop(obj) {
	var curtop = 0;
	if (obj.offsetParent) {
		curtop = obj.offsetTop;
		while (obj = obj.offsetParent) {
			curtop += obj.offsetTop;
			if (obj.style.position == 'absolute')
				break;
		}
	}
	return curtop;
}

function findPos(obj) {
	 var obj2 = obj;
	 var curtop = 0;
	 var curleft = 0;
	 if (document.getElementById || document.all) {
	  do  {
	   curleft += obj.offsetLeft-obj.scrollLeft;
	   curtop += obj.offsetTop-obj.scrollTop;
	   obj = obj.offsetParent;
	   obj2 = obj2.parentNode;
	   while (obj2!=obj) {
	    curleft -= obj2.scrollLeft;
	    curtop -= obj2.scrollTop;
	    obj2 = obj2.parentNode;
	   }
	  } while (obj.offsetParent)
	 } else if (document.layers) {
	  curtop += obj.y;
	  curleft += obj.x;
	 }
	 return [curtop, curleft];
	}   // end of findPos()

function findTop(obj) {
	return findPos(obj)[0];
}

function strcmp ( str1, str2 ) {
    return ( ( str1 == str2 ) ? 0 : ( ( str1 > str2 ) ? 1 : -1 ) );
}

function runIfNotificationRequired(callback) {
	LockableStorage.lock('com.fumbbl.notifylock', function() {
		var lastNotification = localStorage.lastNotification;
		var now = new Date();
		if (typeof(lastNotification) === "undefined" || now-Date.parse(lastNotification) >= 10000) {
			localStorage.lastNotification = now;
			callback();
		}
	});
}

function notify(title, options) {
	if (window.Notification)
		notify_safari(title, options);
	else if (window.webkitNotifications) {
		notify_chrome(title, options);
	}

  if ($('.messagewrapper').length === 0) {
    var template = $([
      "<div class='messagewrapper'>",
      " <div class='messagebackground'>&nbsp;</div>",
      " <div class='message'>",
      "   <div class='messagecontent'>",
      "     <div style='font-size: 1.2em;'>" + title + "</div>",
      "     <div>" + options.body + "</div>",
      "   </div>",
      " </div>",
      " <div class='messageinfo'>(Click to hide)</div>",
      "</div>"
      ].join("\n"));

    $('body').append(template);
    $('.messagewrapper').on('click', function() {
      $(this).fadeOut('fast', function() {$(this).remove(); })
    });
  }
  else {
    $('.messagewrapper .message').append($([
      "   <div class='messagecontent' style=\"border-top: solid yellow 1px;\">",
      "     <div style='font-size: 1.2em;'>" + title + "</div>",
      "     <div>" + options.body + "</div>",
      "   </div>"
      ].join("\n")));

    var numMessages = $('.messagewrapper .messagecontent').length;
    if (numMessages > 5) {
      $('.messagewrapper .message .messagecontent').first().remove();
      numMessages--;
    }

    $('.messagewrapper').height(numMessages * 80 + 20);
    $('.messagewrapper .message').height(numMessages * 80 + 20);
  }

}

function notify_chrome(title, options) {
	if (!window.webkitNotifications) {
		return;
	}
	else if (window.webkitNotifications.checkPermission() == 0) {
		var popup = window.webkitNotifications.createNotification('', title, options.body);
		popup.show();
	}
}

function notify_safari(title, options) {
    // check for notification compatibility
    if(!window.Notification) {
        // if browser version is unsupported, be silent
        return;
    }
    // if the user has not been asked to grant or deny notifications from this domain
    if(Notification.permission === 'default') {
        Notification.requestPermission(function() {
            // callback this function once a permission level has been set
            notify_safari(title, options);
        });
    }
    // if the user has granted permission for this domain to send notifications
    else if(Notification.permission === 'granted') {
        var n = new Notification(
                    title,
                    options
                );
    }
    // if the user does not want notifications to come from this domain
    else if(Notification.permission === 'denied') {
        // be silent
        return;
    }
}

function appendToken(form) {
	$.ajax({
			type : 'POST',
			async : false,
			url : '/xml:jauth?op=gettoken',
			success : function(data) {
				var token = $(data).find('Result').text();
				form.append($('<input type="hidden" name="authtoken" value="'+escape(token)+'" />'));
			}
	});
}

function encode_utf8(s) {
  return unescape(encodeURIComponent(s));
}

function decode_utf8(s) {
  return decodeURIComponent(escape(s));
}

function updatePlayerIcons() {
  // Icon loader
  $('.playericon:not([loaded])').each(function() {
        var id = $(this).attr('image');
        var obj = $(this);
        var x = parseInt($(this).attr('x'));
        var y = parseInt($(this).attr('y'));
        if (isNaN(x) || x < 1) {
          x = 1;
        }
        if (isNaN(y) || y < 1) {
          y = 1;
        }
        $.ajax({
                url: '/api/playerimage/info/' + id,
                success: function(info) {
                        var size = info.width / 4;
                        obj.width(size);
                        obj.height(size);
                        obj.css('background', 'url(/i/' + id + ')');
                        obj.css('background-position', '-' + ((x-1) * size) + 'px -' + ((y-1) * size) + 'px');
                        obj.attr('loaded', "1");
                }
        });
  });
}

function initializeBBCodeToggles() {
  // BBCode Toggles
  $('.bbcodetoggle:not([initialized])').click(function (event) {
    var b=$('#bbcode_'+$(this).attr('block'));
    var g=$('div[bbcode_group=' + b.attr('bbcode_group')+']');
    var bgrp=$('input[bbcode_group='+b.attr('bbcode_group')+']');
    if (b.is(':hidden')) {
      g.hide();
      $.each(bgrp, function() {
        if ($(this).attr('value')) {
          $(this).attr('value', $(this).attr('value').replace('Hide', 'Show'));
        }
      });
      if ($(this).attr('value')) {
        $(this).attr('value', $(this).attr('value').replace('Show', 'Hide'));
      }
    }
    else {
      if ($(this).attr('value')) {
        $(this).attr('value', $(this).attr('value').replace('Hide', 'Show'));
      }
    }
    b.toggle();
  })
  .attr('initialized', 1);  
}

function initializeTooltips() {
  $( '[bbcodetooltip]' ).tooltip({
    content: function() {
      console.log('#' + $(this).attr('bbcodetooltip'));
      return $('#' + $(this).attr('bbcodetooltip')).html();
    },
    show: null, // show immediately 
      hide: {
        effect: "", // fadeOut
      },
      close: function( event, ui ) {
        ui.tooltip.hover(
            function () {
                $(this).stop(true).fadeTo(400, 1); 
                //.fadeIn("slow"); // doesn't work because of stop()
            },
            function () {
                $(this).fadeOut("400", function(){ $(this).remove(); });
            }
        );
      }
  });
}

function initializeBBCode() {
  initializeBBCodeToggles();
  updatePlayerIcons();
  initializeTooltips();
}

$(function() {
	$('form.secure').submit(function() {
		appendToken($(this));
		return true;
	});

  $('.coachsearch').autocomplete({
    source: function(request, response) {
      $.ajax({
        url: '/api/coach/search/' + request.term,
        success: response
      });
    },
    minLength: 3,
    select: function(event, ui) {
    }
  });

  initializeBBCode();
});



/*
 * LockableStorage.lock(key, lockAquiredCallback)
 *
 * Taken from https://bitbucket.org/balpha/lockablestorage/overview
*/
(function () {

   function now() {
       return new Date().getTime();
   }
   
   function someNumber() {
       return Math.random() * 1000000000 | 0;
   }

   var myId = now() + ":" + someNumber();
       
   function getter(lskey) {
       return function () {
           var value = localStorage[lskey];
           if (!value)
               return null;
           
           var splitted = value.split(/\|/);
           if (parseInt(splitted[1]) < now()) {
               return null;
           }
           return splitted[0];
       }
   }
   
   function _mutexTransaction(key, callback, synchronous) {
       var xKey = key + "__MUTEX_x",
           yKey = key + "__MUTEX_y",
           getY = getter(yKey);

       function criticalSection() {
           try {
               callback();
           } finally {
               localStorage.removeItem(yKey);
           }
       }
       
       localStorage[xKey] = myId;
       if (getY()) {
           if (!synchronous)
               setTimeout(function () { _mutexTransaction(key, callback); }, 0);
           return false;
       }
       localStorage[yKey] = myId + "|" + (now() + 40);
       
       if (localStorage[xKey] !== myId) {
           if (!synchronous) {
               setTimeout(function () {
                   if (getY() !== myId) {
                       setTimeout(function () { _mutexTransaction(key, callback); }, 0);
                   } else {
                       criticalSection();
                   }
               }, 50)
           }
           return false;
       } else {
           criticalSection();
           return true;
       }
   }
   
   function lockImpl(key, callback, maxDuration, synchronous) {

       maxDuration = maxDuration || 5000;
       
       var mutexKey = key + "__MUTEX",
           getMutex = getter(mutexKey),
           mutexValue = myId + ":" + someNumber() + "|" + (now() + maxDuration);
           
       function restart () {
           setTimeout(function () { lockImpl(key, callback, maxDuration); }, 10);
       }
       
       if (getMutex()) {
           if (!synchronous)
               restart();
           return false;
       }
       
       var aquiredSynchronously = _mutexTransaction(key, function () {
           if (getMutex()) {
               if (!synchronous)
                   restart();
               return false;
           }
           localStorage[mutexKey] = mutexValue;
           if (!synchronous)
               setTimeout(mutexAquired, 0)
       }, synchronous);
       
       if (synchronous && aquiredSynchronously) {
           mutexAquired();
           return true;
       }
       return false;
       function mutexAquired() {
           try {
               callback();
           } finally {
               _mutexTransaction(key, function () {
                   if (localStorage[mutexKey] !== mutexValue)
                       throw key + " was locked by a different process while I held the lock"
               
                   localStorage.removeItem(mutexKey);
               });
           }
       }
       
   }
   
   window.LockableStorage = {
       lock: function (key, callback, maxDuration) { lockImpl(key, callback, maxDuration, false) },
       trySyncLock: function (key, callback, maxDuration) { return lockImpl(key, callback, maxDuration, true) }
   };
})();
