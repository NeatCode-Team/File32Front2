// const sidebarBtn = document.querySelector('.sidebarBtn');
// const aside = document.querySelector('aside');
// const antiAside = document.querySelector('.antiAside');

// function openSidebar() {
//     aside.classList.add('active');
//     antiAside.classList.add('active');
//     document.body.style.overflow = 'hidden';
// }

// function closeSidebar() {
//     aside.classList.remove('active');
//     antiAside.classList.remove('active');
//     document.body.style.overflow = '';
// }

// sidebarBtn.addEventListener('click', openSidebar);
// antiAside.addEventListener('click', closeSidebar);

// document.addEventListener('keydown', function (e) {
//     if (e.key === 'Escape' && aside.classList.contains('active')) {
//         closeSidebar();
//     }
// });

if (window.innerWidth >= 768) {
    var swiper = new Swiper(".mySwiper", {
        // autoPlay: true,
        slidesPerView: 3,
        autoplay: {
            delay: 5000,
        },
        loop: true,
        spaceBetween: 30,
        // pagination: {
        //     el: ".swiper-pagination",
        //     clickable: true,
        // },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
}
else {
    var swiper = new Swiper(".mySwiper", {
        // autoPlay: true,
        slidesPerView: 2,
        autoplay: {
            delay: 5000,
        },
        spaceBetween: 30,
        // pagination: {
        //     el: ".swiper-pagination",
        //     clickable: true,
        // },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
}