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

// دریافت المنت‌ها
const wrapper = document.getElementById('textWrapper');
const toggleBtn = document.getElementById('toggleButton');

// وضعیت باز یا بسته بودن (false = بسته، true = باز)
let isOpen = false;

// متغیر برای ذخیره ارتفاع کامل متن (حالت باز)
let fullHeight = null;

// تابع برای گرفتن ارتفاع کامل محتوا (زمانی که همه چیز قابل مشاهده است)
function getFullHeight() {
    //transition رو موقت غیرفعال می‌کنیم
    const originalTransition = wrapper.style.transition;
    wrapper.style.transition = 'none';

    // max-height رو به none می‌بریم تا همه محتوا دیده بشه
    const originalMaxHeight = wrapper.style.maxHeight;
    wrapper.style.maxHeight = 'none';

    // ارتفاع واقعی رو می‌گیریم
    const height = wrapper.scrollHeight;

    //恢复到之前的状態
    wrapper.style.maxHeight = originalMaxHeight;
    wrapper.style.transition = originalTransition;

    return height;
}

// تابع مقداردهی اولیه
function initialize() {
    // اول wrapper رو به حالت بسته درمیاریم با یه مقدار پیشفرض
    wrapper.style.maxHeight = '120px'; // نمایش حدود 3 خط اول
    isOpen = false;

    // ارتفاع کامل رو محاسبه و ذخیره می‌کنیم
    fullHeight = getFullHeight();

    // متن دکمه رو تنظیم می‌کنیم
    toggleBtn.innerHTML = 'ادامه';
}

// تابع باز کردن متن
function openText() {
    if (fullHeight === null) {
        fullHeight = getFullHeight();
    }

    // تنظیم max-height به ارتفاع کامل برای باز شدن با انیمیشن
    wrapper.style.maxHeight = fullHeight + 'px';
    isOpen = true;
    toggleBtn.innerHTML = 'بستن';
}

// تابع بستن متن
function closeText() {
    wrapper.style.maxHeight = '120px';
    isOpen = false;
    toggleBtn.innerHTML = 'ادامه';
}

// تابع toggle
function toggleText() {
    if (isOpen) {
        closeText();
    } else {
        openText();
    }
}

// در هنگام resize صفحه، باید ارتفاع کامل رو دوباره محاسبه کنیم
let resizeTimeout;
function handleResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // ذخیره وضعیت فعلی
        const wasOpen = isOpen;

        // محاسبه مجدد ارتفاع کامل
        fullHeight = getFullHeight();

        // اگر در حالت باز بودیم، ارتفاع رو به‌روز کنیم
        if (wasOpen) {
            wrapper.style.maxHeight = fullHeight + 'px';
        } else {
            // اطمینان از اینکه حالت بسته برقراره
            wrapper.style.maxHeight = '120px';
        }
    }, 250);
}

// مقداردهی اولیه بعد از لود کامل صفحه
window.addEventListener('load', function () {
    initialize();

    // برای اطمینان بیشتر، بعد از 100 میلی‌ثانیه دوباره محاسبه کن (برای فونت‌ها و ...)
    setTimeout(function () {
        fullHeight = getFullHeight();
        if (isOpen) {
            wrapper.style.maxHeight = fullHeight + 'px';
        }
    }, 100);
});

// اتصال رویداد کلیک به دکمه
console.log(toggleBtn);
toggleBtn.addEventListener('click', toggleText);

// اتصال رویداد resize برای پاسخگویی به تغییر اندازه صفحه
window.addEventListener('resize', handleResize);

