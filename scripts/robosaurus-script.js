document.addEventListener('DOMContentLoaded', function () {
    const galleries = document.querySelectorAll('.gallery-container');

    galleries.forEach(container => {
        const gallery = container.querySelector('.gallery');
        const prevButton = container.querySelector('.nav-button.left');
        const nextButton = container.querySelector('.nav-button.right');
        const images = gallery.querySelectorAll('img');
        let currentIndex = 0;
        let autoSlideInterval;

        if (images.length === 0) {
            prevButton.style.display = 'none';
            nextButton.style.display = 'none';
            return;
        }

        function updateButtons() {
            prevButton.classList.toggle('hidden', currentIndex === 0);
            nextButton.classList.toggle('hidden', currentIndex === images.length - 1);
        }

        function moveToNextImage() {
            if (currentIndex < images.length - 1) {
                currentIndex++;
                gallery.style.transform = `translateX(-${currentIndex * 100}%)`;
                updateButtons();
            } else {
                clearInterval(autoSlideInterval); // Stop the auto-slide when it reaches the end
            }
        }

        function startAutoSlide() {
            autoSlideInterval = setInterval(moveToNextImage, 5000); // Change image every 3 seconds
        }

        prevButton.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                gallery.style.transform = `translateX(-${currentIndex * 100}%)`;
                updateButtons();
            }
        });

        nextButton.addEventListener('click', () => {
            if (currentIndex < images.length - 1) {
                currentIndex++;
                gallery.style.transform = `translateX(-${currentIndex * 100}%)`;
                updateButtons();
            }
        });

        updateButtons();
        startAutoSlide(); // Start the auto-slide when the page loads
    });
});

const textContainer = document.querySelector('.text-container');

function isCursorNearElement(event, element, threshold = 50) {
    const rect = element.getBoundingClientRect();
    return (
        event.clientX >= rect.left - threshold &&
        event.clientX <= rect.right + threshold &&
        event.clientY >= rect.top - threshold &&
        event.clientY <= rect.bottom + threshold
    );
}

document.addEventListener('mousemove', (event) => {
    if (isCursorNearElement(event, textContainer)) {
        textContainer.classList.add('show-scrollbar');
    } else {
        textContainer.classList.remove('show-scrollbar');
    }
});