const slider = document.querySelector('.slider');
let startX;
let currentIndex = 0;

slider.addEventListener("touchstart", touchStart);
slider.addEventListener("touchend", touchEnd);

function touchStart(event) {
    startX = event.touches[0].clientX;
}

function touchEnd(event) {
    const slideWidth = slider.offsetWidth;
    const deltaX = startX - event.changedTouches[0].clientX;

    // 슬라이드 변경을 위한 임계값 (필요 시 조정 가능)
    if (Math.abs(deltaX) > slideWidth / 4) {
        currentIndex += deltaX > 0 ? 1 : -1;
        currentIndex = Math.max(0, Math.min(currentIndex, slider.children.length - 1));
        slider.scrollLeft = currentIndex * slideWidth;
    }
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
