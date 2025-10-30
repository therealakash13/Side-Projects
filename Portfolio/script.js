(function () {
  emailjs.init("aCmjro_bmIHU4V_jY");
})();

$(function () {
  $("#menu-btn").on("click", function () {
    $("#nav-links").addClass("show");
  });

  $("#close-btn").on("click", function () {
    $("#nav-links").removeClass("show");
  });

  $(".resume-tabs .tab").on("click", function () {
    $(".resume-tabs .tab").removeClass("active");
    $(".resume-content .tab-content").removeClass("active");

    $(this).addClass("active");
    $("#" + $(this).data("tab")).addClass("active");
  });

  $(".tab-menu-btn").on("click", function () {
    const $siblings = $(this).siblings();

    const $defaultTab = $(".resume-tabs .tab").filter(function () {
      return $(this).data("tab") === "skills";
    });

    $defaultTab.addClass("active");
    $("#" + $defaultTab.data("tab")).addClass("active");

    if ($siblings.is(":visible")) {
      $siblings.hide();
      $(".tab-menu-btn")
        .children("img")
        .attr("src", "./assets/images/menu.svg");
    } else {
      $siblings.show();
      $(".tab-menu-btn")
        .children("img")
        .attr("src", "./assets/images/close.svg");
    }
  });

  $(".contact-form").on("submit", function (e) {
    e.preventDefault();

    emailjs
      .send("service_5x8ly38", "template_yoviw1b", {
        name: $("#name").val(),
        email: $("#email").val(),
        message: $("#message").val(),
      })
      .then(
        function (response) {
          alert("Message sent successfully!");
          $(".contact-form")[0].reset();
        },
        function (error) {
          alert("Failed to send message. Try again later.");
          console.log(error);
        }
      );
  });
});
