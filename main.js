// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const fetch = require('electron-fetch').default

// Move this to .env (or similar...)
const API_URL = "https://wom22-notes.azurewebsites.net"

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    autoHideMenuBar: true // true to hide, press Alt to show when hidden
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open DevTools automatically (comment out if you don't want it)
  mainWindow.webContents.openDevTools()

}

// Called when Electron is ready to create browser windows.
app.whenReady().then(() => {
  createWindow()

  // Check original template for MacOS stuff!
})

ipcMain.handle('get-notes', async () => {
  console.log('get-notes (main)')
  try {
    const resp = await fetch(API_URL + '/notes', {
      timeout: 2000
    })
    const notes = await resp.json()
    return notes

  } catch (error) {
    console.log(error.message)
    return false
  }

})

ipcMain.handle('notes-login', async (event, data) => {
  console.log('notes-login (main)')
  try {
    const resp = await fetch(API_URL + '/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "email": "john.doe@arcada.fi",
        "password": "Password123"
      }),
      timeout: 2000
    })
    const notes = await resp.json()
    return notes

  } catch (error) {
    console.log(error.message)
    return false
  }

})

/*
// Example functions for communication between main and renderer (backend/frontend)
// Node skickar kommentar till browsern (renderer.js):
ipcMain.handle('get-stuff-from-main', () => 'Stuff from main!')

// Browsern skickar kommentar till node (main.js)
ipcMain.handle('send-stuff-to-main', async (event, data) => console.log(data))

// click handler
ipcMain.handle('btn-click', async () => {
  console.log('button click received in main!')
})

*/

app.on('window-all-closed', () => {
  app.quit()
  // Check original template for MacOS stuff!
})


