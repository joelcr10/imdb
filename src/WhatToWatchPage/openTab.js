function openTab(tabName) {
    // Hide all tab content
    var tabContent = document.getElementsByClassName('tab-content');
    for (var i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = 'none';
    }

    // Remove 'active' class from all tabs
    var tabs = document.getElementsByClassName('tab');
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active');
    }

    // Show the selected tab content and mark the tab as active
    document.getElementById(tabName).style.display = 'block';
    event.currentTarget.classList.add('active');
}


window.onload = function() {
    openTab('tab1');
};