function openPopup(): void {
  // Display the popup and overlay
  const popupElement = document.getElementById('popup');
  const overlayElement = document.getElementById('overlay');

  if (popupElement && overlayElement) {
    popupElement.style.display = 'block';
    overlayElement.style.display = 'block';
  }
}

function togglePopup(): void {
  const popupElement = document.getElementById('popup');
  const overlayElement = document.getElementById('overlay');

  if (popupElement && overlayElement) {
    const isPopupVisible = popupElement.style.display === 'block';

    // Toggle the visibility of the popup and overlay
    popupElement.style.display = isPopupVisible ? 'none' : 'block';
    overlayElement.style.display = isPopupVisible ? 'none' : 'block';
  }
}
