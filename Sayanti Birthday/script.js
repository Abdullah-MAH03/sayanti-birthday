const confettiContainer = document.querySelector(".birthday-confetti");
const noteDialog = document.querySelector("#birthday-note");
const noteButton = document.querySelector(".birthday-note-button");
const closeButton = document.querySelector(".birthday-note-close");
const cakeDialog = document.querySelector("#birthday-cake");
const cakeButton = document.querySelector(".birthday-cake-button");
const cakeCloseButton = document.querySelector(".birthday-cake-close");
const cakeFrame = document.querySelector(".birthday-cake-frame");

for (let index = 0; index < 18; index += 1) {
  const piece = document.createElement("span");
  const size = index % 3 === 0 ? "large" : "small";
  piece.className = `birthday-confetti-piece birthday-confetti-${size}`;
  piece.style.left = `${(index * 37 + 7) % 100}%`;
  piece.style.top = `${(index * 23 + 4) % 100}%`;
  piece.style.animationDelay = `${(index % 7) * -0.8}s`;
  confettiContainer.append(piece);
}

noteButton.addEventListener("click", () => {
  noteDialog.showModal();
});

closeButton.addEventListener("click", () => {
  noteDialog.close();
});

noteDialog.addEventListener("click", (event) => {
  if (event.target === noteDialog) {
    noteDialog.close();
  }
});

cakeButton.addEventListener("click", () => {
  cakeFrame.src = "./cake-animation/index.html";
  cakeDialog.showModal();
});

function closeCakeAnimation() {
  cakeDialog.close();
  cakeFrame.src = "about:blank";
}

cakeCloseButton.addEventListener("click", closeCakeAnimation);

cakeDialog.addEventListener("close", () => {
  cakeFrame.src = "about:blank";
});

cakeDialog.addEventListener("click", (event) => {
  if (event.target === cakeDialog) {
    closeCakeAnimation();
  }
});
