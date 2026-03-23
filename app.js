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
    featuredTag: "Seçilmiş video",
    featuredTitle: "Təhsil hüququ üzrə video",
    featuredVideoText: "Təhsil hüququ ilə bağlı hazırlanmış hekayə əsaslı video.",
    detailLabel: "Daha ətraflı məlumat üçün:",
    aboutTag: "Platforma haqqında",
    aboutTitle: "Haqqında",
    storiesTag: "Hekayələr arxivi",
    storiesTitle: "Hekayələr",
    videosTag: "Video hekayələr",
    videosTitle: "Videolar",
    searchPlaceholder: "Axtar...",
    watchVideo: "Videoya bax",
    playLabel: "YouTube video",
    noStories: "Axtarışa uyğun hekayə tapılmadı.",
    categories: {
      all: "Hamısı",
      education-right: "Təhsil hüququ",
      child-rights: "Uşaq hüquqları",
      disability-rights: "Əlilliyi olan şəxslərin hüquqları",
      social-security: "Sosial təminat",
      equality-rights: "Hüquq bərabərliyinin təmini"
    }
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
    featuredTag: "Featured video",
    featuredTitle: "Video on the right to education",
    featuredVideoText: "A story-based video prepared on the right to education.",
    detailLabel: "For more detailed information:",
    aboutTag: "About the platform",
    aboutTitle: "About",
    storiesTag: "Story archive",
    storiesTitle: "Stories",
    videosTag: "Video stories",
    videosTitle: "Videos",
    searchPlaceholder: "Search...",
    watchVideo: "Watch video",
    playLabel: "YouTube video",
    noStories: "No stories found for this search.",
    categories: {
      all: "All",
      education-right: "Right to education",
      child-rights: "Child rights",
      disability-rights: "Rights of persons with disabilities",
      social-security: "Social security",
      equality-rights: "Equality before the law"
    }
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
const featuredTag = document.getElementById("featuredTag");
const featuredTitle = document.getElementById("featuredTitle");
const featuredVideoText = document.getElementById("featuredVideoText");
const detailLabel = document.getElementById("detailLabel");
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

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("siteLang", lang);

  const t = siteData[lang];

  siteLogo.textContent = t.logo;
  heroEyebrow.textContent = t.heroEyebrow;
  heroTitle.textContent = t.heroTitle;
  heroStoriesBtn.textContent = t.heroStoriesBtn;
  heroVideosBtn.textContent = t.heroVideosBtn;
  featuredTag.textContent = t.featuredTag;
  featuredTitle.textContent = t.featuredTitle;
  featuredVideoText.textContent = t.featuredVideoText;
  detailLabel.textContent = t.detailLabel;
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
  const order = [
    "all",
    "education-right",
    "child-rights",
    "disability-rights",
    "social-security",
    "equality-rights"
  ];

  filters.innerHTML = "";

  order.forEach((key) => {
    const button = document.createElement("button");
    button.className = `filter-btn ${selectedCategory === key ? "active" : ""}`;
    button.textContent = t.categories[key];
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
        <p class="detail-link-line">
          <span>${t.detailLabel}</span>
          <a href="${video.moreInfo}" target="_blank" rel="noopener noreferrer">${video.moreInfo}</a>
        </p>
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
