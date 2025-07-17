document.addEventListener('DOMContentLoaded', function () {

    var splide = new Splide('.splide', {
        type: 'loop', 
        autoplay: true,
        interval: 5000
    });
    
    splide.mount();
});