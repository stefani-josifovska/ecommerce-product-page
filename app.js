const hamburgerButton = document.querySelector('#hamburger-button');
const closeNavBtn = document.querySelector('#icon-close');
const navbarMenu = document.querySelector('.navbar');
const cartIcon = document.querySelector('.cart');
const cartStatus = document.querySelector('.cart-status');
const plusBtn = document.querySelector('#icon-plus');
const minusBtn = document.querySelector('#icon-minus');
let orderQty = document.querySelector('.qty h5'); // dole brojkata
let cartCount = document.querySelector('.cart-count'); // gore brojkata kaj kosnickata
const addToCartBtn = document.querySelector('.add-cart button');

// dali da se gleda navbarot ili ne
hamburgerButton.addEventListener('click', () => navbarMenu.style.visibility = 'visible');
closeNavBtn.addEventListener('click', () => navbarMenu.style.visibility = 'hidden');
document.addEventListener('click', function(e) {
  if (navbarMenu.style.visibility === 'visible') {
    let isClickInsideElement = e.path.includes(navbarMenu) || e.path.includes(hamburgerButton); // dali ke se klikne nadvor od div-ot
    if (!isClickInsideElement) {
      navbarMenu.style.visibility = 'hidden'
    }
  };
  // if (!carousel.classList.contains('hidden')) {
  //   let isClickInsideElement = e.path.includes(carousel);
  //   if (!isClickInsideElement) {
  //     carousel.classList.add('hidden')
  //   }
  // }
});

cartStatus.style.visibility = 'hidden';

// toggle dali da bide visible ili hidden delot da se vidi sto ima vo cart
cartIcon.addEventListener('click', () => cartStatus.style.visibility = (cartStatus.style.visibility === 'hidden') ?
  cartStatus.style.visibility = 'visible' :
  cartStatus.style.visibility = 'hidden');

let cartQuantity = 0;

// da stoi brojot i posle refresh
if (sessionStorage.locStor) {
  if (sessionStorage.locStor !== '0') {
    cartCount.innerHTML = Number(sessionStorage.locStor);
  }
}

plusBtn.addEventListener('click', () => orderQty.innerHTML = Number(orderQty.innerHTML) + 1);
minusBtn.addEventListener('click', () => orderQty.innerHTML = (Number(orderQty.innerHTML) === 1) ? '1' : Number(orderQty.innerHTML) - 1);

const emptyCart = document.querySelector('.cart-empty');
const fullCart = document.querySelector('.cart-full');

const orderQtyInsideP = document.querySelector('#cart-qty');
const totalPrice = document.querySelector('#total-price');

addToCartBtn.addEventListener('click', function() {
  if (navbarMenu.style.visibility !== 'visible') {
    cartQuantity = Number(cartCount.innerHTML);
    cartCount.innerHTML = cartQuantity + Number(orderQty.innerHTML);
    cartQuantity = Number(cartCount.innerHTML);
    orderQtyInsideP.innerHTML = cartQuantity;
    totalPrice.innerHTML = ' $' + 125*cartQuantity;
    storeLocally(cartQuantity);
    cartCount.style.visibility = 'visible';
    if (fullCart.classList.contains('hidden')) {
      emptyCart.classList.add('hidden');
      fullCart.classList.remove('hidden');
    }
  };
});

const delButton = document.querySelector('.cart-full-content img:last-of-type');

delButton.addEventListener('click', () => decrementQty());

const decrementQty = function() {
  cartQuantity = Number(cartCount.innerHTML);
  if (cartQuantity >= 1) {
    cartCount.innerHTML = cartQuantity - 1;
    cartQuantity = Number(cartCount.innerHTML);
    orderQtyInsideP.innerHTML = cartQuantity;
    totalPrice.innerHTML = ' $' + 125*cartQuantity;
    storeLocally(cartQuantity);
    if (cartQuantity === 0) {
      cartCount.style.visibility = 'hidden';
      emptyCart.classList.remove('hidden');
      fullCart.classList.add('hidden');
    }
  }
}

if (Number(cartCount.innerHTML) > 0) {
  emptyCart.classList.add('hidden');
  fullCart.classList.remove('hidden');
  cartQuantity = Number(cartCount.innerHTML);
  orderQtyInsideP.innerHTML = cartQuantity;
  totalPrice.innerHTML = ' $' + 125*cartQuantity;
}

const storeLocally = function(storeNumber) {
  sessionStorage.setItem('locStor', storeNumber);
}

let dispPhoto = document.querySelector('#photo-display');
const leftBtn = document.querySelector('.left');
const rightBtn = document.querySelector('.right');

let i = 0;
leftBtn.addEventListener('click', () => {
  if (i >= 1) i -= 1;
  else if (i === 0) i = 2;
  pickPhoto(i);
});

rightBtn.addEventListener('click', () => {
  if (i < 2) i += 1;
  else if (i === 2) i = 0;
  pickPhoto(i);
});

