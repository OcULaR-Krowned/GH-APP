const {remote, ipcRenderer} = require('electron');
const $ = require('jquery');

document.getElementById('min').addEventListener('click', minWindow);
document.getElementById('max').addEventListener('click', maxWindow);
document.getElementById('exit').addEventListener('click', exitWindow);

function minWindow () {
    var window = remote.BrowserWindow.getFocusedWindow();
    window.minimize();
}

function maxWindow () {
    var window = remote.BrowserWindow.getFocusedWindow();
    if(window.isMaximized()){
        window.unmaximize();
        $("#maxmin").removeClass('fa-compress').addClass('fa-expand');
    }else{
        window.maximize();
        $("#maxmin").removeClass('fa-expand').addClass('fa-compress');
    }
}

function exitWindow () {
    var window = remote.BrowserWindow.getFocusedWindow();
    window.close();
}

const version = document.getElementById('version');
      
      ipcRenderer.send('app_version');
      ipcRenderer.on('app_version', (event, arg) => {
        ipcRenderer.removeAllListeners('app_version');
        version.innerText = 'Version ' + arg.version;
      });


      const notification = document.getElementById('notification');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart-button');ipcRenderer.on('update_available', () => {
  ipcRenderer.removeAllListeners('update_available');
  message.innerText = 'A new update is available. Downloading now...';
  notification.classList.remove('hidden');
});ipcRenderer.on('update_downloaded', () => {
  ipcRenderer.removeAllListeners('update_downloaded');
  message.innerText = 'Update Downloaded. It will be installed on restart. Restart now?';
  restartButton.classList.remove('hidden');
  notification.classList.remove('hidden');
});

function closeNotification() {
    notification.classList.add('hidden');
  }function restartApp() {
    ipcRenderer.send('restart_app');
  }