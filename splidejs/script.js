let splideInstance;

const configMap = {
    'switch1Img': {
        type: 'loop',       
        perPage: 1,
        autoplay: true,
        interval: 5000,
        speed: 800,         
        easing: 'ease-in-out' 
    },
    'switch3_1Img': {
        type: 'loop',
        perPage: 3,
        perMove: 3,
        autoplay: true,
        interval: 5000,
        speed: 800,
        easing: 'ease-in-out',
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
        speed: 800,
        easing: 'ease-in-out',
        breakpoints: {
            768: { perPage: 2 },
            480: { perPage: 1 },
        }
    }
};

function initializeSplideSlider(options) {
    const splideEl = document.getElementById('splideMain');
    splideEl.style.display = 'block';

    if (splideInstance) {
        splideInstance.destroy(true);
    }

    splideInstance = new Splide('#splideMain', options);
    splideInstance.mount();
}

function toggleSecondModeVisibility(show) {
    const toggledRadiosDiv = document.getElementById('toggledRadios');
    toggledRadiosDiv.style.display = show ? 'block' : 'none';
}

function updateSplideConfigByMode(mode) {
    if (mode === 'switch3Img') {
        toggleSecondModeVisibility(true);
    } else {
        toggleSecondModeVisibility(false);
        initializeSplideSlider(configMap[mode]);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const modeRadios = document.querySelectorAll('input[name="mode"]');
    const secondModeRadios = document.querySelectorAll('input[name="secondMode"]');

    modeRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            updateSplideConfigByMode(radio.value);
        });
    });

    secondModeRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            initializeSplideSlider(configMap[radio.value]);
        });
    });

    const defaultMode = document.querySelector('input[name="mode"]:checked');
    if (defaultMode) {
        updateSplideConfigByMode(defaultMode.value);
        if (defaultMode.value === 'switch3Img') {
            const defaultSecondMode = document.querySelector('input[name="secondMode"]:checked');
            if (defaultSecondMode) {
                initializeSplideSlider(configMap[defaultSecondMode.value]);
            }
        }
    }
});

