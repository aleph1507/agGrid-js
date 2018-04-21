(function() {

  document.addEventListener('DOMContentLoaded', function() {
    var gridDiv = document.querySelector('#grid1');

    // var selectedMonth = 0;

    // function monthValueGetter(params){
    //   if(params.context.selectedMonth<params.colDef.monthIndex){
    //     return params.data[params.colDef.field + '_bud'];
    //   } else {
    //     return params.data[params.colDef.field + '_act'];
    //   }
    //
    //   params.context.selectedMonth<params.colDef.monthIndex ? params.data[params.colDef.field + '_bud'] : params.data[params.colDef.field + '_act'];
    // }

    var monthValueGetter =
    "ctx.selectedMonth<colDef.monthIndex ? data[colDef.field + '_bud'] : data[colDef.field + '_act']";

    // var monthCellClassRules = {
    //             'actual': function(params) {
    //                 return params.context.selectedMonth >= params.colDef.monthIndex;
    //               },
    //             'budget': function(params) {
    //                 return params.context.selectedMonth < params.colDef.monthIndex;
    //               },
    //               'negative': function(params) {
    //                 return params.value < 0;
    //               }
    //           };

     var monthCellClassRules = {
       'actual': 'ctx.selectedMonth >= colDef.monthIndex',
       'budget': 'ctx.selectedMonth < colDef.monthIndex',
       'negative': 'x < 0'
     }

    var gridOptions = {
      context: {selectedMonth: 0},
      columnDefs: [
        {headerName: 'Country', field: 'country'},
        {headerName: 'City', field: 'city'},
        {headerName: 'Jan', field: 'jan', monthIndex: 0, valueGetter: monthValueGetter,
          cellClassRules: monthCellClassRules, cellRenderer: numberCellRenderer,
          cellClass: 'rightAlign'
        },
        {headerName: 'Feb', field: 'feb', monthIndex: 1, valueGetter: monthValueGetter,
          cellClassRules: monthCellClassRules, cellRenderer: numberCellRenderer,
          cellClass: 'rightAlign'
        },
        {headerName: 'Mar', field: 'mar', monthIndex: 2, valueGetter: monthValueGetter,
          cellClassRules: monthCellClassRules, cellRenderer: numberCellRenderer,
          cellClass: 'rightAlign'
        },
        {headerName: 'Apr', field: 'apr', monthIndex: 3, valueGetter: monthValueGetter,
          cellClassRules: monthCellClassRules, cellRenderer: numberCellRenderer,
          cellClass: 'rightAlign'
        },
        {headerName: 'May', field: 'may', monthIndex: 4, valueGetter: monthValueGetter,
          cellClassRules: monthCellClassRules, cellRenderer: numberCellRenderer,
          cellClass: 'rightAlign'
        },
        {headerName: 'YTD Act',
            valueGetter:
            ' var total = 0; ' +
            ' if(ctx.selectedMonth>=0) {total += data.jan_act}' +
            ' if(ctx.selectedMonth>=1) {total += data.feb_act}' +
            ' if(ctx.selectedMonth>=2) {total += data.mar_act}' +
            ' if(ctx.selectedMonth>=3) {total += data.apr_act}' +
            ' if(ctx.selectedMonth>=4) {total += data.may_act}' +
            ' return total',
            cellRenderer: numberCellRenderer, cellClass: 'rightAlign'
        }
        // {headerName: 'YTD Act', valueGetter: function(params) {
        //   var total = 0;
        //   if(params.context.selectedMonth>=0){ total+=params.data.jan_act; }
        //   if(params.context.selectedMonth>=1){ total+=params.data.feb_act; }
        //   if(params.context.selectedMonth>=2){ total+=params.data.mar_act; }
        //   if(params.context.selectedMonth>=3){ total+=params.data.apr_act; }
        //   if(params.context.selectedMonth>=4){ total+=params.data.may_act; }
        //
        //   return total;
        // }, cellRenderer: numberCellRenderer, cellClass: 'rightAlign'}
      ],


      // rowData: [
      //   {name: 'Niall', role: 'Developer'},
      //   {name: 'Eamon', role: 'Manager'},
      //   {name: 'Brian', role: 'Musician'},
      //   {name: 'Kevin', role: 'Manager'}
      // ]
    };

    function numberCellRenderer(params) {
      if(params.value < 0){
        return '(' + (params.value*-1).toLocaleString() + ')';
      } else {
        return params.value.toLocaleString();
      }
    }


    new agGrid.Grid(gridDiv, gridOptions);
    // console.log('gridDiv' + gridDiv);

    jsonLoad(function(data) {
      gridOptions.api.setRowData(data);
      gridOptions.api.sizeColumnsToFit();
      // console.log('data: ' + data);
    });

    document.querySelector('#btnMonthDown').addEventListener('click', function() {
      gridOptions.context.selectedMonth--;
      gridOptions.api.refreshView();
    });

    document.querySelector('#btnMonthUp').addEventListener('click', function() {
      gridOptions.context.selectedMonth++;
      gridOptions.api.refreshView();
    });

  });
})();

function jsonLoad(callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', './monthlySales.json');
  xhr.responseType = 'json';

  xhr.onload = function() {
    if(this.status == 200){
      callback(this.response);
    }
  };

  xhr.onerror = function(){
    console.log('loading data error');
  };

  xhr.send();
}
