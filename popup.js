const popup = document.getElementById("popup");
const popupImg = document.getElementById("popupImg");
const closePopup = document.getElementById("closePopup");

// Alle afbeeldingen in je slider aanklikbaar maken
document.querySelectorAll("#carousel-slides img").forEach(img => {
  img.style.cursor = "pointer"; // cursor handje
  img.addEventListener("click", () => {
    popupImg.src = img.src;
    popup.classList.remove("hidden");
    popup.classList.add("flex");
  });
});

// sluiten met het kruisje
closePopup.addEventListener("click", () => {
  popup.classList.add("hidden");
  popup.classList.remove("flex");
});

// klikken buiten de foto sluit ook
popup.addEventListener("click", (e) => {
  if (e.target === popup) {
    popup.classList.add("hidden");
    popup.classList.remove("flex");
  }
});