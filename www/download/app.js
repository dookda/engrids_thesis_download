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