$(function() {
const $radios = $('input[name="mode"]')
const $secondRadios = $('input[name="secondMode"]')

const $checkedRadio = $('input[name="mode"]:checked')
    if ($checkedRadio.length) {
        updateMode($checkedRadio.val())
    }

    $radios.on('change', function() {
        const value = $(this).val()

        if (value === "switch3Img") {
            $('#toggledRadios').show()

            $secondRadios.off('change').on('change', function() {
                updateMode($(this).val())
            })
        } else if (value === "switch1Img") {
            $('#toggledRadios').hide()
            updateMode(value)
        }
    })

    function updateMode(mode) {
        const $firstCarousel = $('#firstCarousel')
        const $secondCarousel = $('#secondCarousel')
        const $task3Gallery = $('#task3Gallery')
        const $prev = $('#prev')
        const $next = $('#next')

        $firstCarousel.hide()
        $secondCarousel.hide()
        $task3Gallery.hide()

        const $newPrev = $prev.clone(true)
        const $newNext = $next.clone(true)
        $prev.replaceWith($newPrev)
        $next.replaceWith($newNext)

        function getScrollAmount($scrollContainer, factor = 1) {
            return $scrollContainer.find('div').outerWidth() * factor
        }

        if (mode === 'switch1Img') {
            $firstCarousel.show()

            const $img = $('.carImage')
            let count = 0

            const $dotsContainer = $('#dotsContainer')
            $dotsContainer.empty()

            $img.each((index) => {
                const $dot = $('<div>').addClass('dot')
                if (index === 0) $dot.addClass('active')

                $dot.on('click', function() {
                    removeImg(count)
                    count = index
                    addImg(count)
                    updateDots()
                })

                $dotsContainer.append($dot)
            })

            function updateDots() {
                const $allDots = $dotsContainer.find('.dot')
                $allDots.removeClass('active')
                $allDots.eq(count).addClass('active')
            }

            if (window.task1Interval) clearInterval(window.task1Interval)

            function removeImg(index){
                $img.eq(index).removeClass('displayable')
            }

            function addImg(index){
                $img.eq(index).addClass('displayable')
            }

            function prevFor1Img() {
                removeImg(count)
                count = (count - 1 + $img.length) % $img.length
                addImg(count)
                updateDots()
            }

            function nextFor1Img() {
                removeImg(count)
                count = (count + 1) % $img.length
                addImg(count)
                updateDots()
            }

            window.task1Interval = setInterval(nextFor1Img, 5000)

            $newPrev.on('click', prevFor1Img)
            $newNext.on('click', nextFor1Img)

        } else if (mode === 'switch3_1Img') {
            $secondCarousel.css('display', 'flex')
            const $scroll = $('.gallery')

            function animation(smooth){
                $scroll.css('scrollBehavior', smooth)
            }

            function getScrollAmount1() {
                if (window.innerWidth <= 480) return $scroll.outerWidth()
                if (window.innerWidth <= 768) return $scroll.outerWidth() / 2
                animation('smooth')
                return $scroll.outerWidth() / 3
            }

            function scrollRight(){
                $scroll.scrollLeft($scroll.scrollLeft() + getScrollAmount1())
                animation('smooth')
                if ($scroll.scrollLeft() + $scroll.outerWidth() >= $scroll[0].scrollWidth - 10) {
                    $scroll.scrollLeft(0)
                }
            }

            function scrollLeft(){
                $scroll.scrollLeft($scroll.scrollLeft() - getScrollAmount1())
                if ($scroll.scrollLeft() <= 0) {
                    $scroll.scrollLeft($scroll[0].scrollWidth)
                }
            }

            $newNext.on('click', scrollRight)
            $newPrev.on('click', scrollLeft)

            setInterval(scrollRight, 5000)

        } else if (mode === 'switch3_3Img') {
            $task3Gallery.css('display', 'flex')

            const $scroll = $task3Gallery

            function animation(smooth){
                $scroll.css('scrollBehavior', smooth)
            }

            function scrollRight(){
                animation('smooth')
                $scroll.scrollLeft($scroll.scrollLeft() + getScrollAmount($scroll, 2))
                if ($scroll.scrollLeft() + $scroll.outerWidth() >= $scroll[0].scrollWidth - 10) {
                    $scroll.scrollLeft(0)
                }
            }

            function scrollLeft(){
                animation('smooth')
                $scroll.scrollLeft($scroll.scrollLeft() - getScrollAmount($scroll, 2))
            }

            $newNext.on('click', scrollRight)
            $newPrev.on('click', scrollLeft)

            if (window.task3Interval) clearInterval(window.task3Interval)
            window.task3Interval = setInterval(scrollRight, 5000)
        }
    }
})