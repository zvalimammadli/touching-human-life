const siteData = {
  az: {
    nav: {
      home: "Ana səhifə",
      about: "Haqqında",
      stories: "Hekayələr",
      videos: "Videolar"
    },
    logo: "İnsan həyatına toxunmaq",
    heroEyebrow: "Hüquqi hekayələr sadə dildə",
    heroTitle: "İnsan həyatına toxunmaq",
    heroStoriesBtn: "Hekayələrə keç",
    heroVideosBtn: "Videolara bax",
    aboutTag: "Platforma haqqında",
    aboutTitle: "Haqqında",
    storiesTag: "Hekayələr arxivi",
    storiesTitle: "Hekayələr",
    videosTag: "Video hekayələr",
    videosTitle: "Videolar",
    searchPlaceholder: "Axtar...",
    watchVideo: "Videoya bax",
    playLabel: "YouTube video",
    allFilter: "Hamısı",
    noStories: "Axtarışa uyğun hekayə tapılmadı.",
    stat1Label: "Format",
    stat1Value: "Sadə hekayələr",
    stat2Label: "Yanaşma",
    stat2Value: "İnsan mərkəzli",
    stat3Label: "Məqsəd",
    stat3Value: "Hüququ anlaşıqlı etmək",
    point1Title: "Sadə dil",
    point1Text: "Mürəkkəb hüquqi məsələlər daha aydın formada təqdim olunur.",
    point2Title: "Real hekayələr",
    point2Text: "Hər qərarın arxasında dayanan insan hekayəsi görünən olur.",
    point3Title: "Aydın nəticə",
    point3Text: "Qərardan sonra həyatlarda nə dəyişdiyi izah edilir."
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      stories: "Stories",
      videos: "Videos"
    },
    logo: "Touching Human Life",
    heroEyebrow: "Legal stories in simple language",
    heroTitle: "Touching Human Life",
    heroStoriesBtn: "Go to stories",
    heroVideosBtn: "Watch videos",
    aboutTag: "About the platform",
    aboutTitle: "About",
    storiesTag: "Story archive",
    storiesTitle: "Stories",
    videosTag: "Video stories",
    videosTitle: "Videos",
    searchPlaceholder: "Search...",
    watchVideo: "Watch video",
    playLabel: "YouTube video",
    allFilter: "All",
    noStories: "No stories found for this search.",
    stat1Label: "Format",
    stat1Value: "Simple stories",
    stat2Label: "Approach",
    stat2Value: "Human-centered",
    stat3Label: "Purpose",
    stat3Value: "Making law understandable",
    point1Title: "Simple language",
    point1Text: "Complex legal issues are presented in a clearer way.",
    point2Title: "Real stories",
    point2Text: "The human story behind each decision becomes visible.",
    point3Title: "Clear result",
    point3Text: "It explains what changed in people’s lives after the decision."
  }
};

let currentLang = localStorage.getItem("siteLang") || "az";
let selectedCategory = "all";
let stories = [];
let videos = [];

const btnAz = document.getElementById("btn-az");
const btnEn = document.getElementById("btn-en");
const siteLogo = document.getElementById("siteLogo");
const heroEyebrow = document.getElementById("heroEyebrow");
const heroTitle = document.getElementById("hero-title");
const heroStoriesBtn = document.getElementById("heroStoriesBtn");
const heroVideosBtn = document.getElementById("heroVideosBtn");
const aboutTag = document.getElementById("aboutTag");
const aboutTitle = document.getElementById("about-title");
const storiesTag = document.getElementById("storiesTag");
const storiesTitle = document.getElementById("stories-title");
const videosTag = document.getElementById("videosTag");
const videosTitle = document.getElementById("videos-title");
const searchInput = document.getElementById("searchInput");
const filters = document.getElementById("filters");
const storiesContainer = document.getElementById("storiesContainer");
const videosContainer = document.getElementById("videosContainer");
const navHome = document.getElementById("nav-home");
const navAbout = document.getElementById("nav-about");
const navStories = document.getElementById("nav-stories");
const navVideos = document.getElementById("nav-videos");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

const homeTextAz = document.getElementById("home-text-az");
const homeTextEn = document.getElementById("home-text-en");
const aboutTextAz = document.getElementById("about-text-az");
const aboutTextEn = document.getElementById("about-text-en");

const stat1Label = document.getElementById("stat1Label");
const stat1Value = document.getElementById("stat1Value");
const stat2Label = document.getElementById("stat2Label");
const stat2Value = document.getElementById("stat2Value");
const stat3Label = document.getElementById("stat3Label");
const stat3Value = document.getElementById("stat3Value");

