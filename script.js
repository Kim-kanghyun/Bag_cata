const slider = document.querySelector('.slider');
let startX;
let isSwiping = false; // 스와이프가 진행 중인지 확인하는 플래그
let currentIndex = 0;
const swipeThreshold = 50; // 스와이프 감도 임계값
const slideWidth = slider.offsetWidth;

slider.addEventListener("touchstart", touchStart);
slider.addEventListener("touchmove", touchMove);
slider.addEventListener("touchend", touchEnd);

function touchStart(event) {
    if (isSwiping) return; // 이미 스와이프가 진행 중이면 새 스와이프를 막음
    startX = event.touches[0].clientX;
}

function touchMove(event) {
    // touchmove에서는 스와이프를 실시간으로 따라가지 않도록 설정
}

function touchEnd(event) {
    if (isSwiping) return; // 진행 중인 스와이프가 있을 경우 중복 스와이프 방지
    isSwiping = true; // 스와이프 플래그 설정
    const endX = event.changedTouches[0].clientX;
    const deltaX = startX - endX;

    // 스와이프 방향 및 임계값 확인 후 인덱스 변경
    if (Math.abs(deltaX) > swipeThreshold) {
        if (deltaX > 0) {
            currentIndex += 1;
        } else {
            currentIndex -= 1;
        }

        // 인덱스가 슬라이드 범위를 벗어나지 않도록 제한
        currentIndex = Math.max(0, Math.min(currentIndex, slider.children.length - 1));
    }

    // 현재 인덱스에 따라 스크롤 위치 설정 (부드러운 애니메이션 포함)
    slider.scrollTo({
        left: currentIndex * slideWidth,
        behavior: 'smooth'
    });

    // 애니메이션이 끝난 후에 스와이프 플래그를 해제하여 다음 스와이프 허용
    requestAnimationFrame(() => {
        setTimeout(() => {
            isSwiping = false;
        }, 300); // 스크롤 애니메이션이 끝나는 시간을 고려하여 300ms 대기
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
