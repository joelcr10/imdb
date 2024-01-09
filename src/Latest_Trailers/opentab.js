function openTab(tabId) {
  // Hide all tab content
  console.log("inside open tab");
  var tabContent = document.getElementsByClassName("tab-content");
  for (var i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }

  // Remove 'active' class from all tabs
  var tabs = document.getElementsByClassName("tab");
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove("active");
  }

  // Show the selected tab content and mark the tab as active
  document.getElementById(tabId).style.display = "block";
  event.currentTarget.classList.add("active");
}

openTab("tab1");
window.onload = function () {
  console.log("Opening tab:");
  openTab("tab1");
};
