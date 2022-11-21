
let getCookie = (cname) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

const geo_student_id = getCookie("geo_student_id");
const geo_cmuitaccount = getCookie("geo_cmuitaccount");
const geo_firstname_TH = getCookie("geo_firstname_TH");
const geo_lastname_TH = getCookie("geo_lastname_TH");
const geo_organization_name_TH = getCookie("geo_organization_name_TH");
// console.log(geo_cmuitaccount);

if (geo_cmuitaccount) {
    document.getElementById("profile").innerHTML += `<i class="bi bi-person-circle"></i> <span>${geo_firstname_TH}</span>`
}

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
                    return `<button type="button" class="btn btn-outline-success Sarabun" onclick="download('${row.id}')"><i
                    class="bi bi-download"></i>&nbsp;Download</button>`
                }
            }
        ],
        // dom: 'Bfrtip',
        autoFill: true,
        searching: true,
        scrollX: true,
        columnDefs: [
            { className: 'text-center', targets: [0, 1, 3] },
        ],
        lengthChange: false,//เปิด=true ปิด=false ช่องปรับขนาดการแสดงผล
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

// Add active class to the current button (highlight it)
var header = document.getElementById("nav");
var btns = header.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
        var current = document.getElementsByClassName("active");
        if (current.length > 0) {
            current[0].className = current[0].className.replace(" active", "");
        }
        this.className += " active";
    });
}
