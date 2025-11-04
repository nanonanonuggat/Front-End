// Slide functionality
function slideMenu(direction) {
    const slider = document.getElementById('menuSlider');
    const scrollAmount = 330; // Adjust based on your card width + gap
    
    slider.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}

// Auto-scroll every 5 seconds (optional)
let autoScroll = setInterval(() => {
    slideMenu(1);
}, 5000);

// Pause auto-scroll on hover
const menuContainer = document.querySelector('.menu-container');
menuContainer.addEventListener('mouseenter', () => {
    clearInterval(autoScroll);
});

menuContainer.addEventListener('mouseleave', () => {
    autoScroll = setInterval(() => {
        slideMenu(1);
    }, 5000);
});

// Add click effect to order buttons
document.querySelectorAll('.order-btn').forEach(button => {
    button.addEventListener('click', function() {
        const foodName = this.closest('.menu-item').querySelector('.food-name').textContent;
        alert(`Terima kasih! Anda memesan: ${foodName} 🎉`);
        
        // Add animation effect
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });
});