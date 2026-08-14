import Swal from 'sweetalert2';
import { getDessertCategories } from '../api/dessert-list-api.js';
import { renderDessertCategories } from '../render/dessert-list-render.js';

const filters = document.querySelector('.dessert-list__filters');
const desktopCategories = document.querySelector('.dessert-list__categories');
const dropdownCategories = document.querySelector(
  '.dessert-list__dropdown-menu'
);

async function initDessertCategories() {
  if (!filters || !desktopCategories || !dropdownCategories) {
    return;
  }

  filters.setAttribute('aria-busy', 'true');

  try {
    const categories = await getDessertCategories();

    renderDessertCategories(
      categories,
      desktopCategories,
      dropdownCategories
    );
  } catch {
    await Swal.fire({
      icon: 'error',
      title: 'Не вдалося завантажити категорії',
      text: 'Спробуйте оновити сторінку трохи пізніше.',
    });
  } finally {
    filters.removeAttribute('aria-busy');
  }
}

initDessertCategories();
