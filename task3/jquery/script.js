$(function() {
    const $scroll = $('.gallery');
    const $prev = $('#prev');
    const $next = $('#next');

    function getScrollAmount() {
        return $scroll.outerWidth();
    }

    function scrollNext() {
        $scroll.css('scroll-behavior', 'smooth');
        const amount = getScrollAmount();
        const current = $scroll.scrollLeft();
        const maxScroll = $scroll[0].scrollWidth - $scroll.outerWidth();

        if (current + amount >= maxScroll - 5) {
            $scroll.scrollLeft(0); 
        } else {
            $scroll.scrollLeft(current + amount);
        }
    }

    function scrollPrev() {
        $scroll.css('scroll-behavior', 'smooth');
        const amount = getScrollAmount();
        const current = $scroll.scrollLeft();

        if (current - amount <= 0) {
            $scroll.scrollLeft($scroll[0].scrollWidth); 
        } else {
            $scroll.scrollLeft(current - amount);
        }
    }

    $next.on('click', scrollNext);
    $prev.on('click', scrollPrev);

    setInterval(scrollNext, 5000);
});
