// When the user scrolls the page, execute myFunction
window.onscroll = function () {
  myFunction();
  // myFunction2();
};

// Get the navbar and the cart
var navbar = document.getElementById("navbar");
// var cart = document.getElementById("cart");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;
// var stickyCart = cart.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}

// function myFunction3() {
//   if (window.pageYOffset >= sticky) {
//     cart.classList.add("stickyCart");
//   } else {
//     cart.classList.remove("stickyCart");
//   }
// }

// popup menu
const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");

openModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    const cartTotalPrice = document.getElementsByClassName(
      "cart-total-price"
    )[0].innerText;
    // pound sign must be removed from cart to help calculate minimum order
    var number = Number(cartTotalPrice.replace("£", ""));
    if (number < 12) {
      alert("Minimum order must be above £12 please");
    } else {
      openModal(modal);
    }
  });
});

overlay.addEventListener("click", () => {
  const modals = document.querySelectorAll(".modal.active");
  modals.forEach((modal) => {
    closeModal(modal);
  });
});

closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closeModal(modal);
  });
});

function openModal(modal) {
  if (modal == null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
}

function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
}
