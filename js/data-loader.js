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
 * Render Testimonials with slider
 */
let currentTestimonial = 0;
let testimonialsData = [];

async function renderTestimonials() {
    const data = await fetchData('data/testimonials.json');
    if (!data || !data.testimonials) return;
    
    testimonialsData = data.testimonials;
    const slider = document.getElementById('testimonialsSlider');
    slider.innerHTML = '';
    
    testimonialsData.forEach((testimonial, index) => {
        const testimonialItem = document.createElement('div');
        testimonialItem.className = `testimonial-item ${index === 0 ? 'active' : ''}`;
        testimonialItem.innerHTML = `
            <img src="${testimonial.image || 'assets/default-avatar.jpg'}" alt="${testimonial.name}" class="testimonial-image">
            <p class="testimonial-text">${testimonial.text}</p>
            <p class="testimonial-author">${testimonial.name}</p>
            <p class="testimonial-role">${testimonial.role} - ${testimonial.company}</p>
        `;
        slider.appendChild(testimonialItem);
    });
    
    // Setup slider controls
    document.getElementById('prevTestimonial').addEventListener('click', () => changeTestimonial(-1));
    document.getElementById('nextTestimonial').addEventListener('click', () => changeTestimonial(1));
}

function changeTestimonial(direction) {
    const items = document.querySelectorAll('.testimonial-item');
    items[currentTestimonial].classList.remove('active');
    
    currentTestimonial = (currentTestimonial + direction + testimonialsData.length) % testimonialsData.length;
    
    items[currentTestimonial].classList.add('active');
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
let currentCert = 0;
let certificationsData = [];
let autoRotateCertInterval;

async function renderCertifications() {
    const data = await fetchData('data/certifications.json');
    if (!data || !data.certifications) return;
    
    certificationsData = data.certifications;
    const slider = document.getElementById('certificationsSlider');
    const dotsContainer = document.getElementById('certDots');
    const sliderControls = document.querySelector('.slider-controls');
    
    if (!slider) return;
    
    slider.innerHTML = '';
    dotsContainer.innerHTML = '';
    
    // Show controls for slider mode
    if (sliderControls) {
        sliderControls.style.display = 'flex';
    }
    
    certificationsData.forEach((cert, index) => {
        const certItem = document.createElement('div');
        certItem.className = 'certification-item';
        certItem.innerHTML = `
            <div class="certification-content">
                <div class="certification-image">
                    <img src="${cert.image}" alt="${cert.name}">
                </div>
                <div class="certification-info">
                    <h4 class="certification-name">${cert.name}</h4>
                    <p class="certification-issuer">${cert.issuer}</p>
                </div>
            </div>
        `;
        slider.appendChild(certItem);
        
        // Create dot
        const dot = document.createElement('button');
        dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Certification ${index + 1}`);
        dot.addEventListener('click', () => goToCert(index));
        dotsContainer.appendChild(dot);
    });
    
    // Setup controls
    document.getElementById('prevCert').addEventListener('click', () => changeCert(-1));
    document.getElementById('nextCert').addEventListener('click', () => changeCert(1));
    
    // Start auto-rotate
    startCertAutoRotate();
}

function changeCert(direction) {
    currentCert = (currentCert + direction + certificationsData.length) % certificationsData.length;
    updateCertSlider();
}

function goToCert(index) {
    currentCert = index;
    updateCertSlider();
}

function updateCertSlider() {
    const slider = document.getElementById('certificationsSlider');
    slider.style.transform = `translateX(-${currentCert * 100}%)`;
    
    // Update dots
    document.querySelectorAll('.slider-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentCert);
    });
}

function startCertAutoRotate() {
    autoRotateCertInterval = setInterval(() => {
        currentCert = (currentCert + 1) % certificationsData.length;
        updateCertSlider();
    }, 4000);
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
        
        await renderPortfolio();
        console.log('Portfolio loaded');
        
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
