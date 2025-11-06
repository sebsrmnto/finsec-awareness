// ========== BACK TO TOP BUTTON ==========
const backToTopBtn = document.getElementById("backToTop");

// show button when scrolling down
window.addEventListener("scroll", function() {
  if (window.scrollY > 300) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
});

// when button is clicked, scroll to top
backToTopBtn.addEventListener("click", function() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
