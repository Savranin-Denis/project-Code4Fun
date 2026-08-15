function getCategoryName(product) {
  return product.category?.name ?? product.category ?? '';
}

function formatPrice(price) {
  return `${price} грн`;
}

export function createPopularProductCard(product) {
  const categoryName = getCategoryName(product);

  return `
    <li class="popular-products__item">
      <article class="popular-products-card">
        <img
          class="popular-products-card__image"
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
        />
        <div class="popular-products-card__content">
          <div class="popular-products-card__text">
            <p class="popular-products-card__category">${categoryName}</p>
            <div class="popular-products-card__header">
              <h3 class="popular-products-card__title">${product.name}</h3>
              <p class="popular-products-card__description">${
                product.description
              }</p>
            </div>
          </div>
          <div class="popular-products-card__footer">
            <p class="popular-products-card__price">${formatPrice(
              product.price
            )}</p>
            <button
              class="popular-products-card__button"
              type="button"
              data-popular-product-id="${product._id}"
              aria-label="Відкрити деталі товару ${product.name}"
            >
              <svg class="popular-products-card__icon" width="24" height="24">
                <use href="./img/sprite.svg#icon-arrow-upright"></use>
              </svg>
            </button>
          </div>
        </div>
      </article>
    </li>
  `;
}

export function renderPopularProducts(products) {
  return products.map(createPopularProductCard).join('');
}
