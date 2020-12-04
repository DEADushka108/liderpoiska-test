const toggleMenu = (toggle, menu, bg) => {
  toggle.addEventListener('click', (evt) => {
    evt.preventDefault()
    menu.classList.toggle('main-nav__list--open')
    toggle.classList.toggle('main-nav__toggle--close')
    bg.classList.toggle('page-header--active')
  })
}

export { toggleMenu }
