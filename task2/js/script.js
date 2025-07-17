const scroll = document.querySelector('.gallery');
const prev = document.getElementById('prev');
const next = document.getElementById('next');

function getScrollAmount() {
    if (window.innerWidth <= 480) return scroll.offsetWidth; 
    if (window.innerWidth <= 768) return scroll.offsetWidth / 2; 
    return scroll.offsetWidth / 3; 
}

next.addEventListener('click', () => {
    scroll.scrollLeft += getScrollAmount();

    if (scroll.scrollLeft + scroll.offsetWidth >= scroll.scrollWidth - 10) {
        scroll.scrollLeft = 0;
    }
});

prev.addEventListener('click', () => {
    scroll.scrollLeft -= getScrollAmount();

    if (scroll.scrollLeft <= 0) {
        scroll.scrollLeft = scroll.scrollWidth;
    }
});

setInterval(() => {
    scroll.scrollLeft += getScrollAmount();

    if (scroll.scrollLeft + scroll.offsetWidth >= scroll.scrollWidth - 10) {
        scroll.scrollLeft = 0;
    }
}, 5000);
