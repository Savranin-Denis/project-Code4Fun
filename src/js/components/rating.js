export function getRatingStars(rate) {
  const fullStars = Math.floor(rate);
  const hasHalf = rate % 1 === 0.5;

  return Array.from({ length: 5 }, (_, index) => {
    if (index < fullStars) {
      return 'filled';
    }

    if (index === fullStars && hasHalf) {
      return 'half';
    }

    return 'empty';
  });
}