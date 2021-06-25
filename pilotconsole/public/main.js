const { app, BrowserWindow } = require('electron')
require('@electron/remote/main').initialize()

function createWindow() {
    // Define the Pilot Console Window Parameters
    const pilotConsoleWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    })

    // Load Window from React App's Location
    pilotConsoleWindow.loadURL('http://localhost:3000')

}

// Name the Electron Application
app.setName('Pilot Console')

// Create the Pilot Console Browser Window
app.on('ready', createWindow)


// MacOS Event Listeners - Quit when all Windows Are Closed

app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})