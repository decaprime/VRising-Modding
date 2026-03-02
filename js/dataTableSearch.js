document.addEventListener('DOMContentLoaded', function () {
  if (typeof $.fn.dataTable === 'undefined' && typeof DataTable === 'undefined') {
    console.error('DataTables is not loaded');
    return;
  }

  // Force dark mode class
  $('html').each(function () {
    $(this).addClass('dark');
  });

  function alreadyInit(el) {
    return el.dataset && el.dataset.dtInit === '1';
  }

  $('table').each(function () {
    if (alreadyInit(this)) return;

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
      options.autoWidth = false;
      options.columnDefs = [
        { targets: [0], width: '220px' },
        { targets: [1], width: '68px' },
        { targets: [2], width: '60px' },
        { targets: [3], width: '240px' },
        { targets: [5], visible: false, searchable: true }
      ];
    }

    new DataTable(this, options);
    this.dataset.dtInit = '1';
  });
});
