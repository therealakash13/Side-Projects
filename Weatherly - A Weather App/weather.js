const apiKey = "08655e017ab0c6c9c0f30f544c67abb8";
const baseUrl = "https://api.openweathermap.org";
const imgUrl = "https://openweathermap.org/img/wn";
let lang = "hi";
let unit = "metric";
let lat = 0;
let long = 0;
let cname = "";

$(function () {
  $("#location").on("input", function () {
    if ($(this).val().trim() === "") {
      $("#info, #results, #resp").addClass("hidden");
    } else if ($(this).val().trim().length > 3) {
      fetchGeoocde($(this).val());
    } else {
      $("#search_btn").removeClass("disabled");
    }
  });

  $("#results").on("click", ".searchbtn", function () {
    $("#results").addClass("hidden");
    $("#info").removeClass("hidden");

    lat = $(this).data("lat");
    long = $(this).data("lon");
    cname = $(this).data("name");

    fetchData(lat, long, cname);
  });

  $("#results").on("mouseenter", "li", function () {
    $("#results li").removeClass("border");
  });
  $("#results").on("mouseleave", "li", function () {
    $("#results li").addClass("border");
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
    $("#results ul").remove();
    $("#info").addClass("hidden");
    fetchData(lat, long, cname);
    if (unit === "imperial") {
      $(".deg").text("°F");
      $(".speed-unit").text("mph");
    } else if (unit === "metric") {
      $(".deg").text("°C");
      $(".speed-unit").text("m/s");
    }
    $("#info").removeClass("hidden");

    // Whenever the unit changes and search again there is nothing in results is hidden i guess
  });
});

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
      // Location
      $("#city-name").text(data.name);
      $("#country").text(data.sys.country);
      $("#lat").text(Math.round(data.coord.lat * 10) / 10);
      $("#long").text(Math.round(data.coord.lon * 10) / 10);

      // Weather Overview
      $("#weather-main").text(data.weather[0].main);
      $("#weather-desc").text(data.weather[0].description);
      $("#weather-icon").attr("src", `${imgUrl}/${data.weather[0].icon}.png`);

      // Temperature
      // Imperial: F
      // $("#temp").text((data.main.temp - 273.15).toFixed(1));
      // $("#feels-like").text((data.main.feels_like - 273.15).toFixed(1));
      // $("#temp-min").text((data.main.temp_min - 273.15).toFixed(1));
      // $("#temp-max").text((data.main.temp_max - 273.15).toFixed(1));

      // Metric: C
      $("#temp").text(data.main.temp);
      $("#feels-like").text(data.main.feels_like);
      $("#temp-min").text(data.main.temp_min);
      $("#temp-max").text(data.main.temp_max);

      // Additional Info
      $("#humidity").text(data.main.humidity); // %
      $("#pressure").text(data.main.pressure); // hPa
      $("#visibility").text(data.visibility); // m

      // Wind Info
      $("#wind-speed").text(data.wind.speed); // meter/sec
      $("#wind-deg").text(data.wind.deg); // meteorological degrees
      $("#wind-gust").text(data.wind.gust); // Imp: miles/hour  metric: meter/sec

      // Cloud
      $("#clouds-all").text(data.clouds.all); // %

      // Sunrise/Sunset
      // Convert timestamp to local time
      $("#sunrise").text(
        new Date(data.sys.sunrise * 1000).toLocaleTimeString()
      ); // unix, UTC
      $("#sunset").text(new Date(data.sys.sunset * 1000).toLocaleTimeString()); // unix, UTC

      $("#info").removeClass("hidden");
    })
    .catch(function (error) {
      console.log(error);
    });
}

function fetchGeoocde(str) {
  $("#results ul, #resp").empty();

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

      $("#results").removeClass("hidden");
    })
    .catch(function (error) {
      $("#results, #resp").removeClass("hidden");
      $("#info").addClass("hidden");
      $("#resp").css("marginBottom", 0).text(error.message);
    });
}
