var urlgeo = "https://geo.soc.cmu.ac.th";
// var urlgeo = "http://localhost";
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

console.log(geo_cmuitaccount);

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
        '&client_id=a1nEmhC5FcYnuQbq0EGH96bHqUsZrJfDepQGQj7n' +
        '&redirect_uri=' + urlgeo + '/geo499/login/index.php' +
        '&scope=cmuitaccount.basicinfo' +
        '&state=' + paper_id
    console.log(oatthurl);
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

let downloadFile = (file_name) => {

    window.open(`./../files/${file_name}`, '_blank');
    updateHistory();
}

let showButton = () => {
    var chk = document.querySelector('#chk');
    let file_name = document.getElementById("file_name").innerText;
    console.log(file_name);
    document.getElementById("btndownload").innerHTML = "";
    if (chk.checked == true) {
        document.getElementById("btndownload").innerHTML = `<button type="button" class="button primary Sarabun" onclick="downloadFile('${file_name}')">ดาวน์โหลด</button>`
    } else {
        document.getElementById("btndownload").innerHTML = `<button type="button" class="button primary Sarabun" disabled>ดาวน์โหลด</button>`
    }
}

var dom = document.getElementById('chart-container');
var myChart = echarts.init(dom, null, {
    renderer: 'canvas',
    useDirtyRect: false
});

var chartOption = {
    xAxis: {},
    yAxis: {
        type: 'value',
        axisLabel: {
            show: true,
            fontFamily: "Sarabun",
            fontSize: 14
        }
    },
    series: []
};

window.addEventListener('resize', myChart.resize);

let showChart = (cat, dat) => {
    chartOption.xAxis = {
        type: 'category',
        data: cat,
        axisLabel: {
            show: true,
            fontFamily: "Sarabun",
            fontSize: 14
        }
    }
    chartOption.series = [
        {
            data: dat,
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)'
            },
            color: [
                '#1F4690',
            ],

        }
    ]
    if (chartOption && typeof chartOption === 'object') {
        myChart.setOption(chartOption);
    }
}

let getHistory = () => {
    let data = {
        geo_cmuitaccount
    }
    axios.post('./../api/get_history.php', data).then(r => {
        let dat = r.data.data.map(i => Number(i.count));
        let cat = r.data.data.map(i => i.dt);
        showChart(cat, dat);
    })
}

if (geo_cmuitaccount) {
    document.getElementById("profile").innerHTML += `<a class="btn" style="font-size: 20px;" ><i class="bi bi-person-circle"></i> <span>${geo_firstname_TH}</span></a>`
    getHistory();
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
    location.href = "./../upload/index.html";
}
let gotohistory = () => {
    location.href = "./index.html";
}
let gotomain = () => {
    location.href = "https://geo.soc.cmu.ac.th/";
}



