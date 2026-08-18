export function setLoader(loader, isLoading) {
  if (!loader) {
    return;
  }

  loader.hidden = !isLoading;
}

const overlayLoader = document.querySelector('[data-overlay-loader]');

export function setOverlayLoader(isLoading) {
  setLoader(overlayLoader, isLoading);
}
