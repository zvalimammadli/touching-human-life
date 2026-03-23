let currentLang = localStorage.getItem("siteLang") || "az";
let selectedCategory = "all";
let stories = [];
let videos = [];

const btnAz = document.getElementById("btn-az");
const btnEn = document.getElementById("btn-en");

function switchLang(lang) {
  currentLang = lang;
  localStorage.setItem("siteLang", lang);

  document.querySelectorAll(".lang-block").forEach(el => {
    el.classList.add("hidden");
  });

  document.querySelectorAll(`#${lang}-text, #home-text-${lang}, #about-text-${lang}`).forEach(el => {
    el.classList.remove("hidden");
  });

  renderFilters();
  renderStories();
  renderVideos();
}

btnAz.onclick = () => switchLang("az");
btnEn.onclick = () => switchLang("en");

function renderFilters() {
  const filters = document.getElementById("filters");

  const categories = {
    "all": currentLang === "az" ? "Hamısı" : "All",
    "education-right": currentLang === "az" ? "Təhsil hüququ" : "Right to education",
    "child-rights": currentLang === "az" ? "Uşaq hüquqları" : "Child rights",
    "disability-rights": currentLang === "az" ? "Əlilliyi olan şəxslərin hüquqları" : "Disability rights",
    "social-security": currentLang === "az" ? "Sosial təminat" : "Social security",
    "equality-rights": currentLang === "az" ? "Hüquq bərabərliyi" : "Equality"
  };

  filters.innerHTML = "";

  Object.keys(categories).forEach(key => {
    const btn = document.createElement("button");
    btn.className = "filter-btn" + (selectedCategory === key ? " active" : "");
    btn.innerText = categories[key];

    btn.onclick = () => {
      selectedCategory = key;
      renderFilters();
      renderStories();
    };

    filters.appendChild(btn);
  });
}

function renderStories() {
  const container = document.getElementById("storiesContainer");
  container.innerHTML = "";

  const filtered = stories.filter(s =>
    selectedCategory === "all" || s.categoryKey === selectedCategory
  );

  filtered.forEach(story => {
    container.innerHTML += `
      <div class="story-card">
        <div class="story-body">
          <div class="story-category">${story.category[currentLang]}</div>
          <h3 class="story-title">${story.title[currentLang]}</h3>
          <p><strong>Problem:</strong> ${story.problem[currentLang]}</p>
          <p><strong>${currentLang === "az" ? "Addım:" : "Step:"}</strong> ${story.step[currentLang]}</p>
          <p><strong>${currentLang === "az" ? "Nəticə:" : "Result:"}</strong> ${story.result[currentLang]}</p>
        </div>
      </div>
    `;
  });
}

function renderVideos() {
  const container = document.getElementById("videosContainer");
  container.innerHTML = "";

  videos.forEach(video => {
    container.innerHTML += `
      <div class="video-card">
        <img src="https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg" class="video-thumb"/>
        <div class="video-body">
          <h3>${video.title[currentLang]}</h3>
          <p>${video.description[currentLang]}</p>
          <p>
            ${currentLang === "az" ? "Daha ətraflı məlumat üçün:" : "More info:"}
            <a href="${video.moreInfo}" target="_blank">${video.moreInfo}</a>
          </p>
          <a href="${video.url}" target="_blank" class="video-link">
            ${currentLang === "az" ? "Videoya bax" : "Watch video"}
          </a>
        </div>
      </div>
    `;
  });
}

fetch("data.json")
  .then(res => res.json())
  .then(data => {
    stories = data.stories;
    videos = data.videos;
    switchLang(currentLang);
  });
