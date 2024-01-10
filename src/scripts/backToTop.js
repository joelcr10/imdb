var backToTopButton = document.getElementById("back-to-top-btn");
var blockStyle = "block";
var noneStyle = "none";
window.onscroll = function () {
    scrollFunction();
};
function scrollFunction() {
    if (document.documentElement.scrollTop > 600 && backToTopButton) {
        backToTopButton.style.display = blockStyle;
    }
    else if (backToTopButton) {
        backToTopButton.style.display = noneStyle;
    }
}
function scrollToTop() {
    document.documentElement.scrollTop = 0;
}
