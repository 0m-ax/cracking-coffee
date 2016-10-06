$( document ).scroll(function() {
  console.log("scroll")
  if($(window).scrollTop() < 300){
    $(".nav-holder").removeClass("navbar-fixed")
    $(".nav-placehold").addClass("hidden")
    $(".nav-logo").removeClass("no-show")
  }else{
    $(".nav-placehold").removeClass("hidden")
    $(".nav-logo").addClass("no-show")
    $(".nav-holder").addClass("navbar-fixed")
  }
});
