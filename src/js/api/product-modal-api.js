import axios from 'axios';

const productCardApi = axios.create({
  baseURL: 'https://deserts-store.b.goit.study/api',
});

export async function getProduct(id) {
  const { data } = await productCardApi.get(`/desserts/${id}`);

  return data;
}
