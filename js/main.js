/**
 * Main JavaScript - Handles UI interactions and animations
 */

// Ensure page always starts from the top
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

// Prevent scroll restoration on page load
document.addEventListener('DOMContentLoaded', () => {
    window.scrollTo(0, 0);
});

window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});

// Scroll to top on page load (backup)
window.onload = () => {
    // Clear any hash from URL without scrolling
    if (window.location.hash) {
        history.replaceState(null, null, window.location.pathname);
    }
    window.scrollTo(0, 0);
};

// Typewriter Effect for Hero Section
function initTypewriter() {
    const texts = [
        "BIM Coordinator",
        "Structural BIM Engineer",
        "Infrastructure BIM Engineer",
        "Certified Professional by Saudi Council of Engineers",
        "Autodesk Certified Instructor",
        "Revit Structure Certified Professional",
        "Revit Architecture Certified Professional"
    ];
    
    const typewriterElement = document.getElementById('typewriterText');
    if (!typewriterElement) return;
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500; // Pause before next text
        }
        
        setTimeout(type, typingSpeed);
    }
    
    type();
}

// Initialize typewriter on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTypewriter);
} else {
    initTypewriter();
}

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
let isEmailJsInitialized = false;

function showFormStatus(message, type) {
    if (!formMessage) return;

    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
}

function hideFormStatus(delay = 5000) {
    if (!formMessage) return;

    setTimeout(() => {
        formMessage.style.display = 'none';
        formMessage.className = 'form-message';
        formMessage.textContent = '';
    }, delay);
}

function getEmailJsConfig(form) {
    return {
        publicKey: form.dataset.emailjsPublicKey?.trim() || '',
        serviceId: form.dataset.emailjsServiceId?.trim() || '',
        templateId: form.dataset.emailjsTemplateId?.trim() || ''
    };
}

function isEmailJsConfigMissing(config) {
    return (
        !config.publicKey ||
        !config.serviceId ||
        !config.templateId ||
        config.publicKey.includes('YOUR_') ||
        config.serviceId.includes('YOUR_') ||
        config.templateId.includes('YOUR_')
    );
}

function initializeEmailJs(publicKey) {
    if (isEmailJsInitialized) return true;

    try {
        window.emailjs.init({ publicKey });
        isEmailJsInitialized = true;
        return true;
    } catch (error) {
        console.error('EmailJS init error:', error);
        return false;
    }
}

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const emailJsConfig = getEmailJsConfig(contactForm);
        if (isEmailJsConfigMissing(emailJsConfig)) {
            showFormStatus('Contact form is not configured yet. Add your EmailJS keys in the form data attributes.', 'error');
            hideFormStatus(7000);
            return;
        }

        if (!window.emailjs) {
            showFormStatus('Email service is currently unavailable. Please try again later.', 'error');
            hideFormStatus(7000);
            return;
        }

        if (!initializeEmailJs(emailJsConfig.publicKey)) {
            showFormStatus('Email service initialization failed. Please check your EmailJS public key.', 'error');
            hideFormStatus(7000);
            return;
        }

        const phoneInput = document.getElementById('phone').value.trim();
        const countryCode = document.getElementById('countryCode').value;
        const formattedPhone = phoneInput
            ? (countryCode === 'Other' ? phoneInput : `${countryCode} ${phoneInput}`)
            : '';
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: formattedPhone,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value
        };
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
            const sentAt = new Date();
            const templateParams = {
                from_name: formData.name,
                from_email: formData.email,
                phone: formData.phone,
                service: formData.service,
                message: formData.message,
                reply_to: formData.email,
                sent_at: sentAt.toISOString(),

                // Compatibility fields for default EmailJS templates
                name: formData.name,
                email: formData.email,
                title: `Consultation Request: ${formData.service}`,
                time: sentAt.toLocaleString('en-GB')
            };

            const response = await window.emailjs.send(
                emailJsConfig.serviceId,
                emailJsConfig.templateId,
                templateParams
            );

            if (!response || response.status !== 200) {
                throw new Error(`Unexpected EmailJS response: ${JSON.stringify(response)}`);
            }

            showFormStatus('Thank you for your message! We will get back to you soon.', 'success');
            contactForm.reset();
            hideFormStatus();
        } catch (error) {
            console.error('EmailJS send error:', error);
            showFormStatus('Sorry, your message could not be sent. Please try again.', 'error');
            hideFormStatus(7000);
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
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
