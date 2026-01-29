# Deployment Checklist

Before deploying your website, complete these steps:

## ✅ Content Updates

- [ ] Update personal information in `data/en/hero.json`
  - [ ] Name and titles
  - [ ] Email address
  - [ ] Phone number
  - [ ] Location
  - [ ] WhatsApp number (format: country code + number, no spaces)
  - [ ] Social media links

- [ ] Update experience timeline in `data/en/experience.json`
- [ ] Add your services in `data/en/services.json`
- [ ] Add your courses in `data/en/courses.json`
- [ ] Add your projects in `data/en/projects.json`
- [ ] Add client testimonials in `data/en/testimonials.json`
- [ ] Update client logos list in `data/en/clients.json`

## 🖼️ Images

- [ ] Add client logos to `assets/clients/`
- [ ] Add course images to `assets/courses/`
- [ ] Add portfolio images to `assets/portfolio/`
- [ ] Add testimonial photos to `assets/testimonials/`
- [ ] Add default avatar image to `assets/` (for missing testimonial images)

## 🔧 Configuration

- [ ] Update page title in `index-en.html` (line 9)
- [ ] Update meta description in `index-en.html` (line 6)
- [ ] Update meta keywords in `index-en.html` (line 7)
- [ ] Update favicon (add to root directory)
- [ ] Test WhatsApp links
- [ ] Test all navigation links
- [ ] Test contact form

## 🎨 Styling (Optional)

- [ ] Customize color palette in `css/style.css` (lines 11-15)
- [ ] Adjust font if needed (currently using Inter)
- [ ] Test responsive design on multiple devices

## 🌐 Deployment

- [ ] Create GitHub repository
- [ ] Upload all files
- [ ] Enable GitHub Pages in repository settings
- [ ] Test deployed site
- [ ] Check all links work on live site
- [ ] Test on mobile devices
- [ ] Test contact form
- [ ] Test WhatsApp button

## 🔍 SEO & Analytics (Optional)

- [ ] Add Google Analytics tracking code
- [ ] Submit sitemap to Google Search Console
- [ ] Verify site with Google Search Console
- [ ] Add Open Graph meta tags for social sharing
- [ ] Add Twitter Card meta tags

## 📱 Testing Checklist

- [ ] Test on Chrome
- [ ] Test on Firefox
- [ ] Test on Safari
- [ ] Test on mobile Chrome
- [ ] Test on mobile Safari
- [ ] Test all anchor links
- [ ] Test portfolio filtering
- [ ] Test testimonial slider
- [ ] Test mobile navigation menu
- [ ] Test form validation
- [ ] Test WhatsApp links on mobile

## 🚀 Go Live

- [ ] Final content review
- [ ] Performance check (page load speed)
- [ ] Accessibility check
- [ ] Cross-browser testing complete
- [ ] Mobile responsiveness verified
- [ ] All images loading correctly
- [ ] Share site URL

---

**Note**: This is a static site with no backend. The contact form is client-side only. For production use, consider integrating a form service like Formspree or EmailJS.