const pickPhoto = function(i) {
  dispPhoto.src = 'images/image-product-' + (i+1) + '.jpg';
}

const photosGallery = document.querySelectorAll('.gallery-img');

for (let i = 0; i < photosGallery.length; i++) {
  photosGallery[i].addEventListener('click', function() {
    if (carousel.classList.contains('hidden')) {
    pickPhoto(i);
    for (const pic of photosGallery) pic.classList.remove('selected-img');
    photosGallery[i].classList.add('selected-img');
  }
  });
};

// media query
const hideElementMediaQuery = function (x) {
  if (x.matches) { // If media query matches
    leftBtn.classList.add('hidden');
    rightBtn.classList.add('hidden');
  } else {
    leftBtn.classList.remove('hidden');
    rightBtn.classList.remove('hidden');
  }
};
var x = window.matchMedia("(min-width: 650px)");
hideElementMediaQuery(x); // Call listener function at run time
x.addListener(hideElementMediaQuery); // Attach listener function on state changes

const carousel = document.querySelector('.carousel');
const exitCarosel = document.querySelector('#carousel-close');

const leftBtnCar = document.querySelector('.left-car');
const rightBtnCar = document.querySelector('.right-car');
const photoDispCar = document.querySelector('#photo-display-carousel');
const photoGalCar = document.querySelectorAll('.img-car');

dispPhoto.addEventListener('click', () => {
  let winSize = window.matchMedia("(min-width: 650px)");
  if (winSize.matches) {
  carousel.classList.remove('hidden');
  let j = [].findIndex.call(photosGallery, function(photo) {
    return photo.classList.contains('selected-img');
  });
  photoDispCar.src = 'images/image-product-' + (j+1) + '.jpg';
  let allButCarousel = document.querySelectorAll('body > *:not(.carousel)');
  for (let i = 0; i < allButCarousel.length; i++) { allButCarousel[i].classList.add('unclickable'); }
  }});

exitCarosel.addEventListener('click', () => {
  carousel.classList.add('hidden');
  let allButCarousel = document.querySelectorAll('body > *:not(.carousel)');
  for (let i = 0; i < allButCarousel.length; i++) { allButCarousel[i].classList.remove('unclickable'); }
});
document.addEventListener('keydown', function(event){
	if(event.key === "Escape"){
		carousel.classList.add('hidden');
    let allButCarousel = document.querySelectorAll('body > *:not(.carousel)');
    for (let i = 0; i < allButCarousel.length; i++) { allButCarousel[i].classList.remove('unclickable'); }
	}
});

leftBtnCar.addEventListener('click', () => {
  let j = [].findIndex.call(photoGalCar, function(photo) {
    return photo.classList.contains('selected-img');
  });
  if (j >= 1) j -= 1;
  else if (j === 0) j = 3;
  photoDispCar.src = 'images/image-product-' + (j+1) + '.jpg';
  console.log(j);
  for (const pic of photoGalCar) pic.classList.remove('selected-img');
  photoGalCar[j].classList.add('selected-img');
});

rightBtnCar.addEventListener('click', () => {
  let j = [].findIndex.call(photoGalCar, function(photo) {
    return photo.classList.contains('selected-img');
  });
  if (j <= 2) j += 1;
  else if (j === 3) j = 0;
  photoDispCar.src = 'images/image-product-' + (j+1) + '.jpg';
  console.log(j);
  for (const pic of photoGalCar) pic.classList.remove('selected-img');
  photoGalCar[j].classList.add('selected-img');
});

document.addEventListener('keydown', function(e) {
  if (e.keyCode == '37') {
    let j = [].findIndex.call(photoGalCar, function(photo) {
      return photo.classList.contains('selected-img');
    });
    if (j >= 1) j -= 1;
    else if (j === 0) j = 3;
    photoDispCar.src = 'images/image-product-' + (j+1) + '.jpg';
    console.log(j);
    for (const pic of photoGalCar) pic.classList.remove('selected-img');
    photoGalCar[j].classList.add('selected-img');
  }
})

document.addEventListener('keydown', function(e) {
  if (e.keyCode == '39') {
    let j = [].findIndex.call(photoGalCar, function(photo) {
      return photo.classList.contains('selected-img');
    });
    if (j <= 2) j += 1;
    else if (j === 3) j = 0;
    photoDispCar.src = 'images/image-product-' + (j+1) + '.jpg';
    console.log(j);
    for (const pic of photoGalCar) pic.classList.remove('selected-img');
    photoGalCar[j].classList.add('selected-img');
  }
});

for (let i = 0; i < photoGalCar.length; i++) {
  photoGalCar[i].addEventListener('click', function() {
    if (!carousel.classList.contains('hidden')) {
    photoDispCar.src = 'images/image-product-' + (i+1) + '.jpg';
    for (const pic of photoGalCar) pic.classList.remove('selected-img');
    photoGalCar[i].classList.add('selected-img');
    console.log(i)
  }
  });
};
