var apiKey = "08655e017ab0c6c9c0f30f544c67abb8";
var city = "Delhi";
var lang = "hi";

$(function () {
  $("#location").on("input", function () {
    if ($(this).val().trim() === "") {
      $("#search_btn").addClass("disabled");
      $("#search").removeClass("end");
      $("#results").addClass("hidden");
    } else if ($(this).val().trim().length > 4) {
      $("#results").removeClass("hidden");
      fetchGeoocde($(this).val());
    } else {
      $("#search_btn").removeClass("disabled");
      $("#search").addClass("end");
    }

    $("#search_btn").on("click", function () {
      var loc = $("#location").val();
      fetchData(loc, apiKey, lang);
      $("#results").addClass("hidden");

    });
  });
});

function fetchData(city, key, lang) {
  var url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    key;
  fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);
      $("#city_name").text(data.name);
      $("#info").removeClass("hidden");
    });
  // .catch();
}

function fetchGeoocde(str) {
  console.log(str);
  var url1 =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    str +
    "&limit=5&appid=" +
    apiKey;

  fetch(url1)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);
    });
}
