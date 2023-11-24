const
    coreContainer = document.getElementById('coreContainer'),
    coreContainerBackgroundImg = document.querySelector('#coreContainerBackground img')




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
    deviceDimensions.currentOrientation = screen.orientation.type
    deviceDimensions.currentOrientationAngle = screen.orientation.angle
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
    updateDeviceOrientation()

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

    console.log(coreContainer)
    if (deviceDimensions.currentOrientation === 'landscape-primary') {
        coreContainer.innerText = JSON.parse(deviceDimensions.h)
        coreContainer.innerText = 'Device is ' + JSON.parse(deviceDimensions.h) + 'px wide in Landscape\nTurn device upright for 2D\nDevice is ready for VR and AR'
        coreContainer.classList.remove('device-orientation-portrait')
        coreContainer.classList.add('device-orientation-landscape')
        coreContainerBackgroundImg.style.maxWidth = '50%'
        coreContainerBackgroundImg.style.maxHeight = '50%'
        
    } else {
        coreContainer.innerText = 'Device is ' + JSON.parse(deviceDimensions.w) + 'px wide in Portrait\nCurrently experiencing oLabs in 2D\nTurn device sideways to enter VR or AR'
        coreContainer.classList.remove('device-orientation-landscape')
        coreContainer.classList.add('device-orientation-portrait')
        coreContainerBackgroundImg.style.maxWidth = '80%'
        coreContainerBackgroundImg.style.maxHeight = '80%'
    }

}