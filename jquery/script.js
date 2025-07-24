$(document).ready(function () {
    const $modeRadios = $('input[name="mode"]');
    const $secondModeRadios = $('input[name="secondMode"]');
    const $toggledRadiosDiv = $('#toggledRadios');

    const $slides = $('.wrapSlide');
    const $prev = $('#prev');
    const $next = $('#next');
    const $dotsContainer = $('#dotsContainer');

    let currentIndex = 0;
    let interval = null;
    let currentMode = 'switch1Img';
    let groupSize = 1;

    function getResponsiveGroupSize() {
        const width = $(window).width();
        if (width < 721) return 1;
        if (width < 1024) return 2;
        return 3;
    }

    function updateVisibleSlides() {
        $slides.removeClass('displayable');
        for (let i = 0; i < groupSize; i++) {
            const idx = currentIndex + i;
            if ($slides.eq(idx).length) {
                $slides.eq(idx).addClass('displayable');
            }
        }
    }
    
    function createDots() {
        $dotsContainer.empty();
        const dotCount = Math.ceil($slides.length / groupSize);
        for (let i = 0; i < dotCount; i++) {
            const $dot = $('<div>').addClass('dot');
            if (i === 0) $dot.addClass('active');
            $dot.on('click', function () {
                currentIndex = i * groupSize;
                updateVisibleSlides();
                updateDots(currentIndex);
            });
            $dotsContainer.append($dot);
        }
    }

    function updateDots(index) {
        const activeIndex = Math.floor(index / groupSize);
        const $dots = $dotsContainer.find('.dot');
        $dots.removeClass('active');
        if ($dots.eq(activeIndex).length) {
            $dots.eq(activeIndex).addClass('active');
        }
    }

    function nextSlide() {
        currentIndex += groupSize;
        if (currentIndex >= $slides.length) currentIndex = 0;
        updateVisibleSlides();
        updateDots(currentIndex);
    }

    function prevSlide() {
        currentIndex -= groupSize;
        if (currentIndex < 0) currentIndex = Math.max(0, $slides.length - groupSize);
        updateVisibleSlides();
        updateDots(currentIndex);
    }

    function startAutoSlide() {
        if (interval) clearInterval(interval);
        interval = setInterval(nextSlide, 5000);
    }

    function setupSlider() {
        createDots();
        updateVisibleSlides();
        updateDots(currentIndex);
        startAutoSlide();

        $prev.off('click').on('click', prevSlide);
        $next.off('click').on('click', nextSlide);
    }

    $modeRadios.on('change', function () {
        currentMode = $(this).val();
        currentIndex = 0;

        if (currentMode === 'switch1Img') {
            $toggledRadiosDiv.hide();
            groupSize = 1;
            setupSlider();
        } else if (currentMode === 'switch3Img') {
            $toggledRadiosDiv.show();
        }
    });

    $secondModeRadios.on('change', function () {
        currentIndex = 0;
        const val = $(this).val();

        if (val === 'switch3_1Img') {
            groupSize = getResponsiveGroupSize();

            createDots();
            updateVisibleSlides();
            updateDots(currentIndex);

            $prev.off('click').on('click', function () {
                currentIndex = (currentIndex - 1 + ($slides.length - groupSize + 1)) % ($slides.length - groupSize + 1);
                updateVisibleSlides();
                updateDots(currentIndex);
            });

            $next.off('click').on('click', function () {
                currentIndex = (currentIndex + 1) % ($slides.length - groupSize + 1);
                updateVisibleSlides();
                updateDots(currentIndex);
            });
        }

        if (val === 'switch3_3Img') {
            groupSize = getResponsiveGroupSize();

            createDots();
            updateVisibleSlides();
            updateDots(currentIndex);

            $prev.off('click').on('click', prevSlide);
            $next.off('click').on('click', nextSlide);
        }
    });

    $(window).on('resize', function () {
        if (currentMode === 'switch3Img') {
            const $activeRadio = $('input[name="secondMode"]:checked');
            if (!$activeRadio.length) return;

            const previousGroupSize = groupSize;
            groupSize = getResponsiveGroupSize();

            if (previousGroupSize !== groupSize) {
                currentIndex = 0;
                createDots();
                updateVisibleSlides();
                updateDots(currentIndex);
            }
        }
    });

    setupSlider();
});
