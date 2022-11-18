// var urlgeo = "https://geo.soc.cmu.ac.th";
var urlgeo = "http://localhost";
var url_string = window.location;
var url = new URL(url_string);
var statusMsg = url.searchParams.get("statusMsg");

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
    axios.post('./../api/set_history.php', data).then(r => console.log(r))
}

let refreshPage = () => {
    location.reload(true);
}

let gotoLogin = () => {
    let oatthurl = 'https://oauth.cmu.ac.th/v1/Authorize.aspx?response_type=code' +
        '&client_id=vfue5sa0rvFkqkxQyj3KEjjqhrVrphFQBd2Mf0Nz' +
        '&redirect_uri=' + urlgeo + '/geo499/login/index.php' +
        '&scope=cmuitaccount.basicinfo' +
        '&state=null'
    window.location.href = oatthurl;
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

let downloadFile = (fname) => {
    window.location = `./../file/${fname}.zip`;
    updateHistory();
}

let modalUpdate = new bootstrap.Modal(document.getElementById('modalupdate'), {
    keyboard: false
})

const closeModal = () => {
    modal.hide();
}

const closeModalUpdate = () => {
    modalUpdate.hide();
}

if (geo_cmuitaccount) {
    if (statusMsg == null) {
        document.getElementById("std_name").value = `${geo_firstname_TH} ${geo_lastname_TH}`;
        document.getElementById("std_id").value = `${geo_student_id}`;
    } else {
        document.getElementById("std_name").value = `${geo_firstname_TH} ${geo_lastname_TH}`;
        document.getElementById("std_id").value = `${geo_student_id}`;
        document.getElementById("popup").innerHTML = statusMsg;
        modalUpdate.show();
    }

} else {
    gotoLogin();
}





