$(function() {
    let $imgs = $('.carImg');
    let count = 0;

    setInterval(() => {
        count = (count + 1) % $imgs.length;
        $imgs.removeClass('displayable');
        $imgs.eq(count).addClass('displayable');
        console.log(count);
    }, 5000);

    $('#prev').on('click', () => {
        count = (count - 1 + $imgs.length) % $imgs.length;
        $imgs.removeClass('displayable');
        $imgs.eq(count).addClass('displayable');
    });

    $('#next').on('click', () => {
        count = (count + 1) % $imgs.length;
        $imgs.removeClass('displayable');
        $imgs.eq(count).addClass('displayable');
    });
});
