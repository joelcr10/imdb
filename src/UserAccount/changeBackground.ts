var changeBackground = document.getElementById("change-background") as HTMLSelectElement | null;

if (changeBackground) {
  changeBackground.onchange = function() {
    const bannerLink = changeBackground?.value as String| null;
    
    const accountTopSection = document.getElementById("account-top-section") as HTMLElement | null;
    if (accountTopSection) {
      accountTopSection.style.backgroundImage = `url("${bannerLink}")`;
    }
  };
}