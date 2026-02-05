/**
 * Data Loader - Handles fetching and rendering dynamic content from JSON files
 * All content is loaded dynamically to maintain separation of data and presentation
 */

// Data cache to avoid redundant API calls
const dataCache = {};

/**
 * Fetch JSON data with caching
 * @param {string} path - Path to JSON file
 * @returns {Promise<Object>} - Parsed JSON data
 */
async function fetchData(path) {
    if (dataCache[path]) {
        console.log(`Returning cached data for ${path}`);
        return dataCache[path];
    }
    
    try {
        console.log(`Fetching data from ${path}`);
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} for ${path}`);
        }
        const data = await response.json();
        dataCache[path] = data;
        console.log(`Successfully loaded ${path}:`, data);
        return data;
    } catch (error) {
        console.error(`Error loading ${path}:`, error);
        return null;
    }
}

/**
 * Render Hero Section
 */
async function renderHero() {
    const data = await fetchData('data/hero.json');
    if (!data) return;
    
    const heroTitle = document.getElementById('heroTitle');
    const titleLines = (data.title || '').split('\n');
    heroTitle.innerHTML = '';
    titleLines.forEach((line, index) => {
        const lineSpan = document.createElement('span');
        lineSpan.className = 'hero-title-line';
        lineSpan.textContent = line.trim();
        heroTitle.appendChild(lineSpan);
        if (index < titleLines.length - 1) {
            heroTitle.appendChild(document.createElement('br'));
        }
    });
    document.getElementById('heroSubtitle').textContent = data.subtitle;
    document.getElementById('heroDescription').textContent = data.description;
    
    // Set hero image if provided
    if (data.profileImage) {
        document.getElementById('heroImage').src = data.profileImage;
    }
    
    // Set WhatsApp links (explicit numbers per request)
    const whatsappNumbers = Array.isArray(data.whatsapp) ? data.whatsapp : [data.whatsapp];
    const whatsappMessage = encodeURIComponent(data.whatsappMessage || 'Hello! I would like to discuss your services.');
    const headerWhatsappUrl = `https://wa.me/00201096189832?text=${whatsappMessage}`;
    const floatWhatsappUrl = `https://wa.me/966531175199?text=${whatsappMessage}`;
    
    document.getElementById('whatsappHeaderBtn').href = headerWhatsappUrl;
    document.getElementById('whatsappFloat').href = floatWhatsappUrl;
    
    // Set contact info
    document.getElementById('contactEmail').textContent = data.email;
    
    // Handle multiple phones
    const phones = Array.isArray(data.phone) ? data.phone : [data.phone];
    document.getElementById('contactPhone').innerHTML = phones.map(phone => 
        `<a href="tel:${phone.replace(/[^0-9+]/g, '')}">${phone}</a>`
    ).join('<br>');
    
    // Handle multiple locations
    const locations = Array.isArray(data.location) ? data.location : [data.location];
    document.getElementById('contactLocation').innerHTML = locations.join('<br>');
    
    // Handle multiple WhatsApp numbers in contact section
    document.getElementById('contactWhatsapp').innerHTML = whatsappNumbers.map((num, index) => 
        `<a href="https://wa.me/${num}?text=${whatsappMessage}" target="_blank" rel="noopener noreferrer">+${num}</a>`
    ).join('<br>');
}

/**
 * Render Stats Section
 */
async function renderStats() {
    const data = await fetchData('data/hero.json');
    if (!data || !data.stats) return;
    
    const statsGrid = document.getElementById('statsGrid');
    statsGrid.innerHTML = '';
    
    data.stats.forEach(stat => {
        const statItem = document.createElement('div');
        statItem.className = 'stat-item';
        statItem.innerHTML = `
            <span class="stat-number">${stat.number}</span>
            <span class="stat-label">${stat.label}</span>
        `;
        statsGrid.appendChild(statItem);
    });
    
    // Trigger counter animation after stats are loaded
    setTimeout(() => {
        window.dispatchEvent(new Event('statsLoaded'));
    }, 100);
}

