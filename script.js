const slider = document.querySelector('.slider');
let startX;
let isSwiping = false; // 스와이프 중인지 확인하는 플래그
let currentIndex = 0;
const swipeThreshold = 50; // 스와이프 감도 임계값

slider.addEventListener("touchstart", touchStart);
slider.addEventListener("touchmove", touchMove);
slider.addEventListener("touchend", touchEnd);

function touchStart(event) {
    if (isSwiping) return; // 스와이프 중일 때 새로운 이벤트 차단
    startX = event.touches[0].clientX;
}

function touchMove(event) {
    if (isSwiping) return; // 스와이프 중일 때 움직임 차단
}

function touchEnd(event) {
    if (isSwiping) return; // 스와이프 중일 때 종료 차단
    isSwiping = true; // 스와이프 처리 시작
    const endX = event.changedTouches[0].clientX;
    const deltaX = startX - endX;

    // 스와이프 방향 및 임계값 확인
    if (Math.abs(deltaX) > swipeThreshold) {
        if (deltaX > 0) {
            currentIndex += 1; // 오른쪽으로 스와이프
        } else {
            currentIndex -= 1; // 왼쪽으로 스와이프
        }

        // 슬라이드 인덱스가 범위를 벗어나지 않도록 제한
        currentIndex = Math.max(0, Math.min(currentIndex, slider.children.length - 1));
    }

    // 현재 슬라이드 위치로 부드럽게 이동
    slider.children[currentIndex].scrollIntoView({ behavior: 'smooth' });

    // 애니메이션 완료 후 스와이프 가능하도록 설정
    setTimeout(() => {
        isSwiping = false;
    }, 500); // 0.5초 후 스와이프 가능
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
