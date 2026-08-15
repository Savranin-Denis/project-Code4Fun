
const titleM = document.querySelector(".product-modal-info-list-element-title");
const priceM = document.querySelector(".product-modal-info-list-element-price");
const gradeM = document.querySelector(".product-modal-info-list-element-grade");
const descriptionM = document.querySelector(".product-modal-info-list-element-description");
const compositionM = document.querySelector(".product-modal-info-list-element-composition-span")
const imageM = document.querySelector(".product-modal-img")

export function renderProductModal({name, description, composition, price, image}) {
    titleM.textContent = name;
    priceM.textContent = `${price} грн`;
    descriptionM.textContent = description
    compositionM.textContent = composition;
    imageM.src = image;
    imageM.alt = name;
}

