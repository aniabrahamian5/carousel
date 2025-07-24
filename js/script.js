document.addEventListener('DOMContentLoaded', () => {
    const modeRadios = document.querySelectorAll('input[name="mode"]')
    const secondModeRadios = document.querySelectorAll('input[name="secondMode"]')
    const toggledRadiosDiv = document.getElementById('toggledRadios')

    const slides = document.querySelectorAll('.wrapSlide')
    const prev = document.getElementById('prev')
    const next = document.getElementById('next')
    const dotsContainer = document.getElementById('dotsContainer')

    let currentIndex = 0
    let interval = null
    let currentMode = 'switch1Img'
    let groupSize = 1

    function getResponsiveGroupSize() {
        const width = window.innerWidth
        if (width < 721) return 1
        if (width < 1024) return 2
        return 3
    }

    function fadeOut(element, duration = 0, callback) {
    if (duration === 0) {
        element.style.opacity = 0
        element.style.display = 'none'
        if (callback) callback()
        return
    }

    let opacity = 1
    const interval = 50
    const decrement = interval / duration

    function fade() {
        opacity -= decrement
        if (opacity <= 0) {
            element.style.opacity = 0
            element.style.display = 'none'
            if (callback) callback()
        } else {
            element.style.opacity = opacity
            requestAnimationFrame(fade)
        }
    }

    fade()
}

function fadeIn(element, duration = 600, callback) {
    element.style.opacity = 0
    element.style.display = '' 
    let opacity = 0
    const interval = 50
    const increment = interval / duration

    function fade() {
        opacity += increment
        if (opacity >= 1) {
            element.style.opacity = 1
            if (callback) callback()
        } else {
            element.style.opacity = opacity
            requestAnimationFrame(fade)
        }
    }

    fade()
}


    function updateVisibleSlides() {
    slides.forEach(slide => {
        fadeOut(slide, 0)
        slide.classList.remove('displayable')
    });

    for (let i = 0; i < groupSize; i++) {
        const idx = currentIndex + i
        if (slides[idx]) {
            const slide = slides[idx]
            slide.classList.add('displayable')
            fadeIn(slide, 600)
        }
    }
}

    function updateDots(index) {
        const dots = dotsContainer.querySelectorAll('.dot')
        const activeIndex = Math.floor(index / groupSize)
        dots.forEach(dot => dot.classList.remove('active'))
        if (dots[activeIndex]) dots[activeIndex].classList.add('active')
    }

    function createDots() {
        dotsContainer.innerHTML = ''
        const dotCount = Math.ceil(slides.length / groupSize)
        for (let i = 0; i < dotCount; i++) {
            const dot = document.createElement('div')
            dot.classList.add('dot')
            if (i === 0) dot.classList.add('active')
            dot.addEventListener('click', () => {
                currentIndex = i * groupSize
                updateSliderLayout()
            })
            dotsContainer.appendChild(dot)
        }
    }

    function updateSliderLayout() {
        updateVisibleSlides()
        updateDots(currentIndex)
    }

    function resetSliderState() {
        currentIndex = 0
        createDots()
        updateSliderLayout()
    }

    function nextSlide() {
        currentIndex += groupSize
        if (currentIndex >= slides.length) currentIndex = 0
        updateSliderLayout()
    }

    function prevSlide() {
        currentIndex -= groupSize
        if (currentIndex < 0) currentIndex = Math.max(0, slides.length - groupSize)
        updateSliderLayout()
    }

    function startAutoSlide() {
        if (interval) clearInterval(interval)
        interval = setInterval(nextSlide, 5000)
    }

    function initializeSliderControls(prevFn, nextFn) {
        prev.onclick = prevFn
        next.onclick = nextFn
    }

    function setupSlider() {
        groupSize = 1
        resetSliderState()
        initializeSliderControls(prevSlide, nextSlide)
        startAutoSlide()
    }

    modeRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            currentMode = radio.value
            currentIndex = 0

            if (currentMode === 'switch1Img') {
                toggledRadiosDiv.style.display = 'none'
                setupSlider()
            } else if (currentMode === 'switch3Img') {
                toggledRadiosDiv.style.display = 'block'
            }
        })
    })

    secondModeRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            currentIndex = 0
            groupSize = getResponsiveGroupSize()
            resetSliderState()

            if (radio.value === 'switch3_1Img') {
                initializeSliderControls(
                    () => {
                        currentIndex = (currentIndex - 1 + (slides.length - groupSize + 1)) % (slides.length - groupSize + 1)
                        updateSliderLayout()
                    },
                    () => {
                        currentIndex = (currentIndex + 1) % (slides.length - groupSize + 1)
                        updateSliderLayout()
                    }
                )
            }

            if (radio.value === 'switch3_3Img') {
                initializeSliderControls(prevSlide, nextSlide)
            }
        });
    });

    window.addEventListener('resize', () => {
        if (currentMode === 'switch3Img') {
            const activeRadio = document.querySelector('input[name="secondMode"]:checked');
            if (!activeRadio) return;

            const previousGroupSize = groupSize;
            groupSize = getResponsiveGroupSize();

            if (previousGroupSize !== groupSize) {
                currentIndex = 0;
                resetSliderState();
            }
        }
    });

    setupSlider(); 
});
