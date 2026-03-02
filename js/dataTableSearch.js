document.addEventListener('DOMContentLoaded', function () {
  if (typeof $.fn.dataTable === 'undefined' && typeof DataTable === 'undefined') {
    console.error('DataTables is not loaded');
    return;
  }

  // Ensure dark mode class is applied
  $('html').each(function () {
    $(this).addClass('dark');
  });

  // Helper: detect if a table is already a DataTable (avoid double-init)
  function isDataTable(el) {
    // DataTables v2 adds wrapper elements; easiest is a data attribute marker
    return el.dataset && el.dataset.dtInit === '1';
  }

  // Init each table
  $('table').each(function () {
    if (isDataTable(this)) return;

    const isConsoleCommands = this.id === 'console-commands-table';

    const options = {
      paging: true,
      searching: true,
      ordering: false,
      info: true,
      lengthChange: true,
      pageLength: 10,
      language: { search: 'Search:' },
      layout: {
        topStart: {
          pageLength: {
            menu: [10, 20, 50, 100, 200]
          }
        }
      }
    };

    if (isConsoleCommands) {
      // These two are the big fixes for your layout
      options.autoWidth = false;     // stop DataTables from guessing widths
      options.scrollX = true;        // allow horizontal scroll instead of crushing columns

      // Hide the helper "Search" column (last column) but keep it searchable
      // Your layout places it as the 6th column (index 5).
      options.columnDefs = [
        { targets: [5], visible: false, searchable: true }
      ];
    }

    console.log('Processing table:', this, 'consoleCommands:', isConsoleCommands);

    // DataTables v2 constructor
    new DataTable(this, options);

    // Mark as initialized
    this.dataset.dtInit = '1';
  });
});
