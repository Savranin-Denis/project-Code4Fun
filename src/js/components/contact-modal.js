const orderModalBackdrop = document.querySelector('.order-modal-backdrop');
const orderModalNameInput = document.querySelector('#modal-user-name');
const dessertIdInput = document.querySelector('.order-modal-dessert-id');
const dessertNameInput = document.querySelector('.order-modal-dessert-name');

export function closeOrderModal() {
  orderModalBackdrop?.classList.remove('is-open');
  orderModalBackdrop?.setAttribute('aria-hidden', 'true');
}

export function openOrderModal({ id = '', name = '' } = {}) {
  if (!orderModalBackdrop) {
    return;
  }

  dessertIdInput.value = id;
  dessertNameInput.value = name;
  orderModalBackdrop.classList.add('is-open');
  orderModalBackdrop.setAttribute('aria-hidden', 'false');
  orderModalNameInput?.focus();
}

function handleOrderModalClick(event) {
  if (!(event.target instanceof Element)) {
    return;
  }

  if (
    event.target === orderModalBackdrop ||
    event.target.closest('.order-modal-close')
  ) {
    closeOrderModal();
  }
}

function handleOrderModalEscape(event) {
  if (
    event.key === 'Escape' &&
    orderModalBackdrop?.classList.contains('is-open')
  ) {
    closeOrderModal();
  }
}

orderModalBackdrop?.addEventListener('click', handleOrderModalClick);
document.addEventListener('keydown', handleOrderModalEscape);
