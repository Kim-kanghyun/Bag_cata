const slider = document.querySelector('.slider');
let startX;
let currentTranslate = 0;
let prevTranslate = 0;
let currentIndex = 0;

slider.addEventListener('touchstart', touchStart);
slider.addEventListener('touchmove', touchMove);
slider.addEventListener('touchend', touchEnd);

function touchStart(event) {
    startX = event.touches[0].clientX;
    prevTranslate = currentTranslate;
}

function touchMove(event) {
    const currentX = event.touches[0].clientX;
    const deltaX = currentX - startX;
    currentTranslate = prevTranslate + deltaX;
    slider.style.transform = `translateX(${currentTranslate}px)`;
}

function touchEnd() {
    const slideWidth = window.innerWidth;
    currentIndex = -Math.round(currentTranslate / slideWidth);
    currentIndex = Math.max(0, Math.min(currentIndex, slider.children.length - 1));
    currentTranslate = -currentIndex * slideWidth;
    slider.style.transform = `translateX(${currentTranslate}px)`;
}

document.addEventListener("DOMContentLoaded", function () {
    const options = {
        root: null,
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains("slide")) {
                    const description = entry.target.querySelector(".bag-description");
                    const line = entry.target.querySelector(".line");
                    if (description && line) {
                        description.style.opacity = "1";
                       // line.style.opacity = "1";
                    }
                }
            } else {
                const description = entry.target.querySelector(".bag-description");
                const line = entry.target.querySelector(".line");
                if (description && line) {
                    description.style.opacity = "0";
                    line.style.opacity = "0";
                }
            }
        });
    }, options);

    document.querySelectorAll(".slide").forEach(slide => {
        observer.observe(slide);
    });
});
