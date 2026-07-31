const pages = [
  "assets/images/page-01.jpg",
  "assets/images/page-02.jpg",
  "assets/images/page-03.jpg",
  "assets/images/page-04.jpg",
  "assets/images/page-05.jpg",
  "assets/images/page-06.jpg"
];

const spreads = [
  ["assets/images/page-01.jpg", null],
  ["assets/images/page-02.jpg", "assets/images/page-03.jpg"],
  ["assets/images/page-04.jpg", "assets/images/page-05.jpg"],
  ["assets/images/page-06.jpg", null]
];

const spreadNumbers = [
  "1 / 6",
  "2 - 3 / 6",
  "4 - 5 / 6",
  "6 / 6"
];

let currentPage = 0;
let currentSpread = 0;

function isMobileView() {
  return window.innerWidth <= 700;
}

function showPage() {
  const leftPage = document.getElementById("leftPage");
  const rightPage = document.getElementById("rightPage");
  const pageNumber = document.getElementById("pageNumber");

  if (isMobileView()) {
    leftPage.src = pages[currentPage];
    rightPage.src = "";
    rightPage.style.display = "none";
    pageNumber.textContent = `${currentPage + 1} / ${pages.length}`;
  } else {
    leftPage.src = spreads[currentSpread][0];

    if (spreads[currentSpread][1]) {
      rightPage.src = spreads[currentSpread][1];
      rightPage.style.display = "block";
    } else {
      rightPage.src = "";
      rightPage.style.display = "none";
    }

    pageNumber.textContent = spreadNumbers[currentSpread];
  }
}

function nextPage() {
  if (isMobileView()) {
    if (currentPage < pages.length - 1) {
      currentPage++;
      showPage();
    }
  } else {
    if (currentSpread < spreads.length - 1) {
      currentSpread++;
      showPage();
    }
  }
}

function previousPage() {
  if (isMobileView()) {
    if (currentPage > 0) {
      currentPage--;
      showPage();
    }
  } else {
    if (currentSpread > 0) {
      currentSpread--;
      showPage();
    }
  }
}

document.addEventListener("keydown", function(event) {
  if (event.key === "ArrowRight") {
    nextPage();
  }

  if (event.key === "ArrowLeft") {
    previousPage();
  }
});

let touchStartX = 0;
let isPinching = false;

const book = document.getElementById("book");

book.addEventListener("touchstart", function(event) {
  if (event.touches.length >= 2) {
    isPinching = true;
    return;
  }

  isPinching = false;
  touchStartX = event.touches[0].clientX;
}, { passive: true });

book.addEventListener("touchmove", function(event) {
  if (event.touches.length >= 2) {
    isPinching = true;
  }
}, { passive: true });

book.addEventListener("touchend", function(event) {
  if (isPinching) {
    if (event.touches.length === 0) {
      isPinching = false;
    }
    return;
  }

  if (event.changedTouches.length === 0) {
    return;
  }

  const touchEndX = event.changedTouches[0].clientX;
  const swipeDistance = touchEndX - touchStartX;

  if (swipeDistance < -70) {
    nextPage();
  }

  if (swipeDistance > 70) {
    previousPage();
  }
}, { passive: true });

window.addEventListener("resize", function() {
  showPage();
});

function openZoomModal(imageSrc) {
  const zoomModal = document.getElementById("zoomModal");
  const zoomImage = document.getElementById("zoomImage");

  zoomImage.src = imageSrc;
  zoomModal.classList.add("is-open");
  document.body.style.overflow = "hidden";
}

function closeZoomModal() {
  const zoomModal = document.getElementById("zoomModal");
  const zoomImage = document.getElementById("zoomImage");

  zoomModal.classList.remove("is-open");
  zoomImage.src = "";
  document.body.style.overflow = "";
}

function zoomIn() {
  const leftPage = document.getElementById("leftPage");
  openZoomModal(leftPage.src);
}

function zoomOut() {
  closeZoomModal();
}

document.getElementById("leftPage").addEventListener("click", function() {
  openZoomModal(this.src);
});

document.getElementById("rightPage").addEventListener("click", function() {
  if (this.src && this.style.display !== "none") {
    openZoomModal(this.src);
  }
});

document.getElementById("zoomModal").addEventListener("click", function(event) {
  if (event.target === this) {
    closeZoomModal();
  }
});

document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    closeZoomModal();
  }
});

showPage();
