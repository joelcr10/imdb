

const togglePopup = () => {
    const popupBox = document.getElementById('popupBox');
    popupBox.style.display = "block";
}

const copyLink = () => {
    const pageUrl = window.location.href;
    navigator.clipboard.writeText(pageUrl)
}

// Close the popup if the user clicks outside of it
window.onclick = function (event) {
    console.log(event);
    console.log(event.target);
    if (!event.target.matches('#shareButton')) {
        const popupBox = document.getElementById('popupBox');
        if (popupBox.style.display === 'block') {
            popupBox.style.display = 'none';
        }
    }
}