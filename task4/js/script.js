const radios = document.querySelectorAll('input[name="mode"]');

radios.forEach(radio => {
    radio.addEventListener('change', () => {
        if (radio.checked) {
            updateMode(radio.value);
        }
    });
});

const checkedRadio = document.querySelector('input[name="mode"]:checked');
if (checkedRadio) {
    updateMode(checkedRadio.value);
}

function updateMode(mode) {
    const task1Carusel = document.getElementById('task1Carusel');
    const task2Gallery = document.getElementById('task2Gallery');
    const task3Gallery = document.getElementById('task3Gallery');
    const prev = document.getElementById('prev');
    const next = document.getElementById('next');

    task1Carusel.style.display = 'none';
    task2Gallery.style.display = 'none';
    task3Gallery.style.display = 'none';

    prev.replaceWith(prev.cloneNode(true));
    next.replaceWith(next.cloneNode(true));
    const newPrev = document.getElementById('prev');
    const newNext = document.getElementById('next');

    function getScrollAmount(scrollContainer, factor = 1) {
        return scrollContainer.querySelector('div').offsetWidth * factor;
    }

    if (mode === 'task1') {
        task1Carusel.style.display = 'block';

        const img = document.getElementsByClassName('carImg');
        let count = 0;

        if (window.task1Interval) clearInterval(window.task1Interval);

        window.task1Interval = setInterval(() => {
            img[count].classList.remove('displayable');
            count = (count + 1) % img.length;
            img[count].classList.add('displayable');
        }, 5000);

        newPrev.addEventListener('click', () => {
            img[count].classList.remove('displayable');
            count = (count - 1 + img.length) % img.length;
            img[count].classList.add('displayable');
        });

        newNext.addEventListener('click', () => {
            img[count].classList.remove('displayable');
            count = (count + 1) % img.length;
            img[count].classList.add('displayable');
        });

    } else if (mode === 'task2') {
        task2Gallery.style.display = 'flex';

        const scroll = task2Gallery;

        newNext.addEventListener('click', () => {
            scroll.style.scrollBehavior = 'smooth';
            scroll.scrollLeft += getScrollAmount(scroll, 1);  
        });

        newPrev.addEventListener('click', () => {
            scroll.style.scrollBehavior = 'smooth';
            scroll.scrollLeft -= getScrollAmount(scroll, 1);
        });

        if (window.task2Interval) clearInterval(window.task2Interval);
        window.task2Interval = setInterval(() => {
            scroll.style.scrollBehavior = 'smooth';
            scroll.scrollLeft += getScrollAmount(scroll, 1);
        }, 5000);

    } else if (mode === 'task3') {
        task3Gallery.style.display = 'flex';

        const scroll = task3Gallery;

        newNext.addEventListener('click', () => {
            scroll.style.scrollBehavior = 'smooth';
            scroll.scrollLeft += getScrollAmount(scroll, 2);  
        });

        newPrev.addEventListener('click', () => {
            scroll.style.scrollBehavior = 'smooth';
            scroll.scrollLeft -= getScrollAmount(scroll, 2);
        });

        if (window.task3Interval) clearInterval(window.task3Interval);
        window.task3Interval = setInterval(() => {
            scroll.style.scrollBehavior = 'smooth';
            scroll.scrollLeft += getScrollAmount(scroll, 2);
        }, 5000);
    }
}
