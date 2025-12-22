const cardContainer = document.querySelector(".card-container");
const filterByRegion = document.querySelector("#filter-by-region");
const closeIcon = document.querySelector("#close-icon");

const apiURL =
  "https://restcountries.com/v3.1/all?fields=name,capital,region,flags,population,currencies";

renderCountries(apiURL);

function renderCountries(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      cardContainer.innerHTML = "";
      data.forEach((countryDetail) => createCard(countryDetail));
    })
    .catch((err) => {
      console.log(err);
      alert(err.message);
    });
}

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

closeIcon.addEventListener("click", () => {
  filterByRegion.value = "none";
  closeIcon.style.display = "none";
  renderCountries(apiURL);
});

filterByRegion.addEventListener("change", (e) => {
  const region = filterByRegion.value;

  if (region === "none") {
    closeIcon.style.display = "none";
    renderCountries(apiURL);
    return;
  }

  closeIcon.display = "block";
  closeIcon.style.display = "block";
  const regionUrl = `https://restcountries.com/v3.1/region/${region.toLowerCase()}`;
  renderCountries(regionUrl);
});

// Implement search functionality [try changing render function by passing array of country details not url]
