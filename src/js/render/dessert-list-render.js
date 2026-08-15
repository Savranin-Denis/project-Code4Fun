import spriteUrl from '../../img/sprite.svg';

const allDessertsCategory = {
  _id: 'all',
  name: 'Всі десерти',
};

function createCategoryItem(category, buttonClass) {
  const item = document.createElement('li');
  const button = document.createElement('button');
  const isAllDesserts = category._id === allDessertsCategory._id;

  button.className = buttonClass;
  button.type = 'button';
  button.textContent = category.name;
  button.dataset.categoryId = category._id;
  button.setAttribute('aria-pressed', String(isAllDesserts));

  item.append(button);

  return item;
}

export function renderDessertCategories(
  categories,
  desktopList,
  dropdownList
) {
  const allCategories = [allDessertsCategory, ...categories];

  const desktopItems = allCategories.map(category =>
    createCategoryItem(category, 'dessert-list__category-button')
  );
  const dropdownItems = allCategories.map(category =>
    createCategoryItem(category, 'dessert-list__dropdown-option')
  );

  desktopList.replaceChildren(...desktopItems);
  dropdownList.replaceChildren(...dropdownItems);
}

function createDessertCard(dessert) {
  const item = document.createElement('li');
  const card = document.createElement('article');
  const image = document.createElement('img');
  const category = document.createElement('p');
  const title = document.createElement('h3');
  const description = document.createElement('p');
  const footer = document.createElement('div');
  const price = document.createElement('p');
  const detailsButton = document.createElement('button');
  const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const iconUse = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'use'
  );

  item.className = 'dessert-list__card-item';
  card.className = 'dessert-card';

  image.className = 'dessert-card__image';
  image.src = dessert.image;
  image.alt = dessert.name;
  image.loading = 'lazy';
  image.width = 600;
  image.height = 400;

  category.className = 'dessert-card__category';
  category.textContent = dessert.category.name;

  title.className = 'dessert-card__title';
  title.textContent = dessert.name;

  description.className = 'dessert-card__description';
  description.textContent = dessert.description;

  footer.className = 'dessert-card__footer';

  price.className = 'dessert-card__price';
  price.textContent = `${dessert.price} грн`;

  detailsButton.className = 'dessert-card__details-button';
  detailsButton.type = 'button';
  detailsButton.dataset.dessertId = dessert._id;
  detailsButton.setAttribute('aria-label', `Детальніше про ${dessert.name}`);

  icon.classList.add('dessert-card__details-icon');
  icon.setAttribute('width', '24');
  icon.setAttribute('height', '24');
  icon.setAttribute('aria-hidden', 'true');
  iconUse.setAttribute('href', `${spriteUrl}#icon-arrow-upright`);

  icon.append(iconUse);
  detailsButton.append(icon);
  footer.append(price, detailsButton);
  card.append(image, category, title, description, footer);
  item.append(card);

  return item;
}

export function renderDessertCards(desserts, cardsList, { append = false } = {}) {
  const cards = desserts.map(createDessertCard);

  if (append) {
    cardsList.append(...cards);
    return;
  }

  cardsList.replaceChildren(...cards);
}
