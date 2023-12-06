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

    if (deviceDimensions.currentOrientation === 'landscape-primary') {
        // coreContainer.innerText = JSON.parse(deviceDimensions.h)
        // coreContainer.innerText = 'Device is ' + JSON.parse(deviceDimensions.h) + 'px wide in Landscape\nTurn device upright for 2D\nDevice is ready for VR and AR'
        coreContainer.classList.remove('device-orientation-portrait')
        coreContainer.classList.add('device-orientation-landscape')
        coreContainerBackgroundImg.style.maxWidth = '50%'
        coreContainerBackgroundImg.style.maxHeight = '50%'
        
    } else {
        // coreContainer.innerText = 'Device is ' + JSON.parse(deviceDimensions.w) + 'px wide in Portrait\nCurrently experiencing oLabs in 2D\nTurn device sideways to enter VR or AR'
        coreContainer.classList.remove('device-orientation-landscape')
        coreContainer.classList.add('device-orientation-portrait')
        coreContainerBackgroundImg.style.maxWidth = '50%'
        coreContainerBackgroundImg.style.maxHeight = '50%'
    }

}



// Main Menu TEMP

const
    mainMenuItems = document.querySelectorAll('.menu-item'),
    openMenuButton = document.querySelector('.open-menu'),
    closeMenuButton = document.querySelector('.close-menu'),
    pageMenu = document.getElementById('pageMenu'),
    pageNavItems = document.querySelectorAll('.page-menu-item')




openMenuButton.addEventListener('click', openMenu)

closeMenuButton.addEventListener('click', resetMenu)


mainMenuItems.forEach(menuItem => {
    const
        menuProjects = [
            {
                title: "Projects",
                menu_directory: [
                    {
                        page: "WideSpread",
                        route: "#projects-widespread"
                    },
                    {
                        page: "SpreadShield",
                        route: "#projects-spreadshield"
                    },
                    {
                        page: "FlexFloor",
                        route: "#projects-flexfloor"
                    }
                ]
            },
            {
                title: "Testing",
                menu_directory: [
                    {
                        page: "Home",
                        route: "#testing-widespread"
                    },
                    {
                        page: "SpreadShield Tests",
                        route: "#testing-spreadshield"
                    },
                    {
                        page: "FlexFloor Tests",
                        route: "#testing-flexfloor"
                    }
                ]
            },
            {
                title: "Home",
                menu_directory: [
                    {
                        page: "Home",
                        route: "#network-folder-root"
                    },
                    {
                        page: "Favorites",
                        route: "#network-folder-favorites"
                    }
                ]
            },
            {
                title: "Database",
                menu_directory: [
                    {
                        page: "Home",
                        route: "#database"
                    }
                ]
            }
    
        ]
    
    menuItem.addEventListener('click', e => {
        mainMenuItems.forEach(resetMenuItem => {
            resetMenuItem.classList.remove('current-menu-item')
        })

        const
            menuPageName = menuItem.querySelector('a').getAttribute('data-menu')
        
        switch (menuPageName) {
            case menuProjects[0].title:
                updatePageMenu(menuItem, menuProjects[0])
                break;
                case menuProjects[1].title:
                    updatePageMenu(menuItem, menuProjects[1])
                break;
                case menuProjects[2].title:
                    updatePageMenu(menuItem, menuProjects[2])
                break;
                case menuProjects[3].title:
                    updatePageMenu(menuItem, menuProjects[3])
                break;
            default:
                console.log('Not a Page...')

            // code block
        }

        
    })
})


function openMenu() {
    closeMenuButton.parentElement.classList.add('menu-is-open')
}

function resetMenu() {
    mainMenuItems.forEach(resetMenuItem => {
        resetMenuItem.classList.remove('current-menu-item')
        closeMenuButton.classList.remove('menu-is-open')
        pageMenu.style.top = '100%'
    })
    document.querySelector('.page-menu-data').remove()
}

function updatePageMenu(link, page) {
    pageMenu.style.top = 0

    let
        pageMenuData = document.createElement('div'),
        pageMenuTitle = document.createElement('div'),
        pageMenuDirectory = document.createElement('div')
        
    const oldNavPage = document.querySelector('.page-menu-data')
        if (oldNavPage) {
            oldNavPage.remove()
        }
        
        if (pageMenu.children.length < 1) {
            pageMenuData.classList.add('page-menu-data')
            pageMenuTitle.classList.add('page-menu-title')
            pageMenuDirectory.classList.add('page-menu-directory')

            pageMenuTitle.textContent = page.title

            page.menu_directory.forEach(menuItem => {
                const
                    pageMenuItem = document.createElement('div'),
                    pageMenuItemLink = document.createElement('a')

                pageMenuItem.classList.add('page-menu-item')
                pageMenuItemLink.textContent = menuItem.page
                pageMenuItemLink.setAttribute('href', menuItem.route)

                pageMenuItem.appendChild(pageMenuItemLink)
                pageMenuDirectory.appendChild(pageMenuItem)

                pageMenuItemLink.addEventListener('click', e => {
                    pageMenu.style.top = '100%'
                })
            })

            pageMenuData.appendChild(pageMenuTitle)
            pageMenuData.appendChild(pageMenuDirectory)

            pageMenu.appendChild(pageMenuData)

            link.classList.add('current-menu-item')
        }
}


pageNavItems.forEach(navItem => {
    const navLink = navItem.querySelector('a')
    navLink.addEventListener('click', e => {
        e.preventDefault()
        console.log(e.target)
    })
})




// Switch Fonts

const
    switchReadablityButtons = document.querySelectorAll('.switch-readablity-button')

switchReadablityButtons.forEach(switchReadablityButton => {
    switchReadablityButton.addEventListener('click', e => {
        let
            elementToSwitch = switchReadablityButton.parentElement.parentElement,
            elementToSwitchCurrentState = elementToSwitch.dataset.font,
            allParas = elementToSwitch.querySelectorAll('.page-subsection-body p')

        console.log(elementToSwitchCurrentState)
        if (elementToSwitchCurrentState === 'Readable') {
            elementToSwitch.dataset.font = 'Readable2'
            
            allParas.forEach(para => {
                para.style.fontFamily = 'Readable2'
                para.style.fontSize = '1.5rem'
                console.log(para)
            })
        } else {
            elementToSwitch.dataset.font = 'Readable'
            allParas.forEach(para => {
                para.style.fontFamily = 'Readable'
                para.style.fontSize = '1rem'
                console.log(para)
            })
        }
    })
})