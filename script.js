// Global variables
let currentQRCode = null;

// DOM elements
const qrSection = document.getElementById('qr-section');
const qrCodeDiv = document.getElementById('qr-code');
const generateQRBtn = document.getElementById('generate-qr');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎉 Birthday Surprise Website Loading...');
    console.log('Checking for QR code libraries...');
    
    // Check if QR code libraries are available
    if (typeof QRCode !== 'undefined') {
        console.log('✅ QRCode library found');
    } else {
        console.log('❌ QRCode library not found');
    }
    
    if (typeof qrcode !== 'undefined') {
        console.log('✅ qrcode-generator library found');
    } else {
        console.log('❌ qrcode-generator library not found');
    }
    
    // Generate initial QR code
    generateQRCode();
    
    // Add event listeners
    generateQRBtn.addEventListener('click', generateQRCode);
    
    // Add test surprise button
    const testSurpriseBtn = document.getElementById('test-surprise');
    if (testSurpriseBtn) {
        testSurpriseBtn.addEventListener('click', function() {
            const currentURL = window.location.href;
            const baseURL = currentURL.endsWith('index.html') ? currentURL.replace('index.html', '') : currentURL;
            window.location.href = baseURL + 'surprise.html';
        });
    }
    
    // Check if user came from QR code scan
    checkQRCodeAccess();
});

// Generate QR code
function generateQRCode() {
    // Clear previous QR code
    qrCodeDiv.innerHTML = '';
    
    // Build surprise URL always (no localhost warning)
    let currentURL = window.location.origin + window.location.pathname;
    const baseURL = currentURL.endsWith('index.html') ? currentURL.replace('index.html', '') : currentURL;
    const surpriseURL = baseURL + 'surprise.html';
    
    console.log('Attempting to generate QR code for:', surpriseURL);
    
    // Try multiple QR code generation methods
    try {
        // Method 1: Try QRCode.toCanvas
        if (typeof QRCode !== 'undefined' && QRCode.toCanvas) {
            QRCode.toCanvas(qrCodeDiv, surpriseURL, {
                width: 220,
                height: 220,
                margin: 2,
                color: {
                    dark: '#000000',
                    light: '#FFFFFF'
                }
            }, function(error) {
                if (error) {
                    console.error('QRCode.toCanvas error:', error);
                    generateQRCodeFallback(surpriseURL);
                } else {
                    currentQRCode = surpriseURL;
                    console.log('QR Code generated successfully with QRCode.toCanvas:', surpriseURL);
                }
            });
        } else {
            console.log('QRCode.toCanvas not available, trying fallback');
            generateQRCodeFallback(surpriseURL);
        }
    } catch (error) {
        console.error('QR Code generation error:', error);
        generateQRCodeFallback(surpriseURL);
    }
}

// Fallback QR code generation
function generateQRCodeFallback(url) {
    try {
        // Method 2: Try qrcode-generator
        if (typeof qrcode !== 'undefined') {
            const qr = qrcode(0, 'M');
            qr.addData(url);
            qr.make();
            
            const qrImage = qr.createImgTag(5);
            qrCodeDiv.innerHTML = qrImage;
            currentQRCode = url;
            console.log('QR Code generated successfully with fallback:', url);
        } else {
            // Method 3: Create a simple text-based QR code placeholder
            console.log('No QR code library available, creating placeholder');
            qrCodeDiv.innerHTML = `
                <div style="
                    width: 220px; 
                    height: 220px; 
                    border: 2px dashed #ccc; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    background: #f9f9f9;
                    border-radius: 10px;
                ">
                    <div style="text-align: center; color: #666;">
                        <div style="font-size: 24px; margin-bottom: 10px;">📱</div>
                        <div>QR Code</div>
                        <div style="font-size: 12px; margin-top: 5px;">Click to test</div>
                    </div>
                </div>
            `;
            
            // Make it clickable to test the surprise
            qrCodeDiv.style.cursor = 'pointer';
            qrCodeDiv.onclick = function() {
                window.location.href = url;
            };
        }
    } catch (error) {
        console.error('Fallback QR code generation error:', error);
        qrCodeDiv.innerHTML = '<p style="color: red;">Error generating QR code. Please check console for details.</p>';
    }
}

// Check if user accessed via QR code - redirect to surprise page
function checkQRCodeAccess() {
    const urlParams = new URLSearchParams(window.location.search);
    const isSurprise = urlParams.get('surprise');
    
    if (isSurprise === 'true') {
        // Redirect to surprise.html page
        const currentURL = window.location.href;
        const baseURL = currentURL.split('?')[0];
        const finalBaseURL = baseURL.endsWith('index.html') ? baseURL.replace('index.html', '') : baseURL;
        window.location.href = finalBaseURL + 'surprise.html';
    }
}

// Show QR code section (simplified since no surprise section here)
function showQRSection() {
    // Just ensure QR section is visible
    qrSection.classList.add('active');
    
    // Update URL to remove surprise parameter
    const newURL = window.location.pathname;
    window.history.pushState({}, '', newURL);
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
`;
document.head.appendChild(style);

// Add touch/swipe support for mobile → open surprise.html directly
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
        const currentURL = window.location.href;
        const baseURL = currentURL.endsWith('index.html') ? currentURL.replace('index.html', '') : currentURL;
        window.location.href = baseURL + 'surprise.html';
    }
}

// Add keyboard support → open surprise.html directly on Enter/ArrowLeft
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === 'ArrowLeft') {
        const currentURL = window.location.href;
        const baseURL = currentURL.endsWith('index.html') ? currentURL.replace('index.html', '') : currentURL;
        window.location.href = baseURL + 'surprise.html';
    }
});

// Add some console messages for fun
console.log('🎉 Birthday Surprise Website Loaded! 🎉');
console.log('Scan the QR code to see the surprise!');
