const slider = document.querySelector('.slider');
let startX;
let currentIndex = 0;
const swipeThreshold = 50; // 스와이프 감도 조정
const slideWidth = slider.offsetWidth; // 슬라이드 너비

slider.addEventListener("touchstart", touchStart);
slider.addEventListener("touchmove", touchMove);
slider.addEventListener("touchend", touchEnd);

function touchStart(event) {
    startX = event.touches[0].clientX;
}

function touchMove(event) {
    // `touchmove`에서 아무 작업도 하지 않음으로써 부드러운 스와이프 감도 조정
}

function touchEnd(event) {
    const endX = event.changedTouches[0].clientX;
    const deltaX = startX - endX;

    // 스와이프 거리가 임계값 이상일 때만 페이지 변경
    if (Math.abs(deltaX) > swipeThreshold) {
        if (deltaX > 0) {
            currentIndex += 1; // 오른쪽으로 스와이프
        } else {
            currentIndex -= 1; // 왼쪽으로 스와이프
        }
    }

    // 슬라이드 인덱스가 범위를 벗어나지 않도록 제한
    currentIndex = Math.max(0, Math.min(currentIndex, slider.children.length - 1));

    // 현재 슬라이드 위치로 직접 `scrollLeft` 설정 (부드러운 애니메이션 포함)
    slider.scrollTo({
        left: currentIndex * slideWidth,
        behavior: 'smooth'
    });
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
