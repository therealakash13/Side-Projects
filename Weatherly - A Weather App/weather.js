var apiKey = "08655e017ab0c6c9c0f30f544c67abb8";
var city = "Delhi";
var lang = "hi";
var searchRes = {
  name: "",
  local_names: {},
  lat: 0,
  lon: 0,
  country: "",
  state: "",
};

$(function () {
  $("#location").on("input", function () {
    if ($(this).val().trim() === "") {
      $("#info").addClass("hidden");
      $("#results").addClass("hidden");
      $("#resp").addClass("hidden");
    } else if ($(this).val().trim().length > 4) {
      fetchGeoocde($(this).val());
    } else {
      $("#search_btn").removeClass("disabled");
    }

    // $("#search_btn").on("click", function () {
    //   var loc = $("#location").val();
    //   fetchData(loc, apiKey, lang);
    //   $("#results").addClass("hidden");
    // });

    $("#results").on("click", ".searchbtn", function () {
      $("#results").addClass("hidden");
      $("#info").removeClass("hidden");

      var lat = $(this).data("lat");
      var lon = $(this).data("lon");
      var name = $(this).data("name");
      var country = $(this).data("country");
      var state = $(this).data("state");

      fetchData(lat, lon, name);
    });

    $("#results").on("mouseenter", "li", function () {
      $("#results li").removeClass("border");
    });
    $("#results").on("mouseleave", "li", function () {
      $("#results li").addClass("border");
    });
  });

  $(window)
    .on("resize", function () {
      if ($(window).width() < 316) {
        $(".sep").html(`<br/>`);
      } else{
        $(".sep").html(`<span class="sep">|</span>`);
      }
    })
    .trigger("resize");
});

function fetchData(latitude, longitude, name) {
  if (!latitude || !longitude) {
    throw new Error("Can't fetch data! Latitude, Longitude required.");
  }

  var url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      // console.log(data);
      $("#info").removeClass("hidden");

      $("#city-name").text(data.name);
      $("#country").text(data.sys.country);

      $("#weather-main").text(data.weather[0].main);
      $("#weather-desc").text(data.weather[0].description);
      $("#weather-icon").attr(
        "src",
        `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
      );

      // Location
      $("#lat").text(Math.round(data.coord.lat * 10) / 10);
      $("#long").text(Math.round(data.coord.lon * 10) / 10);

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

      $("#wind-gust").text(data.wind.gust); // Imp: miles/hour  metric: meter/sec

      $("#humidity").text(data.main.humidity); // %
      $("#pressure").text(data.main.pressure); // hPa
      $("#visibility").text(data.visibility); // m

      $("#wind-speed").text(data.wind.speed); // meter/sec
      $("#wind-deg").text(data.wind.deg); // meteorological degrees

      $("#clouds-all").text(data.clouds.all); // %

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
  $("#results ul").empty();
  $("#resp").empty();

  var url1 =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    str +
    "&limit=5&appid=" +
    apiKey;

  fetch(url1)
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

      var res = data.map((item) => ({
        name: item.name || "",
        local_names: item.local_names || {},
        lat: item.lat || 0,
        lon: item.lon || 0,
        country: item.country || "",
        state: item.state || "",
      }));

      $.each(res, function (idx, loc) {
        var $li = $(`
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
      $("#results").removeClass("hidden");
      $("#info").addClass("hidden");
      $("#resp").removeClass("hidden");
      $("#resp").css("marginBottom", 0).text(error.message);
    });
}
