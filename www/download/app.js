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
    document.cookie = "open_code=; max-age=0; path=/;";
    document.cookie = "open_firstname_TH=; max-age=0; path=/;";
    document.cookie = "open_lastname_TH=; max-age=0; path=/;";
    document.cookie = "open_student_id=; max-age=0; path=/;";
    document.cookie = "open_organization_name_TH=; max-age=0; path=/;";
    gotoIndex()
}

let gotoIndex = () => {
    location.href = "./index.html";
}

if (geo_cmuitaccount) {
    // console.log(paper_id);
    document.getElementById("filename").innerHTML = paper_id
    // document.getElementById("profile").innerHTML += ` <li class=" dropdown" > <a class="active" href="#" onclick="gotoProfile()"> <i class="bx bxs-user-detail"></i> <span class="ff-noto">${firstname_TH}</span> <i class="bi bi-chevron-down"> </i> </a> 
    //     <ul>
    //         <li><a href="#"><span class="ff-noto">โปรไฟล์</span> </a></li>
    //         <li><a href="./../manage/index.html"><span class="ff-noto">การจัดการข้อมูล</span></a></li>
    //     </ul>
    // </li>`
    // document.getElementById("login").innerHTML += (`<a href="#" onclick="gotoLogout()"><i class="bx bx-log-out"></i><span class="ff-noto">ออกจากระบบ</span></a>`)

} else {
    // document.getElementById("login").innerHTML += `<a href="#" onclick="gotoLogin()"><i class="bx bx-exit"></i><span class="ff-noto">เข้าสู่ระบบ</span></a>`;
    gotoLogin();
    console.log("not login");

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
        document.getElementById("btndownload").innerHTML = `<button type="button" class="button primary Sarabun">ดาวน์โหลด</button>`
    } else {
        document.getElementById("btndownload").innerHTML = `<button type="button" class="button primary Sarabun" disabled>ดาวน์โหลด</button>`
    }
}