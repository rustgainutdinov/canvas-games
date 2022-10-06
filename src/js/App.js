window.addEventListener('scroll', () => {
    let scroll = document.querySelector('.footer__button-up-image');
    scroll.classList.toggle("active", window.scrollY > 200)
})

function scrollToPos(position) {
    window.scrollTo({top: position, behavior: "smooth"})
}

function RedirectToLink(link) {
    location.href = link;
}