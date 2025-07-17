// GSAP Initialization
gsap.registerPlugin(ScrollTrigger);

// Global Variables
let isLoading = true;
let products = [];

// Products Database
const productsData = [
  {
    id: 1,
    name: "Trinity",
    price: 50000,
    category: "hoodies",
    image: "assets/product-hoodie-1.jpg",
    description:
      "A premium hoodie that combines comfort with spiritual expression.",
  },
  {
    id: 2,
    name: "Shin Jacket",
    price: 45000,
    category: "hoodies",
    image: "assets/product-hoodie-2.jpg",
    description: "Comfortable hoodie with meaningful design elements.",
  },
  {
    id: 3,
    name: "He Paid It All Jersey",
    price: 25000,
    category: "jersey",
    image: "assets/product-jersey-1.jpg",
    description: "Athletic jersey with inspirational messaging.",
  },
  {
    id: 4,
    name: "He Paid It All Jersey",
    price: 25000,
    category: "jersey",
    image: "assets/product-jersey-2.jpg",
    description: "Express your true self with this premium jersey.",
  },
  {
    id: 5,
    name: "Life Fact Round Neck",
    price: 25000,
    category: "top",
    image: "assets/product-top-1.jpg",
    description: "Minimalist top with powerful messaging.",
  },
  {
    id: 6,
    name: "Rise up Round neck",
    price: 25000,
    category: "top",
    image: "assets/product-top-2.jpg",
    description: "Lightweight top perfect for everyday wear.",
  },
  {
    id: 7,
    name: "Always Hustling",
    price: 30000,
    category: "hoodies",
    image: "assets/product-hoodie-3.jpg",
    description: "A stylish hoodie that keeps you motivated.",
  },
  {
    id: 8,
    name: "Amor",
    price: 48000,
    category: "hoodies",
    image: "assets/product-hoodie-4.jpg",
    description: "A stylish hoodie that keeps you motivated.",
  },
  {
    id: 9,
    name: "Rose Again Hoodie",
    price: 30000,
    category: "hoodies",
    image: "assets/product-hoodie-5.jpg",
    description: "A stylish hoodie that keeps you motivated.",
  },
  {
    id: 10,
    name: "Won. Up and Down",
    price: 60000,
    category: "hoodies",
    image: "assets/product-hoodie-6.jpg",
    description: "A stylish hoodie that keeps you motivated.",
  },
  {
    id: 11,
    name: "He Paid It All Jersey",
    price: 25000,
    category: "jersey",
    image: "assets/product-jersey-3.jpg",
    description: "Express your true self with this premium jersey.",
  },
  {
    id: 12,
    name: "Jedis Armless",
    price: 15000,
    category: "jersey",
    image: "assets/product-jersey-4.jpg",
    description: "Express your true self with this premium jersey.",
  },
  {
    id: 13,
    name: "Race Of Life Round Neck",
    price: 25000,
    category: "top",
    image: "assets/product-top-3.jpg",
    description: "Minimalist top with powerful messaging.",
  },
];

// Initialize Application
document.addEventListener("DOMContentLoaded", function () {
  products = productsData;
  initializeLoader();
  initializeNavigation();
  initializeCursor();
  initializeAnimations();
  initializeSearch();
  showNewsletterPopup();

  // Page-specific initializations
  if (document.body.classList.contains("about-page")) {
    initializeSloganCarousel();
  }

  if (document.body.classList.contains("contact-page")) {
    initializeContactForm();
    initializeFAQ();
  }

  if (document.body.classList.contains("lookbook-page")) {
    initializeGallery();
  }
});

// Loading Animation
function initializeLoader() {
  const loader = document.getElementById("loader");
  const loaderProgress = document.querySelector(".loader-progress");

  if (loader && loaderProgress) {
    // Animate progress bar
    gsap.to(loaderProgress, {
      width: "100%",
      duration: 2,
      ease: "power2.out",
      onComplete: () => {
        gsap.to(loader, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            loader.style.display = "none";
            isLoading = false;
            initializeHeroAnimations();
          },
        });
      },
    });
  } else {
    isLoading = false;
    initializeHeroAnimations();
  }
}

