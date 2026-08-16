import starSprite from 'css-star-rating/images/star-rating.icons.svg';

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
    const value = Math.floor(rate);
    const half = rate % 1 >= 0.5 ? 'half' : '';

    const stars = Array.from(
        { length: 5} , 
        () => `
          <div class="star">
            <svg class="star-empty" aria-hidden="true">
                <use href="${starSprite}#star-empty"></use>
            </svg>

            <svg class="star-half" aria-hidden="true">
                <use href="${starSprite}#star-half"></use>
            </svg>

            <svg class="star-filled" aria-hidden="true">
                <use href="${starSprite}#star-filled"></use>
            </svg>
          </div>
        `
    ).join('');

    return `
      <div class="rating value-${value} ${half}" aria-label="Оцінка ${rate} з 5">
        <div class="star-container">
          ${stars}
        </div>
      </div>
    `;
}