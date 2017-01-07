jQuery.extend( jQuery.fn.dataTableExt.oSort, {

    "array-asc": function ( a, b ) {
      var min_len = Math.min(a.length, b.length);
      var value_a = null;
      var value_b = null;
      var result = 0;
      Array.apply(null, Array(min_len)).map(function (_, i) {return i;}).some(function (i) {
        value_a = a[i];
        value_b = b[i];
        if ( value_a < value_b ) { result = -1; return true; }
        else if ( value_a > value_b ) { result = 1; return true; };
      });
      if ( result == 0 && a.length < b.length ) { result = -1; }
      else if ( result == 0 && a.length < b.length ) { result = 1; };
      return result;
    },

    "array-desc": function ( a, b ) {
      var min_len = Math.min(a.length, b.length);
      var value_a = null;
      var value_b = null;
      var result = 0;
      Array.apply(null, Array(min_len)).map(function (_, i) {return i;}).some(function (i) {
        value_a = a[i];
        value_b = b[i];
        if ( value_a < value_b ) { result = 1; return true; }
        else if ( value_a > value_b ) { result = -1; return true; };
      });
      if ( result == 0 && a.length < b.length ) { result = 1; }
      else if ( result == 0 && a.length < b.length ) { result = -1; };
      return result;
    },

} );
