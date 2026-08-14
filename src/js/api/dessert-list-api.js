import axios from 'axios';

const dessertsApi = axios.create({
  baseURL: 'https://deserts-store.b.goit.study/api',
});

export async function getDessertCategories() {
  const { data } = await dessertsApi.get('/categories');

  return data;
}