// Navigation Functionality
function initializeNavigation() {
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.querySelector(".nav-menu");

  // Sticky navbar on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Mobile menu toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });

    // Close mobile menu when clicking on links
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
      });
    });
  }
}

// Custom Cursor
function initializeCursor() {
  const cursor = document.getElementById("cursor");
  const cursorFollower = document.getElementById("cursorFollower");

  if (cursor && cursorFollower) {
    let mouseX = 0,
      mouseY = 0;
    let followerX = 0,
      followerY = 0;

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0.1,
      });
    });

    // Smooth follower animation
    gsap.ticker.add(() => {
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;

      gsap.set(cursorFollower, {
        x: followerX - 15,
        y: followerY - 15,
      });
    });

    // Hover effects
    const hoverElements = document.querySelectorAll(
      "a, button, .product-card, .featured-item"
    );
    hoverElements.forEach((element) => {
      element.addEventListener("mouseenter", () => {
        gsap.to(cursor, { scale: 2, duration: 0.3 });
        gsap.to(cursorFollower, { scale: 1.5, duration: 0.3 });
      });

      element.addEventListener("mouseleave", () => {
        gsap.to(cursor, { scale: 1, duration: 0.3 });
        gsap.to(cursorFollower, { scale: 1, duration: 0.3 });
      });
    });
  }
}

// Hero Animations
function initializeHeroAnimations() {
  const heroTitle = document.querySelector(".hero-title");
  const heroSubtitle = document.querySelector(".hero-subtitle");
  const ctaButton = document.querySelector(".cta-button");

  if (heroTitle) {
    const lines = heroTitle.querySelectorAll(".line");

    // Animate title lines
    gsap
      .timeline()
      .to(lines, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      })
      .to(
        heroSubtitle,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.3"
      )
      .to(
        ctaButton,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.3"
      );
  }
}

// Scroll Animations
function initializeAnimations() {
  // Fade in animations
  const fadeElements = document.querySelectorAll(
    ".fade-in, .section-title, .mission-text, .campaign-content"
  );
  fadeElements.forEach((element) => {
    gsap.fromTo(
      element,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  // Slide animations
  const slideLeftElements = document.querySelectorAll(".slide-in-left");
  slideLeftElements.forEach((element) => {
    gsap.fromTo(
      element,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  const slideRightElements = document.querySelectorAll(".slide-in-right");
  slideRightElements.forEach((element) => {
    gsap.fromTo(
      element,
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  // Horizontal scroll animation
  const horizontalScroll = document.querySelector(".horizontal-scroll");
  if (horizontalScroll) {
    gsap.fromTo(
      horizontalScroll.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: horizontalScroll,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }
}

// Search Functionality
function initializeSearch() {
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");

  if (searchInput && searchResults) {
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase().trim();

      if (query.length > 0) {
        const filteredProducts = products.filter(
          (product) =>
            product.name.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)
        );

        displaySearchResults(filteredProducts, searchResults);
        searchResults.style.display = "block";
      } else {
        searchResults.style.display = "none";
      }
    });

    // Hide search results when clicking outside
    document.addEventListener("click", (e) => {
      if (
        !searchInput.contains(e.target) &&
        !searchResults.contains(e.target)
      ) {
        searchResults.style.display = "none";
      }
    });
  }
}

function displaySearchResults(products, container) {
  container.innerHTML = "";

  if (products.length === 0) {
    container.innerHTML =
      '<div class="search-result-item">No products found</div>';
    return;
  }

  products.forEach((product) => {
    const resultItem = document.createElement("div");
    resultItem.className = "search-result-item";
    resultItem.innerHTML = `
            <strong>${product.name}</strong> - ₦${product.price}
        `;

    resultItem.addEventListener("click", () => {
      window.location.href = `product.html?id=${product.id}`;
    });

    container.appendChild(resultItem);
  });
}

// Newsletter Popup
function showNewsletterPopup() {
  const popup = document.getElementById("newsletterPopup");
  const closeBtn = document.getElementById("closeNewsletter");
  const form = popup?.querySelector(".newsletter-form");

  if (popup && !sessionStorage.getItem("newsletterShown")) {
    setTimeout(() => {
      popup.classList.add("active");
    }, 3000); // Show after 3 seconds

    sessionStorage.setItem("newsletterShown", "true");
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      popup.classList.remove("active");
    });
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]').value;

      // Simulate newsletter subscription
      alert("Thank you for subscribing to our newsletter!");
      popup.classList.remove("active");
    });
  }

  // Close popup when clicking outside
  if (popup) {
    popup.addEventListener("click", (e) => {
      if (e.target === popup) {
        popup.classList.remove("active");
      }
    });
  }
}

// Slogan Carousel (About Page)
function initializeSloganCarousel() {
  const slogans = document.querySelectorAll(".slogan-item");
  let currentSlogan = 0;

  if (slogans.length > 0) {
    setInterval(() => {
      slogans[currentSlogan].classList.remove("active");
      currentSlogan = (currentSlogan + 1) % slogans.length;
      slogans[currentSlogan].classList.add("active");
    }, 3000);
  }
}

// Contact Form (Contact Page)
function initializeContactForm() {
  const contactForm = document.getElementById("contactForm");
  const newsletterForm = document.querySelector(".newsletter-form-contact");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const data = {};

      for (let [key, value] of formData.entries()) {
        data[key] = value;
      }

      // Simulate form submission
      alert("Thank you for your message! We will get back to you soon.");
      contactForm.reset();
    });
  }

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = newsletterForm.querySelector('input[type="email"]').value;
      alert("Thank you for subscribing to our newsletter!");
      newsletterForm.reset();
    });
  }
}

