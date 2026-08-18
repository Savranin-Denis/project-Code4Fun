const activeLocks = new Set();

export function lockPageScroll(lockId) {
  activeLocks.add(lockId);
  document.body.classList.add('is-scroll-locked');
}

export function unlockPageScroll(lockId) {
  activeLocks.delete(lockId);

  if (activeLocks.size === 0) {
    document.body.classList.remove('is-scroll-locked');
  }
}
