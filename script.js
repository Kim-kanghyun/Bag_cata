const slider = document.querySelector('.slider');
let startX;
let currentIndex = 0;
const swipeThreshold = 150; // 스와이프 감도를 조절하기 위해 임계값을 50px로 낮춤

slider.addEventListener("touchstart", touchStart);
slider.addEventListener("touchmove", touchMove);
slider.addEventListener("touchend", touchEnd);

function touchStart(event) {
    startX = event.touches[0].clientX;
}

function touchMove(event) {
    const currentX = event.touches[0].clientX;
    const deltaX = startX - currentX;

    // 스와이프 이동 중 화면 위치 변경을 하지 않고, 터치 끝에서만 처리
}

function touchEnd(event) {
    const endX = event.changedTouches[0].clientX;
    const deltaX = startX - endX;

    if (Math.abs(deltaX) > swipeThreshold) {
        // 왼쪽으로 스와이프하면 다음 슬라이드, 오른쪽이면 이전 슬라이드로 이동
        if (deltaX > 0) {
            currentIndex += 1;
        } else {
            currentIndex -= 1;
        }

        // 슬라이드 인덱스가 범위를 벗어나지 않도록 제한
        currentIndex = Math.max(0, Math.min(currentIndex, slider.children.length - 1));
    }

    // 현재 슬라이드 위치로 스크롤 이동 (한 페이지씩 이동, 애니메이션 포함)
    slider.children[currentIndex].scrollIntoView({ behavior: 'smooth' });
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
