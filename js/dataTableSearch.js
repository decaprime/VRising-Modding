document.addEventListener('DOMContentLoaded', function() {
    if (typeof $.fn.dataTable === 'undefined') {
      console.error('DataTables is not loaded');
      return;
    }
    
    // this renders the datatable with reasonable defaults
    $('html').each(function() {
      $(this).addClass('dark');
    });
    // Add DataTable to each table
    $('table').each(function() {
      console.log('Processing table:', this);
  
      new DataTable(this, {
        paging: true,
        searching: true,
        ordering: false,
        info: true,
        lengthChange: true,
        pageLength: 10, // Number of rows per page
        language: {
          search: "Search:"
        },
        layout:{
          topStart:{
            pageLength:{
              menu: [10, 20, 50, 100, 200]
            }
          }
        }
      });
    });
  });
  