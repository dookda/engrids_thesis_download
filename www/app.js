let download = (std_id) => {
    location.href = "./download/index.html?paper_id=" + std_id;
}

let loadTable = () => {
    let dtable = $('#table').DataTable({
        ajax: {
            type: "GET",
            url: './api/get_thesis.php',
            // data: { drowning_ampcode: drowning_ampcode },
            dataSrc: 'data'
        },
        columns: [
            { data: 'id' },
            { data: 'std_id' },
            { data: 'std_name' },
            { data: 'thesis_title' },
            {
                data: null,
                render: function (data, type, row, meta) {
                    return `<button type="button" class="btn btn-outline-success" onclick="download('${row.std_id}')"><i class="bi bi-journal-richtext"></i>&nbsp;download</button>`
                }
            }
        ],
        // dom: 'Bfrtip',
        searching: true,
        scrollX: true,
        pageLength: 15
    });

    // dtable.column(1).visible(false);

    dtable.on('search.dt', function () {
        let data = dtable.rows({ search: 'applied' }).data()
        // console.log(data)
    });

}

$(document).ready(function () {
    loadTable()
})
