import axios from 'axios';

const dessertsApi = axios.create({
  baseURL: 'https://deserts-store.b.goit.study/api',
});

export async function getDessertCategories() {
  const { data } = await dessertsApi.get('/categories');

  return data;
}

export async function getDesserts({ page = 1, limit = 8, category } = {}) {
  const params = { page, limit };

  if (category && category !== 'all') {
    params.category = category;
  }

  const { data } = await dessertsApi.get('/desserts', { params });

  return data;
}
