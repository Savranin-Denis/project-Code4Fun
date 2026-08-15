import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

const aboutUsSwiper = document.querySelector('.swipe-wrapper');
let swiper = null;
const tabletMq = window.matchMedia('(min-width: 768px)');

const createAboutUsSwiper = () => {
  if (!aboutUsSwiper || swiper) {
    return;
  }

  swiper = new Swiper(aboutUsSwiper, {
    modules: [Navigation, Pagination],
    navigation: {
      nextEl: '.about-us_btn-next',
      prevEl: '.about-us_btn-prev',
    },
    wrapperClass: 'about-us_list',
    slideClass: 'about-us_item',
    // pagination: {
    //   el: '.about-us_pagination',
    //   clickable: true,
    // },
    pagination: {
      el: '.about-us_pagination',
      clickable: true,
      dynamicBullets: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 24,
      },
    },
  });
};

const destroyAboutUsSwiper = () => {
  if (!swiper) {
    return;
  }

  swiper.destroy(true, true);
  swiper = null;
};

if (aboutUsSwiper) {
  if (tabletMq.matches) {
    createAboutUsSwiper();
  }

  tabletMq.addEventListener('change', event => {
    if (event.matches) {
      createAboutUsSwiper();
    } else {
      destroyAboutUsSwiper();
    }
  });
}
