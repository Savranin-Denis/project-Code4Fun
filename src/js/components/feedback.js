import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'css-star-rating/css/star-rating.css';

import { getFeedbacks } from '../api/feedback-list-api.js';
import { createFeedbackMarkup } from '../render/feedback-list-render.js';

const feedbackList = document.querySelector('.feedback-list');

async function initFeedback() {
  try {
    const data = await getFeedbacks();

    feedbackList.innerHTML = createFeedbackMarkup(data.feedbacks);

    new Swiper('.feedback-slider', {
  modules: [Navigation, Pagination],

  slidesPerView: 1,
  spaceBetween: 16,

  breakpoints: {
    768: {
      slidesPerView: 3,
      spaceBetween: 24,
    },

    1440: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
  },

  navigation: {
    nextEl: '.feedback-button-next',
    prevEl: '.feedback-button-prev',
  },

  pagination: {
    el: '.feedback-pagination',
    clickable: true,
    dynamicBullets: true,
  },
  
});
  } catch (error) {
    console.error('Failed to load feedbacks:', error);
  }
}

initFeedback();