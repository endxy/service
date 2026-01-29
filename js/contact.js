const faqItems = document.querySelectorAll(".faq-list li");

faqItems.forEach(item => {
  item.addEventListener("click", () => {
    item.classList.toggle("active");
  });
});