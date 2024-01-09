const backToTopButton: HTMLElement | null = document.getElementById("back-to-top-btn");
const blockStyle: string = "block";
const noneStyle: string = "none";

window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (document.documentElement.scrollTop > 600 && backToTopButton) {
        backToTopButton.style.display = blockStyle;
    } else if (backToTopButton) {
        backToTopButton.style.display = noneStyle;
    }
}

function scrollToTop() {
    document.documentElement.scrollTop = 0;
}
