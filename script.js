const slider = document.querySelector('.slider');
let startX;
let startTime;
let currentIndex = 0;
const swipeThreshold = 20000; // 스와이프 감도 조정 임계값 (픽셀)

slider.addEventListener("touchstart", touchStart);
slider.addEventListener("touchmove", touchMove);
slider.addEventListener("touchend", touchEnd);

function touchStart(event) {
    startX = event.touches[0].clientX;
    startTime = new Date().getTime(); // 터치 시작 시간 기록
}

function touchMove(event) {
    const currentX = event.touches[0].clientX;
    const deltaX = startX - currentX;

    // 터치 이동 중 화면 위치 변경은 하지 않고, 터치 끝에서만 처리
}

function touchEnd(event) {
    const endX = event.changedTouches[0].clientX;
    const deltaX = startX - endX;
    const endTime = new Date().getTime(); // 터치 종료 시간 기록
    const timeDiff = endTime - startTime; // 터치 지속 시간 계산

    // 빠른 스와이프는 방향만 감지해 한 페이지 이동, 느린 스와이프는 임계값으로 판단
    if (timeDiff < 200 || Math.abs(deltaX) > swipeThreshold) {
        // 스와이프 방향에 따라 인덱스 업데이트
        if (deltaX > 0) {
            currentIndex += 1; // 오른쪽으로 스와이프
        } else {
            currentIndex -= 1; // 왼쪽으로 스와이프
        }

        // 슬라이드 인덱스 범위를 벗어나지 않도록 제한
        currentIndex = Math.max(0, Math.min(currentIndex, slider.children.length - 1));
    }

    // 현재 슬라이드 위치로 부드럽게 스크롤 이동
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
