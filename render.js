
const ipcRenderer = require("electron").ipcRenderer

function generateRandom() {
    ipcRenderer.send(
        "generateRandom", 
        document.querySelector(".ID").value // send request to event "generateRandom"
    );
}

ipcRenderer.on("receiveGame", (event, data) => {
    const gameTag = document.querySelector("#game")
    gameTag.innerText = data.name

    const timeTag = document.querySelector("#time")
    var floatTime = +(data.playtime_forever)
    // timeTag.innerText = (floatTime/60).toFixed(2).toString() + " hours played"
    timeTag.innerText = JSON.stringify(data);
});