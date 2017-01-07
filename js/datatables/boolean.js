jQuery.extend( jQuery.fn.dataTableExt.oSort, {
    "boolean-asc": function ( a, b ) {
      if(!!a == false && !!b == true)
        return true;
      return false;
    },

    "boolean-desc": function ( a, b ) {
      if(!!a == true && !!b == false)
        return true;
      return false;
    }
} );
