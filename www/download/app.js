var url_string = window.location;
var url = new URL(url_string);
var paper_id = url.searchParams.get("paper_id");

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

let updateHistory = (thesis_id) => {
    let data = {
        geo_student_id,
        geo_cmuitaccount,
        geo_firstname_TH,
        geo_lastname_TH,
        geo_organization_name_TH,
        paper_id
    }
    // console.log(data);
    axios.post('./../api/updatehistory.php', data).then(r => console.log(r))
}

let refreshPage = () => {
    location.reload(true);
}

let gotoLogin = () => {
    let url = 'https://oauth.cmu.ac.th/v1/Authorize.aspx?response_type=code' +
        '&client_id=vfue5sa0rvFkqkxQyj3KEjjqhrVrphFQBd2Mf0Nz' +
        '&redirect_uri=http://localhost/login/index.php' +
        '&scope=cmuitaccount.basicinfo' +
        '&state=' + paper_id
    window.location.href = url;
}

let gotoLogout = () => {
    document.cookie = "geo_student_id=; max-age=0; path=/;";
    document.cookie = "geo_cmuitaccount=; max-age=0; path=/;";
    document.cookie = "geo_firstname_TH=; max-age=0; path=/;";
    document.cookie = "geo_lastname_TH=; max-age=0; path=/;";
    document.cookie = "geo_organization_name_TH=; max-age=0; path=/;";
    gotoIndex()
}

let gotoIndex = () => {
    location.href = "./../index.html";
}

if (geo_cmuitaccount) {
    document.getElementById("filename").innerHTML = paper_id

    axios.post('./../api/getdetail.php', { paper_id }).then(r => {
        // console.log(r.data.data);
        // r.data.map(i => console.log(i))
        document.getElementById("thesis_title").innerHTML = r.data.data[0].thesis_title;
        document.getElementById("std_name").innerHTML = r.data.data[0].std_name;
    })

} else {
    gotoLogin();
}

$("#download").click(function () {
    $("#download_data").show();
    $("#history_data").hide();
    $("#warning_data").hide();
})
$("#history").click(function () {
    $("#download_data").hide();
    $("#history_data").show();
    $("#warning_data").hide();
})
$("#warning").click(function () {
    $("#download_data").hide();
    $("#history_data").hide();
    $("#warning_data").show();

})

$("#download_data").show()
$("#history_data").hide()
$("#warning_data").hide()


document.getElementById("btndownload").innerHTML = `<button type="button" class="button primary Sarabun" disabled>ดาวน์โหลด</button>`
function showButton() {
    var chk = document.querySelector('#chk');
    // console.log(chk.checked)
    document.getElementById("btndownload").innerHTML = ""
    if (chk.checked == true) {
        document.getElementById("btndownload").innerHTML = `<button type="button" class="button primary Sarabun" onclick="downloadFile(${paper_id})">ดาวน์โหลด</button>`
    } else {
        document.getElementById("btndownload").innerHTML = `<button type="button" class="button primary Sarabun" disabled>ดาวน์โหลด</button>`
    }
}

function downloadFile(fname) {
    window.location = `./../file/${fname}.zip`;
    updateHistory();
}

