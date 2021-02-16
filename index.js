function barsToggle(x) {
  $(x).toggleClass("change");
  if ($("#menu_items").height() == 0) {
    $("#menu_items").height(320);
  } else {
    $("#menu_items").height(0);
  }
}

if (window.innerWidth < 1100) {
  $("#hamburger").css("visibility", "visible");
  $("#nav_items").css("visibility", "hidden");
}

window.onresize = function() {
  if (window.innerWidth < 1100) {
    $("#hamburger").css("opacity", 1);
    $("#hamburger").css("visibility", "visible");
    $("#nav_items").css("opacity", 0);
    $("#nav_items").css("visibility", "hidden");
  } else {
    $("#hamburger").css("opacity", 0);
    $("#hamburger").css("visibility", "hidden");
    $("#nav_items").css("opacity", 1);
    $("#nav_items").css("visibility", "visible");
    if ($("#menu_items").height() != 0) {
      $("#menu_items").height(0);
      $(".hamburger").toggleClass("change");
    }
  }
}

function is_visible(elem) {
  var docViewTop = $(window).scrollTop();
  var docViewBottom = docViewTop + $(window).height();

  var elemTop = $(elem).offset().top - 60;
  var elemBottom = elemTop + $(elem).height();

  return ((elemBottom >= docViewTop) && (elemTop <= docViewTop));
}


function set_active(class_name, type="a") {
  $(type).removeClass("active");
  $(class_name).addClass("active");
}

$(window).scroll(function() {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    set_active(".myHobbies")
  } else if (is_visible($("#home"))) {
    set_active(".home");
  } else if (is_visible($("#my_background"))) {
    set_active(".myBackground");
  } else if (is_visible($("#my_webdev_journey"))) {
    set_active(".myWebDevJourney");
  } else if (is_visible($("#my_hobbies"))) {
    set_active(".myHobbies");
  }
});


function type(c_elem, elem, t_list, 
        c_speed = 800, t_speed = 100, w_time = 2000, b_speed = 50){
  
  /*Setting up Cursor Blink*/
  $(c_elem).css("transition", "0.3s");
  $(c_elem).css("color", "black");
  // cursor will disappear every c_speed miliseconds:
  setInterval(() => {
    $(c_elem).css("opacity", 0);
  }, c_speed);
  // cursor will reappear every c_speed miliseconds, offset by c_speed/2
  // to create a blinking effect:
  setTimeout(() => {
    setInterval(() => {
      $(c_elem).css("opacity", 100);
    }, c_speed);
  }, c_speed/2);
  
  // record the amount of time previous typing events will take in order to
  // accurately queue future events w/ setTimeout(). 
  let word_time = 0

for(let i = 0; i < t_list.length; i++){
    /*Typing Process*/
    for(let j = 0; j < t_list[i].length; j++){
      setTimeout(() => {
        // cursor should be 'active' while typing.
        $(c_elem).css("opacity", 100);
        $(elem).text($(elem).text() + t_list[i][j]);
      }, word_time);
      word_time += t_speed;
    }
    
    // don't delete the last statement
    if (i+1 == t_list.length) break;

    // wait w_time miliseconds before deleting:
    word_time += w_time;
            
    /*Backspace Process*/
    for(let j = 0; j < t_list[i].length; j++){
      setTimeout(() => {
        // cursor should be 'active' while backspacing.
        $(c_elem).css("opacity", 100);
        $(elem).text($(elem).text().slice(0, -1));
      }, word_time);
      word_time += b_speed;
    }
  }
}     

let who_i_am_list = ["an artist.", "logical.", "diligent.", "Angad Bhargav."]
type(".cursor", "#who_i_am", who_i_am_list);
