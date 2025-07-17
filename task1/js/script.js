const img = document.getElementsByClassName('carImg')
const prev = document.getElementById('prev')
const next = document.getElementById('next')

let count = 0

setInterval(()=>{
    img[count].classList.remove('displayable')
    count = (count + 1) % img.length
    img[count].classList.add('displayable')
    console.log(count)

}, 5000)

prev.addEventListener('click', () => {
    img[count].classList.remove('displayable')
    count = (count - 1 + img.length) % img.length
    img[count].classList.add('displayable')
})

next.addEventListener('click', () => {
    img[count].classList.remove('displayable')
    count = (count + 1) % img.length
    img[count].classList.add('displayable')
})
