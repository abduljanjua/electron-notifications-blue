const Notification = require('../notification')

const { ipcRenderer } = require('electron')

ipcRenderer.on('setup', (event, title, options) => {
    console.log(title)
    console.log(options)
    new Notification(title, options)
})