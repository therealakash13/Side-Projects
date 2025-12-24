const cardContainer = document.querySelector(".card-container");
const filterByRegion = document.querySelector("#filter-by-region");
const closeIcon = document.querySelector("#close-icon");
const toTopBtn = document.querySelector(".toTop");
const searchInput = document.querySelector("#search-term");
const darkModeToggle = document.querySelector(".toggle");
const toggleBtn = document.querySelector("#toggle-text");
const darkIcon = document.querySelector("#dark-mode-icon");
const lightIcon = document.querySelector("#light-mode-icon");
const root = document.documentElement;
const cacheExpiry = 24 * 60 * 60 * 1000; // 24 hours expiration of time for cache

const fetchAllURL =
  "https://restcountries.com/v3.1/all?fields=name,capital,region,flags,population,currencies";

let allCountries = [];

// Dark Mode
darkModeToggle.addEventListener("click", () => {
  const isDark = root.getAttribute("dark-theme") === "dark";

  if (isDark) {
    root.removeAttribute("dark-theme");
    localStorage.setItem("theme", "light");
    darkIcon.style.display = "block";
    lightIcon.style.display = "none";
    toggleBtn.innerText = "Dark Mode";
  } else {
    root.setAttribute("dark-theme", "dark");
    localStorage.setItem("theme", "dark");
    darkIcon.style.display = "none";
    lightIcon.style.display = "block";
    toggleBtn.innerText = "Light Mode";
  }
});

// Scroll to top
toTopBtn.addEventListener("click", () => {
  window.scrollTo(0, 0);
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    toTopBtn.classList.add("show");
  } else {
    toTopBtn.classList.remove("show");
  }
});

// Render
function renderCountries(countries) {
  cardContainer.innerHTML = "";

  if (countries.length === 0) {
    cardContainer.innerHTML = `<p class="no-results">No countries found</p>`;
    return;
  }

  countries.forEach((country) => createCard(country));
}

// IIFE
(async function init() {
  lightIcon.style.display = "none";
  showSkeletons(12);
  allCountries = await fetchCountries(fetchAllURL, "all_countries");
  renderCountries(allCountries);
})();

(function themeInit() {
  const theme = localStorage.getItem("theme");

  if (theme === "dark") {
    root.setAttribute("dark-theme", "dark");
    darkIcon.style.display = "none";
    lightIcon.style.display = "block";
    toggleBtn.innerText = "Light Mode";
  } else {
    lightIcon.style.display = "none";
  }
})();

// Fetch
async function fetchCountries(url, cacheKey) {
  const cachedData = getCache(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  try {
    const res = await fetch(url);
    const data = await res.json();
    setCache(cacheKey, data);
    return data;
  } catch (err) {
    console.log(err);
    alert(err.message);
    return [];
  }
}

// Reset
closeIcon.addEventListener("click", () => {
  filterByRegion.value = "none";
  closeIcon.style.display = "none";
  renderCountries(allCountries);
});

// Search
searchInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase().trim();
  const filteredCountries = allCountries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm)
  );
  renderCountries(filteredCountries);
});

// Filter
filterByRegion.addEventListener("change", async (e) => {
  const region = filterByRegion.value;

  if (region === "none") {
    closeIcon.style.display = "none";
    renderCountries(allCountries);
    return;
  }

  closeIcon.style.display = "block";
  const regionData = await fetchCountries(
    `https://restcountries.com/v3.1/region/${region.toLowerCase()}`,
    `countries_region_${region.toLowerCase()}`
  );
  renderCountries(regionData);
});

// Card Creation
function createCard(country) {
  const card = document.createElement("a");
  card.className = "card";
  card.href = `Side-Projects/rest-countries-api-with-color-theme-switcher-master/country.html?name=${encodeURIComponent(country.name.common)}`;

  const img = document.createElement("img");
  img.src = `${country.flags.svg}`;

  const info = document.createElement("div");
  info.className = "info";

  info.innerHTML = `<h2>${
    country.name.common.length > 18
      ? country.name.common.slice(0, 18) + "..."
      : country.name.common
  }</h2>
        <p>Population: <span>${Number(country.population).toLocaleString(
          "en-IN"
        )}</span></p>
        <p>Region: <span>${country.region}</span></p>
        <p>Capital: <span>${country.capital?.join(", ")}</span></p>
        <p>
            Currency:
            ${Object.entries(country.currencies)
              .map(([code]) => `<span>${code}</span>`)
              .join(", ")}
        </p>`;
  card.append(img, info);
  cardContainer.append(card);
}

// Skeleton Effect
function showSkeletons(count = 8) {
  cardContainer.innerHTML = "";

  for (let i = 0; i < count; i++) {
    const card = document.createElement("div");
    card.className = "card skeleton-card";

    card.innerHTML = `
      <div class="skeleton skeleton-img"></div>
      <div class="info">
        <div class="skeleton skeleton-line"></div>
        <div class="skeleton skeleton-line short"></div>
        <div class="skeleton skeleton-line"></div>
      </div>
    `;

    cardContainer.appendChild(card);
  }
}

// Getting Cache
function getCache(key) {
  const cached = localStorage.getItem(key); // Fetch key from cache from localStorage
  if (!cached) return null; // if no cache return null

  const { data, timeStamp } = JSON.parse(cached); // Destructuring data and timestamp from cache

  // If its expired remove from localStorage
  if (Date.now() - timeStamp > cacheExpiry) {
    localStorage.removeItem(key);
    return null;
  }

  return data; // If not expired return data of that key
}

// Setting Cache
function setCache(key, data) {
  // Creating payload to store data in a key value pair
  const payload = {
    data,
    timeStamp: Date.now(),
  };
  localStorage.setItem(key, JSON.stringify(payload)); // Storing payload in localStorage
}
