import spriteUrl from '../../img/sprite.svg';
import { getProduct } from '../api/product-modal-api.js';
import { renderProductModal } from '../render/product-modal-render.js';
import { setOverlayLoader } from './loader.js';
import { notifyError } from './notify.js';
import { openOrderModal } from './contact-modal.js';

const productModalOverlay = document.querySelector('.product-modal-overlay');
const closeIconUse = document.querySelector('.product-modal-close-use');
const orderButton = document.querySelector(
  '.product-modal-info-list-element-btn'
);

closeIconUse?.setAttribute('href', `${spriteUrl}#icon-close`);

function closeDessertModal() {
  productModalOverlay.classList.remove('is-open');
  productModalOverlay.classList.add('is-closed');
  productModalOverlay.setAttribute('aria-hidden', 'true');
  document.removeEventListener('keydown', handleEscape);
  
}

function handleModalClick(event) {
  if (!(event.target instanceof Element)) {
    return;
  }

  const closeButton = event.target.closest('.product-modal-close');

  if (event.target === productModalOverlay || closeButton) {
    closeDessertModal();
  }
}

function handleEscape(event) {
  if (
    event.key === 'Escape' &&
    productModalOverlay.classList.contains('is-open')
  ) {
    closeDessertModal();
  }
}

export async function openDessertModal(id) {
  setOverlayLoader(true);

  try {
    const product = await getProduct(id);
    renderProductModal(product);
    orderButton.dataset.dessertId = product._id;
    orderButton.dataset.dessertName = product.name;

    productModalOverlay.scrollTop = 0;
    productModalOverlay.classList.remove('is-closed');
    productModalOverlay.classList.add('is-open');
    productModalOverlay.setAttribute('aria-hidden', 'false');
    document.addEventListener('keydown', handleEscape);
  } catch {
    setOverlayLoader(false);
    await notifyError('Не вдалося завантажити товар');
  } finally {
    setOverlayLoader(false);
  }
}

function handleOrderButtonClick() {
  closeDessertModal();
  openOrderModal({
    id: orderButton.dataset.dessertId,
    name: orderButton.dataset.dessertName,
  });
}

function handlePopularProductOpen(event) {
  openDessertModal(event.detail.productId);
}

orderButton?.addEventListener('click', handleOrderButtonClick);
productModalOverlay?.addEventListener('click', handleModalClick);
document.addEventListener('popular-product:open', handlePopularProductOpen);
