const slider = document.querySelector('.slider');
let startX;
let isDragging = false;

slider.addEventListener("touchstart", touchStart);
slider.addEventListener("touchmove", touchMove);
slider.addEventListener("touchend", touchEnd);

function touchStart(event) {
    startX = event.touches[0].clientX;
    isDragging = true;
}

function touchMove(event) {
    if (!isDragging) return;
    const currentX = event.touches[0].clientX;
    const deltaX = startX - currentX;

    // 슬라이드를 따라 이동하게끔 하는 효과
    slider.scrollLeft += deltaX;
    startX = currentX;
}

function touchEnd() {
    isDragging = false;
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
                        line.style.opacity = "1";
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
