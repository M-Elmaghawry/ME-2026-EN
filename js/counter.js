/**
 * Counter Animation for Stats Section
 * Animates numbers from 0 to their final value
 */

// Function to animate counter
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60 FPS
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, 16);
}

// Format number with + suffix if needed
function formatNumber(num) {
    const numStr = num.toString();
    // Check if original had + suffix
    return numStr;
}

// Parse number from string (remove + and other non-digits)
function parseNumber(str) {
    return parseInt(str.replace(/[^0-9]/g, ''));
}

// Intersection Observer for stats section
function initCounterAnimation() {
    const statsSection = document.getElementById('stats');
    if (!statsSection) return;
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    let hasAnimated = false;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                animateStats();
            }
        });
    }, observerOptions);
    
    observer.observe(statsSection);
}

// Animate all stat numbers
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach((element, index) => {
        const originalText = element.textContent;
        const hasPlus = originalText.includes('+');
        const targetNumber = parseNumber(originalText);
        
        // Store original format
        element.dataset.originalFormat = originalText;
        
        // Start animation with delay based on index
        setTimeout(() => {
            let current = 0;
            const increment = targetNumber / 100; // 100 steps
            const duration = 2000; // 2 seconds
            const stepTime = duration / 100;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= targetNumber) {
                    element.textContent = hasPlus ? targetNumber + '+' : targetNumber;
                    clearInterval(timer);
                    
                    // Add completed class for additional effects
                    element.classList.add('count-completed');
                } else {
                    const displayNumber = Math.floor(current);
                    element.textContent = hasPlus ? displayNumber + '+' : displayNumber;
                }
            }, stepTime);
        }, index * 200); // Stagger animation
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCounterAnimation);
} else {
    // Delay to ensure data is loaded
    setTimeout(initCounterAnimation, 500);
}

// Re-initialize if stats are dynamically loaded
window.addEventListener('statsLoaded', initCounterAnimation);
