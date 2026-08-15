import { renderProductModal } from '../render/product-modal-render';
import { getProduct } from '../api/product-modal-api';
import Swal from 'sweetalert2';

const closeBtn = document.querySelector('.product-modal-close');
const productModalOverlay = document.querySelector('.product-modal-overlay');

closeBtn.addEventListener('click', e => {
  productModalOverlay.classList.add('is-closed');
});

export async function openDessertModal(id) {
  try {
    const product = await getProduct(id);
    renderProductModal(product);

    productModalOverlay.classList.add('is-open');
  } catch {
    await Swal.fire({
      icon: 'error',
      title: 'Не вдалося завантажити товар',
      text: 'Спробуйте оновити сторінку трохи пізніше.',
    });
  }
}
