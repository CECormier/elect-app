const {ipcRenderer} = require('electron')

//recieve message from menu, content is data
ipcRenderer.on('videoPath', (event, data)=>{
    const video = document.getElementById('example_video_1')
    video.src = data
})