/**
 * Render Experience Timeline
 */
async function renderExperience() {
    const data = await fetchData('data/experience.json');
    if (!data || !data.timeline) return;
    
    const timeline = document.getElementById('experienceTimeline');
    timeline.innerHTML = '';
    
    data.timeline.forEach((item, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        
        // Handle description as array or string
        let descriptionHTML = '';
        if (Array.isArray(item.description)) {
            descriptionHTML = `
                <ul class="timeline-description-list">
                    ${item.description.map(point => `<li>${point}</li>`).join('')}
                </ul>
            `;
        } else {
            descriptionHTML = `<p class="timeline-description">${item.description}</p>`;
        }
        
        timelineItem.innerHTML = `
            <div class="timeline-marker"></div>
            <div class="timeline-content">
                <span class="timeline-date">${item.date}</span>
                <h3 class="timeline-title">${item.title}</h3>
                <p class="timeline-company">${item.company}</p>
                ${descriptionHTML}
            </div>
        `;
        timeline.appendChild(timelineItem);
    });
}

/**
 * Render Clients Logos
 */
async function renderClients() {
    const data = await fetchData('data/clients.json');
    if (!data || !data.clients) return;
    
    const grid = document.getElementById('clientsGrid');
    grid.innerHTML = '';
    
    data.clients.forEach(client => {
        const clientDiv = document.createElement('div');
        clientDiv.className = 'client-logo';
        clientDiv.innerHTML = `
            <img src="${client.logo}" alt="${client.name}" title="${client.name}">
        `;
        grid.appendChild(clientDiv);
    });
}

/**
 * Render Services
 */
async function renderServices() {
    const data = await fetchData('data/services.json');
    if (!data || !data.services) return;
    
    const grid = document.getElementById('servicesGrid');
    grid.innerHTML = '';
    
    data.services.forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-card';
        
        const featuresHTML = service.features 
            ? `<ul class="service-features">
                ${service.features.map(f => `<li>${f}</li>`).join('')}
               </ul>`
            : '';
        
        serviceCard.innerHTML = `
            <div class="service-icon">
                <i class="${service.icon}"></i>
            </div>
            <h3 class="service-title">${service.title}</h3>
            <p class="service-description">${service.description}</p>
            ${featuresHTML}
        `;
        grid.appendChild(serviceCard);
    });
    
    // Add services to footer
    const footerServices = document.getElementById('footerServices');
    if (footerServices) {
        footerServices.innerHTML = data.services.slice(0, 4).map(s => 
            `<li><a href="#services">${s.title}</a></li>`
        ).join('');
    }
    
    // Populate contact form service dropdown
    const serviceSelect = document.getElementById('service');
    if (serviceSelect) {
        // Keep the default option
        const defaultOption = serviceSelect.querySelector('option[value=""]');
        serviceSelect.innerHTML = '';
        if (defaultOption) {
            serviceSelect.appendChild(defaultOption);
        } else {
            const newDefaultOption = document.createElement('option');
            newDefaultOption.value = '';
            newDefaultOption.textContent = 'Select Service';
            serviceSelect.appendChild(newDefaultOption);
        }
        
        // Add all services from JSON
        data.services.forEach(service => {
            const option = document.createElement('option');
            option.value = service.title;
            option.textContent = service.title;
            serviceSelect.appendChild(option);
        });
        
        // Add "Other" option at the end
        const otherOption = document.createElement('option');
        otherOption.value = 'Other';
        otherOption.textContent = 'Other';
        serviceSelect.appendChild(otherOption);
    }
}

/**
 * Render Courses
 */
