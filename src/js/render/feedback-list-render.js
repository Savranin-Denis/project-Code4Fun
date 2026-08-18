const STAR_PATHS = {
  empty: `<path d="M33.412 12.395l-11.842-1.021-4.628-10.904-4.628 10.92-11.842 1.005 8.993 7.791-2.701 11.579 10.179-6.144 10.179 6.144-2.685-11.579 8.976-7.791zM16.941 22.541l-6.193 3.739 1.647-7.049-5.468-4.744 7.214-0.626 2.8-6.638 2.816 6.654 7.214 0.626-5.468 4.744 1.647 7.049-6.209-3.755z"/>`,
  half: `<path d="M 33.412,12.395 21.57,11.374 16.942,0.47 12.314,11.39 0.472,12.395 9.465,20.186 6.764,31.765 16.943,25.621 27.122,31.765 24.437,20.186 33.413,12.395 Z M 16.941,22.541 c 0,0 -0.297971,-14.6455833 0,-15.318 l 2.816,6.654 7.214,0.626 -5.468,4.744 1.647,7.049 z"/>`,
  filled: `<path d="M16.941 25.621l10.179 6.144-2.701-11.579 8.993-7.791-11.842-1.005-4.628-10.92-4.628 10.92-11.842 1.005 8.993 7.791-2.701 11.579z"/>`,
};

function renderStarIcon(type) {
  return `
    <svg class="star__icon star__icon--${type}" viewBox="0 0 34 32" aria-hidden="true">
      ${STAR_PATHS[type]}
    </svg>
  `;
}

export function createFeedbackMarkup(feedbacks) {
  return feedbacks
    .map(({ _id, author, rate, description }) => {
      const fullStars = Math.floor(rate);
      const hasHalf = rate % 1 === 0.5;

      const stars = Array.from({ length: 5 }, (_, index) => {
        let type;
        if (index < fullStars) {
          type = 'filled';
        } else if (index === fullStars && hasHalf) {
          type = 'half';
        } else {
          type = 'empty';
        }

        return `<div class="star">${renderStarIcon(type)}</div>`;
      }).join('');

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