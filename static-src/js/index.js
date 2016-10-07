$( document ).scroll(function() {
  console.log("scroll")
  if($(window).scrollTop() < 300){
    $(".nav-holder").removeClass("navbar-fixed")
    $(".brand-logo").addClass("transparent")
  }else{
    $(".brand-logo").removeClass("transparent")
    $(".nav-holder").addClass("navbar-fixed")
  }
});
