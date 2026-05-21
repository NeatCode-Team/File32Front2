const popover = document.querySelector(".popover");
const showModalBtn = document.querySelectorAll(".showModalBtn");
const backdrop = document.querySelector(".backdrop");

showModalBtn.forEach(element => {
    element.addEventListener("click", (e) => {
        popover.classList.toggle("active");
        backdrop.classList.toggle("active");
        lockScroll();
    });
})

backdrop.addEventListener("click", () => {
    popover.classList.remove("active");
    backdrop.classList.remove("active");
    imgPopover.classList.remove("active");
    unlockScroll();
});



const imgPopover = document.querySelector(".imgPopover");
const rowImg = document.querySelectorAll(".rowImg");
rowImg.forEach(element => {
    element.addEventListener("click", e => {
        console.log("باز");
        imgPopover.querySelector("img").setAttribute("src", e.target.getAttribute("src"))
        imgPopover.classList.toggle("active");
        backdrop.classList.toggle("active");
    })
})

// غیرفعال کردن اسکرول و قفل روی همون موقعیت فعلی
let scrollTop = 0;

function lockScroll() {
    scrollTop = window.scrollY;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollTop}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
}

// فعال کردن دوباره اسکرول
function unlockScroll() {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";

    window.scrollTo(0, scrollTop);
}