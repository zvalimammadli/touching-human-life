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
    heroVideosBtn: "Videoya bax",
    aboutTag: "Platforma haqqında",
    aboutTitle: "Haqqında",
    storiesTag: "Hekayələr arxivi",
    storiesTitle: "Hekayələr və video",
    categories: {
      all: "Hamısı",
      "education-right": "Təhsil hüququ",
      "child-rights": "Uşaq hüquqları",
      "disability-rights": "Əlilliyi olan şəxslərin hüquqları",
      "social-security": "Sosial təminat",
      "equality-rights": "Hüquq bərabərliyinin təmini"
    },
    labels: {
      problem: "Problem:",
      step: "Addım:",
      result: "Nəticə:",
      more: "Daha ətraflı məlumat üçün:",
      watch: "Videoya bax",
      category: "Kateqoriya"
    },
    empty: "Bu bölmə üzrə hazırda hekayə və video mövcud deyil."
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
    heroStoriesBtn: "Go to story",
    heroVideosBtn: "Watch video",
    aboutTag: "About the platform",
    aboutTitle: "About",
    storiesTag: "Story archive",
    storiesTitle: "Story and video",
    categories: {
      all: "All",
      "education-right": "Right to education",
      "child-rights": "Child rights",
      "disability-rights": "Rights of persons with disabilities",
      "social-security": "Social security",
      "equality-rights": "Ensuring equality of rights"
    },
    labels: {
      problem: "Problem:",
      step: "Step:",
      result: "Result:",
      more: "For more detailed information:",
      watch: "Watch video",
      category: "Category"
    },
    empty: "There is currently no story or video available for this category."
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
const navHome = document.getElementById("nav-home");
const navAbout = document.getElementById("nav-about");
const navStories = document.getElementById("nav-stories");
const navVideos = document.getElementById("nav-videos");
const filters = document.getElementById("filters");
const storyVideoContainer = document.getElementById("storyVideoContainer");
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
  aboutTag.textContent = t.aboutTag;
  aboutTitle.textContent = t.aboutTitle;
  storiesTag.textContent = t.storiesTag;
  storiesTitle.textContent = t.storiesTitle;

  navHome.textContent = t.nav.home;
  navAbout.textContent = t.nav.about;
  navStories.textContent = t.nav.stories;
  navVideos.textContent = t.nav.videos;

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
  renderStoryVideo();
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
    button.type = "button";
    button.className = `filter-btn ${selectedCategory === key ? "active" : ""}`;
    button.textContent = t.categories[key];
    button.addEventListener("click", () => {
      selectedCategory = key;
      renderFilters();
      renderStoryVideo();
      document.getElementById("stories").scrollIntoView({ behavior: "smooth" });
    });
    filters.appendChild(button);
  });
}

function getCurrentStory() {
  if (selectedCategory === "all") {
    return stories[0] || null;
  }
  return stories.find((story) => story.categoryKey === selectedCategory) || null;
}

function getCurrentVideo(categoryKey) {
  return videos.find((video) => video.categoryKey === categoryKey) || null;
}

function renderStoryVideo() {
  const t = siteData[currentLang];
  const story = getCurrentStory();

  storyVideoContainer.innerHTML = "";

  if (!story) {
    storyVideoContainer.innerHTML = `<div class="empty-state">${t.empty}</div>`;
    return;
  }

  const video = getCurrentVideo(story.categoryKey);

  if (!video) {
    storyVideoContainer.innerHTML = `<div class="empty-state">${t.empty}</div>`;
    return;
  }

  storyVideoContainer.innerHTML = `
    <div class="story-video-block">
      <div class="story-panel">
        <div class="story-meta">${story.category[currentLang]}</div>
        <h3>${story.title[currentLang]}</h3>
        <p class="story-line"><strong>${t.labels.problem}</strong> ${story.problem[currentLang]}</p>
        <p class="story-line"><strong>${t.labels.step}</strong> ${story.step[currentLang]}</p>
        <p class="story-line"><strong>${t.labels.result}</strong> ${story.result[currentLang]}</p>
      </div>

      <div class="video-panel">
        <h3>${video.title[currentLang]}</h3>
        <div class="video-frame-wrap">
          <iframe
            src="https://www.youtube.com/embed/${video.youtubeId}"
            title="${video.title[currentLang]}"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen>
          </iframe>
        </div>
        <p>${video.description[currentLang]}</p>
        <p class="detail-link-line">
          <span>${t.labels.more}</span>
          <a href="${video.moreInfo}" target="_blank" rel="noopener noreferrer">${video.moreInfo}</a>
        </p>
        <a class="video-link" href="${video.url}" target="_blank" rel="noopener noreferrer">${t.labels.watch}</a>
      </div>
    </div>
  `;
}

async function loadData() {
  try {
    const response = await fetch("data.json");
    const data = await response.json();
    stories = Array.isArray(data.stories) ? data.stories : [];
    videos = Array.isArray(data.videos) ? data.videos : [];
    setLanguage(currentLang);
  } catch (error) {
    console.error("Data loading error:", error);
  }
}

btnAz.addEventListener("click", () => setLanguage("az"));
btnEn.addEventListener("click", () => setLanguage("en"));

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
