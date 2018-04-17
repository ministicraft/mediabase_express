var elem = document.querySelector('.sidenav');
var instance = M.Sidenav.init(elem, {
    dragable: true
});
var dataTable = new DataTable("#myTable", {
    searchable: true,
    perPage: 10,
    ajax: "/api/books",
    columns: [
        {
            select: 0,
            sortable: false,
            render: function(data,cell,row){
                cell.classList.add("col");
                cell.classList.add("s1");
                cell.classList.add("artwork");
                row.classList.add("row");
                return "<img src=\"data:image/jpeg;base64,"+data+"\">";
            }
        },
        {
            select: 1,
            render: function (data, cell, row) {
                cell.classList.add("col");
                cell.classList.add("s11");
                return data;
            }
        }
    ]
});
