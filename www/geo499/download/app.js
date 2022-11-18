// var urlgeo = "https://geo.soc.cmu.ac.th";
var urlgeo = "http://localhost";
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
        '&client_id=vfue5sa0rvFkqkxQyj3KEjjqhrVrphFQBd2Mf0Nz' +
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
        type: 'value'
    },
    series: []
};

window.addEventListener('resize', myChart.resize);

let showChart = (cat, dat) => {
    chartOption.xAxis = {
        type: 'category',
        data: cat
    }
    chartOption.series = [
        {
            data: dat,
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)'
            }
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
    if (paper_id !== 'null' && paper_id !== null) {
        console.log(paper_id);
        axios.post('./../api/get_detail.php', { paper_id }).then(r => {
            document.getElementById("thesis_title").innerHTML = r.data.data[0].thesis_title;
            document.getElementById("std_name").innerHTML = r.data.data[0].std_name;
            document.getElementById("file_name").innerHTML = r.data.data[0].file_name;
        })
        getHistory();
    } else {
        gotoIndex();
    }
} else {
    gotoLogin();
}

document.getElementById("btndownload").innerHTML = `<button type="button" class="button primary Sarabun" disabled>ดาวน์โหลด</button>`

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



