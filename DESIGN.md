# Design Customization Guide

This guide explains how to customize the visual design to match your preferences.

## 🎨 Color Scheme

The website uses CSS variables for easy color customization. Edit `css/style.css` (lines 11-15):

```css
:root {
    --primary: #003060;    /* Main navy blue - headers, titles */
    --secondary: #055c9d;  /* Secondary blue - subtitles */
    --accent: #0e86d4;     /* Accent blue - buttons, highlights */
    --soft: #68bbe3;       /* Light blue - stats numbers, gradients */
}
```

### Color Usage:
- **Primary (#003060)**: Main headings, navigation, footer background
- **Secondary (#055c9d)**: Subtitles, secondary text
- **Accent (#0e86d4)**: Call-to-action buttons, links, highlights
- **Soft (#68bbe3)**: Stats numbers, icons, gradients

## 📐 Layout Customization

### Hero Section Image Size

Edit `css/style.css` to change hero image dimensions:

```css
.hero-image {
    width: 100%;
    max-width: 400px;  /* Change this value */
}
```

### Stats Section Layout

Adjust the number of columns in stats grid:

```css
.stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    /* Change 200px to adjust minimum column width */
}
```

### Timeline Cards

Modify timeline card width:

```css
.timeline {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    /* Change 280px for wider/narrower cards */
}
```

## 🖼️ Image Recommendations

### Profile Photo
- **Size**: 800x800px (1:1 ratio)
- **Format**: JPG or PNG
- **Style**: Professional headshot with clean background
- **File**: `assets/profile.jpg`

### Client Logos
- **Size**: 300x150px maximum
- **Format**: PNG with transparent background preferred
- **Style**: Company logo on transparent/white background

### Portfolio Images
- **Size**: 1200x800px (3:2 ratio)
- **Format**: JPG
- **Quality**: High resolution, professionally photographed projects

### Certification Badges
- **Size**: 200x200px (1:1 ratio)
- **Format**: PNG with transparent background
- **Style**: Official certification logos

### Software/Tool Logos
- **Size**: 120x120px (1:1 ratio)
- **Format**: PNG with transparent background
- **Style**: Official software logos

## 📝 Typography

The site uses **Inter** font family. To change fonts:

1. Update the Google Fonts import in `index-en.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=YOUR-FONT:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

2. Update the CSS variable in `css/style.css`:
```css
:root {
    --font-primary: 'YOUR-FONT', sans-serif;
}
```

### Recommended Font Alternatives:
- **IBM Plex Sans** - Modern, technical
- **Roboto** - Clean, widely supported
- **Open Sans** - Friendly, professional
- **Lato** - Elegant, corporate

## 🔲 Section Spacing

Adjust spacing between sections:

```css
section {
    padding: var(--spacing-xl) 0;  /* Currently 6rem top/bottom */
}
```

Spacing variables:
- `--spacing-xs: 0.5rem` (8px)
- `--spacing-sm: 1rem` (16px)
- `--spacing-md: 2rem` (32px)
- `--spacing-lg: 4rem` (64px)
- `--spacing-xl: 6rem` (96px)

## 🎯 Button Styles

Customize button appearance:

```css
.btn {
    padding: 0.875rem 2rem;           /* Size */
    border-radius: var(--radius-md);  /* Roundness */
    font-weight: 600;                 /* Text weight */
}
```

## 📱 Mobile Breakpoints

The design has three responsive breakpoints:

- **Desktop**: > 992px (full layout)
- **Tablet**: 768px - 992px (adjusted layout)
- **Mobile**: < 768px (stacked layout)

To customize breakpoints, edit the `@media` queries in `css/style.css`.

## 🌓 Adding Dark Mode (Optional)

To add dark mode support:

1. Add dark mode colors to `:root`:
```css
:root {
    /* Existing colors */
}

[data-theme="dark"] {
    --primary: #68bbe3;
    --secondary: #0e86d4;
    --white: #1a1a1a;
    --dark: #ffffff;
    --light-gray: #2d2d2d;
}
```

2. Add toggle button in navigation
3. Use JavaScript to toggle `data-theme` attribute

## ✨ Animation Speed

Adjust animation timing:

```css
:root {
    --transition: all 0.3s ease;  /* Change 0.3s to your preference */
}
```

## 🎨 Gradient Customization

Customize gradients used in icons and backgrounds:

```css
background: linear-gradient(135deg, var(--accent), var(--soft));
/* Change angle (135deg) or colors as needed */
```

## 📏 Container Width

Adjust maximum content width:

```css
.container {
    max-width: 1200px;  /* Change this value */
    margin: 0 auto;
    padding: 0 var(--spacing-md);
}
```

---

## 🚀 Quick Tips

1. **Keep it consistent**: Use the color variables throughout
2. **Test responsively**: Check changes on mobile devices
3. **Optimize images**: Compress images for faster loading
4. **Maintain contrast**: Ensure text is readable on backgrounds
5. **Professional photos**: Use high-quality, professional images

Need help? Check the main [README.md](README.md) or [DEPLOYMENT.md](DEPLOYMENT.md) for more information.