async function renderCourses() {
    const data = await fetchData('data/courses.json');
    if (!data || !data.courses) return;
    
    const grid = document.getElementById('coursesGrid');
    grid.innerHTML = '';
    
    data.courses.forEach(course => {
        const courseCard = document.createElement('a');
        courseCard.className = 'course-card';
        courseCard.href = course.behanceUrl || '#';
        courseCard.target = course.behanceUrl ? '_blank' : '_self';
        courseCard.rel = course.behanceUrl ? 'noopener noreferrer' : '';
        courseCard.innerHTML = `
            <div class="course-image" style="background: linear-gradient(135deg, var(--accent), var(--soft));"></div>
            <div class="course-content">
                <span class="course-category">${course.category}</span>
                <h3 class="course-title">${course.title}</h3>
                <p class="course-description">${course.description}</p>
                <div class="course-meta">
                    <span class="course-duration">
                        <i class="far fa-clock"></i> ${course.duration}
                    </span>
                    <span class="course-level">
                        <i class="fas fa-signal"></i> ${course.level}
                    </span>
                </div>
            </div>
        `;
        grid.appendChild(courseCard);
    });
}

/**
 * Render Portfolio with filtering
 */
async function renderPortfolio() {
    const data = await fetchData('data/projects.json');
    if (!data || !data.projects) return;
    
    const grid = document.getElementById('portfolioGrid');
    const filtersContainer = document.getElementById('portfolioFilters');
    
    // Get unique categories
    const categories = ['all', ...new Set(data.projects.map(p => p.category))];
    
    // Render filter buttons
    filtersContainer.innerHTML = '';
    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = `filter-btn ${cat === 'all' ? 'active' : ''}`;
        btn.dataset.filter = cat;
        btn.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
        btn.addEventListener('click', () => filterPortfolio(cat));
        filtersContainer.appendChild(btn);
    });
    
    // Render all projects
    renderPortfolioItems(data.projects);
}

function renderPortfolioItems(projects) {
    const grid = document.getElementById('portfolioGrid');
    grid.innerHTML = '';
    
    projects.forEach(project => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        portfolioItem.dataset.category = project.category;
        portfolioItem.innerHTML = `
            <div class="portfolio-image" style="background: linear-gradient(135deg, var(--secondary), var(--accent));">
                ${project.image ? `<img src="${project.image}" alt="${project.title}">` : ''}
            </div>
            <div class="portfolio-overlay">
                <span class="portfolio-category">${project.category}</span>
                <h3 class="portfolio-title">${project.title}</h3>
                <p class="portfolio-description">${project.description}</p>
            </div>
        `;
        grid.appendChild(portfolioItem);
    });
}

async function filterPortfolio(category) {
    const data = await fetchData('data/projects.json');
    if (!data) return;
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === category);
    });
    
    // Filter and render
    const filtered = category === 'all' 
        ? data.projects 
        : data.projects.filter(p => p.category === category);
    
    renderPortfolioItems(filtered);
}

/**
 * Render Featured Projects Slider
 */
let currentSlide = 0;
let featuredProjects = [];

async function renderFeaturedProjectsSlider() {
    const data = await fetchData('data/projects.json');
    if (!data || !data.projects) return;
    
    const slider = document.getElementById('featuredProjectsSlider');
    const dotsContainer = document.getElementById('sliderDots');
    if (!slider || !dotsContainer) return;
    
    slider.innerHTML = '';
    dotsContainer.innerHTML = '';
    
    // Get featured projects or first 8 projects
    featuredProjects = data.projects.filter(p => p.featured).slice(0, 8);
    if (featuredProjects.length === 0) {
        featuredProjects = data.projects.slice(0, 8);
    }
    
    featuredProjects.forEach((project, index) => {
        const slideDiv = document.createElement('div');
        slideDiv.className = `slider-item ${index === 0 ? 'active' : ''}`;
        
        slideDiv.innerHTML = `
            <div class="slider-content">
                <div>
                    <span class="slider-category">${project.category}</span>
                    <h3 class="slider-project-title">${project.title}</h3>
                    <p class="slider-description">${project.description}</p>
                    <div class="slider-meta">
                        <div class="slider-meta-item">
                            <span class="slider-meta-label">Client</span>
                            <span class="slider-meta-value">${project.client || 'Confidential'}</span>
                        </div>
                        <div class="slider-meta-item">
                            <span class="slider-meta-label">Year</span>
                            <span class="slider-meta-value">${project.year || 'Recent'}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="slider-image">
                ${project.image ? `<img src="${project.image}" alt="${project.title}">` : ''}
            </div>
        `;
        slider.appendChild(slideDiv);
        
        // Create dot
        const dot = document.createElement('button');
        dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
        dot.onclick = () => goToSlide(index);
        dotsContainer.appendChild(dot);
    });
    
    // Auto slide every 5 seconds
    setInterval(() => {
        changeSlide(1);
    }, 5000);
}

