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
