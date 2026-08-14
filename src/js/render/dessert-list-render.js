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
