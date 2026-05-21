
const track = document.querySelector(".customCarouselTrack");

const nextBtn = document.querySelector(".carouselNext");
const prevBtn = document.querySelector(".carouselPrev");

let isAnimating = false;
let autoPlay;

function getCards() {
    return [...track.querySelectorAll(".customCard")];
}

function getVisibleCards() {

    if (window.innerWidth < 768) {
        return 1;
    }

    if (window.innerWidth < 1200) {
        return 2;
    }

    return 3;
}

function updateClasses() {

    const cards = getCards();
    const visible = getVisibleCards();

    cards.forEach(card => {
        card.classList.remove("active", "side");
    });

    if (visible === 1) {

        cards[0]?.classList.add("active");

    }

    else if (visible === 2) {

        cards[0]?.classList.add("active");
        cards[1]?.classList.add("side");

    }

    else {

        cards[1]?.classList.add("active");

        cards[0]?.classList.add("side");
        cards[2]?.classList.add("side");

    }
}

function enableTransition() {
    track.style.transition = "transform .6s ease";
}

function disableTransition() {
    track.style.transition = "none";
}

function moveNext() {

    if (isAnimating) return;

    isAnimating = true;

    const cards = getCards();
    const firstCard = cards[0];

    const width = firstCard.offsetWidth;

    const visible = getVisibleCards();

    cards.forEach(card => {
        card.classList.remove("active", "side");
    });

    if (visible === 1) {

        cards[1]?.classList.add("active");

    }

    else if (visible === 2) {

        cards[1]?.classList.add("active");
        cards[2]?.classList.add("side");

    }

    else {

        cards[2]?.classList.add("active");

        cards[1]?.classList.add("side");
        cards[3]?.classList.add("side");

    }

    enableTransition();

    track.style.transform = `translateX(-${width}px)`;

    track.addEventListener("transitionend", function onEnd(e) {

        if (e.propertyName !== "transform") return;

        track.removeEventListener("transitionend", onEnd);

        disableTransition();

        track.appendChild(firstCard);

        track.style.transform = "translateX(0)";

        updateClasses();

        isAnimating = false;

    });
}

function movePrev() {

    if (isAnimating) return;

    isAnimating = true;

    const cards = getCards();

    const lastCard = cards.at(-1);

    const width = lastCard.offsetWidth;

    disableTransition();

    track.prepend(lastCard);

    track.style.transform = `translateX(-${width}px)`;

    updateClasses();

    requestAnimationFrame(() => {

        requestAnimationFrame(() => {

            enableTransition();

            track.style.transform = "translateX(0)";

        });

    });

    track.addEventListener("transitionend", function onEnd(e) {

        if (e.propertyName !== "transform") return;

        track.removeEventListener("transitionend", onEnd);

        isAnimating = false;

    });
}

function startAutoPlay() {

    clearInterval(autoPlay);

    autoPlay = setInterval(() => {

        moveNext();

    }, 5000);
}

nextBtn.addEventListener("click", () => {

    moveNext();

    startAutoPlay();

});

prevBtn.addEventListener("click", () => {

    movePrev();

    startAutoPlay();

});

window.addEventListener("resize", () => {

    updateClasses();

});

updateClasses();

startAutoPlay();

