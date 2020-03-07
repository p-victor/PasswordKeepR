let lastActiveCategory;

$("#sidebar div").on("click", function() {
  // remove "active" class from last clicked category
  $(lastActiveCategory).toggleClass("active");

  // make current category active
  $(this).toggleClass("active");
  $("body").css("background-color", "orange");
  $(".work").toggleClass("hide");
  lastActiveCategory = this;

  // show carousel for that category
  $(".carousel").removeClass("hide");
})

$(".carousel").carousel({interval: false});
