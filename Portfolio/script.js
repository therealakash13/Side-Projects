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
});
