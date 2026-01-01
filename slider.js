// Elements
const popup = document.getElementById("popup");
const popupImage = document.getElementById("popupImage");
const closePopup = document.getElementById("closePopup");

const r1 = document.getElementById("s1");
const r2 = document.getElementById("s2");
const r3 = document.getElementById("s3");

const cards = document.querySelectorAll(".card");

// zet juiste center class
function updateCenter() {
  cards.forEach(c => c.classList.remove("center"));

  if (r1.checked) document.querySelector(".c1").classList.add("center");
  if (r2.checked) document.querySelector(".c2").classList.add("center");
  if (r3.checked) document.querySelector(".c3").classList.add("center");
}

updateCenter();

// klikgedrag voor kaarten
cards.forEach(card => {
  card.addEventListener("click", () => {

    let slide = Number(card.dataset.slide);

    // klik op een zijfoto → verschuif enkel de carousel
    if (!card.classList.contains("center")) {
      if (slide === 1) r1.checked = true;
      if (slide === 2) r2.checked = true;
      if (slide === 3) r3.checked = true;

      updateCenter();
      return; // <<< heel belangrijk: popup NIET openen
    }

    // klik op middelste foto → popup openen
    const img = card.querySelector("img");
    popupImage.src = img.src;
    popup.style.display = "flex";
  });
});

// Popup sluiten
closePopup.addEventListener("click", () => popup.style.display = "none");
popup.addEventListener("click", e => {
  if (e.target === popup) popup.style.display = "none";
});