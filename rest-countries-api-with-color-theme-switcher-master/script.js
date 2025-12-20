const cardContainer = document.querySelector(".card-container");

const apiURL =
  "https://restcountries.com/v3.1/all?fields=name,capital,region,flags,population,currencies";
fetch(apiURL)
  .then((data) => data.json())
  .then((res) => {
    res.forEach((country) => {
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
        <p>Capital: <span>${country.capital}</span></p>
        <p>
            Currency:
            ${Object.entries(country.currencies)
              .map(([code, data]) => `<span>${code}</span>`)
              .join(", ")}
        </p>`;
      card.append(img, info);
      cardContainer.append(card);
    });
  })
  .catch((err) => {
    console.log(err);
    alert(err.message);
  });
