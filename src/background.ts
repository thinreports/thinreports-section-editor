'use strict';

import fs from 'fs';
import os from 'os';
import path from 'path';
import { app, protocol, BrowserWindow, Menu, ipcMain, dialog } from 'electron';
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer';
const isDevelopment = process.env.NODE_ENV !== 'production';

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
]);

function initHandlers (win: BrowserWindow) {
  ipcMain.handle('open-schema-file', () => {
    const filenames = dialog.showOpenDialogSync(win, {
      filters: [{ name: 'Thinreports Layout File', extensions: ['tlf'] }],
      properties: ['openFile'],
      defaultPath: os.homedir()
    });

    if (!filenames) return;

    const filename = filenames[0];
    const schema = fs.readFileSync(filename, { encoding: 'utf-8' });

    return { schema, filename };
  });

  ipcMain.handle('save-schema-file', (_e, schema: string, filename: string) => {
    fs.writeFileSync(filename, schema, { encoding: 'utf-8' });
  });

  ipcMain.handle('save-schema-file-as', (_e, schema: string, filename?: string) => {
    const defaultPath = filename || path.join(os.homedir(), 'template.tlf');
    const newFilename = dialog.showSaveDialogSync(win, {
      filters: [{ name: 'Thinreports Layout File', extensions: ['tlf'] }],
      defaultPath
    });

    if (!newFilename) return;

    fs.writeFileSync(newFilename, schema, { encoding: 'utf-8' });

    return newFilename;
  });
}

async function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1500,
    height: 1000,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  initHandlers(win);

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    // Load the index.html when not in development
    // eslint-disable-next-line n/no-path-concat
    win.loadURL(`file://${__dirname}/index.html`);
  }

  if (!isDevelopment) {
    Menu.setApplicationMenu(null);
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS);
    } catch (e) {
      if (e instanceof Error) {
        console.error('Vue Devtools failed to install:', e.toString());
      }
    }
  }
  createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit();
      }
    });
  } else {
    process.on('SIGTERM', () => {
      app.quit();
    });
  }
}
