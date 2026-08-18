import starSprite from '../../img/star-rating.icons.svg';

export function createFeedbackMarkup(feedbacks) {
  return feedbacks
    .map(({ _id, author, rate, description }) => {
      const value = Math.floor(rate);
      const half = rate % 1 === 0.5 ? 'half' : '';

      const stars = Array.from(
        { length: 5 },
        () => `
          <div class="star">
            <svg class="star-empty" aria-hidden="true">
              <use href="${starSprite}star-empty"></use>
            </svg>

            <svg class="star-half" aria-hidden="true">
              <use href="${starSprite}#star-half"></use>
            </svg>

            <svg class="star-filled" aria-hidden="true">
              <use href="${starSprite}#star-filled"></use>
            </svg>
          </div>
        `
      ).join('');

      return `
        <div class="feedback-slide swiper-slide" data-id="${_id}">
          <article class="feedback-card">
            <div
              class="feedback-rating rating value-${value} ${half} star-svg"
              aria-label="Оцінка ${rate} з 5"
            >
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