document.addEventListener("DOMContentLoaded", function() {
  fetch('books.json')
    .then(response => response.json())
    .then(books => {
      const container = document.getElementById("books-container");
      const fragment = document.createDocumentFragment();

      books.forEach(book => {
        const div = document.createElement("div");
        div.className = "book-card";
        div.innerHTML = `
          <img src="${book.image}" alt="${book.title}">
          <h3>${book.title}</h3>
          <p><strong>${book.subtitle}</strong></p>
          <p>${book.description.substring(0, 120)}...</p>
          <a href="${book.link}" target="_blank" class="btn">Buy on Amazon</a>
        `;
        fragment.appendChild(div);
      });

      container.appendChild(fragment);
    });

  document.getElementById("search").addEventListener("input", function() {
    let query = this.value.trim().toLowerCase();
    document.querySelectorAll(".book-card").forEach(card => {
        let title = card.querySelector("h3").textContent.toLowerCase();
        card.style.display = title.includes(query) ? "block" : "none";
    });
  });

  document.getElementById("category-filter").addEventListener("change", function() {
    let selectedCategory = this.value.toLowerCase();
    document.querySelectorAll(".book-card").forEach(card => {
        card.style.display = card.textContent.toLowerCase().includes(selectedCategory) || selectedCategory === "all" ? "block" : "none";
    });
  });

  document.getElementById("dark-mode-toggle").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
  });
});