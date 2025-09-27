const apiKey = "08655e017ab0c6c9c0f30f544c67abb8";
const baseUrl = "https://api.openweathermap.org";
const imgUrl = "https://openweathermap.org/img/wn";
let lang = "hi";
let unit = "metric";
let lat = 0;
let long = 0;
let cname = "";
let weather = {};

$(function () {
  $("#location").on("input", function () {
    if ($(this).val().trim() === "") {
      $("#info, #results, #resp, #unit").addClass("hidden");
      weather = {};
    } else if ($(this).val().trim().length > 3) {
      $("#resp").addClass("hidden");
      fetchGeoocde($(this).val());
    }
  });

  $("#results").on("click", ".searchbtn", function () {
    $("#results").addClass("hidden");
    $("#info").removeClass("hidden");

    lat = $(this).data("lat");
    long = $(this).data("lon");

    fetchData(lat, long, cname);
  });

  $(window)
    .on("resize", function () {
      if ($(window).width() < 316) {
        $(".sep").html(`<br/>`);
      } else {
        $(".sep").html(`<span class="sep">|</span>`);
      }
    })
    .trigger("resize");

  $("#unit").on("change", function () {
    unit = $(this).val();
    // $("#results ul").remove();
    $("#info").addClass("hidden");
    fetchData(weather.coord.lat, weather.coord.lon);
    if (unit === "imperial") {
      $(".deg").text("°F");
      $(".speed-unit").text("mph");
    } else if (unit === "metric") {
      $(".deg").text("°C");
      $(".speed-unit").text("m/s");
    }
    $("#info").removeClass("hidden");
  });
});

function dataSetter(weatherData) {
  // Location
  $("#city-name").text(weatherData.name);
  $("#country").text(weatherData.sys.country);
  $("#lat").text(Math.round(weatherData.coord.lat * 10) / 10);
  $("#long").text(Math.round(weatherData.coord.lon * 10) / 10);

  // Weather Overview
  $("#weather-main").text(weatherData.weather[0].main);
  $("#weather-desc").text(weatherData.weather[0].description);
  $("#weather-icon").attr(
    "src",
    `${imgUrl}/${weatherData.weather[0].icon}.png`
  );

  // Metric: C | Imperial: F
  $("#temp").text(weatherData.main.temp);
  $("#feels-like").text(weatherData.main.feels_like);
  $("#temp-min").text(weatherData.main.temp_min);
  $("#temp-max").text(weatherData.main.temp_max);

  // Additional Info
  $("#humidity").text(weatherData.main.humidity); // %
  $("#pressure").text(weatherData.main.pressure); // hPa
  $("#visibility").text(weatherData.visibility); // m

  // Wind Info
  $("#wind-deg").text(weatherData.wind.deg); // meteorological degrees
  $("#wind-gust").text(weatherData.wind.gust); // Imp: miles/hour  metric: meter/sec
  $("#wind-speed").text(weatherData.wind.speed); // Imp: miles/hour  metric: meter/sec

  // Cloud: %
  $("#clouds-all").text(weatherData.clouds.all);

  // Sunrise/Sunset: unix, UTC
  // Convert timestamp to local time
  $("#sunrise").text(
    new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()
  );
  $("#sunset").text(
    new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()
  );
}

function fetchData(latitude, longitude, name) {
  if (!latitude || !longitude) {
    throw new Error("Can't fetch data! Latitude, Longitude required.");
  }

  fetch(
    `${baseUrl}/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`
  )
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      weather = data;
      dataSetter(weather);
      $("#info").removeClass("hidden");
      $("#unit").removeClass("hidden");
    })
    .catch(function (error) {
      console.log(error);
    });
}

function fetchGeoocde(str) {
  $("#results ul, #resp").empty();
  weather = {};

  fetch(`${baseUrl}/geo/1.0/direct?q=${str}&limit=5&appid=${apiKey}`)
    .then(function (res) {
      if (!res.status) {
        throw new Error("Unable to fetch results !");
      }
      return res.json();
    })
    .then(function (data) {
      if (data.length === 0) {
        throw new Error("No Data Available !");
      }

      let result = data.map((item) => ({
        name: item.name || "",
        local_names: item.local_names || {},
        lat: item.lat || 0,
        lon: item.lon || 0,
        country: item.country || "",
        state: item.state || "",
      }));

      $.each(result, function (idx, loc) {
        let $li = $(`
      <li class="searchbtn border" data-lat="${loc.lat}" data-lon="${loc.lon}" data-name="${loc.name}" data-country="${loc.country}" data-state="${loc.state}">
        <span class="name">${loc.name}</span>
        <span class="state">${loc.state}</span>
        <span class="country">${loc.country}</span>
      </li>
    `);
        $("#results ul").append($li);
      });

      $("#resp").addClass("hidden");
      $("#results").removeClass("hidden");
    })
    .catch(function (error) {
      $("#results, #resp").removeClass("hidden");
      $("#info").addClass("hidden");
      $("#resp").css("marginBottom", 0).text(error.message);
    });
}
