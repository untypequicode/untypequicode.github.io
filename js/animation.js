const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('as');
        } else {
            entry.target.classList.remove('as');
        }
    });
});

const hiddenElements = document.querySelectorAll('.ah, .ah-n, .ah-i');
hiddenElements.forEach((element) => {
    observer.observe(element);
});