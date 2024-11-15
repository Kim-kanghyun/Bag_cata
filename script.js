const slider = document.querySelector('.slider');
let startX;
let isDragging = false;
const swipeThreshold = 200; // 스와이프 거리 임계값 (100px로 설정, 필요에 따라 조정)

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

    // 터치가 이동하는 동안 슬라이더를 따라 이동하게끔 하는 효과
    slider.scrollLeft += deltaX;
    startX = currentX;
}

function touchEnd(event) {
    isDragging = false;
    const endX = event.changedTouches[0].clientX;
    const deltaX = startX - endX;

    // 스와이프 거리 임계값 적용
    if (Math.abs(deltaX) > swipeThreshold) {
        const slideWidth = slider.offsetWidth;
        if (deltaX > 0) {
            // 오른쪽으로 스와이프 -> 다음 슬라이드로
            slider.scrollLeft += slideWidth;
        } else {
            // 왼쪽으로 스와이프 -> 이전 슬라이드로
            slider.scrollLeft -= slideWidth;
        }
    } else {
        // 스와이프 거리가 임계값 이하일 때는 현재 위치로 돌아옴
        slider.scrollLeft = Math.round(slider.scrollLeft / slider.offsetWidth) * slider.offsetWidth;
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
                      //  line.style.opacity = "1";
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
