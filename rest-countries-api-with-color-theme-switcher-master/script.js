const cardContainer = document.querySelector(".card-container");
const filterByRegion = document.querySelector("#filter-by-region");
const closeIcon = document.querySelector("#close-icon");
const toTopBtn = document.querySelector(".toTop");
const searchInput = document.querySelector("#search-term");
const fetchAllURL =
  "https://restcountries.com/v3.1/all?fields=name,capital,region,flags,population,currencies";

let allCountries = [];

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
  showSkeletons(12);
  allCountries = await fetchCountries(fetchAllURL);
  renderCountries(allCountries);
})();

// Fetch
async function fetchCountries(url) {
  try {
    const res = await fetch(url);
    return await res.json();
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
    `https://restcountries.com/v3.1/region/${region.toLowerCase()}`
  );
  renderCountries(regionData);
});

// Card Creation
function createCard(country) {
  const card = document.createElement("a");
  card.className = "card";
  card.href = `/country.html?name=${encodeURIComponent(country.name.common)}`;

  const img = document.createElement("img");
  img.src = `${country.flags.svg}`;

  const info = document.createElement("div");
  info.className = "info";

  info.innerHTML = `<h2>${country.name.common}</h2>
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
