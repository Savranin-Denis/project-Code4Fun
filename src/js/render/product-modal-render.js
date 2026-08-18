import starSprite from '../../img/sprite.svg?url';
import { getRatingStars } from '../components/rating.js';

const titleM = document.querySelector('.product-modal-info-list-element-title');
const priceM = document.querySelector('.product-modal-info-list-element-price');
const gradeM = document.querySelector('.product-modal-info-list-element-grade');
const descriptionM = document.querySelector(
  '.product-modal-info-list-element-description'
);
const compositionM = document.querySelector(
  '.product-modal-info-list-element-composition-span'
);
const imageM = document.querySelector('.product-modal-img');

export function renderProductModal({
  name,
  description,
  composition,
  price,
  rate,
  image,
}) {
  titleM.textContent = name;
  priceM.textContent = `${price} грн`;
  gradeM.innerHTML = createStarsProductModel(rate);
  descriptionM.textContent = description;
  compositionM.textContent = composition;
  imageM.src = image;
  imageM.alt = name;
}

function createStarsProductModel(rate) {
  const stars = getRatingStars(rate)
    .map(
      type => `
        <div class="star">
          <svg
            class="star__icon star__icon--${type}"
            viewBox="0 0 34 32"
            aria-hidden="true"
          >
            <use href="${starSprite}#star-${type}"></use>
          </svg>
        </div>
      `
    )
    .join('');

  return `
      <div class="product-modal-rating" aria-label="Оцінка ${rate} з 5">
        <div class="star-container modal-star">
          ${stars}
        </div>
      </div>
    `;
}
