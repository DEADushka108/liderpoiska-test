const MODAL_SELECTOR = {
  MODAL: '.modal',
  MODAL_CLOSE: 'modal--close',
  BUTTON: '.modal__button'
}

const modal = document.querySelector(MODAL_SELECTOR.MODAL)
const button = document.querySelector(MODAL_SELECTOR.BUTTON)

const closeModal = () => {
  modal.classList.add(MODAL_SELECTOR.MODAL_CLOSE)
  button.removeEventListener('click', closeModal)
}

const openModal = () => {
  if (modal) {
    modal.classList.remove(MODAL_SELECTOR.MODAL_CLOSE)
    button.addEventListener('click', closeModal)
  }
}

export { openModal }
