document.addEventListener('DOMContentLoaded', function () {
    new Splide('#splide', {  
        type    : 'loop',
        perPage : 3,      
        perMove : 1,
        autoplay: true,
        interval: 5000,

        breakpoints: {
            768: {
                perPage: 2,   
            },
            480: {
                perPage: 1,   
            },
        }
    }).mount();
});