function changeSlide(direction) {
    const slides = document.querySelectorAll('.slider-item');
    const dots = document.querySelectorAll('.slider-dot');
    
    if (slides.length === 0) return;
    
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function goToSlide(index) {
    const slides = document.querySelectorAll('.slider-item');
    const dots = document.querySelectorAll('.slider-dot');
    
    if (slides.length === 0) return;
    
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = index;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

/**
 * Render Testimonials with infinite horizontal carousel
 */
async function renderTestimonials() {
    const data = await fetchData('data/testimonials.json');
    if (!data || !data.testimonials) return;
    
    const carousel = document.getElementById('testimonialsCarousel');
    if (!carousel) return;
    
    // Clear carousel
    carousel.innerHTML = '';
    
    // Duplicate testimonials to create infinite loop effect
    const testimonials = [...data.testimonials, ...data.testimonials];
    
    testimonials.forEach(testimonial => {
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        
        card.innerHTML = `
            <p class="testimonial-text">${testimonial.text}</p>
            <p class="testimonial-author">${testimonial.name}</p>
            <p class="testimonial-role">${testimonial.role}${testimonial.company ? ' - ' + testimonial.company : ''}</p>
        `;
        
        carousel.appendChild(card);
    });
    
    // Enable drag/swipe functionality
    enableCarouselDrag(carousel);
}

function enableCarouselDrag(carousel) {
    let isDragging = false;
    let startX;
    let scrollLeft;
    let currentTransform = 0;
    
    carousel.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = currentTransform;
        carousel.style.cursor = 'grabbing';
        carousel.style.animationPlayState = 'paused';
    });
    
    carousel.addEventListener('mouseleave', () => {
        isDragging = false;
        carousel.style.cursor = 'grab';
    });
    
    carousel.addEventListener('mouseup', () => {
        isDragging = false;
        carousel.style.cursor = 'grab';
    });
    
    carousel.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        currentTransform = scrollLeft + walk;
        carousel.style.transform = `translateX(${currentTransform}px)`;
    });
    
    // Touch events for mobile
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX;
        scrollLeft = currentTransform;
        carousel.style.animationPlayState = 'paused';
    });
    
    carousel.addEventListener('touchmove', (e) => {
        const x = e.touches[0].pageX;
        const walk = (x - startX) * 2;
        currentTransform = scrollLeft + walk;
        carousel.style.transform = `translateX(${currentTransform}px)`;
    });
    
    carousel.addEventListener('touchend', () => {
        carousel.style.animationPlayState = 'running';
    });
}

/**
 * Render Qualifications Section
 */
async function renderQualifications() {
    const data = await fetchData('data/qualifications.json');
    if (!data || !data.qualifications) return;
    
    const grid = document.getElementById('qualificationsGrid');
    grid.innerHTML = '';
    
    data.qualifications.forEach(qual => {
        const qualItem = document.createElement('div');
        qualItem.className = 'qualification-item';
        qualItem.innerHTML = `
            <div class="qualification-icon">
                <i class="${qual.icon || 'fas fa-graduation-cap'}"></i>
            </div>
            <div class="qualification-content">
                <h4>${qual.degree}</h4>
                <p>${qual.institution}</p>
                <p>${qual.year}</p>
            </div>
        `;
        grid.appendChild(qualItem);
    });
}

