const { app, Menu, dialog, webContents, MenuItem } = require('electron')
const ffmpeg = require("fluent-ffmpeg")
const ffmpegStatic = require("ffmpeg-static-electron")
const ffprobeStatic = require("ffprobe-static-electron")

ffmpeg.setFfmpegPath(ffmpegStatic.path)
ffmpeg.setFfprobePath(ffprobeStatic.path)
console.log(ffmpegStatic.path)
//check if a Mac OS
const isMac = process.platform === 'darwin'
let sampleVideoFile = ""

const ProgressBar = require('electron-progressbar');

function createProgressBar(){
	//instantiate a new instance of the progress bar
    var progressBar = new ProgressBar({
    indeterminate: false,
    text: 'Preparing data...',
    detail: 'Wait...'
  });
  
  progressBar //events
    .on('completed', function() {
      console.info(`completed...`);
      progressBar.detail = 'Task completed. Exiting...'
      progressBar.close()
    })
    .on('aborted', function(value) {
      console.info(`aborted... ${value}`)
      progressBar.close()
    })
    .on('progress', function(value) {
      progressBar.detail = `Value ${value} out of ${progressBar.getOptions().maxValue}...`;
    });

return progressBar  }


const menuItem1 = new MenuItem({
  label: 'Convert to AVI... ',
  enabled: false,
  click: async () => {
    dialog.showSaveDialog({
      defaultPath: 'c:/',
    }).then((result) => {
      let progressBar = {}
      ffmpeg(sampleVideoFile)
        .toFormat('avi')
        .on('start', () => {
          progressBar = createProgressBar()
        })
        .on('progress', (progress) => {
          console.log(progress)
          if(!progressBar.isCompleted()){
            progressBar.value = Math.round(parseFloat(progress.percent))}
        })
        .on('end', (err) => {
          console.log('File was succesful converted:)')
        })
        .saveToFile(result.filePath + '.avi')
    })
  }
},)
const menuItem2 = new MenuItem({
  label: 'Convert to MKV... ',
  enabled: false,
  click: async () => {
    dialog.showSaveDialog({
      defaultPath: 'c:/',
    }).then((result) => {
      let progressBar = {}
      ffmpeg(sampleVideoFile)
        .toFormat('mkv')
        .on('start', () => {
          progressBar = createProgressBar()
        })
        .on('progress', (progress) => {
          console.log(progress)
          if(!progressBar.isCompleted()){
            progressBar.value = Math.round(parseFloat(progress.percent))}
        })
        .on('end', (err) => {
          console.log('File was succesful converted:)')
        })
        .saveToFile(result.filePath + '.mkv')
    })
  }
},)
const menuItem3 = new MenuItem({
  label: 'Convert to MP4... ',
  enabled: false,
  click: async () => {
    dialog.showSaveDialog({
      defaultPath: 'c:/',
    }).then((result) => {
      let progressBar = {}
      ffmpeg(sampleVideoFile)
        .toFormat('mp4')
        .on('start', () => {
          progressBar = createProgressBar()
        })
        .on('progress', (progress) => {
          console.log(progress)
          if(!progressBar.isCompleted()){
            progressBar.value = Math.round(parseFloat(progress.percent))}
        })
        .on('end', (err) => {
          console.log('File was succesful converted:)')
        })
        .saveToFile(result.filePath + '.mp4')
    })
  }
},)
const menuItem4 = new MenuItem({
  label: 'Convert to OGG... ',
  enabled: false,
  click: async () => {
    dialog.showSaveDialog({
      defaultPath: 'c:/',
    }).then((result) => {
      let progressBar = {}
      ffmpeg(sampleVideoFile)
        .toFormat('ogg')
        .on('start', () => {
          progressBar = createProgressBar()
        })
        .on('progress', (progress) => {
          console.log(progress)
          if(!progressBar.isCompleted()){
            progressBar.value = Math.round(parseFloat(progress.percent))}
        })
        .on('end', (err) => {
          console.log('File was succesful converted:)')
        })
        .saveToFile(result.filePath + '.ogg')
    })
  }
},)
const menuItem5 = new MenuItem({
  label: 'Convert to MPG... ',
  enabled: false,
  click: async () => {
    dialog.showSaveDialog({
      defaultPath: 'c:/',
    }).then((result) => {
      let progressBar = {}
      ffmpeg(sampleVideoFile)
        .toFormat('mpg')
        .on('start', () => {
          progressBar = createProgressBar()
        })
        .on('progress', (progress) => {
          console.log(progress)
          if(!progressBar.isCompleted()){
            progressBar.value = Math.round(parseFloat(progress.percent))}
        })
        .on('end', (err) => {
          console.log('File was succesful converted:)')
        })
        .saveToFile(result.filePath + '.mpg')
    })
  }
},)
const menuItem6 = new MenuItem({
  label: 'Convert to WMV... ',
  enabled: false,
  click: async () => {
    dialog.showSaveDialog({
      defaultPath: 'c:/',
    }).then((result) => {
      let progressBar = {}
      ffmpeg(sampleVideoFile)
        .toFormat('wmv')
        .on('start', () => {
          progressBar = createProgressBar()
        })
        .on('progress', (progress) => {
          console.log(progress)
          if(!progressBar.isCompleted()){
            progressBar.value = Math.round(parseFloat(progress.percent))}
        })
        .on('end', (err) => {
          console.log('File was succesful converted:)')
        })
        .saveToFile(result.filePath + '.wmv')
    })
  }
},)

//create template to use as a menu, an array of objects
const template = [
  // { role: 'appMenu' }
  ...(isMac ? [{
    label: app.name,
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideOthers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  }] : []),
  // { role: 'fileMenu' }
  {
    //adding file extentions 
    label: 'File',
    submenu: [
      {
        label: 'Video', submenu: [{
          label: 'Load', click: async () => {
            dialog.showOpenDialog({
              defaultPath: 'c:/',
              filters: [
                { name: 'Videos', extensions: ['mkv', 'avi', 'mp4', 'ogg', 'mpg', 'wmv'] } //video extensions added
              ],
              properties: ['openFile'],
            })
              .then((result) => {
                webContents.fromId(1).send('videoPath', result.filePaths) //grabs webContent to send a message
                sampleVideoFile = result.filePaths[0]
                enableButtons()
              })
          },
        },
        { type: 'separator' },
          menuItem1, menuItem2, menuItem3, menuItem4, menuItem5, menuItem6
        ]
      },

      // });

      isMac ? { role: 'close' } : { role: 'quit' }
    ]
  },

  // { role: 'windowMenu' },
  {
    //adding checkbox to turn off and on for dev tools
    label: 'Developer',
    submenu: [
      { label: 'Toggle Developer Tools', type: 'checkbox' }

    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click: async () => {
          const { shell } = require('electron')
          await shell.openExternal('https://electronjs.org')
        }
      }
    ]
  }
]

function enableButtons() {
  menuItem1.enabled = true;
  menuItem2.enabled = true;
  menuItem3.enabled = true;
  menuItem4.enabled = true;
  menuItem5.enabled = true;
  menuItem6.enabled = true;
}



//connect menu file to main.js
module.exports = Menu.buildFromTemplate(template)
