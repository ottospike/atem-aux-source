const { app, BrowserWindow, ipcMain } = require("electron");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  win.loadFile("./graphics/index.html");
};

app.whenReady().then(() => {
  createWindow();
});
