$( document ).scroll(function() {
  console.log("scroll")
  if($(window).scrollTop() < 300){
    $(".nav-holder").removeClass("navbar-fixed")
    $(".nav-placehold").addClass("hidden")
  }else{
    $(".nav-placehold").removeClass("hidden")
    $(".nav-holder").addClass("navbar-fixed")
  }
});
