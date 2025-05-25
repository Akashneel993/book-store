document.addEventListener("DOMContentLoaded", function() {
  // Fetch books.json and handle errors
  fetch('books.json')
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      return response.json();
    })
    .then(books => {
      const container = document.getElementById("books-container");
      container.innerHTML = ""; // Clear before adding new elements

      books.forEach(book => {
        const div = document.createElement("div");
        div.className = "book-card";
        div.setAttribute("data-category", book.category.toLowerCase()); // Set category for filtering
        div.innerHTML = `
          <img src="${book.image}" alt="${book.title}">
          <h3>${book.title}</h3>
          <p><strong>${book.subtitle}</strong></p>
          <p>${book.description.substring(0, 120)}...</p>
          <a href="${book.link}" target="_blank" class="btn">Buy on Amazon</a>
        `;
        container.appendChild(div);
      });
    })
    .catch(error => console.error('Error fetching books:', error));

  // Search functionality improvement
  document.getElementById("search").addEventListener("input", function() {
    let query = this.value.trim().toLowerCase();
    document.querySelectorAll(".book-card").forEach(card => {
      let title = card.querySelector("h3").textContent.toLowerCase();
      let subtitle = card.querySelector("p strong")?.textContent.toLowerCase() || "";
      let description = card.querySelector("p:last-of-type")?.textContent.toLowerCase() || "";

      card.style.display = title.includes(query) || subtitle.includes(query) || description.includes(query) ? "block" : "none";
    });
  });

  // Category filtering optimization
  document.getElementById("category-filter").addEventListener("change", function() {
    let selectedCategory = this.value.toLowerCase();
    document.querySelectorAll(".book-card").forEach(card => {
      let category = card.getAttribute("data-category") || "";
      card.style.display = category.includes(selectedCategory) || selectedCategory === "all" ? "block" : "none";
    });
  });

  // Improved Dark Mode Toggle with Local Storage
  document.getElementById("dark-mode-toggle").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
  });

  // Ensure Dark Mode Persists on Reload
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
  }
});