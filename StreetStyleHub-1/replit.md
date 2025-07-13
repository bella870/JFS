# JEDIS FASHION SENSE Website

## Overview

JEDIS FASHION SENSE (JFS WORLD) is a premium streetwear clothing brand website that blends faith, identity, and fashion. The website is built as a static multi-page application using vanilla HTML, CSS, and JavaScript with GSAP animations for a modern, engaging user experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Static Website**: Pure HTML, CSS, and JavaScript implementation
- **Multi-page Application**: Traditional page navigation with shared components
- **Responsive Design**: Mobile-first approach with desktop optimizations
- **Animation Framework**: GSAP (GreenSock) with ScrollTrigger for smooth animations
- **No Build Process**: Direct file serving without compilation or bundling

### Technology Stack
- **HTML5**: Semantic markup for all pages
- **CSS3**: Custom styles with Inter font family from Google Fonts
- **Vanilla JavaScript**: No frameworks, pure ES6+ features
- **GSAP 3.12.2**: Animation library via CDN
- **SVG Assets**: Scalable vector graphics for logos and product images

## Key Components

### Page Structure
1. **Homepage** (`index.html`): Hero section, featured products, brand storytelling
2. **Shop** (`shop.html`): Product catalog with filtering capabilities
3. **Product Detail** (`product.html`): Individual product pages with detailed views
4. **About** (`about.html`): Brand mission and story
5. **Lookbook** (`lookbook.html`): Visual campaigns and collections
6. **Contact** (`contact.html`): Contact form and brand information

### Navigation System
- **Consistent Header**: Shared navigation across all pages
- **Active State Management**: Visual indication of current page
- **Mobile Navigation**: Hamburger menu for responsive design
- **Search Functionality**: Global search bar with real-time results

### Product Management
- **In-Memory Database**: JavaScript array storing product information
- **Category Filtering**: HOODIES, JERSEY, TOP, ALL categories
- **Product Cards**: Hover animations and interactive elements
- **Dynamic Loading**: JavaScript-powered product display and filtering

### Animation System
- **Page Transitions**: GSAP-powered entrance animations
- **Scroll Triggers**: Content reveals on scroll
- **Hover Effects**: Interactive product cards and buttons
- **Loading Animations**: Custom loader with progress bar
- **Custom Cursor**: Enhanced cursor interaction for premium feel

## Data Flow

### Product Data
1. Products stored as JavaScript objects in `js/main.js`
2. Each product contains: id, name, price, category, image, description
3. Filtering and search operations performed client-side
4. Product details passed via URL parameters

### Search Functionality
1. Real-time search across product names and descriptions
2. Results displayed in dropdown overlay
3. Cross-page search consistency
4. No backend integration - purely client-side

### User Interactions
1. Form submissions handled via JavaScript (no backend processing)
2. Newsletter popup with local storage for user preferences
3. Filter selections update display immediately
4. Mobile menu toggle for responsive navigation

## External Dependencies

### CDN Resources
- **Google Fonts**: Inter font family (weights 100-900)
- **GSAP**: Animation library (v3.12.2) and ScrollTrigger plugin
- **No Package Management**: All dependencies loaded via CDN

### Asset Management
- **SVG Graphics**: Logo and product images stored in `/assets/` directory
- **Static Assets**: No dynamic image processing or optimization
- **Self-hosted**: CSS and JavaScript files served directly

## Deployment Strategy

### Static Hosting Ready
- **No Server Requirements**: Can be deployed to any static hosting service
- **No Database**: All data embedded in JavaScript files
- **No Build Process**: Files can be served directly from repository
- **CDN Optimization**: External libraries loaded from CDNs for performance

### Scalability Considerations
- **Client-side Operations**: All filtering and search performed in browser
- **Memory Limitations**: Product database limited by browser memory
- **SEO Limitations**: Single-page content, no server-side rendering
- **Future Backend Integration**: Structure allows for easy API integration

### Mobile Optimization
- **Responsive Design**: Flexbox and CSS Grid for layout
- **Touch Interactions**: Optimized for mobile gestures
- **Performance**: Minimal JavaScript bundle size
- **Progressive Enhancement**: Core functionality works without JavaScript

The architecture prioritizes simplicity and immediate deployment while maintaining a premium user experience through careful attention to animations, responsive design, and brand presentation.