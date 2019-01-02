const electron = require('electron')

const { remote } = electron

class NotificationView {
    constructor(title, options) {
        this.element = document.getElementById('notification')
        this.iconEl = document.getElementById('icon')
        this.titleEl = document.getElementById('title')
        this.messageEl = document.getElementById('message')
        this.buttonsEl = document.getElementById('buttons')
        this.title = title
        this.options = options
    }

    render() {
        debugger;
        this.titleEl.innerHTML = this.title
        this.iconEl.src = this.options.icon || 'electron.png'

        if (this.options.message) {
            this.messageEl.innerHTML = this.options.message
        } else {
            const parent = this.messageEl.parentElement
            parent.classList.add('onlyTitle')
            parent.removeChild(this.messageEl)
        }

        this.setupButtons()
        this.decorateClasses()
    }

    setupButtons() {
        this.buttons().forEach((actionName, buttonIndex) => {
                debugger;
                console.log(actionName);
                if (actionName == 'Close') {
                    const getNotificationDiv = document.getElementById('notification');
                    const imgIconDiv = document.getElementById('imgIconDiv');
                    const link = document.createElement('a')
                    link.href = '#'
                    link.classList.add("crossIcon");
                    link.innerHTML = '<i class="fa fa-window-close" aria-hidden="true"></i>'
                    link.addEventListener('click', (event) => {
                        const mainWindow = remote.getCurrentWindow()
                        mainWindow.emit('buttonClicked', '<i class="fa fa-window-close" aria-hidden="true"></i>', buttonIndex, this.options)
                    })
                    getNotificationDiv.insertBefore(link, imgIconDiv)
                }
                if (actionName == 'Accept') {
                    const link = document.createElement('a')
                    link.href = '#'
                    link.classList.add("Accept");
                    link.innerHTML = actionName
                    link.addEventListener('click', (event) => {
                        const mainWindow = remote.getCurrentWindow()
                        mainWindow.emit('buttonClicked', event.target.innerHTML, buttonIndex, this.options)
                    })
                    this.buttonsEl.appendChild(link)
                } else if (actionName == 'Reject') {
                    const link = document.createElement('a')
                    link.href = '#'
                    link.classList.add("Reject");
                    link.innerHTML = actionName
                    link.addEventListener('click', (event) => {
                        const mainWindow = remote.getCurrentWindow()
                        mainWindow.emit('buttonClicked', event.target.innerHTML, buttonIndex, this.options)
                    })
                    this.buttonsEl.appendChild(link)
                } else {
                    const link = document.createElement('a')
                    link.href = '#'
                    link.innerHTML = actionName
                    link.addEventListener('click', (event) => {
                        const mainWindow = remote.getCurrentWindow()
                        mainWindow.emit('buttonClicked', event.target.innerHTML, buttonIndex, this.options)
                    })
                    this.buttonsEl.appendChild(link)
                }
            })
            // const getNotificationDiv = document.getElementById('notification');
            // const imgIconDiv = document.getElementById('imgIconDiv');
            // const link = document.createElement('a')
            // link.href = '#'
            // link.classList.add("crossIcon");
            // link.innerHTML = '<i class="fa fa-window-close" aria-hidden="true"></i>'
            // link.addEventListener('click', (event) => {
            //     const mainWindow = remote.getCurrentWindow()
            //     mainWindow.emit('buttonClicked', event.target.innerHTML, buttonIndex, this.options)
            // })
            // getNotificationDiv.insertBefore(link, imgIconDiv)
    }

    decorateClasses() {
        const buttonLength = this.buttons().length

        if (buttonLength > 0) {
            this.element.classList.add('actions')
        }

        if (this.options.vertical) {
            this.element.classList.add('vertical')
        } else {
            this.element.classList.add('horizontal')
        }

        if (buttonLength >= 2) {
            this.element.classList.add('double')
        } else {
            this.element.classList.add('single')
        }

        if (this.options.flat) {
            this.element.classList.add('flat')
            this.iconEl.classList.add('flat')
            this.titleEl.classList.add('flat')
            this.messageEl.classList.add('flat')
            this.buttonsEl.classList.add('flat')
        }
    }

    buttons() {
        return (this.options.buttons || []).slice(0, 2)
    }
}

module.exports = NotificationView