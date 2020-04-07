const { app, BrowserWindow, ipcMain } = require('electron')
let win;

const { autoUpdater } = require('electron-updater');

function createWindow () {
  win = new BrowserWindow({
    width: 1000,
    height: 800,
    frame: false,
    icon: "APPLICATION/IMAGES/icon.ico",
    minWidth: 1000,
    minHeight: 800,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('APPLICATION/HTML/index.html')

  //win.webContents.openDevTools()

  win.on('closed', () => {
    win = null
  })

  win.once('ready-to-show', () => {
    autoUpdater.checkForUpdatesAndNotify();
  });
}



app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

autoUpdater.on('update-available', () => {
  win.webContents.send('update_available');
});

autoUpdater.on('update-downloaded', () => {
  win.webContents.send('update_downloaded');
});

ipcMain.on('app_version', (event) => {
  event.sender.send('app_version', { version: app.getVersion() });
});

ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall();
});