// FAQ Functionality (Contact Page)
function initializeFAQ() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all FAQ items
      faqItems.forEach((faq) => faq.classList.remove("active"));

      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });
}

// Gallery Functionality (Lookbook Page)
function initializeGallery() {
  const galleryTrack = document.getElementById("galleryTrack");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  if (galleryTrack && prevBtn && nextBtn) {
    let currentIndex = 0;
    const items = galleryTrack.children;
    const itemWidth = items[0].offsetWidth + 32; // Width + gap

    prevBtn.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateGalleryPosition();
      }
    });

    nextBtn.addEventListener("click", () => {
      if (currentIndex < items.length - 1) {
        currentIndex++;
        updateGalleryPosition();
      }
    });

    function updateGalleryPosition() {
      const translateX = -currentIndex * itemWidth;
      gsap.to(galleryTrack, {
        x: translateX,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }
}

// Utility Functions
function formatPrice(price) {
  return `₦${price.toFixed(2)}`;
}

function getProductById(id) {
  return products.find((product) => product.id === parseInt(id));
}

function addToCart(productId) {
  // Simulate adding to cart
  const product = getProductById(productId);
  if (product) {
    alert(`${product.name} added to cart!`);
  }
}

function toggleLike(productId) {
  // Simulate like functionality
  const likeBtn = document.querySelector(
    `[data-product-id="${productId}"] .like-btn`
  );
  if (likeBtn) {
    likeBtn.classList.toggle("liked");
  }
}

// Page Load Animation
window.addEventListener("load", () => {
  gsap.from("body", {
    opacity: 0,
    duration: 0.5,
    ease: "power2.out",
  });
});

// Smooth Scrolling for Internal Links
document.addEventListener("click", (e) => {
  if (e.target.matches('a[href^="#"]')) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute("href"));
    if (target) {
      gsap.to(window, {
        scrollTo: target.offsetTop - 100,
        duration: 1,
        ease: "power2.out",
      });
    }
  }
});

// Parallax Effect for Hero Section
if (window.innerWidth > 768) {
  gsap.to(".hero-bg", {
    yPercent: -50,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
}

// Resize Handler
window.addEventListener("resize", () => {
  ScrollTrigger.refresh();
});
