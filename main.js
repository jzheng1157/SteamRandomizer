
/**
 * @TODO Add game icons
 * npm start
 */

const {app, BrowserWindow, ipcMain} = require('electron');
const { parseBody } = require('got');
const request = require('request');
const prompt = require('prompt-sync')({sigint: true});
const KEY = "523279625823913E265EF06D157E32C4";
const ID = "76561198063759457";

let win = null;
var steamID;
// https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${KEY}&steamid=${STEAMID}&include_appinfo=true&include_played_free_games=true&format=json


function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    })

    win.loadFile("index.html");
}

app.whenReady().then(createWindow);

ipcMain.on("generateRandom", (event, data) => {
    request(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${KEY}&steamid=${data}&include_appinfo=true&include_played_free_games=true&format=json`, 
    {json: true}, (err, res, body) => {
        if (err) {return console.log(err);}
        // console.log('statusCode:', res && res.statusCode);
        // console.log("RESPONSE: " + JSON.stringify(res));
        // console.log("BODY: " + JSON.stringify(body));

        var data = body.response;
        var GAMECOUNT = data.game_count;
        var GAMES = data.games;        
        
        var randomizedGame = GAMES[Math.floor(Math.random() * GAMECOUNT)];
        // var json = JSON.parse();
        console.log(typeof randomizedGame);
        
        win.webContents.send("receiveGame", randomizedGame) // standard way to send data, renderer will listen for the event
    });

});


// function fetchGames(key, steamID) {
//     var returnedGame;
//     request(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${key}&steamid=${steamID}&include_appinfo=true&include_played_free_games=true&format=json`, 
//     {json: true}, (err, res, body) => {
//         if (err) {return console.log(err);}
//         // console.log('statusCode:', res && res.statusCode);
//         // console.log("RESPONSE: " + res);
//         // console.log("BODY: " + JSON.stringify(body));

//         const data = body.response;
//         const GAMECOUNT = data.game_count;
//         const GAMES = data.games;
//         var randomizedGame = GAMES[Math.floor(Math.random() * GAMECOUNT)];
//         returnedGame = randomizedGame;
//     });
//     console.log(returnedGame.name);
// }

// function randomize(data) {
//     const GAMECOUNT = data.game_count;
//     const GAMES = data.games;
//     var randomizedGame = GAMES[Math.floor(Math.random() * GAMECOUNT)];
//     return randomizedGame;
// }