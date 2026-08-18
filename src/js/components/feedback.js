import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { getFeedbacks } from '../api/feedback-list-api.js';
import { createFeedbackMarkup } from '../render/feedback-list-render.js';
import { setLoader } from './loader.js';
import { notifyError } from './notify.js';

const feedbackSection = document.querySelector('.feedback');
const feedbackList = document.querySelector('.feedback-list');
const feedbackLoader = document.querySelector('[data-feedback-loader]');
const feedbackContent = document.querySelector('[data-feedback-content]');

async function initFeedback() {
  if (!feedbackList || !feedbackLoader || !feedbackContent) {
    return;
  }

  feedbackSection?.setAttribute('aria-busy', 'true');
  setLoader(feedbackLoader, true);
  feedbackContent.hidden = true;

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

    feedbackContent.hidden = false;
  } catch {
    setLoader(feedbackLoader, false);
    await notifyError('Не вдалося завантажити відгуки');
  } finally {
    setLoader(feedbackLoader, false);
    feedbackSection?.setAttribute('aria-busy', 'false');
  }
}

initFeedback();
