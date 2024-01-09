var changeBackground = document.getElementById("change-background");
if (changeBackground) {
    changeBackground.onchange = function () {
        var bannerLink = changeBackground === null || changeBackground === void 0 ? void 0 : changeBackground.value;
        var accountTopSection = document.getElementById("account-top-section");
        if (accountTopSection) {
            accountTopSection.style.backgroundImage = "url(\"".concat(bannerLink, "\")");
        }
    };
}
