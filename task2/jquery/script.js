$(function () {
    const scroll = $('.gallery');

    function getScrollAmount() {
        const width = $(window).width();
        const galleryWidth = scroll.outerWidth();

        if (width <= 480) return galleryWidth;         
        if (width <= 768) return galleryWidth / 2;      
        return galleryWidth / 3;                         
    }

    function scrollNext() {
        scroll.css('scroll-behavior', 'smooth');
        const newScrollLeft = scroll.scrollLeft() + getScrollAmount();

        if (scroll.scrollLeft() + scroll.outerWidth() >= scroll[0].scrollWidth - 10) {
            scroll.scrollLeft(0); 
        } else {
            scroll.scrollLeft(newScrollLeft);
        }
    }

    function scrollPrev() {
        scroll.css('scroll-behavior', 'smooth');
        const newScrollLeft = scroll.scrollLeft() - getScrollAmount();

        if (scroll.scrollLeft() <= 0) {
            scroll.scrollLeft(scroll[0].scrollWidth); 
        } else {
            scroll.scrollLeft(newScrollLeft);
        }
    }

    $('#next').on('click', scrollNext);
    $('#prev').on('click', scrollPrev);

    setInterval(scrollNext, 5000);
});
