const params = new URLSearchParams(window.location.search);
const countryName = params.get("name");

const apiURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

fetch(apiURL)
  .then((data) => data.json())
  .then(async (res) => {
    const countryData = res[0];
    console.log(countryData);
    const nativeName = Object.values(countryData.name.nativeName)[0].common;
    const currencies = Object.values(countryData.currencies)
      .map((curr) => `${curr.name} (${curr.symbol})`)
      .join(", ");
    const languages = Object.values(countryData.languages)
      .map((lang) => `${lang}`)
      .join(", ");
    const population = Number(countryData.population).toLocaleString("en-IN");
    const capitals =  countryData.capital.join(", ");

    const flagImg = document.querySelector(".flag-img");
    flagImg.src = countryData.flags.svg;
    flagImg.alt = countryData.name.common;

    const infoContainer = document.querySelector(".info-container");

    const borderAnchors = await getBorders(countryData);

    infoContainer.innerHTML = `<h1>${countryData.name.common}</h1>
            <div class="country-info">
                <div>
                    <p>Native Name: <span>${nativeName}</span></p>
                    <p>Population: <span>${population}</span></p>
                    <p>Region: <span>${countryData.region}</span></p>
                    <p>Sub Region: <span>${countryData.subregion}</span></p>
                    <p>Capital: <span>${capitals}</span></p>
                </div>
                <div>
                    <p>Top Level Domain: <span>${countryData.tld[0]}</span></p>
                    <p>Currencies: <span>${currencies}</span></p>
                    <p>Languages: <span>${languages}</span></p>
                </div>
            </div>
            <p class="border-info">Border countries: ${borderAnchors}</p>`;
  })
  .catch((err) => console.log(err));

async function getBorders(countryData) {
  if (!countryData.borders || countryData.borders.length === 0) {
    return "None";
  }

  const borderLinks = await Promise.all(
    countryData.borders.map(async (code) => {
      const data = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
      const res = await data.json();
      const name = res[0].name.common;
      return `<a href="country.html?name=${encodeURIComponent(
        name
      )}">${name}</a>`;
    })
  );
  return borderLinks.join(", ");
}
