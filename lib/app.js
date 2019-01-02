const Notification = require('../notification')

const { ipcRenderer } = require('electron')

ipcRenderer.on('setup', (event, title, options) => {
    debugger;
    console.log(options)
    new Notification(title, options)
})