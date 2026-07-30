const spreads = [
  ["assets/images/page-01.jpg", null],
  ["assets/images/page-02.jpg", "assets/images/page-03.jpg"],
  ["assets/images/page-04.jpg", "assets/images/page-05.jpg"],
  ["assets/images/page-06.jpg", null]
];

const pageNumbers = [
  "1 / 6",
  "2 - 3 / 6",
  "4 - 5 / 6",
  "6 / 6"
];

let currentPage = 0;

function showPage() {
  const leftPage = document.getElementById("leftPage");
  const rightPage = document.getElementById("rightPage");
  const pageNumber = document.getElementById("pageNumber");

  leftPage.src = spreads[currentPage][0];

  if (spreads[currentPage][1]) {
    rightPage.src = spreads[currentPage][1];
    rightPage.style.display = "block";
  } else {
    rightPage.src = "";
    rightPage.style.display = "none";
  }

  pageNumber.textContent = pageNumbers[currentPage];
}

function nextPage() {
  if (currentPage < spreads.length - 1) {
    currentPage++;
    showPage();
  }
}

function previousPage() {
  if (currentPage > 0) {
    currentPage--;
    showPage();
  }
}

showPage();
document.addEventListener("keydown", function(event) {
  if (event.key === "ArrowRight") {
    nextPage();
  }

  if (event.key === "ArrowLeft") {
    previousPage();
  }
});
let touchStartX = 0;
let touchEndX = 0;

const book = document.getElementById("book");

book.addEventListener("touchstart", function(event) {
  touchStartX = event.changedTouches[0].clientX;
});

book.addEventListener("touchend", function(event) {
  touchEndX = event.changedTouches[0].clientX;

  const swipeDistance = touchEndX - touchStartX;

  if (swipeDistance < -50) {
    nextPage();
  }

  if (swipeDistance > 50) {
    previousPage();
  }
});