const point1Title = document.getElementById("point1Title");
const point1Text = document.getElementById("point1Text");
const point2Title = document.getElementById("point2Title");
const point2Text = document.getElementById("point2Text");
const point3Title = document.getElementById("point3Title");
const point3Text = document.getElementById("point3Text");

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("siteLang", lang);

  const t = siteData[lang];

  siteLogo.textContent = t.logo;
  heroEyebrow.textContent = t.heroEyebrow;
  heroTitle.textContent = t.heroTitle;
  heroStoriesBtn.textContent = t.heroStoriesBtn;
  heroVideosBtn.textContent = t.heroVideosBtn;
  aboutTag.textContent = t.aboutTag;
  aboutTitle.textContent = t.aboutTitle;
  storiesTag.textContent = t.storiesTag;
  storiesTitle.textContent = t.storiesTitle;
  videosTag.textContent = t.videosTag;
  videosTitle.textContent = t.videosTitle;

  navHome.textContent = t.nav.home;
  navAbout.textContent = t.nav.about;
  navStories.textContent = t.nav.stories;
  navVideos.textContent = t.nav.videos;

  stat1Label.textContent = t.stat1Label;
  stat1Value.textContent = t.stat1Value;
  stat2Label.textContent = t.stat2Label;
  stat2Value.textContent = t.stat2Value;
  stat3Label.textContent = t.stat3Label;
  stat3Value.textContent = t.stat3Value;

  point1Title.textContent = t.point1Title;
  point1Text.textContent = t.point1Text;
  point2Title.textContent = t.point2Title;
  point2Text.textContent = t.point2Text;
  point3Title.textContent = t.point3Title;
  point3Text.textContent = t.point3Text;

  searchInput.placeholder = t.searchPlaceholder;

  if (lang === "az") {
    homeTextAz.classList.remove("hidden");
    aboutTextAz.classList.remove("hidden");
    homeTextEn.classList.add("hidden");
    aboutTextEn.classList.add("hidden");
    document.documentElement.lang = "az";
  } else {
    homeTextEn.classList.remove("hidden");
    aboutTextEn.classList.remove("hidden");
    homeTextAz.classList.add("hidden");
    aboutTextAz.classList.add("hidden");
    document.documentElement.lang = "en";
  }

  btnAz.classList.toggle("active", lang === "az");
  btnEn.classList.toggle("active", lang === "en");

  renderFilters();
  renderStories();
  renderVideos();
}

function getFilteredStories() {
  const query = searchInput.value.trim().toLowerCase();

  return stories.filter((story) => {
    const category = story.category[currentLang].toLowerCase();
    const title = story.title[currentLang].toLowerCase();
    const problem = story.problem[currentLang].toLowerCase();
    const step = story.step[currentLang].toLowerCase();
    const result = story.result[currentLang].toLowerCase();

    const matchesCategory =
      selectedCategory === "all" || story.categoryKey === selectedCategory;

    const matchesSearch =
      !query ||
      category.includes(query) ||
      title.includes(query) ||
      problem.includes(query) ||
      step.includes(query) ||
      result.includes(query);

    return matchesCategory && matchesSearch;
  });
}

function renderFilters() {
  const t = siteData[currentLang];
  const categoryMap = new Map();

  stories.forEach((story) => {
    if (!categoryMap.has(story.categoryKey)) {
      categoryMap.set(story.categoryKey, story.category[currentLang]);
    }
  });

  filters.innerHTML = "";

  const allButton = document.createElement("button");
  allButton.className = `filter-btn ${selectedCategory === "all" ? "active" : ""}`;
  allButton.textContent = t.allFilter;
  allButton.addEventListener("click", () => {
    selectedCategory = "all";
    renderFilters();
    renderStories();
  });
  filters.appendChild(allButton);

  categoryMap.forEach((value, key) => {
    const button = document.createElement("button");
    button.className = `filter-btn ${selectedCategory === key ? "active" : ""}`;
    button.textContent = value;
    button.addEventListener("click", () => {
      selectedCategory = key;
      renderFilters();
      renderStories();
    });
    filters.appendChild(button);
  });
}

function renderStories() {
  const t = siteData[currentLang];
  const filteredStories = getFilteredStories();

  storiesContainer.innerHTML = "";

  if (!filteredStories.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = t.noStories;
    storiesContainer.appendChild(empty);
    return;
  }

  filteredStories.forEach((story) => {
    const card = document.createElement("article");
    card.className = "story-card";

    card.innerHTML = `
      <div class="story-body">
        <div class="story-category">${story.category[currentLang]}</div>
        <h3 class="story-title">${story.title[currentLang]}</h3>
        <p class="story-line"><strong>${currentLang === "az" ? "Problem:" : "Problem:"}</strong> ${story.problem[currentLang]}</p>
        <p class="story-line"><strong>${currentLang === "az" ? "Addım:" : "Step:"}</strong> ${story.step[currentLang]}</p>
        <p class="story-line"><strong>${currentLang === "az" ? "Nəticə:" : "Result:"}</strong> ${story.result[currentLang]}</p>
      </div>
    `;

    storiesContainer.appendChild(card);
  });
}

function renderVideos() {
  const t = siteData[currentLang];
  videosContainer.innerHTML = "";

  videos.forEach((video) => {
    const card = document.createElement("article");
    card.className = "video-card";

    const thumbnail = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;

    card.innerHTML = `
      <div class="video-thumb-wrap">
        <img class="video-thumb" src="${thumbnail}" alt="${video.title[currentLang]}">
        <div class="play-badge">${t.playLabel}</div>
      </div>
      <div class="video-body">
        <h3 class="video-title">${video.title[currentLang]}</h3>
        <p>${video.description[currentLang]}</p>
        <a class="video-link" href="${video.url}" target="_blank" rel="noopener noreferrer">${t.watchVideo}</a>
      </div>
    `;

    videosContainer.appendChild(card);
  });
}

async function loadData() {
  try {
    const response = await fetch("data.json");
    const data = await response.json();
    stories = data.stories || [];
    videos = data.videos || [];
    setLanguage(currentLang);
  } catch (error) {
    console.error("Data loading error:", error);
  }
}

btnAz.addEventListener("click", () => setLanguage("az"));
btnEn.addEventListener("click", () => setLanguage("en"));
searchInput.addEventListener("input", renderStories);

menuToggle.addEventListener("click", () => {
  mainNav.classList.toggle("open");
});

document.querySelectorAll(".main-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
  });
});

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".main-nav a");

window.addEventListener("scroll", () => {
  let current = "home";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

loadData();
