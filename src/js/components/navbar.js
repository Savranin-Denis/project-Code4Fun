(() => {
  const refs = {
    openModalBtn: document.querySelector('[data-menu-open]'),
    closeModalBtn: document.querySelector('[data-menu-close]'),
    modal: document.querySelector('[data-menu]'),
  };

  refs.openModalBtn.addEventListener('click', openMenu);
  refs.closeModalBtn.addEventListener('click', closeMenu);

  refs.modal.addEventListener('click', (e) => {
    if (e.target.classList.contains('mob-link') || e.target.classList.contains('header-btn-mob')) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && refs.modal.classList.contains('is-open')) {
      closeMenu();
    }
  });

  function openMenu() {
    refs.modal.classList.add('is-open');
    document.body.classList.add('no-scroll');
  }

  function closeMenu() {
    refs.modal.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
  }
})();