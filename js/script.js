document.addEventListener('DOMContentLoaded', () => {
    const modeRadios = document.querySelectorAll('input[name="mode"]');
    const secondModeRadios = document.querySelectorAll('input[name="secondMode"]');
    const toggledRadiosDiv = document.getElementById('toggledRadios');

    const slides = document.querySelectorAll('.wrapSlide');
    const prev = document.getElementById('prev');
    const next = document.getElementById('next');
    const dotsContainer = document.getElementById('dotsContainer');

    let currentIndex = 0;
    let interval = null;
    let currentMode = 'switch1Img';
    let groupSize = 1;

    function getResponsiveGroupSize() {
        const width = window.innerWidth;
        if (width < 721) return 1;
        if (width < 1024) return 2;
        return 3;
    }

    function updateVisibleSlides() {
        slides.forEach(slide => slide.classList.remove('displayable'));
        for (let i = 0; i < groupSize; i++) {
            const idx = currentIndex + i;
            if (slides[idx]) {
                slides[idx].classList.add('displayable');
            }
        }
    }

    function showSlide(index) {
        currentIndex = index;
        updateVisibleSlides();
        updateDots(index);
    }

    function createDots() {
        dotsContainer.innerHTML = '';
        const dotCount = Math.ceil(slides.length / groupSize);
        for (let i = 0; i < dotCount; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                currentIndex = i * groupSize;
                updateVisibleSlides();
                updateDots(currentIndex);
            });
            dotsContainer.appendChild(dot);
        }
    }

    function updateDots(index) {
        const dots = dotsContainer.querySelectorAll('.dot');
        const activeIndex = Math.floor(index / groupSize);
        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[activeIndex]) dots[activeIndex].classList.add('active');
    }

    function nextSlide() {
        currentIndex += groupSize;
        if (currentIndex >= slides.length) currentIndex = 0;
        updateVisibleSlides();
        updateDots(currentIndex);
    }

    function prevSlide() {
        currentIndex -= groupSize;
        if (currentIndex < 0) currentIndex = Math.max(0, slides.length - groupSize);
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

        prev.onclick = prevSlide;
        next.onclick = nextSlide;
    }

    modeRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            currentMode = radio.value;
            currentIndex = 0;

            if (currentMode === 'switch1Img') {
                toggledRadiosDiv.style.display = 'none';
                groupSize = 1;
                setupSlider();
            } else if (currentMode === 'switch3Img') {
                toggledRadiosDiv.style.display = 'block';
            }
        });
    });

    secondModeRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            currentIndex = 0;

            if (radio.value === 'switch3_1Img') {
                groupSize = getResponsiveGroupSize();

                createDots();
                updateVisibleSlides();
                updateDots(currentIndex);

                prev.onclick = () => {
                    currentIndex = (currentIndex - 1 + (slides.length - groupSize + 1)) % (slides.length - groupSize + 1);
                    updateVisibleSlides();
                    updateDots(currentIndex);
                };

                next.onclick = () => {
                    currentIndex = (currentIndex + 1) % (slides.length - groupSize + 1);
                    updateVisibleSlides();
                    updateDots(currentIndex);
                };
            }

            if (radio.value === 'switch3_3Img') {
                groupSize = getResponsiveGroupSize();

                createDots();
                updateVisibleSlides();
                updateDots(currentIndex);

                prev.onclick = prevSlide;
                next.onclick = nextSlide;
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
                createDots();
                updateVisibleSlides();
                updateDots(currentIndex);
            }
        }
    });

    setupSlider();
});
