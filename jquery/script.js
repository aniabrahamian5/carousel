$(document).ready(function () {
    const $modeRadios = $('input[name="mode"]')
    const $secondModeRadios = $('input[name="secondMode"]')
    const $toggledRadiosDiv = $('#toggledRadios')

    const $slides = $('.wrapSlide')
    const $prev = $('#prev')
    const $next = $('#next')
    const $dotsContainer = $('#dotsContainer')

    let currentIndex = 0
    let interval = null
    let currentMode = 'switch1Img'
    let groupSize = 1

    function getResponsiveGroupSize() {
        const width = $(window).width()
        if (width < 721) return 1
        if (width < 1024) return 2
        return 3
    }

    function updateVisibleSlides() {
        $slides.each(function () {
            $(this).stop(true, true).fadeOut(0).removeClass('displayable')
        })

        for (let i = 0; i < groupSize; i++) {
            const idx = currentIndex + i
            if ($slides.eq(idx).length) {
                const $slide = $slides.eq(idx)
                $slide.addClass('displayable').fadeIn(600)
            }
        }
    }

    function createDots() {
        $dotsContainer.empty()
        const dotCount = Math.ceil($slides.length / groupSize)
        for (let i = 0; i < dotCount; i++) {
            const $dot = $('<div>').addClass('dot')
            if (i === 0) $dot.addClass('active')
            $dot.on('click', function () {
                currentIndex = i * groupSize
                updateVisibleSlides()
                updateDots(currentIndex)
            })
            $dotsContainer.append($dot)
        }
    }

    function updateDots(index) {
        const activeIndex = Math.floor(index / groupSize)
        const $dots = $dotsContainer.find('.dot')
        $dots.removeClass('active')
        if ($dots.eq(activeIndex).length) {
            $dots.eq(activeIndex).addClass('active')
        }
    }

    function nextSlide() {
        currentIndex += groupSize
        if (currentIndex >= $slides.length) currentIndex = 0
        updateVisibleSlides()
        updateDots(currentIndex)
    }

    function prevSlide() {
        currentIndex -= groupSize
        if (currentIndex < 0) {
            currentIndex = Math.max(0, $slides.length - groupSize)
        }
        updateVisibleSlides()
        updateDots(currentIndex)
    }

    function startAutoSlide() {
        if (interval) clearInterval(interval)
        interval = setInterval(nextSlide, 5000)
    }

    function setupSlider() {
        groupSize = currentMode === 'switch1Img' ? 1 : getResponsiveGroupSize()
        createDots()
        updateVisibleSlides()
        updateDots(currentIndex)
        bindCustomNav(defaultNav)
        startAutoSlide()
    }

    function bindCustomNav(navFunctions) {
        $prev.off('click').on('click', navFunctions.prev)
        $next.off('click').on('click', navFunctions.next)
    }

    const defaultNav = {
        prev: prevSlide,
        next: nextSlide
    }

    const singleSlideNav = {
        prev: function () {
            currentIndex = (currentIndex - 1 + ($slides.length - groupSize + 1)) % ($slides.length - groupSize + 1)
            updateVisibleSlides()
            updateDots(currentIndex)
        },
        next: function () {
            currentIndex = (currentIndex + 1) % ($slides.length - groupSize + 1)
            updateVisibleSlides()
            updateDots(currentIndex)
        }
    }

    function handlePrimaryModeChange() {
        currentMode = $(this).val()
        currentIndex = 0

        if (currentMode === 'switch1Img') {
            $toggledRadiosDiv.hide()
            setupSlider()
        } else if (currentMode === 'switch3Img') {
            $toggledRadiosDiv.show()
        }
    }

    function handleSecondaryModeChange() {
        currentIndex = 0
        const val = $(this).val()
        groupSize = getResponsiveGroupSize()

        createDots()
        updateVisibleSlides()
        updateDots(currentIndex)

        if (val === 'switch3_1Img') {
            bindCustomNav(singleSlideNav)
        } else if (val === 'switch3_3Img') {
            bindCustomNav(defaultNav)
        }
    }

    function handleWindowResize() {
        if (currentMode !== 'switch3Img') return

        const $activeRadio = $('input[name="secondMode"]:checked')
        if (!$activeRadio.length) return

        const previousGroupSize = groupSize
        groupSize = getResponsiveGroupSize()

        if (previousGroupSize !== groupSize) {
            currentIndex = 0
            createDots()
            updateVisibleSlides()
            updateDots(currentIndex)
        }
    }

    function bindEvents() {
        $modeRadios.on('change', handlePrimaryModeChange)
        $secondModeRadios.on('change', handleSecondaryModeChange)
        $(window).on('resize', handleWindowResize)
    }

    function init() {
        bindEvents()
        setupSlider()
    }

    init()
})
