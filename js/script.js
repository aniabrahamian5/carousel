document.addEventListener('DOMContentLoaded', () => {
    const modeRadios = document.querySelectorAll('input[name="mode"]')
    const secondModeRadios = document.querySelectorAll('input[name="secondMode"]')
    const toggledRadiosDiv = document.getElementById('toggledRadios')

    const slides = document.querySelectorAll('.wrapSlide')
    const prev = document.getElementById('prev')
    const next = document.getElementById('next')
    const dotsContainer = document.getElementById('dotsContainer')
    const wrapMain = document.getElementById('wrapMain')

    let currentIndex = 0
    let interval = null
    let currentMode = 'switch1Img'
    let groupSize = 1

    function getResponsiveGroupSize() {
        const width = window.innerWidth
        if (width < 600) return 1
        if (width < 1024) return 2
        return 3
    }

    function updateVisibleSlides() {
        slides.forEach(slide => {
            slide.style.display = 'none'
            slide.classList.remove('displayable')
        })

        for (let i = 0; i < groupSize; i++) {
            const idx = currentIndex + i
            if (slides[idx]) {
                slides[idx].style.display = ''
                slides[idx].classList.add('displayable')
            }
        }
    }

    function createDots() {
        dotsContainer.innerHTML = ''

        let dotCount
        if (currentMode === 'switch3Img') {
            const val = document.querySelector('input[name="secondMode"]:checked')?.value
            if (val === 'switch3_1Img') {
                dotCount = slides.length - groupSize + 1
            } else {
                dotCount = Math.ceil(slides.length / groupSize)
            }
        } else {
            dotCount = slides.length
        }

        for (let i = 0; i < dotCount; i++) {
            const dot = document.createElement('div')
            dot.className = 'dot'
            if (i === 0) dot.classList.add('active')

            dot.addEventListener('click', () => {
                currentIndex = i
                updateVisibleSlides()
                updateDots(currentIndex)
            })

            dotsContainer.appendChild(dot)
        }
    }

    function updateDots(index) {
        const dots = dotsContainer.querySelectorAll('.dot')
        let activeIndex

        if (currentMode === 'switch3Img') {
            const val = document.querySelector('input[name="secondMode"]:checked')?.value
            if (val === 'switch3_1Img') {
                activeIndex = index
            } else {
                activeIndex = Math.floor(index / groupSize)
            }
        } else {
            activeIndex = index
        }

        dots.forEach(dot => dot.classList.remove('active'))
        if (dots[activeIndex]) dots[activeIndex].classList.add('active')
    }

    function nextSlide() {
    const val = document.querySelector('input[name="secondMode"]:checked')?.value

    if (currentMode === 'switch3Img' && val === 'switch3_3Img') {
        currentIndex += groupSize
        if (currentIndex >= slides.length) currentIndex = 0
    } else if (currentMode === 'switch3Img' && val === 'switch3_1Img') {
        currentIndex += 1
        if (currentIndex > slides.length - groupSize) currentIndex = 0
    } else {
        currentIndex += 1
        if (currentIndex >= slides.length) currentIndex = 0
    }

    updateVisibleSlides()
    updateDots(currentIndex)
}

function prevSlide() {
    const val = document.querySelector('input[name="secondMode"]:checked')?.value

    if (currentMode === 'switch3Img' && val === 'switch3_3Img') {
        currentIndex -= groupSize
        if (currentIndex < 0) {
            currentIndex = slides.length - (slides.length % groupSize === 0 ? groupSize : slides.length % groupSize)
            if (currentIndex === slides.length) currentIndex = 0
        }
    } else if (currentMode === 'switch3Img' && val === 'switch3_1Img') {
        currentIndex -= 1
        if (currentIndex < 0) currentIndex = slides.length - groupSize
    } else {
        currentIndex -= 1
        if (currentIndex < 0) currentIndex = slides.length - 1
    }

    updateVisibleSlides()
    updateDots(currentIndex)
}


    function startAutoSlide() {
        if (interval) clearInterval(interval)
        interval = setInterval(nextSlide, 5000)
    }

    function bindCustomNav({ prevFn, nextFn }) {
        prev.onclick = prevFn
        next.onclick = nextFn
    }

    function setupSlider() {
        groupSize = currentMode === 'switch1Img' ? 1 : getResponsiveGroupSize

        wrapMain.classList.remove('one-mode', 'three-mode')
        wrapMain.classList.add(currentMode === 'switch1Img' ? 'one-mode' : 'three-mode')

        createDots()
        updateVisibleSlides()
        updateDots(currentIndex)
        bindCustomNav(defaultNav)
        startAutoSlide()
    }

    const defaultNav = {
        prevFn: prevSlide,
        nextFn: nextSlide
    }

    const singleSlideNav = {
        prevFn: () => {
            currentIndex = (currentIndex - 1 + (slides.length - groupSize + 1)) % (slides.length - groupSize + 1)
            updateVisibleSlides()
            updateDots(currentIndex)
        },
        nextFn: () => {
            currentIndex = (currentIndex + 1) % (slides.length - groupSize + 1)
            updateVisibleSlides()
            updateDots(currentIndex)
        }
    }

    function handlePrimaryModeChange(e) {
        currentMode = e.target.value
        currentIndex = 0

        if (currentMode === 'switch1Img') {
            toggledRadiosDiv.style.display = 'none'
            setupSlider()
        } else if (currentMode === 'switch3Img') {
            toggledRadiosDiv.style.display = 'block'

            const mode2 = document.getElementById('mode2')
            if (mode2) {
                mode2.checked = true
                mode2.dispatchEvent(new Event('change'))
            }
        }
    }

    function handleSecondaryModeChange(e) {
    currentIndex = 0
    const val = e.target.value

    if (val === 'switch3_1Img') {
        groupSize = getResponsiveGroupSize() 
    } else {
        groupSize = getResponsiveGroupSize()
    }

    wrapMain.classList.remove('one-mode', 'three-mode')
    wrapMain.classList.add((val === 'switch3_1Img' || val === 'switch3_3Img') ? 'three-mode' : 'one-mode')

    createDots()
    updateVisibleSlides()
    updateDots(currentIndex)

    if (val === 'switch3_1Img') {
        bindCustomNav(defaultNav) 
    } else if (val === 'switch3_3Img') {
        bindCustomNav(defaultNav)
    }
}


    function handleWindowResize() {
        if (currentMode !== 'switch3Img') return

        const activeRadio = document.querySelector('input[name="secondMode"]:checked')
        if (!activeRadio) return

        const prevGroupSize = groupSize
        groupSize = getResponsiveGroupSize()

        if (prevGroupSize !== groupSize) {
            currentIndex = 0
            createDots()
            updateVisibleSlides()
            updateDots(currentIndex)
        }
    }

    modeRadios.forEach(r => r.addEventListener('change', handlePrimaryModeChange))
    secondModeRadios.forEach(r => r.addEventListener('change', handleSecondaryModeChange))
    window.addEventListener('resize', handleWindowResize)

    setupSlider()
})
