import Swal from 'sweetalert2';
import { createOrder } from '../api/contact-modal-api.js';

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

  const formData = new FormData(event.currentTarget);
  const order = {
    name: formData.get('name').trim(),
    phone: formData.get('phone').replace(/\D/g, ''),
    dessertId: formData.get('dessertId'),
    comment: formData.get('comment').trim(),
  };

  try {
    orderModalSubmit.disabled = true;

    const createdOrder = await createOrder(order);

    closeOrderModal();
    event.currentTarget.reset();

    await Swal.fire({
      icon: 'success',
      title: 'Замовлення успішно оформлено',
      text: createdOrder.orderNum
        ? `Номер вашого замовлення: ${createdOrder.orderNum}`
        : 'Ми звʼяжемося з вами найближчим часом.',
    });
  } catch {
    await Swal.fire({
      icon: 'error',
      title: 'Не вдалося оформити замовлення',
      text: 'Перевірте введені дані та спробуйте ще раз.',
    });
  } finally {
    orderModalSubmit.disabled = false;
  }
}

orderModalBackdrop?.addEventListener('click', handleOrderModalClick);
orderModalForm?.addEventListener('submit', handleOrderSubmit);
document.addEventListener('keydown', handleOrderModalEscape);
