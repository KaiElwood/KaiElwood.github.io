if (document.documentElement.clientWidth <= 420) {
 console.log ("hello");
}

// function borderChange() {
//   const border = $("#border")
//   border.toggleClass(".border")
// }

$(".names").hover(function(){
  const border = $("#border")
  border.toggleClass("border")
});

$("#button").on("click", function(){
  $(".background").toggleClass("white")
  $(".border").toggleClass("white")
  $("a").css("color", "black")
  alert("doing stuff...")
});

$("#button2").on("click", function(){
  $(".border").toggleClass("border2")
})




// if (document.documentElement.clientWidth > 420) {
// $(".names").hover(function () {
//   $(".name2").animate({
//     left: "150px",
//     top: "60px"
//   });
//   $(".name3").animate({
//     left: "240px",
//     top: "120px"
//   });
// }, function () {
//   $(".name2").animate({
//     left: "80px",
//     top: "20px"
//   });
//   $(".name3").animate({
//     left: "100px",
//     top: "40px"
//   });
// });
// }
