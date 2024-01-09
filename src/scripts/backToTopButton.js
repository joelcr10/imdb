

const backToTopButton = document.getElementById("back-to-top-btn");
const blockStyle = "block";
const noneStyle = "none";

window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (document.documentElement.scrollTop > 600) {
        backToTopButton.style.display = blockStyle;
    } else {
        backToTopButton.style.display = noneStyle;
    }
}


function scrollToTop() {
    document.documentElement.scrollTop = 0;
}