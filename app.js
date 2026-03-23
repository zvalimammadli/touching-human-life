const storiesContainer = document.getElementById("stories");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");
const emptyState = document.getElementById("emptyState");

let storiesData = [];
let activeCategory = "Hamısı";

fetch("./data.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("data.json yüklənmədi");
    }
    return response.json();
  })
  .then((data) => {
    storiesData = data;
    renderStories();
  })
  .catch((error) => {
    storiesContainer.innerHTML = `<p class="empty-state">Məlumat yüklənmədi.</p>`;
    console.error(error);
  });

function renderStories() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  const filtered = storiesData.filter((item) => {
    const matchesCategory =
      activeCategory === "Hamısı" || item.category === activeCategory;

    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm) ||
      item.problem.toLowerCase().includes(searchTerm) ||
      item.solution.toLowerCase().includes(searchTerm) ||
      item.result.toLowerCase().includes(searchTerm);

    return matchesCategory && matchesSearch;
  });

  storiesContainer.innerHTML = "";

  if (filtered.length === 0) {
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";

  filtered.forEach((item) => {
    const card = document.createElement("article");
    card.className = "story-card";

    card.innerHTML = `
      <div class="story-content">
        <span class="story-category">${item.category}</span>
        <h4 class="story-title">${item.title}</h4>
        <p class="story-row"><b>Problem:</b> ${item.problem}</p>
        <p class="story-row"><b>Addım:</b> ${item.solution}</p>
        <p class="story-row"><b>Nəticə:</b> ${item.result}</p>
        ${item.link ? `<a class="story-link" href="${item.link}">Ətraflı bax</a>` : ""}
      </div>
    `;

    storiesContainer.appendChild(card);
  });
}

searchInput.addEventListener("input", renderStories);

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    activeCategory = btn.dataset.category;
    renderStories();
  });
});
