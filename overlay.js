/* global vars */
var cycleNum = 0;
var timer;
var cookieData = null;

$(function() {
    setupWebsocket();
});

function setupWebsocket()
{
    const ws = new WebSocket("ws://localhost:6969/ws");

    //websocket events
    ws.onopen = function(event) {
        timer = setInterval(() => {
            updateStats();

            if(cycleNum === 5) {
                cycleNum = 0;
                console.log("cycleNum: ", cycleNum)
                return;
            }

            cycleNum++;
            console.log("cycleNum: ", cycleNum)

        }, 15000)
    }

    ws.onclose = function(event) {
        clearInterval(timer);
        console.log("cleared timer")
    }

    ws.onmessage = function(event) {
        console.log(event.data);
        cookieData = JSON.parse(event.data);
        updateStats();
        $("#data").html(event.data);
    };
}

function updateStats() {
    const statsElement = $("#stats");

    if(cookieData == null) return;

    switch(cycleNum) {
        case 0: //bank
            statsElement.html(cookieData.cookies);
            break;
        case 1: //cps
            statsElement.html(`${cookieData.cps}/sec`);
            break;
        case 2: //prestige lv
            statsElement.html(`Prestige Lv:  ${cookieData.prestige_lvl}`);
            break;
        case 3: //sugar lumps
            statsElement.html(`${cookieData.lumps} sugar lumps`);
            break;
        case 4: //clicks
            statsElement.html(`${cookieData.clicks} clicks`);
            break;
        case 5: //clicks
            statsElement.html(`${cookieData.gc_clicks} golden cookies`);
            break;
    }
}
