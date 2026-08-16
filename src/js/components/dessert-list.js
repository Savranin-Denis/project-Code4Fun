import Swal from 'sweetalert2';
import {
  getDessertCategories,
  getDesserts,
} from '../api/dessert-list-api.js';
import {
  renderDessertCards,
  renderDessertCategories,
} from '../render/dessert-list-render.js';
import { openDessertModal } from './product-modal.js';

const dessertSection = document.querySelector('.dessert-list');
const filters = document.querySelector('.dessert-list__filters');
const desktopCategories = document.querySelector('.dessert-list__categories');
const dropdownCategories = document.querySelector(
  '.dessert-list__dropdown-menu'
);
const dropdown = document.querySelector('.dessert-list__dropdown');
const dropdownButton = document.querySelector(
  '.dessert-list__dropdown-button'
);
const selectedCategory = document.querySelector(
  '.dessert-list__selected-category'
);
const cardsList = document.querySelector('.dessert-list__cards');
const loader = document.querySelector('.dessert-list__loader');
const loadMoreButton = document.querySelector('.dessert-list__load-more');
const pagination = {
  page: 1,
  limit: 8,
  totalItems: 0,
  category: 'all',
};

function setLoading(isLoading) {
  dessertSection.setAttribute('aria-busy', String(isLoading));
  loader.hidden = !isLoading;
  loadMoreButton.disabled = isLoading;

  filters.querySelectorAll('button').forEach(button => {
    button.disabled = isLoading;
  });
}

function updatePagination(dessertsData) {
  pagination.page = dessertsData.page;
  pagination.totalItems = dessertsData.totalItems;
  loadMoreButton.hidden = cardsList.children.length >= pagination.totalItems;
}

async function showLoadError() {
  await Swal.fire({
    icon: 'error',
    title: 'Не вдалося завантажити десерти',
    text: 'Спробуйте оновити сторінку трохи пізніше.',
  });
}

function closeDropdown() {
  dropdownButton.setAttribute('aria-expanded', 'false');
  dropdownCategories.hidden = true;
}

function updateActiveCategory(categoryId, categoryName) {
  const categoryButtons = filters.querySelectorAll('[data-category-id]');

  categoryButtons.forEach(button => {
    button.setAttribute(
      'aria-pressed',
      String(button.dataset.categoryId === categoryId)
    );
  });

  selectedCategory.textContent = categoryName;
}

async function loadCategory(categoryId, categoryName) {
  closeDropdown();
  updateActiveCategory(categoryId, categoryName);

  pagination.page = 1;
  pagination.category = categoryId;
  cardsList.replaceChildren();
  loadMoreButton.hidden = true;
  setLoading(true);

  try {
    const dessertsData = await getDesserts({
      page: pagination.page,
      limit: pagination.limit,
      category: pagination.category,
    });

    renderDessertCards(dessertsData.desserts, cardsList);
    updatePagination(dessertsData);
  } catch {
    await showLoadError();
  } finally {
    setLoading(false);
  }
}

async function initDessertList() {
  if (
    !dessertSection ||
    !filters ||
    !desktopCategories ||
    !dropdownCategories ||
    !dropdown ||
    !dropdownButton ||
    !selectedCategory ||
    !cardsList ||
    !loader ||
    !loadMoreButton
  ) {
    return;
  }

  setLoading(true);

  try {
    const [categories, dessertsData] = await Promise.all([
      getDessertCategories(),
      getDesserts({
        page: pagination.page,
        limit: pagination.limit,
        category: pagination.category,
      }),
    ]);

    renderDessertCategories(
      categories,
      desktopCategories,
      dropdownCategories
    );
    renderDessertCards(dessertsData.desserts, cardsList);
    updatePagination(dessertsData);
  } catch {
    await showLoadError();
  } finally {
    setLoading(false);
  }
}

async function handleLoadMore() {
  setLoading(true);

  try {
    const dessertsData = await getDesserts({
      page: pagination.page + 1,
      limit: pagination.limit,
      category: pagination.category,
    });

    renderDessertCards(dessertsData.desserts, cardsList, { append: true });
    updatePagination(dessertsData);
  } catch {
    await showLoadError();
  } finally {
    setLoading(false);
  }
}

function handleCategoryClick(event) {
  if (!(event.target instanceof Element)) {
    return;
  }

  const categoryButton = event.target.closest('[data-category-id]');

  if (!categoryButton || categoryButton.disabled) {
    return;
  }

  loadCategory(
    categoryButton.dataset.categoryId,
    categoryButton.textContent.trim()
  );
}

function handleDropdownToggle() {
  const willOpen = dropdownCategories.hidden;

  dropdownButton.setAttribute('aria-expanded', String(willOpen));
  dropdownCategories.hidden = !willOpen;
}

function handleOutsideClick(event) {
  if (event.target instanceof Node && !dropdown.contains(event.target)) {
    closeDropdown();
  }
}

function handleEscape(event) {
  if (event.key === 'Escape' && !dropdownCategories.hidden) {
    closeDropdown();
    dropdownButton.focus();
  }
}

function handleDetailsClick(event) {
  if (!(event.target instanceof Element)) {
    return;
  }

  const detailsButton = event.target.closest(
    '.dessert-card__details-button'
  );

  if (!detailsButton) {
    return;
  }

  openDessertModal(detailsButton.dataset.dessertId);
}

desktopCategories?.addEventListener('click', handleCategoryClick);
dropdownCategories?.addEventListener('click', handleCategoryClick);
dropdownButton?.addEventListener('click', handleDropdownToggle);
document.addEventListener('click', handleOutsideClick);
document.addEventListener('keydown', handleEscape);
loadMoreButton?.addEventListener('click', handleLoadMore);
cardsList?.addEventListener('click', handleDetailsClick);
initDessertList();
