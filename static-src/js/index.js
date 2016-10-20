var scrollupdate = function() {
  console.log("scroll")
  if($(window).scrollTop() < $(".video").height() && $('.video').is(':visible')){
    $(".nav-holder").removeClass("navbar-fixed")
    $(".brand-logo").addClass("transparent")
  }else{
    $(".brand-logo").removeClass("transparent")
    $(".nav-holder").addClass("navbar-fixed")
  }
}
$( document ).scroll(scrollupdate);
scrollupdate();
