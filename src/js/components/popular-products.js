import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';

import { getPopularProducts } from '../api/popular-products-api.js';
import { renderPopularProducts } from '../render/popular-products-render.js';

const refs = {
  section: document.querySelector('[data-popular-products-slider]'),
  viewport: document.querySelector('.popular-products__viewport'),
  list: document.querySelector('[data-popular-products-list]'),
  status: document.querySelector('[data-popular-products-status]'),
  pagination: document.querySelector('[data-popular-products-pagination]'),
  prevButton: document.querySelector('[data-popular-products-prev]'),
  nextButton: document.querySelector('[data-popular-products-next]'),
};

let swiper = null;

initPopularProducts();

async function initPopularProducts() {
  if (!refs.section || !refs.viewport || !refs.list) {
    return;
  }

  try {
    setStatus('Завантаження...');
    const products = await getPopularProducts();

    if (!products.length) {
      setStatus('Популярні товари поки відсутні.');
      return;
    }

    refs.list.innerHTML = renderPopularProducts(products);
    refs.section.hidden = false;
    refs.status.hidden = true;

    refs.list.addEventListener('click', onProductButtonClick);

    initSwiper();
  } catch {
    setStatus('Не вдалося завантажити популярні товари. Спробуйте пізніше.');
  }
}

function initSwiper() {
  swiper = new Swiper(refs.viewport, {
    modules: [Navigation, Pagination],
    wrapperClass: 'popular-products__list',
    slideClass: 'popular-products__item',
    spaceBetween: 16,
    slidesPerView: 1,
    breakpoints: {
      1440: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 16,
      },
    },
    navigation: {
      prevEl: refs.prevButton,
      nextEl: refs.nextButton,
    },
    pagination: {
      el: refs.pagination,
      clickable: true,
      bulletClass: 'popular-products__dot',
      bulletActiveClass: 'is-active',
    },
  });
}

function onProductButtonClick(event) {
  const button = event.target.closest('[data-popular-product-id]');

  if (!button) {
    return;
  }

  const productId = button.dataset.popularProductId;
  document.dispatchEvent(
    new CustomEvent('popular-product:open', {
      detail: { productId },
    })
  );
}

function setStatus(message) {
  refs.status.textContent = message;
  refs.status.hidden = false;
}
