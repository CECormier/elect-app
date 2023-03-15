const ffmpeg = require('fluent-ffmpeg')//functions to call do to ffmpeg stuff
const ffmpeg_static = require('ffmpeg-static')//ffmpeg software in our project
// const ffprobe_static = require('ffprobe-static')//ffmprobe software in our project

//tell fluent ffmpeg where our software is
ffmpeg.setFfmpegPath(ffmpeg_static)
// ffmpeg.setFfprobePath(ffprobe_static.path)

//target and load a specified video file

const sampleVideoFile = __dirname + '/sample-11s.mkv'
console.log(sampleVideoFile)

//ask ffmpeg to convert it to a different

ffmpeg(sampleVideoFile)
    .toFormat('avi')
    .on('progress', (progress) => {
        console.log(progress)
    })
    .on('end', (err) => {
        console.log('File was succesful converted:)')
    })
    .saveToFile(__dirname + '/newfile.avi')