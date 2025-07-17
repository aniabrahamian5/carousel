document.addEventListener('DOMContentLoaded', function () {
    new Splide('#splide', {
        perPage: 3,         
        rewind: true,
        autoplay: true,
        interval: 5000,

        breakpoints: {
            768: {
                perPage: 2,     
            },
            480: {
                perPage: 1,    
            }
        }
    }).mount();
});
