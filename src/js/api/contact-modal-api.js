import axios from 'axios';

const orderApi = axios.create({
  baseURL: 'https://deserts-store.b.goit.study/api',
});

export async function createOrder(order) {
  const response = await orderApi.post('/orders', order);

  return response.data;
}
