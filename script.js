// This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

const onApiChange = _ => {   
  if (typeof player.setOption === 'function') {
    player.setOption('captions', 'track', {languageCode: 'en'}) // undocumented call
  }  
}

// This function creates an <iframe> (and YouTube player) after the API code downloads.
var player;

// some variables for finding the video and size of window
var width = $(window).width();
var height = $(window).height() - 48;

    $("#videos").change(function() {
        // hide title
        $("h1").hide();
        $(".sticker").hide();
        $("header").show(); 
        $("g").css({"fill": "none", "stroke": "white", "stroke-width": "2px"}); 
        $(".container").css("background-color", "initial");
        // get ride of old vid
        $("iframe").remove();
        
        // make new player div
        var player_el = document.createElement("div");
        $(player_el).attr("id", "player");
        $("body").append(player_el);

        // get the current video
        var id = $(this).val();
        
        // make the player
        player = new YT.Player('player', {
            height: `${height}`,
            width: `${width}`,
            videoId: `${id}`,
            playerVars: {
              // 'autoplay': 1,
              // 'mute': 1,
                'playsinline': 1,
                'cc_load_policy': 1,
                'cc_lang_pref': 'en',
                'modestbranding': 1
            },
            events: {
                // 'onReady': onPlayerReady,
                // 'onStateChange': onPlayerStateChange
                onApiChange
            }
        });
    })

// TO DO: when you click play, the shapes disappears; 
// when video pauses, they reappear.


// // clicking the "i" shows/hides the colophon info
$(".info").click(function() {
  $(".caption").toggle(0, function(){
      // check paragraph once toggle effect is completed
      if ($(".caption").is(":visible")) {
          $(".container").css("background-color", "black");
          $(".info").html("x");
          $("g").css({"fill": "none", "stroke": "white", "stroke-width": "2px"});
      } else {
          $(".container").css("background-color", "white");
          $(".info").html("i");
          $("g").css({"fill": "white", "stroke-width": "0px"});
      }
  });
});

// clicking the small title takes you back to landing page
$("h2").click(function() {
  $("iframe").remove();
  $(".caption").hide();
  $("h1").show();
  $(".sticker").show();
  $("header").hide();
  $("g").css({"fill": "white", "stroke-width": "0px"});
  $(".container").css("background-color", "white");
})

// on resize, recalculate the height
$( window ).resize(function() {
   height_adj = $(window).height() - 47;
   height_px = height_adj + "px";
   width = $(window).width();
   height = $(window).height();
});


// // CUSTOM SELECT DROPDOWN>>>>>>>
// // for custom select
var x, i, j, l, ll, selElmnt, a, b, c;

/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
l = x.length;

// get height of window minus the header
var height_adj = height - 47;
var height_px = height_adj + "px";
$('.select-items').height(height_adj);

// for each custom-select element, do the following:
for (i = 0; i < l; i++) {

  // find the first select element
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;

  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);

  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {

    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;

    // this happens when u click any except for the top
    c.addEventListener("click", function(e) {
      
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;

            $("h1").hide();
            $("header").show(); 
            $("g").css({"fill": "none", "stroke": "white", "stroke-width": "2px"});
            var selected_video = $("#videos").val();
            console.log(selected_video);

            // make video select change
            $('#videos').trigger('change');
            
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {

    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
    if ($(".custom-select").css("bottom") == "0px") {
      $(".custom-select").animate({bottom: `${height_px}`});
      $('.select-items').height(height);
    } else {
      $(".custom-select").animate({bottom: "0px"});
    }
    
  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */

  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i);
    } else {
      y[i].classList.remove("select-arrow-active");
      $(".custom-select").animate({bottom: "0px"});
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
      $(".custom-select").animate({bottom: "0px"});
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);