/**
 * Render Certifications Section
 */
let certificationsData = [];
let currentCertSlide = 0;
let autoRotateCertInterval;

async function renderCertifications() {
    const data = await fetchData('data/certifications.json');
    if (!data || !data.certifications) return;
    
    certificationsData = data.certifications;
    const grid = document.getElementById('certificationsGrid');
    
    if (!grid) return;
    
    grid.innerHTML = '';
    
    certificationsData.forEach((cert) => {
        const certItem = document.createElement('div');
        certItem.className = 'certification-item';
        certItem.innerHTML = `
            <div class="certification-icon">
                <i class="${cert.icon}"></i>
            </div>
            <div class="certification-info">
                <h4 class="certification-name">${cert.name}</h4>
                <p class="certification-issuer">${cert.issuer}</p>
                <p class="certification-year">${cert.year}</p>
            </div>
            ${cert.image ? `
            <div class="certification-image">
                <img src="${cert.image}" alt="${cert.name}">
            </div>
            ` : ''}
        `;
        grid.appendChild(certItem);
    });
    
    // Render certificates gallery slider
    renderCertificatesSlider();
}

async function renderCertificatesSlider() {
    const slider = document.getElementById('certificatesSlider');
    const dotsContainer = document.getElementById('certDots');
    
    if (!slider || !certificationsData || certificationsData.length === 0) return;
    
    slider.innerHTML = '';
    dotsContainer.innerHTML = '';
    
    certificationsData.forEach((cert, index) => {
        if (cert.image) {
            const slide = document.createElement('div');
            slide.className = 'certificate-slide';
            slide.innerHTML = `<img src="${cert.image}" alt="${cert.name}">`;
            slider.appendChild(slide);
            
            // Create dot
            const dot = document.createElement('button');
            dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
            dot.setAttribute('aria-label', `Certificate ${index + 1}`);
            dot.addEventListener('click', () => goToCertSlide(index));
            dotsContainer.appendChild(dot);
        }
    });
    
    // Setup controls
    const prevBtn = document.getElementById('prevCert');
    const nextBtn = document.getElementById('nextCert');
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => changeCertSlide(-1));
        nextBtn.addEventListener('click', () => changeCertSlide(1));
    }
    
    // Start auto-rotate
    startCertSlideAutoRotate();
}

function changeCertSlide(direction) {
    const totalSlides = certificationsData.filter(c => c.image).length;
    currentCertSlide = (currentCertSlide + direction + totalSlides) % totalSlides;
    updateCertSlider();
}

function goToCertSlide(index) {
    currentCertSlide = index;
    updateCertSlider();
}

function updateCertSlider() {
    const slider = document.getElementById('certificatesSlider');
    slider.style.transform = `translateX(-${currentCertSlide * 100}%)`;
    
    // Update dots
    document.querySelectorAll('.slider-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentCertSlide);
    });
}

function startCertSlideAutoRotate() {
    clearInterval(autoRotateCertInterval);
    autoRotateCertInterval = setInterval(() => {
        const totalSlides = certificationsData.filter(c => c.image).length;
        currentCertSlide = (currentCertSlide + 1) % totalSlides;
        updateCertSlider();
    }, 5000);
}

/**
 * Render Training Courses Section
 */
let currentTraining = 0;
let trainingsData = [];
let autoRotateTrainingInterval;

async function renderTrainingCourses() {
    const data = await fetchData('data/training-courses.json');
    if (!data || !data.trainings) return;
    
    trainingsData = data.trainings;
    
    // Update first training info
    updateTrainingDisplay();
    
    // Setup controls
    document.getElementById('prevTraining').addEventListener('click', () => changeTraining(-1));
    document.getElementById('nextTraining').addEventListener('click', () => changeTraining(1));
    
    // Create dots
    const dotsContainer = document.getElementById('trainingDots');
    dotsContainer.innerHTML = '';
    trainingsData.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = `training-dot ${index === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Training ${index + 1}`);
        dot.addEventListener('click', () => goToTraining(index));
        dotsContainer.appendChild(dot);
    });
    
    // Start auto-rotate
    startTrainingAutoRotate();
}