window.addEventListener("scroll", () => {
    document.getElementById('goToTopBtn').classList.remove("goToTopNone");
    document.getElementById('goToTopBtn').classList.add("goToTopBlock");
});
(function () {
    // دریافت ارجاع به دکمه
    const topButton = document.getElementById('goToTopBtn');

    // تابع پیمایش به بالای صفحه با انیمیشن smooth
    function scrollToTopSmooth() {
        // ویندو یا سند — استفاده از window.scrollTo با گزینه‌های مدرن
        // توجه: برای اطمینان از اینکه اسکرول به صورت نرم انجام شود، از behavior:'smooth' استفاده می‌کنیم
        // و برای سازگاری بیشتر با مرورگرهای قدیمی، یک fallback ساده در نظر گرفته شده اما نیاز نیست.
        if ('scrollBehavior' in document.documentElement.style) {
            // مرورگر از smooth پشتیبانی می‌کند (اکثر مرورگرهای جدید)
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        } else {
            // Fallback قدیمی: با استفاده از تابع تدریجی (این حالت خیلی نادر اما برای اطمینان)
            // این روش ابتدایی باعث انیمیشن دستی می‌شود با requestAnimationFrame.
            const startPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            if (startPosition === 0) return;
            const duration = 500; // مدت زمان انیمیشن (ms)
            const startTime = performance.now();

            function animationStep(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(1, elapsed / duration);
                // easeOutCubic برای حرکت نرم
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const newPosition = startPosition * (1 - easeOut);
                window.scrollTo(0, newPosition);
                if (progress < 1) {
                    requestAnimationFrame(animationStep);
                } else {
                    // اطمینان از دقیقاً صفر شدن در انتها
                    window.scrollTo(0, 0);
                }
            }
            requestAnimationFrame(animationStep);
        }
    }

    // رویداد کلیک: اسکرول به بالا + بازخورد اضافی (اختیاری: لرزش یا تغییر دکمه)
    if (topButton) {
        topButton.addEventListener('click', function (event) {
            event.preventDefault();
            // اجرای انیمیشن اسکرول به بالای صفحه
            scrollToTopSmooth();

            // (اختیاری) افزودن یک بازخورد کوچک برای کاربر: تغییر موقت آیکون یا سایه
            // این کار فقط حس خوشایندی ایجاد می‌کند و به انیمیشن اصلی لطمه نمی‌زند.
            const originalSvg = topButton.innerHTML;
            // می‌توانیم افکت سریع "ضربه" بدهیم اما لازم نیست.
            // شاید استایل فوری: تغییر رنگ یا شفافیت خیلی سریع
            topButton.style.transform = 'scale(0.92)';
            setTimeout(() => {
                if (topButton) topButton.style.transform = '';
            }, 150);

            // اضافه کردن حالت focus برای دسترسی‌پذیری (اختیاری)
            topButton.setAttribute('aria-label', 'بازگشت به بالا (انجام شد)');
            setTimeout(() => {
                if (topButton) topButton.setAttribute('aria-label', 'بازگشت به بالای صفحه');
            }, 1000);
        });
    }

    // بهبود تجربه: اگر کاربر در بالای صفحه باشد، شاید دکمه را کمی کمرنگ کنیم؟ تصمیم گرفتیم همیشه پررنگ باشد.
    // اما می‌توانیم یک افکت کوچک اضافه کنیم که وقتی صفحه در بالاترین نقطه است، باز هم دکمه کار می‌کند ولی کاربر را اذیت نمی‌کند.
    // برای نمایش انیمیشن بهتر از scroll event استفاده نمی‌کنیم چون هدف صرفاً دکمه بازگشت است.

    // (اختیاری) در صورتی که صفحه بارگذاری شد و از قبل اسکرول وجود داشت دکمه بدون مشکل کار می‌کند.
    console.log('دکمه بازگشت به بالا آماده است. پایین سمت راست ✅');

    // برای مرورگرهایی که از behavior smooth پشتیبانی نمی‌کنند، fallback بالا کار خواهد کرد.
    // همچنین با استفاده از تست scrollBehavior همزمان همه چیز عالیست.
})();

// if (window.innerWidth >= 768) {
//     const swiper = new Swiper(".mySwiper", {
//         slidesPerView: 3,
//         centeredSlides: true,
//         spaceBetween: 30,

//         loop: true,
//         loopAdditionalSlides: 3,
//         loopedSlides: 3,

//         speed: 600,

//         watchSlidesProgress: true,

//         navigation: {
//             nextEl: ".swiper-button-next",
//             prevEl: ".swiper-button-prev",
//         },

//         pagination: {
//             el: ".swiper-pagination",
//             clickable: true,
//         },

//         breakpoints: {
//             0: {
//                 slidesPerView: 1,
//             },

//             768: {
//                 slidesPerView: 3,
//             }
//         }
//     });
//     // var swiper = new Swiper(".mySwiper", {
//     //     // autoPlay: true,
//     //     slidesPerView: 3,
//     //     autoplay: {
//     //         delay: 5000,
//     //     },
//     //     loop: true,
//     //     spaceBetween: 30,
//     //     // pagination: {
//     //     //     el: ".swiper-pagination",
//     //     //     clickable: true,
//     //     // },
//     //     navigation: {
//     //         nextEl: '.swiper-button-next',
//     //         prevEl: '.swiper-button-prev',
//     //     },
//     // });
// }
// else {
//     const swiper = new Swiper(".mySwiper", {
//         slidesPerView: 2,
//         centeredSlides: true,
//         spaceBetween: 30,

//         loop: true,
//         loopAdditionalSlides: 3,
//         loopedSlides: 3,

//         speed: 600,

//         watchSlidesProgress: true,

//         navigation: {
//             nextEl: ".swiper-button-next",
//             prevEl: ".swiper-button-prev",
//         },

//         pagination: {
//             el: ".swiper-pagination",
//             clickable: true,
//         },

//         breakpoints: {
//             0: {
//                 slidesPerView: 1,
//             },

//             768: {
//                 slidesPerView: 3,
//             }
//         }
//     });
//     // var swiper = new Swiper(".mySwiper", {
//     //     // autoPlay: true,
//     //     slidesPerView: 2,
//     //     autoplay: {
//     //         delay: 5000,
//     //     },
//     //     spaceBetween: 30,
//     //     // pagination: {
//     //     //     el: ".swiper-pagination",
//     //     //     clickable: true,
//     //     // },
//     //     navigation: {
//     //         nextEl: '.swiper-button-next',
//     //         prevEl: '.swiper-button-prev',
//     //     },
//     // });
// }

document.querySelector(".tabNewest").addEventListener("click", newFunc);
document.querySelector(".tabFree").addEventListener("click", freeFunc);

function newFunc() {
    document.querySelector(".newest").classList.toggle("d-none");
    document.querySelector(".newest").classList.toggle("d-block");
    document.querySelector(".free").classList.toggle("d-none");
    document.querySelector(".free").classList.toggle("d-block");
    document.querySelector(".tabNewest").classList.toggle("active")
    document.querySelector(".tabFree").classList.toggle("active")
}

function freeFunc() {
        document.querySelector(".newest").classList.toggle("d-none");
    document.querySelector(".newest").classList.toggle("d-block");
    document.querySelector(".free").classList.toggle("d-none");
    document.querySelector(".free").classList.toggle("d-block");
    document.querySelector(".tabNewest").classList.toggle("active")
    document.querySelector(".tabFree").classList.toggle("active")
}