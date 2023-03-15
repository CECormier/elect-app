const {app, BrowserWindow, ipcMain, Menu} = require('electron')
const mainMenu = require('./menu')

let mainWindow;

app.on('ready',()=>{
    console.log("I am ready!!!");

    //launch our window
    
    const mainWindow = new BrowserWindow({
        webPreferences: {
            //width/height and sizable properties
            nodeIntegration: true, //default => false
            contextIsolation: false, // default => true
            height: 605,
            width: 1000,
            resizable: false
        }
    });
    mainWindow.loadFile('index.html')
})

//custom menu-to test
Menu.setApplicationMenu(mainMenu)



// //executes when the window sends a selected file path
// ipcMain.on('fileSelected', (event, selectedFile)=>{
//     console.log(selectedFile)

    //don't need for phase 1
    // new ExifImage({image : selectedFile }, function(error, exifData){
    //     if(error){
    //         console.log(error)
    //         console.log('Error:' +error.message);
    //     }
    //     else{
    //     console.log(exifData); //Do something with your data!
        
    //     //pulled pieces of data into a new object to send back to the window to display
    //     const exitDataToDisplay = {
    //         cameraMake: exifData.image.Make,
    //         cameraModel: exifData.image.Model,
    //         exposureTime: exifData.exif.ExposureTime,
    //         fNumber: exifData.exif.FNumber
    //     }
    //     //send the display data to the window (renderer)
    //     // mainWindow.webContents.send('photoDataToDisplay', exifDataToDisplay)
    //     event.sender.send('photoDataToDisplay', exifDataToDisplay)
    //     }
    // });
// })
