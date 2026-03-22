let currentLang = localStorage.getItem("siteLang") || "en";
let allStories = [];
let activeFilter = "all";

const uiText = {
  en: {
    subtitle: "Legal stories in plain language",
    heroTitle: "Legal stories that change lives",
    heroText: "A digital platform that explains constitutional justice through real human stories, showing the problem, the legal step, and the impact on people's lives.",
    tag1: "Human-centered",
    tag2: "Simple language",
    tag3: "Video stories",
    storyBoxTitle: "How each story is told",
    problemTitle: "Problem",
    problemText: "What was the issue affecting a person’s life?",
    actionTitle: "Action",
    actionText: "What legal step was taken by the Ombudsman?",
    resultTitle: "Result",
    resultText: "What changed in law, interpretation, or practice?",
    storiesTitle: "Stories",
    openStory: "Open story →",
    searchPlaceholder: "Search stories...",
    emptyState: "No stories found.",
    filterAll: "All",
    filterSocial: "Social rights",
    filterJustice: "Justice",
    filterChild: "Child rights"
  },
  az: {
    subtitle: "Hüquqi hekayələr sadə dildə",
    heroTitle: "İnsan həyatını dəyişən hüquqi hekayələr",
    heroText: "Konstitusiya ədalət mühakiməsini real insan hekayələri vasitəsilə izah edən rəqəmsal platforma. Burada problem, hüquqi addım və insanların həyatında yaranan dəyişiklik sadə şəkildə təqdim olunur.",
    tag1: "İnsan yönümlü",
    tag2: "Sadə dil",
    tag3: "Video hekayələr",
    storyBoxTitle: "Hər hekayə necə izah olunur",
    problemTitle: "Problem",
    problemText: "Şəxsin həyatına təsir edən məsələ nə idi?",
    actionTitle: "Addım",
    actionText: "Ombudsman hansı hüquqi addımı atdı?",
    resultTitle: "Nəticə",
    resultText: "Qanunda, təfsirdə və ya praktikada nə dəyişdi?",
    storiesTitle: "Hekayələr",
    openStory: "Hekayəni aç →",
    searchPlaceholder: "Hekayələrdə axtar...",
    emptyState: "Heç bir hekayə tapılmadı.",
    filterAll: "Hamısı",
    filterSocial: "Sosial hüquqlar",
    filterJustice: "Ədalət mühakiməsi",
    filterChild: "Uşaq hüquqları"
  }
};

function applyUIText() {
  const t = uiText[currentLang];
  document.getElementById("brand-subtitle").textContent = t.subtitle;
  document.getElementById("hero-title").textContent = t.heroTitle;
  document.getElementById("hero-text").textContent = t.heroText;
  document.getElementById("tag1").textContent = t.tag1;
  document.getElementById("tag2").textContent = t.tag2;
  document.getElementById("tag3").textContent = t.tag3;
  document.getElementById("story-box-title").textContent = t.storyBoxTitle;
  document.getElementById("box-problem-title").textContent = t.problemTitle;
  document.getElementById("box-problem-text").textContent = t.problemText;
  document.getElementById("box-action-title").textContent = t.actionTitle;
  document.getElementById("box-action-text").textContent = t.actionText;
  document.getElementById("box-result-title").textContent = t.resultTitle;
  document.getElementById("box-result-text").textContent = t.resultText;
  document.getElementById("stories-title").textContent = t.storiesTitle;
  document.getElementById("langToggle").textContent = currentLang === "en" ? "EN | AZ" : "AZ | EN";
  document.getElementById("searchInput").placeholder = t.searchPlaceholder;
  document.getElementById("emptyState").textContent = t.emptyState;
  document.getElementById("filter-all").textContent = t.filterAll;
  document.getElementById("filter-social").textContent = t.filterSocial;
  document.getElementById("filter-justice").textContent = t.filterJustice;
  document.getElementById("filter-child").textContent = t.filterChild;
}

function normalizeCategoryForFilter(item) {
  return item.category;
}

function getVisibleStories() {
  const query = document.getElementById("searchInput").value.toLowerCase().trim();

  return allStories.filter((item) => {
    const title = currentLang === "az" ? item.az.title : item.title;
    const description = currentLang === "az" ? item.az.description : item.description;

    const matchesSearch =
      title.toLowerCase().includes(query) ||
      description.toLowerCase().includes(query);

    const matchesFilter =
      activeFilter === "all" || normalizeCategoryForFilter(item) === activeFilter;

    return matchesSearch && matchesFilter;
  });
}

function renderCards(items) {
  const container = document.getElementById("cardsContainer");
  const emptyState = document.getElementById("emptyState");
  const t = uiText[currentLang];

  container.innerHTML = "";

  if (!items.length) {
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";

  items.forEach((item) => {
    const title = currentLang === "az" ? item.az.title : item.title;
    const category = currentLang === "az" ? item.az.category : item.category;
    const description = currentLang === "az" ? item.az.description : item.description;

    const card = document.createElement("a");
    card.className = "card";
    card.href = `case.html?id=${item.id}`;

    card.innerHTML = `
      <img src="${item.image}" alt="${title}">
      <div class="card-body">
        <span class="card-category">${category}</span>
        <h4>${title}</h4>
        <p>${description}</p>
        <div class="card-link">${t.openStory}</div>
      </div>
    `;

    container.appendChild(card);
  });
}

function updateStories() {
  const visibleStories = getVisibleStories();
  renderCards(visibleStories);
}

function toggleLanguage() {
  currentLang = currentLang === "en" ? "az" : "en";
  localStorage.setItem("siteLang", currentLang);
  applyUIText();
  updateStories();
}

async function loadStories() {
  try {
    const response = await fetch("./data.json");
    const data = await response.json();
    allStories = data;
    updateStories();
  } catch (error) {
    document.getElementById("emptyState").style.display = "block";
    document.getElementById("emptyState").textContent = "data.json yüklənmədi.";
  }
}

document.getElementById("langToggle").addEventListener("click", toggleLanguage);
document.getElementById("searchInput").addEventListener("input", updateStories);

document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    activeFilter = btn.dataset.filter;
    updateStories();
  });
});

applyUIText();
loadStories();
