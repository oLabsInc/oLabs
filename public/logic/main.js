const
    coreContainer = document.getElementById('coreContainer')




let
    deviceDimensions = {}



window.addEventListener("load", (event) => {
    // console.log("page is fully loaded")
    // console.log('coreContainer:\n\n', coreContainer)
    getDeviceDetails()
})


function getDeviceDetails() {
    const ua = navigator.userAgent
    // console.log(ua)

    deviceDimensions.w = window.screen.width
    deviceDimensions.h = window.screen.height
    deviceDimensions.availW = window.screen.availWidth
    deviceDimensions.availH = window.screen.availHeight
    deviceDimensions.isExtended = window.screen.isExtended
    // RESPONSE FROM LAPTOP: Mozilla/5.0 (Linux; Android 8.0.0; SM-G955U Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36 Edg/119.0.0.0



    // DISPLAY ORIENTATION DETECTION

    screen.orientation.addEventListener("change", (e) => {
        const
            type = e.target.type,
            angle = e.target.angle
        
        updateDeviceOrientation(type, angle)
        // console.log(`ScreenOrientation change: ${type}, ${angle} degrees.`)
    })


    // MULTIPLE DISPLAY DETECTION

    if (deviceDimensions.isExtended === true) {
        // Create multi-screen window layout
        console.log('MULTIPLE DISPLAYS DETECTED')
    } else {
        // Create single-screen window layout
        // console.log('ONLY 1 DISPLAY DETECTED')
    }



    init()
    // const userMediaDevs = navigator.mediaDevices.getDisplayMedia()
}

function init() {


    // GET USER CAMERAS/MICROPHONES/SPEAKERS
    navigator.mediaDevices.enumerateDevices().then(function (devices) {
        for (var i = 0; i < devices.length; i++) {
            var device = devices[i]
            if (device.kind === 'videoinput') {
                var option = document.createElement('option')
                option.value = device.deviceId
                option.text = device.label || 'camera ' + (i + 1)
            }
        }
    })
}


function updateDeviceOrientation(type, angle) {
    deviceDimensions.currentOrientation = type
    deviceDimensions.currentOrientationAngle = angle
    // console.log(deviceDimensions)


}