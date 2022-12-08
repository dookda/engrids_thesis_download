var urlgeo = "https://geo.soc.cmu.ac.th";
// var urlgeo = "http://localhost";
var url_string = window.location;
var url = new URL(url_string);
var statusMsg = url.searchParams.get("statusMsg");
var status = url.searchParams.get("status");

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
    document.getElementById("profile").innerHTML += `<a class="btn" style="font-size: 20px;" "color: #ffffff" ><i class="bi bi-person-circle"></i> <span>${geo_firstname_TH}</span></a>`
    if (statusMsg == null) {
        document.getElementById("std_name").value = `${geo_firstname_TH} ${geo_lastname_TH}`;
        document.getElementById("std_id").value = `${geo_student_id}`;
    } else {
        document.getElementById("std_name").value = `${geo_firstname_TH} ${geo_lastname_TH}`;
        document.getElementById("std_id").value = `${geo_student_id}`;

        if (status == 'อัพโหลดสำเร็จ') {
            document.getElementById("popup").innerHTML = statusMsg;
            document.getElementById("popupstatus").innerHTML = `<h5 class="modal-title"><i class="bi bi-check-circle-fill"
            style="color: rgb(67, 184, 0); font-size: 24px;"></i>&nbsp;&nbsp;<span style="color: rgb(67, 184, 0); font-size: 24px; font-weight: 400;">${status}</span>
    </h5>;`

            modalUpdate.show();
        } else if (status == 'อัพโหลดไม่สำเร็จ') {
            document.getElementById("popup").innerHTML = statusMsg;
            document.getElementById("popupstatus").innerHTML = `<h5 class="modal-title"><i class="bi bi-x-circle-fill"
                    style="color: rgb(231, 0, 0); font-size: 24px;"></i>&nbsp;&nbsp;<span style="color: rgb(231, 0, 0); font-size: 24px; font-weight: 400;">${status}</span>
            </h5>;`
            modalUpdate.show();
        }
    }

} else {
    gotoLogin();
}

$('.mobile-nav-toggle').on('click', function (e) {
    var content;
    content = `
        <div class="d-flex flex-column " id="memu_mobile">
        <div class="btn-memu" onclick="gotoIndex()"><i class="bi bi-journal-text"></i> <span>รายงานการค้นคว้าวิจัยอิสระ</span></div> <br>
        <div class="btn-memu" onclick="gotoupload()"><i class="bi bi-upload"></i> <span>อัพโหลด</span></div><br>
        <div class="btn-memu" onclick="gotohistory()"><i class="bi bi-clock-history"></i><span>ประวัติ</span></div><br>
        <div class="btn-memu" onclick="gotomain()"><i class="bi bi-house-door"></i> <span>หน้าหลัก</span> </div> <br>
      </div>`
    Swal.fire({
        title: "<h5 style='color:#68553f'>" + 'เมนู' + "</h5>",
        // icon: 'info',
        html: content + '',
        confirmButtonText: 'ปิด',
        confirmButtonColor: '#000000',
        background: '#FDEBD0',
        customClass: {
            container: 'Sarabun',
            title: 'Sarabun',
        },
        showConfirmButton: false,
        // showCloseButton: false,
        // showCancelButton: true,


    })
})


let gotoupload = () => {
    location.href = "./index.html";
}
let gotohistory = () => {
    location.href = "./../history/index.html";
}
let gotomain = () => {
    location.href = "https://geo.soc.cmu.ac.th/";
}





