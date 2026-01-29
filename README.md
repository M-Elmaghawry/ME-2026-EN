# Engineering & BIM Services - Professional Website

A modern, single-page corporate website showcasing Engineering, BIM, and Infrastructure services with a clean, professional design inspired by modern portfolio layouts.

## 🚀 Features

- **Professional Layout**: Side-by-side hero section with profile image
- **Stats Section**: Eye-catching statistics display
- **Fully Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Dynamic Content**: All content loaded from JSON files for easy updates
- **No Framework**: Built with vanilla JavaScript for fast loading
- **Modern Design**: Clean, corporate aesthetic inspired by leading engineering portfolios
- **WhatsApp Integration**: Floating button and header contact options
- **SEO Friendly**: Semantic HTML and proper meta tags

## 📁 Project Structure

```
ME-2026-EN/
├── index-en.html          # Main HTML file
├── css/
│   └── style.css          # All styles with color palette
├── js/
│   ├── data-loader.js     # Handles dynamic content loading
│   └── main.js            # UI interactions and animations
├── data/en/               # JSON data files
│   ├── hero.json          # Hero section + stats data
│   ├── experience.json    # Timeline data
│   ├── clients.json       # Client logos
│   ├── services.json      # Services offerings
│   ├── courses.json       # Training programs
│   ├── projects.json      # Portfolio projects
│   ├── testimonials.json  # Client testimonials
│   ├── qualifications.json # Academic degrees
│   ├── certifications.json # Professional certifications
│   └── tools.json         # Software & tools expertise
└── assets/                # Images and media files
    ├── profile.jpg        # Your profile photo
    ├── clients/           # Client logos
    ├── courses/           # Course thumbnails
    ├── portfolio/         # Project images
    ├── testimonials/      # Client photos
    ├── certifications/    # Certification badges
    └── tools/             # Software logos
```

## 🎨 Color Palette

- **Primary**: #003060 (Navy Blue)
- **Secondary**: #055c9d
- **Accent**: #0e86d4
- **Soft**: #68bbe3

## 📋 Sections

1. **Hero** - Introduction with name, titles, and value proposition
2. **Experience Timeline** - Professional journey
3. **Clients Logos** - Trusted companies
4. **Services** - Service offerings with features
5. **Courses** - Training programs
6. **Portfolio** - Featured projects with filtering
7. **Testimonials** - Client reviews with slider
8. **Corporate CTA** - Call to action
9. **Contact** - Contact form and information

## 🛠️ Setup & Customization

### 1. Update Your Information

Edit the JSON files in `data/en/` to customize content:

**hero.json** - Update your:
- Name and titles
- Contact information (email, phone, location)
- WhatsApp number (format: country code + number, e.g., "1234567890")
- Social media links

**experience.json** - Add your:
- Work history
- Education
- Achievements

**services.json** - Define your:
- Service offerings
- Features and benefits

**And so on for other JSON files...**

### 2. Add Your Images

Place your images in the `assets/` folder:
- `assets/clients/` - Client logos
- `assets/courses/` - Course thumbnails
- `assets/portfolio/` - Project images
- `assets/testimonials/` - Client photos

Update image paths in the JSON files accordingly.

### 3. Customize Colors (Optional)

Edit CSS variables in `css/style.css`:

```css
:root {
    --primary: #003060;
    --secondary: #055c9d;
    --accent: #0e86d4;
    --soft: #68bbe3;
}
```

## 🌐 Deployment to GitHub Pages

1. **Create a GitHub repository**
2. **Upload all files** to the repository
3. **Enable GitHub Pages**:
   - Go to Settings > Pages
   - Select branch: `main`
   - Select folder: `/ (root)`
   - Click Save

Your site will be live at: `https://yourusername.github.io/repository-name/index-en.html`

## 📱 WhatsApp Integration

The WhatsApp functionality is configured in `hero.json`:

```json
{
  "whatsapp": "1234567890",
  "whatsappMessage": "Your default message"
}
```

- **Format**: Country code + number (no spaces, no +)
- **Example**: For +1 (555) 123-4567, use: "15551234567"

## 📧 Contact Form

The contact form is client-side only. For production use, you can:

1. **Use a form service** like Formspree, EmailJS, or Web3Forms
2. **Integrate with backend API** if you have server infrastructure
3. **Keep as-is** for mailto: fallback functionality

## 🎯 Key Features

### Dynamic Content Loading
All content is loaded from JSON files, making it easy to update without touching HTML.

### Portfolio Filtering
Projects can be filtered by category (infrastructure, commercial, industrial, etc.)

### Testimonial Slider
Auto-rotating testimonials with manual controls

### Smooth Animations
Intersection Observer API for scroll-triggered animations

### Mobile Navigation
Responsive hamburger menu for mobile devices

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This is a custom-built website template. Modify as needed for your use.

## 🤝 Support

For questions or customization requests, contact via the website form.

---

**Built with HTML5, CSS3, and Vanilla JavaScript**
