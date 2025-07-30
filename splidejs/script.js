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

    const currentKey = Object.keys(configMap).find(key => configMap[key] === options);
    document.body.setAttribute('data-mode', currentKey);

    splideInstance = new Splide('#splideMain', options);
    splideInstance.mount();
}

function toggleSecondModeVisibility(show) {
    const toggledRadiosDiv = document.getElementById('toggledRadios');
    toggledRadiosDiv.style.display = show ? 'block' : 'none';
}

function autoSelectSecondMode() {
    const firstMode = document.querySelector('input[name="mode"]:checked');
    if (firstMode && firstMode.value === 'switch3Img') {
        toggleSecondModeVisibility(true);

        const firstSecondMode = document.querySelector('input[name="secondMode"]');
        if (firstSecondMode) {
            firstSecondMode.checked = true;
            initializeSplideSlider(configMap[firstSecondMode.value]);
        }
    } else {
        toggleSecondModeVisibility(false);
    }
}

function updateSplideConfigByMode(mode) {
    if (mode === 'switch3Img') {
        autoSelectSecondMode();
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

    autoSelectSecondMode();

    const defaultMode = document.querySelector('input[name="mode"]:checked');
    if (defaultMode && defaultMode.value !== 'switch3Img') {
        initializeSplideSlider(configMap[defaultMode.value]);
    }
});
