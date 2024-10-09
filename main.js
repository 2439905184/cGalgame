//electron配置
const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        appIcon: "test",
        minWidth: 900,
        minHeight: 700,
        width: 1280,
        height: 768,
        // frame: false,
        // fullscreen: true,
        center: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true
        }
    });

    win.setMenu(null);
    win.loadFile('dist/index.html'); // 这行代码加载 Vue 打包后的文件
}

// console.log(app.getPath('userData'));
app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
