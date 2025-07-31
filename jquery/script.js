$(document).ready(function () {
    const $modeRadios = $('input[name="mode"]')
    const $secondModeRadios = $('input[name="secondMode"]')
    const $toggledRadiosDiv = $('#toggledRadios')

    const $slides = $('.wrapSlide')
    const $prev = $('#prev')
    const $next = $('#next')
    const $dotsContainer = $('#dotsContainer')
    const $wrapMain = $('#wrapMain')

    let currentIndex = 0
    let interval = null
    let currentMode = 'switch1Img'
    let groupSize = 1

    function getResponsiveGroupSize() {
        const width = $(window).width()
        if (width < 600) return 1
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
                $slides.eq(idx).addClass('displayable').fadeIn(600)
            }
        }
    }

    function createDots() {
        $dotsContainer.empty()

        let dotCount
        if (currentMode === 'switch3Img') {
            const val = $('input[name="secondMode"]:checked').val()
            if (val === 'switch3_1Img') {
                dotCount = $slides.length - groupSize + 1
            } else {
                dotCount = Math.ceil($slides.length / groupSize)
            }
        } else {
            dotCount = $slides.length
        }

        for (let i = 0; i < dotCount; i++) {
            const $dot = $('<div>').addClass('dot')
            if (i === 0) $dot.addClass('active')

            $dot.on('click', function () {
                if (currentMode === 'switch3Img') {
                    const val = $('input[name="secondMode"]:checked').val()
                    if (val === 'switch3_1Img') {
                        currentIndex = i
                    } else {
                        currentIndex = i * groupSize
                    }
                } else {
                    currentIndex = i
                }

                updateVisibleSlides()
                updateDots(currentIndex)
            })

            $dotsContainer.append($dot)
        }
    }

    function updateDots(index) {
        const $dots = $dotsContainer.find('.dot')
        let activeIndex

        if (currentMode === 'switch3Img') {
            const val = $('input[name="secondMode"]:checked').val()
            if (val === 'switch3_1Img') {
                activeIndex = index
            } else {
                activeIndex = Math.floor(index / groupSize)
            }
        } else {
            activeIndex = index
        }

        $dots.removeClass('active')
        if ($dots.eq(activeIndex).length) {
            $dots.eq(activeIndex).addClass('active')
        }
    }

    function nextSlide() {
        const val = $('input[name="secondMode"]:checked').val()

        if (currentMode === 'switch3Img' && val === 'switch3_3Img') {
            currentIndex += groupSize
            if (currentIndex >= $slides.length) currentIndex = 0
        } else if (currentMode === 'switch3Img' && val === 'switch3_1Img') {
            currentIndex += 1
            if (currentIndex > $slides.length - groupSize) currentIndex = 0
        } else {
            currentIndex += 1
            if (currentIndex >= $slides.length) currentIndex = 0
        }

        updateVisibleSlides()
        updateDots(currentIndex)
    }

    function prevSlide() {
        const val = $('input[name="secondMode"]:checked').val()

        if (currentMode === 'switch3Img' && val === 'switch3_3Img') {
            currentIndex -= groupSize
            if (currentIndex < 0) {
                currentIndex = $slides.length - ($slides.length % groupSize === 0 ? groupSize : $slides.length % groupSize)
                if (currentIndex === $slides.length) currentIndex = 0
            }
        } else if (currentMode === 'switch3Img' && val === 'switch3_1Img') {
            currentIndex -= 1
            if (currentIndex < 0) currentIndex = $slides.length - groupSize
        } else {
            currentIndex -= 1
            if (currentIndex < 0) currentIndex = $slides.length - 1
        }

        updateVisibleSlides()
        updateDots(currentIndex)
    }

    function startAutoSlide() {
        if (interval) clearInterval(interval)
        interval = setInterval(nextSlide, 5000)
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

            $('#mode2').prop('checked', true)
            $('#mode2').trigger('change')
        }
    }

    function handleSecondaryModeChange() {
        currentIndex = 0
        const val = $(this).val()
        groupSize = getResponsiveGroupSize()

        $wrapMain.removeClass('one-mode three-mode')
        $wrapMain.addClass((val === 'switch3_1Img' || val === 'switch3_3Img') ? 'three-mode' : 'one-mode')

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

        const $activeRadio = $('input[name="secondMode"]:checked')
        if (!$activeRadio.length) return

        const prevGroupSize = groupSize
        groupSize = getResponsiveGroupSize()

        if (prevGroupSize !== groupSize) {
            currentIndex = 0
            createDots()
            updateVisibleSlides()
            updateDots(currentIndex)
        }
    }

    function init() {
        $modeRadios.on('change', handlePrimaryModeChange)
        $secondModeRadios.on('change', handleSecondaryModeChange)
        $(window).on('resize', handleWindowResize)

        setupSlider()
    }

    function setupSlider() {
        groupSize = currentMode === 'switch1Img' ? 1 : getResponsiveGroupSize()

        $wrapMain.removeClass('one-mode three-mode')
        $wrapMain.addClass(currentMode === 'switch1Img' ? 'one-mode' : 'three-mode')

        createDots()
        updateVisibleSlides()
        updateDots(currentIndex)
        bindCustomNav(defaultNav)
        startAutoSlide()
    }

    init()
})
