// Disable page scroll
export function disableScroll() {
  // Save the current scroll position
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

  // Prevent scrolling by locking the body
  window.onscroll = function () {
    window.scrollTo(scrollLeft, scrollTop);
  };

  // Optionally, disable touch and wheel events for extra safety
  document.body.style.overflow = "hidden";
}

// Enable page scroll
export function enableScroll() {
  window.onscroll = null;
  document.body.style.overflow = "";
}
