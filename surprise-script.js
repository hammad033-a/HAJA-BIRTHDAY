// DOM elements
const giftSection = document.getElementById('gift-section');
const messageSection = document.getElementById('message-section');
const gallerySection = document.getElementById('gallery-section');
const slideshowSection = document.getElementById('slideshow-section');
const giftBoxes = document.querySelectorAll('.gift-box');
const backToGiftsBtn = document.getElementById('back-to-gifts');
const backToGiftsFromGalleryBtn = document.getElementById('back-to-gifts-from-gallery');
const backToGiftsFromSlideshowBtn = document.getElementById('back-to-gifts-from-slideshow');

// Slideshow variables
let currentSlide = 0;
let slideshowInterval;
let isPlaying = true;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎁 Gift Surprise Page Loading...');
    
    // Add event listeners to gift boxes
    giftBoxes.forEach((giftBox, index) => {
        giftBox.addEventListener('click', function() {
            openGift(index + 1);
        });
    });
    
    // Add event listener to back button
    if (backToGiftsBtn) {
        backToGiftsBtn.addEventListener('click', showGiftSection);
    }
    
    // Add event listener to gallery back button
    if (backToGiftsFromGalleryBtn) {
        backToGiftsFromGalleryBtn.addEventListener('click', showGiftSection);
    }
    
    // Add event listener to slideshow back button
    if (backToGiftsFromSlideshowBtn) {
        backToGiftsFromSlideshowBtn.addEventListener('click', showGiftSection);
    }
    
    // Initialize slideshow controls
    initializeSlideshowControls();
    
    // Add some fun interactions
    addGiftInteractions();
});

// Open gift function
function openGift(giftNumber) {
    console.log(`🎁 Opening gift ${giftNumber}...`);
    
    // Add opening animation to the clicked gift
    const clickedGift = document.getElementById(`gift${giftNumber}`);
    clickedGift.style.animation = 'giftOpen 0.5s ease-out';
    
    // Play opening sound effect (optional)
    playGiftSound();
    
    // Show opening message
    showOpeningMessage(giftNumber);
    
    // After a short delay, show the appropriate section
    setTimeout(() => {
        if (giftNumber === 2) {
            showGallerySection();
        } else if (giftNumber === 3) {
            showSlideshowSection();
        } else {
            showMessageSection();
        }
    }, 1500);
    
    // Reset the gift box animation after it completes
    setTimeout(() => {
        clickedGift.style.animation = '';
        clickedGift.style.transform = 'scale(1)';
        
        // Add a subtle glow to show it's been opened
        clickedGift.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.5)';
        clickedGift.style.border = '2px solid rgba(255, 255, 255, 0.8)';
        
        // Change the gift icon to show it's been opened
        const giftIcon = clickedGift.querySelector('.gift-icon');
        if (giftIcon) {
            if (giftNumber === 2) {
                giftIcon.textContent = '📸';
            } else if (giftNumber === 3) {
                giftIcon.textContent = '🎬';
            } else {
                giftIcon.textContent = '✨';
            }
        }
    }, 500);
}

// Show opening message
function showOpeningMessage(giftNumber) {
    const giftContainer = document.querySelector('.gift-container');
    
    // Create opening message
    const openingMsg = document.createElement('div');
    openingMsg.className = 'opening-message';
    openingMsg.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 255, 255, 0.95);
            padding: 2rem;
            border-radius: 20px;
            text-align: center;
            z-index: 1000;
            animation: messagePop 0.5s ease-out;
        ">
            <div style="font-size: 3rem; margin-bottom: 1rem;">🎁</div>
            <h2 style="color: #333; margin-bottom: 1rem;">Opening Gift ${giftNumber}...</h2>
            <p style="color: #666;">Your special surprise is ready! ✨</p>
        </div>
    `;
    
    document.body.appendChild(openingMsg);
    
    // Remove message after animation
    setTimeout(() => {
        openingMsg.remove();
    }, 1500);
}

// Show gift section
function showGiftSection() {
    giftSection.classList.add('active');
    messageSection.classList.remove('active');
    gallerySection.classList.remove('active');
    slideshowSection.classList.remove('active');
    
    // Stop slideshow when leaving
    stopSlideshow();
}

// Show message section
function showMessageSection() {
    giftSection.classList.remove('active');
    messageSection.classList.add('active');
    gallerySection.classList.remove('active');
    slideshowSection.classList.remove('active');
    
    // Stop slideshow when leaving
    stopSlideshow();
    
    // Trigger entrance animations
    triggerMessageAnimations();
}

// Show gallery section
function showGallerySection() {
    giftSection.classList.remove('active');
    gallerySection.classList.add('active');
    messageSection.classList.remove('active');
    slideshowSection.classList.remove('active');
    
    // Stop slideshow when leaving
    stopSlideshow();
    
    // Trigger gallery animations
    triggerGalleryAnimations();
}

// Show slideshow section
function showSlideshowSection() {
    giftSection.classList.remove('active');
    slideshowSection.classList.add('active');
    messageSection.classList.remove('active');
    gallerySection.classList.remove('active');
    
    // Start slideshow animations
    triggerSlideshowAnimations();
    startSlideshow();
}

// Trigger message animations
function triggerMessageAnimations() {
    // Add entrance animation to birthday title
    const birthdayTitle = document.querySelector('.birthday-title');
    birthdayTitle.style.animation = 'slideIn 1s ease-out';
    
    // Add entrance animation to cake
    const cake = document.querySelector('.cake');
    cake.style.animation = 'slideIn 1s ease-out 0.5s both';
    
    // Add entrance animation to personal message
    const personalMessage = document.querySelector('.personal-message');
    personalMessage.style.animation = 'slideIn 1s ease-out 1s both';
    
    // Add extra animations
    setTimeout(() => {
        addExtraAnimations();
    }, 2000);
}

// Trigger gallery animations
function triggerGalleryAnimations() {
    // Add entrance animation to gallery title
    const galleryTitle = document.querySelector('.gallery-title');
    galleryTitle.style.animation = 'slideIn 1s ease-out';
    
    // Add entrance animation to images
    const imageContainers = document.querySelectorAll('.image-container');
    imageContainers.forEach((container, index) => {
        container.style.animation = `slideIn 1s ease-out ${0.5 + index * 0.3}s both`;
    });
    
    // Add entrance animation to navigation
    const navigation = document.querySelector('.gallery-navigation');
    navigation.style.animation = 'slideIn 1s ease-out 1.5s both';
}

// Add extra animations
function addExtraAnimations() {
    // Create additional confetti
    createExtraConfetti();
    
    // Add sparkle effects
    addSparkleEffects();
}

// Create extra confetti
function createExtraConfetti() {
    const confettiContainer = document.querySelector('.confetti-container');
    
    for (let i = 0; i < 20; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        confettiContainer.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Add sparkle effects
function addSparkleEffects() {
    const sparkleColors = ['#ffd93d', '#ff6b6b', '#4ecdc4', '#feca57'];
    
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            createSparkle(sparkleColors[Math.floor(Math.random() * sparkleColors.length)]);
        }, i * 200);
    }
}

// Create sparkle effect
function createSparkle(color) {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'absolute';
    sparkle.style.width = '4px';
    sparkle.style.height = '4px';
    sparkle.style.backgroundColor = color;
    sparkle.style.borderRadius = '50%';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';
    sparkle.style.zIndex = '15';
    sparkle.style.animation = 'sparkle 1s ease-out forwards';
    
    document.body.appendChild(sparkle);
    
    // Remove sparkle after animation
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// Play gift sound (optional)
function playGiftSound() {
    // This would require user interaction due to browser autoplay policies
    console.log('🎵 Gift opening sound would play here');
}

// Add gift interactions
function addGiftInteractions() {
    // Add hover effects
    giftBoxes.forEach((giftBox, index) => {
        giftBox.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        giftBox.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add click feedback
        giftBox.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Add sparkle animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkle {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1) rotate(180deg);
            opacity: 1;
        }
        100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes giftOpen {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
    
    @keyframes messagePop {
        0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
        50% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
    }
`;
document.head.appendChild(style);

