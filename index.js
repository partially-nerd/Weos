const { app, BrowserWindow } = require("electron");
function createWindow() {
    let win = new BrowserWindow({
        width: 800, height: 600,
        frame: 0,
        webPreferences: {
            nodeIntegration: true,
            webviewTag: true,
        }
    });
    win.loadFile("index.html");
}
app.on("ready", createWindow);