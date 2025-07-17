$(document).ready(function () {
    function getScrollStep($container) {
        const $slideGroup = $container.find('div').first();
        return $slideGroup.outerWidth(true); 
    }

    function updateMode(mode) {
        const $task1Carusel = $('#task1Carusel');
        const $task2Gallery = $('#task2Gallery');
        const $task3Gallery = $('#task3Gallery');
        const $prev = $('#prev');
        const $next = $('#next');

        $task1Carusel.hide();
        $task2Gallery.hide();
        $task3Gallery.hide();

        const $newPrev = $prev.clone(true).attr('id', 'prev');
        const $newNext = $next.clone(true).attr('id', 'next');
        $prev.replaceWith($newPrev);
        $next.replaceWith($newNext);

        if (mode === 'task1') {
            $task1Carusel.show();

            const $imgs = $('.carImg');
            let count = 0;
            $imgs.removeClass('displayable');
            $imgs.eq(count).addClass('displayable');

            const interval = setInterval(() => {
                $imgs.eq(count).removeClass('displayable');
                count = (count + 1) % $imgs.length;
                $imgs.eq(count).addClass('displayable');
            }, 5000);

            $newPrev.click(() => {
                $imgs.eq(count).removeClass('displayable');
                count = (count - 1 + $imgs.length) % $imgs.length;
                $imgs.eq(count).addClass('displayable');
            });

            $newNext.click(() => {
                $imgs.eq(count).removeClass('displayable');
                count = (count + 1) % $imgs.length;
                $imgs.eq(count).addClass('displayable');
            });

        } else if (mode === 'task2') {
            $task2Gallery.show().css('display', 'flex');
            const $scroll = $task2Gallery;

            const scrollStep = getScrollStep($scroll);

            $newNext.click(() => {
                $scroll.animate({ scrollLeft: $scroll.scrollLeft() + scrollStep }, 'slow');
            });

            $newPrev.click(() => {
                $scroll.animate({ scrollLeft: $scroll.scrollLeft() - scrollStep }, 'slow');
            });

            setInterval(() => {
                $scroll.animate({ scrollLeft: $scroll.scrollLeft() + scrollStep }, 'slow');
            }, 5000);

        } else if (mode === 'task3') {
            $task3Gallery.show().css('display', 'flex');
            const $scroll = $task3Gallery;

            const scrollStep = getScrollStep($scroll);

            $newNext.click(() => {
                $scroll.animate({ scrollLeft: $scroll.scrollLeft() + scrollStep }, 'slow');
            });

            $newPrev.click(() => {
                $scroll.animate({ scrollLeft: $scroll.scrollLeft() - scrollStep }, 'slow');
            });

            setInterval(() => {
                $scroll.animate({ scrollLeft: $scroll.scrollLeft() + scrollStep }, 'slow');
            }, 5000);
        }
    }

    $('input[name="mode"]').change(function () {
        updateMode($(this).val());
    });

    const $checkedRadio = $('input[name="mode"]:checked');
    if ($checkedRadio.length) {
        updateMode($checkedRadio.val());
    }
});
