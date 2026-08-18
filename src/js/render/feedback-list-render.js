import { getRatingStars } from '../components/rating.js';

function renderStarIcon(type) {
  return `
    <svg
      class="star__icon star__icon--${type}"
      viewBox="0 0 34 32"
      aria-hidden="true"
    >
      <use href="#star-${type}"></use>
    </svg>
  `;
}

export function createFeedbackMarkup(feedbacks) {
  return feedbacks
    .map(({ _id, author, rate, description }) => {
      const stars = getRatingStars(rate)
        .map(type => `<div class="star">${renderStarIcon(type)}</div>`)
        .join('');

      return `
        <div class="feedback-slide swiper-slide" data-id="${_id}">
          <article class="feedback-card">
            <div class="feedback-rating" aria-label="Оцінка ${rate} з 5">
              <div class="star-container">
                ${stars}
              </div>
            </div>

            <p class="feedback-text">${description}</p>

            <p class="feedback-name">${author}</p>
          </article>
        </div>
      `;
    })
    .join('');
}
