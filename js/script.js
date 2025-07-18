const radios = document.querySelectorAll('input[name="mode"]')
const secondRadios = document.querySelectorAll('input[name="secondMode"]')
const checkedRadio = document.querySelector('input[name="mode"]:checked')
if (checkedRadio) {
    updateMode(checkedRadio.value)
}

radios.forEach(radio => {
    radio.addEventListener('change', () => {
        if(radio.value === "switch3Img"){
            document.querySelector('#toggledRadios').style.display = 'block'
            secondRadios.forEach(secondRadio => {
                secondRadio.addEventListener('change',() => {
                    updateMode(secondRadio.value)
                })
            })
        }else if(radio.value === "switch1Img"){
            document.querySelector('#toggledRadios').style.display = 'none'
            updateMode(radio.value)
        }
    })
})

function updateMode(mode) {
    const firstCarousel = document.getElementById('firstCarousel')
    const secondCarousel = document.getElementById('secondCarousel')
    const task3Gallery = document.getElementById('task3Gallery')
    const prev = document.getElementById('prev')
    const next = document.getElementById('next')

    firstCarousel.style.display = 'none'
    secondCarousel.style.display = 'none'
    task3Gallery.style.display = 'none'

    prev.replaceWith(prev.cloneNode(true))
    next.replaceWith(next.cloneNode(true))
    const newPrev = document.getElementById('prev')
    const newNext = document.getElementById('next')

    function getScrollAmount(scrollContainer, factor = 1) {
        return scrollContainer.querySelector('div').offsetWidth * factor
    }

    if (mode === 'switch1Img') {
        firstCarousel.style.display = 'block'

        const img = document.getElementsByClassName('carImage')
        let count = 0

        const dotsContainer = document.getElementById('dotsContainer')
        dotsContainer.innerHTML = ''

        Array.from(img).forEach((_, index) => {
            const dot = document.createElement('div')
            dot.classList.add('dot')
            if (index === 0) dot.classList.add('active')
            dot.addEventListener('click', () => {
                removeImg(count)
                count = index
                addImg(count)
                updateDots()
            })
            dotsContainer.appendChild(dot)
        })

        function updateDots() {
            const allDots = dotsContainer.querySelectorAll('.dot')
            allDots.forEach(dot => dot.classList.remove('active'))
            allDots[count].classList.add('active')
        }

        if (window.task1Interval) clearInterval(window.task1Interval)

        function removeImg(count){
            return img[count].classList.remove('displayable')
        }

        function addImg(count){
            return img[count].classList.add('displayable')
        }

        function prevFor1Img() {
            removeImg(count)
            count = (count - 1 + img.length) % img.length
            addImg(count)
            updateDots()
        }

        function nextFor1Img() {
            removeImg(count)
            count = (count + 1) % img.length
            addImg(count)
            updateDots()
        }

        window.task1Interval = setInterval(nextFor1Img, 5000)

        newPrev.addEventListener('click', prevFor1Img)

        newNext.addEventListener('click', nextFor1Img)

    } else if (mode === 'switch3_1Img') {
        secondCarousel.style.display = 'flex'
        const scroll = document.querySelector('.gallery')

        function animation(smooth){
            return scroll.style.scrollBehavior = smooth
        }

        function getScrollAmount1() {
            if (window.innerWidth <= 480) return scroll.offsetWidth 
            if (window.innerWidth <= 768) return scroll.offsetWidth / 2 
            animation('smooth')
            return scroll.offsetWidth / 3 
        }

        function scrollRight(){
            scroll.scrollLeft += getScrollAmount1()
            animation('smooth')
            if (scroll.scrollLeft + scroll.offsetWidth >= scroll.scrollWidth - 10) {
                scroll.scrollLeft = 0
            }
            return
        }

        function scrollLeft(){
            scroll.scrollLeft -= getScrollAmount1()

            if (scroll.scrollLeft <= 0) {
                scroll.scrollLeft = scroll.scrollWidth
            }
        }

        newNext.addEventListener('click', scrollRight)

        newPrev.addEventListener('click', scrollLeft)

        setInterval(scrollRight, 5000)

    } else if (mode === 'switch3_3Img') {
        task3Gallery.style.display = 'flex'

        const scroll = task3Gallery

         function animation(smooth){
            return scroll.style.scrollBehavior = smooth
        }

        function scrollRight(){
            animation('smooth')
            scroll.scrollLeft += getScrollAmount(scroll, 2)

            if (scroll.scrollLeft + scroll.offsetWidth >= scroll.scrollWidth - 10) {
            scroll.scrollLeft = 0
    }
        }

        function scrollLeft(){
            animation('smooth')
            scroll.scrollLeft -= getScrollAmount(scroll, 2)
        }

        newNext.addEventListener('click', scrollRight)

        newPrev.addEventListener('click', scrollLeft)

        if (window.task3Interval) clearInterval(window.task3Interval)
        window.task3Interval = setInterval(scrollRight, 5000)
    }
}

