const API_URL = 'https://deserts-store.b.goit.study/api';

export async function getFeedbacks() {
  const response = await fetch(`${API_URL}/feedbacks?limit=8`);

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  return response.json();
}