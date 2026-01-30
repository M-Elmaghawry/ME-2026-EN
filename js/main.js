/**
 * Main JavaScript - Handles UI interactions and animations
 */

// Stacking Cards Effect for Experience Timeline
function initStackingCards() {
    const timelineSection = document.getElementById('experience');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (!timelineItems.length || !timelineSection) return;
    
    window.addEventListener('scroll', () => {
        const sectionTop = timelineSection.offsetTop;
        const scrollY = window.pageYOffset;
        const sectionScroll = scrollY - sectionTop + 200;
        
        timelineItems.forEach((item, index) => {
            if (index === 0) return; // First card stays in place
            
            const itemHeight = item.offsetHeight;
            const stackStart = itemHeight * index;
            const stackProgress = Math.max(0, Math.min(1, (sectionScroll - stackStart) / itemHeight));
            const translateY = -itemHeight * 0.8 * stackProgress;
            
            item.style.transform = `translateY(${translateY}px)`;
        });
    }, { passive: true });
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStackingCards);
} else {
    initStackingCards();
}

// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value
        };
        
        // For client-side only, we'll show success and optionally open email client
        // In production, you would send this to a backend API or email service
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Create mailto link as fallback
            const subject = encodeURIComponent(`Consultation Request: ${formData.service}`);
            const body = encodeURIComponent(
                `Name: ${formData.name}\n` +
                `Email: ${formData.email}\n` +
                `Phone: ${formData.phone}\n` +
                `Service: ${formData.service}\n\n` +
                `Message:\n${formData.message}`
            );
            
            // Show success message
            formMessage.textContent = 'Thank you for your message! We will get back to you soon.';
            formMessage.className = 'form-message success';
            
            // Reset form
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
            
            // Optional: Log to console (for development)
            console.log('Form submitted:', formData);
            
        }, 1500);
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.service-card, .course-card, .portfolio-item, .timeline-item, .client-logo'
    );
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
});

// Auto-rotate testimonials every 5 seconds
let autoRotateInterval;

function startTestimonialAutoRotate() {
    autoRotateInterval = setInterval(() => {
        const nextBtn = document.getElementById('nextTestimonial');
        if (nextBtn) nextBtn.click();
    }, 5000);
}

function stopTestimonialAutoRotate() {
    if (autoRotateInterval) {
        clearInterval(autoRotateInterval);
    }
}

// Start auto-rotate when page loads
window.addEventListener('load', () => {
    setTimeout(startTestimonialAutoRotate, 2000);
});

// Pause auto-rotate when user interacts with testimonials
document.addEventListener('DOMContentLoaded', () => {
    const testimonialControls = document.querySelectorAll('#prevTestimonial, #nextTestimonial');
    testimonialControls.forEach(btn => {
        btn.addEventListener('click', () => {
            stopTestimonialAutoRotate();
            setTimeout(startTestimonialAutoRotate, 10000); // Resume after 10 seconds
        });
    });
});

// Prevent form resubmission on page refresh
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// Add loading class to body until all content is loaded
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Console branding (optional)
console.log(
    '%cWebsite by Professional Engineering Services',
    'color: #0e86d4; font-size: 16px; font-weight: bold;'
);
