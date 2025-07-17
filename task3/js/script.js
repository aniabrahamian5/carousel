const scroll = document.querySelector('.gallery');
const prev = document.getElementById('prev');
const next = document.getElementById('next');

function getScrollAmount() {
    return scroll.offsetWidth;
}

function scrollNext() {
    scroll.scrollLeft += getScrollAmount();

    if (scroll.scrollLeft + scroll.offsetWidth >= scroll.scrollWidth - 5) {
        scroll.scrollLeft = 0;
    }
}

function scrollPrev() {
    scroll.scrollLeft -= getScrollAmount();

    if (scroll.scrollLeft <= 0) {
        scroll.scrollLeft = scroll.scrollWidth;
    }
}

next.addEventListener('click', scrollNext);
prev.addEventListener('click', scrollPrev);

setInterval(scrollNext, 5000);
