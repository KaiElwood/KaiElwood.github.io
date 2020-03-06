$(".names").hover(function () {
  $(".name2").animate({
    left: "150px",
    top: "60px"
  });
  $(".name3").animate({
    left: "240px",
    top: "120px"
  });
}, function () {
  $(".name2").animate({
    left: "80px",
    top: "20px"
  });
  $(".name3").animate({
    left: "100px",
    top: "40px"
  });
});