function changeTraining(direction) {
    currentTraining = (currentTraining + direction + trainingsData.length) % trainingsData.length;
    updateTrainingDisplay();
}

function goToTraining(index) {
    currentTraining = index;
    updateTrainingDisplay();
}

function updateTrainingDisplay() {
    const training = trainingsData[currentTraining];
    document.getElementById('trainingTitle').textContent = training.title;
    document.getElementById('trainingSubtitle').textContent = training.subtitle;
    document.getElementById('trainingDescription').textContent = training.description;
    document.getElementById('trainingImage').src = training.image;
    
    // Update dots
    document.querySelectorAll('.training-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentTraining);
    });
}

function startTrainingAutoRotate() {
    autoRotateTrainingInterval = setInterval(() => {
        currentTraining = (currentTraining + 1) % trainingsData.length;
        updateTrainingDisplay();
    }, 6000);
}

/**
 * Render Tools Section
 */
async function renderTools() {
    const data = await fetchData('data/tools.json');
    if (!data || !data.tools) return;
    
    const grid = document.getElementById('toolsGrid');
    grid.innerHTML = '';
    
    data.tools.forEach(tool => {
        const toolItem = document.createElement('div');
        toolItem.className = 'tool-item';
        toolItem.innerHTML = `
            <span class="tool-name">${tool.name}</span>
        `;
        grid.appendChild(toolItem);
    });
}

/**
 * Render Footer
 */
async function renderFooter() {
    const heroData = await fetchData('data/hero.json');
    if (!heroData) return;
    
    document.getElementById('footerBrand').textContent = heroData.brandName || heroData.title.split(' ')[0];
    document.getElementById('footerDescription').textContent = heroData.footerDescription || heroData.description;
    
    const footerLocation = document.getElementById('footerLocation');
    if (footerLocation && heroData.footerLocation) {
        footerLocation.textContent = heroData.footerLocation;
    }
    document.getElementById('footerCopyright').textContent = heroData.brandName || heroData.title.split(' ')[0];
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Render social links
    if (heroData.socialLinks) {
        const socialContainer = document.getElementById('socialLinks');
        socialContainer.innerHTML = '';
        
        Object.entries(heroData.socialLinks).forEach(([platform, url]) => {
            if (url) {
                const link = document.createElement('a');
                link.href = url;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                link.innerHTML = `<i class="fab fa-${platform}"></i>`;
                link.setAttribute('aria-label', platform);
                socialContainer.appendChild(link);
            }
        });
    }
}

/**
 * Initialize all sections
 */
async function initializeApp() {
    try {
        // Load all sections individually with error handling
        await renderHero();
        console.log('Hero loaded');
        
        await renderStats();
        console.log('Stats loaded');
        
        await renderExperience();
        console.log('Experience loaded');
        
        await renderClients();
        console.log('Clients loaded');
        
        await renderServices();
        console.log('Services loaded');
        
        await renderCourses();
        console.log('Courses loaded');
        
        await renderTrainingCourses();
        console.log('Training courses loaded');
        
        await renderPortfolio();
        console.log('Portfolio loaded');
        
        await renderFeaturedProjectsSlider();
        console.log('Featured projects slider loaded');
        
        await renderQualifications();
        console.log('Qualifications loaded');
        
        await renderCertifications();
        console.log('Certifications loaded');
        
        await renderTools();
        console.log('Tools loaded');
        
        await renderTestimonials();
        console.log('Testimonials loaded');
        
        await renderFooter();
        console.log('Footer loaded');
        
        console.log('All data loaded successfully');
    } catch (error) {
        console.error('Error initializing app:', error);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
