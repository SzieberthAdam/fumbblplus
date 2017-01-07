jQuery.extend( jQuery.fn.dataTableExt.oSort, {
    "nulls-last-asc": function ( a, b ) {
      if(a != null && b != null) { return (a < b) ? -1 : ((a > b) ? 1 : 0); };
      return (a == null && b != null) ? 1 : ((a != null && b == null) ? -1 : 0);
    },

    "nulls-last-desc": function ( a, b ) {
      if(a != null && b != null) { return (a < b) ? 1 : ((a > b) ? -1 : 0); };
      return (a == null && b != null) ? -1 : ((a != null && b == null) ? 1 : 0);
    }
} );
