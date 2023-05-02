const { app, BrowserWindow, ipcMain, session } = require("electron");
const { keysToListen, keypressCallback } = require("./exports/keypress");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: false,
      session: 'partition:lastsession',
    },
  });



  win.loadFile(`interface/index.html`);
  win.setMenu(null);
};

app.whenReady().then(() => {
  createWindow();
  ipcMain.on("keyRegister", (event, targetKeys) => {
    // keysToListen(["A", "s", "d", "1", "2", ",", "'", "/", "\\"]);
    keysToListen(targetKeys)
    keypressCallback(function ({ name, state }) {
      console.log({ name, state });
    });
  });

});




