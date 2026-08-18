import { createOrder } from '../api/contact-modal-api.js';
import { setOverlayLoader } from './loader.js';
import { notifyError, notifySuccess } from './notify.js';

const orderModalBackdrop = document.querySelector('.order-modal-backdrop');
const orderModalNameInput = document.querySelector('#modal-user-name');
const dessertIdInput = document.querySelector('.order-modal-dessert-id');
const dessertNameInput = document.querySelector('.order-modal-dessert-name');
const orderModalForm = document.querySelector('.order-modal-form');
const orderModalSubmit = document.querySelector('.order-modal-submit');

export function closeOrderModal() {
  orderModalBackdrop?.classList.add('is-hidden');
  orderModalBackdrop?.setAttribute('aria-hidden', 'true');
}

export function openOrderModal({ id = '', name = '' } = {}) {
  if (!orderModalBackdrop) {
    return;
  }

  dessertIdInput.value = id;
  dessertNameInput.value = name;
  orderModalBackdrop.classList.remove('is-hidden');
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
    !orderModalBackdrop?.classList.contains('is-hidden')
  ) {
    closeOrderModal();
  }
}

async function handleOrderSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const formData = new FormData(form);
  const order = {
    name: formData.get('name').trim(),
    phone: formData.get('phone').replace(/\D/g, ''),
    dessertId: formData.get('dessertId'),
    comment: formData.get('comment').trim(),
  };

  try {
    orderModalSubmit.disabled = true;
    setOverlayLoader(true);

    const createdOrder = await createOrder(order);

    setOverlayLoader(false);
    closeOrderModal();
    form.reset();

    await notifySuccess(
      'Замовлення успішно оформлено',
      createdOrder.orderNum
        ? `Номер вашого замовлення: ${createdOrder.orderNum}`
        : 'Ми звʼяжемося з вами найближчим часом.'
    );
  } catch {
    setOverlayLoader(false);
    await notifyError(
      'Не вдалося оформити замовлення',
      'Перевірте введені дані та спробуйте ще раз.'
    );
  } finally {
    setOverlayLoader(false);
    orderModalSubmit.disabled = false;
  }
}

orderModalBackdrop?.addEventListener('click', handleOrderModalClick);
orderModalForm?.addEventListener('submit', handleOrderSubmit);
document.addEventListener('keydown', handleOrderModalEscape);
