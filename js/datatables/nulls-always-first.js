jQuery.extend( jQuery.fn.dataTableExt.oSort, {
    "nulls-always-first-asc": function ( a, b ) {
      if(a != null && b != null)
        return (a < b) ? -1 : ((a > b) ? 1 : 0);
      return (a == null && b != null) ? -1 : ((a != null && b == null) ? 1 : 0);
    },

    "nulls-always-first-desc": function ( a, b ) {
      if(a != null && b != null)
        return (a < b) ? 1 : ((a > b) ? -1 : 0);
      return (a == null && b != null) ? -1 : ((a != null && b == null) ? 1 : 0);
    }
} );
