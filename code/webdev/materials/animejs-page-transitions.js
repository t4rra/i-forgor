// All you need to change is the animIn/animOut vars with your own animejs stuff
// Define the in and out animations
var animIn = anime({
  targets: ".transition-overlay",
  top: ["0%", "-100%"],
  duration: 750,
  easing: "easeInOutCubic",
  autoplay: false,
});

var animOut = anime({
  targets: ".transition-overlay",
  top: ["100%", "0%"],
  duration: 750,
  easing: "easeInOutCubic",
  autoplay: false,
});

// Check for the transition parameter in the URL
const urlParams = new URLSearchParams(window.location.search);
const transitionType = urlParams.get("transition");
if (transitionType === "in") {
  document.querySelector(".transition-overlay").style.top = "0%"; // Show overlay
  // wait for the page to load before playing the animation
  window.history.replaceState({}, document.title, window.location.pathname); // Remove the parameter from the URL
  window.addEventListener("DOMContentLoaded", () => {
    animIn.play();
  });
}

// Add event listener to all internal links
document.querySelectorAll('a[href^="/"]').forEach((anchor) => {
  anchor.addEventListener("click", function (event) {
    event.preventDefault();

    // Play the out animation
    animOut.play();

    // Wait for the out animation to complete before navigating to the next page
    animOut.finished.then(() => {
      window.location.href = anchor.href + "?transition=in";
    });
  });
});
