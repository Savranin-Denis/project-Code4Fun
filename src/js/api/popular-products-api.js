import axios from 'axios';

const BASE_URL = 'https://deserts-store.b.goit.study/api';

export async function getPopularProducts() {
  const { data } = await axios.get(`${BASE_URL}/desserts`, {
    params: {
      type: 'popular',
    },
  });

  return data.desserts ?? [];
}