// Add touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - go to message
            if (giftSection.classList.contains('active')) {
                openGift(1); // Open first gift
            }
        } else {
            // Swipe right - go back to gifts
            if (messageSection.classList.contains('active')) {
                showGiftSection();
            }
        }
    }
}

// Add keyboard support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        if (giftSection.classList.contains('active')) {
            openGift(1); // Open first gift
        }
    } else if (e.key === 'Escape') {
        if (messageSection.classList.contains('active')) {
            showGiftSection();
        }
    }
});

// Initialize slideshow controls
function initializeSlideshowControls() {
    const prevBtn = document.getElementById('prev-slide');
    const nextBtn = document.getElementById('next-slide');
    const playPauseBtn = document.getElementById('play-pause');
    const resetBtn = document.getElementById('reset-slideshow');
    const indicators = document.querySelectorAll('.indicator');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => changeSlide(-1));
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => changeSlide(1));
    }
    
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', toggleSlideshow);
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', resetSlideshow);
    }
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });
}

// Trigger slideshow animations
function triggerSlideshowAnimations() {
    const slideshowTitle = document.querySelector('.slideshow-title');
    const slideshowSubtitle = document.querySelector('.slideshow-subtitle');
    
    if (slideshowTitle) {
        slideshowTitle.style.animation = 'slideIn 1s ease-out';
    }
    
    if (slideshowSubtitle) {
        slideshowSubtitle.style.animation = 'slideIn 1s ease-out 0.5s both';
    }
}

// Start slideshow
function startSlideshow() {
    if (!isPlaying) return;
    
    slideshowInterval = setInterval(() => {
        changeSlide(1);
    }, 4000); // Change slide every 4 seconds
}

// Stop slideshow
function stopSlideshow() {
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
        slideshowInterval = null;
    }
}

// Change slide
function changeSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    
    if (slides.length === 0) return;
    
    // Remove active class from current slide
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    
    // Calculate new slide index
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    
    // Add active class to new slide
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
    
    // Update slideshow track position
    const track = document.getElementById('slideshow-track');
    if (track) {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
}

// Go to specific slide
function goToSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    
    if (index < 0 || index >= slides.length) return;
    
    // Remove active class from current slide
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    
    // Set new slide
    currentSlide = index;
    
    // Add active class to new slide
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
    
    // Update slideshow track position
    const track = document.getElementById('slideshow-track');
    if (track) {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
}

// Toggle slideshow play/pause
function toggleSlideshow() {
    const playPauseBtn = document.getElementById('play-pause');
    
    if (isPlaying) {
        stopSlideshow();
        isPlaying = false;
        if (playPauseBtn) {
            playPauseBtn.textContent = '▶️ Play';
        }
    } else {
        startSlideshow();
        isPlaying = true;
        if (playPauseBtn) {
            playPauseBtn.textContent = '⏸️ Pause';
        }
    }
}

// Reset slideshow
function resetSlideshow() {
    goToSlide(0);
    if (!isPlaying) {
        toggleSlideshow();
    }
}

// Add some console messages for fun
console.log('🎁 Gift Surprise Page Loaded!');
console.log('Click on any gift box to reveal the surprise!');
