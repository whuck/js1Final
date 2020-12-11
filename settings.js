$(document).ready(function() {
    $("form").submit(saveSettings);
    //see if there are settings already
    var loadedSettings = JSON.parse(localStorage.getItem("settings"));
    if(loadedSettings != null) {
        //if there are settings already, load them
        $("#pname").val(loadedSettings._playerName);
        $("#dname").val(loadedSettings._dealerName);
    }
    function saveSettings() {
        var settings = {};
        //ezmode on?
        settings._easyMode = parseInt($("#dif").val());
        //player / dealer names
        settings._playerName = $("#pname").val();
        settings._dealerName = $("#dname").val();

        //set storage
        localStorage.setItem("settings",JSON.stringify(settings));
    }
});