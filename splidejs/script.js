let splideInstance

function initSplide(options) {
    const splideEl = document.getElementById('splideMain')
    splideEl.style.display = 'block'

    if (splideInstance) {
        splideInstance.destroy(true)
    }

    splideInstance = new Splide('#splideMain', options)
    splideInstance.mount()
}

function handleModeChange(mode) {
    const configMap = {
        'switch1Img': {
            type: 'loop',
            perPage: 1,
            autoplay: true,
            interval: 5000,
        },
        'switch3_1Img': {
            type: 'loop',
            perPage: 3,
            perMove: 3,
            autoplay: true,
            interval: 5000,
            breakpoints: {
                768: { perPage: 2 },
                480: { perPage: 1 },
            }
        },
        'switch3_3Img': {
            type: 'loop',
            perPage: 3,
            perMove: 1,
            autoplay: true,
            interval: 5000,
            breakpoints: {
                768: { perPage: 2 },
                480: { perPage: 1 },
            }
        }
    }

    initSplide(configMap[mode])
}

document.addEventListener('DOMContentLoaded', () => {
    const modeRadios = document.querySelectorAll('input[name="mode"]')
    const secondModeRadios = document.querySelectorAll('input[name="secondMode"]')
    const toggledRadiosDiv = document.getElementById('toggledRadios')
    const slideImg = document.getElementsByClassName('slideImg')

    modeRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            if (radio.value === 'switch3Img') {
                toggledRadiosDiv.style.display = 'block'
            } else {
                toggledRadiosDiv.style.display = 'none'
                for (let i of slideImg) {
                    // i.style. objectFit = 'contain'
                }
                handleModeChange(radio.value)
            }
        })
    })

    secondModeRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            handleModeChange(radio.value)
        })
    })

    const defaultRadio = document.querySelector('input[name="mode"]:checked')
    if (defaultRadio) handleModeChange(defaultRadio.value)
})