if (!Array.prototype.forEach)
{
  Array.prototype.forEach = function(fun /*, thisp*/)
  {
    var len = this.length;
    if (typeof fun != "function")
      throw new TypeError();

    var thisp = arguments[1];
    for (var i = 0; i < len; i++)
    {
      if (i in this)
        fun.call(thisp, this[i], i, this);
    }
  };
}

if (!Array.prototype.map)
{
  Array.prototype.map = function(fun /*, thisp*/)
  {
    var len = this.length;
    if (typeof fun != "function")
      throw new TypeError();

    var res = new Array(len);
    var thisp = arguments[1];
    for (var i = 0; i < len; i++)
    {
      if (i in this)
        res[i] = fun.call(thisp, this[i], i, this);
    }

    return res;
  };
}

if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(elt /*, from*/)
  {
    var len = this.length;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++)
    {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };
}

var split;

//Avoid running twice; that would break the `nativeSplit` reference
split = split || function (undef) {

 var nativeSplit = String.prototype.split,
     compliantExecNpcg = /()??/.exec("")[1] === undef, // NPCG: nonparticipating capturing group
     self;

 self = function (str, separator, limit) {
     // If `separator` is not a regex, use `nativeSplit`
     if (Object.prototype.toString.call(separator) !== "[object RegExp]") {
         return nativeSplit.call(str, separator, limit);
     }
     var output = [],
         flags = (separator.ignoreCase ? "i" : "") +
                 (separator.multiline  ? "m" : "") +
                 (separator.extended   ? "x" : "") + // Proposed for ES6
                 (separator.sticky     ? "y" : ""), // Firefox 3+
         lastLastIndex = 0,
         // Make `global` and avoid `lastIndex` issues by working with a copy
         separator = new RegExp(separator.source, flags + "g"),
         separator2, match, lastIndex, lastLength;
     str += ""; // Type-convert
     if (!compliantExecNpcg) {
         // Doesn't need flags gy, but they don't hurt
         separator2 = new RegExp("^" + separator.source + "$(?!\\s)", flags);
     }
     /* Values for `limit`, per the spec:
      * If undefined: 4294967295 // Math.pow(2, 32) - 1
      * If 0, Infinity, or NaN: 0
      * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
      * If negative number: 4294967296 - Math.floor(Math.abs(limit))
      * If other: Type-convert, then use the above rules
      */
     limit = limit === undef ?
         -1 >>> 0 : // Math.pow(2, 32) - 1
         limit >>> 0; // ToUint32(limit)
     while (match = separator.exec(str)) {
         // `separator.lastIndex` is not reliable cross-browser
         lastIndex = match.index + match[0].length;
         if (lastIndex > lastLastIndex) {
             output.push(str.slice(lastLastIndex, match.index));
             // Fix browsers whose `exec` methods don't consistently return `undefined` for
             // nonparticipating capturing groups
             if (!compliantExecNpcg && match.length > 1) {
                 match[0].replace(separator2, function () {
                     for (var i = 1; i < arguments.length - 2; i++) {
                         if (arguments[i] === undef) {
                             match[i] = undef;
                         }
                     }
                 });
             }
             if (match.length > 1 && match.index < str.length) {
                 Array.prototype.push.apply(output, match.slice(1));
             }
             lastLength = match[0].length;
             lastLastIndex = lastIndex;
             if (output.length >= limit) {
                 break;
             }
         }
         if (separator.lastIndex === match.index) {
             separator.lastIndex++; // Avoid an infinite loop
         }
     }
     if (lastLastIndex === str.length) {
         if (lastLength || !separator.test("")) {
             output.push("");
         }
     } else {
         output.push(str.slice(lastLastIndex));
     }
     return output.length > limit ? output.slice(0, limit) : output;
 };

 // For convenience
 String.prototype.split = function (separator, limit) {
     return self(this, separator, limit);
 };

 return self;

}();


function popUp(URL) {
	day = new Date();
	id = day.getTime();
	eval("page"
			+ id
			+ " = window.open(URL, '"
			+ id
			+ "', 'toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,width=400,height=350,left = 480,top = 392');");
}
function showBox(id) {
	var box = document.getElementById(id);
	if (box.style.display == "none")
		box.style.display = "";
	else
		box.style.display = "none";
}

function getSessionId() {
	var nameEQ = "POSTNUKESID=";
	var ca = document.cookie.split(';');
	for ( var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ')
			c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0)
			return c.substring(nameEQ.length, c.length);
	}
	return null;
}