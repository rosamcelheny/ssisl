// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;

var id = $("#videos").val();

var width = $(window).width();
var height = $(window).height();

console.log(id);

$("#videos").change(function() {
  $("h1").hide();
  id = $(this).val();
  console.log(id);
  $("iframe").remove();
  var player_el = document.createElement("div");
  $(player_el).attr("id", "player");
  $("body").append(player_el);
  makePlayer();
})

function makePlayer() {
  player = new YT.Player('player', {
    height: `${height}`,
    width: `${width}`,
    videoId: `${id}`,
    playerVars: {
      'playsinline': 1
    },
    events: {
      // 'onReady': onPlayerReady,
      // 'onStateChange': onPlayerStateChange
    }
  });
}

$( "h2" ).click(function() {
  console.log("Click");
  $("iframe").remove();
  $("h1").show();
});
$( ".info" ).click(function() {
  console.log("Click");
  $("iframe").remove();
  $(".caption").toggle();
});

// function onYouTubeIframeAPIReady() {
//   makePlayer();
// }

// 4. The API will call this function when the video player is ready.
// function onPlayerReady(event) {
//   event.target.playVideo();
// }

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
// var done = false;
// function onPlayerStateChange(event) {
//   if (event.data == YT.PlayerState.PLAYING && !done) {
//     // setTimeout(stopVideo, 6000);
//     done = true;
//   }
// }
// function stopVideo() {
//   player.stopVideo();
// }

// console.log("Hello");
