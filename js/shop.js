// Shop Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeShop();
});

function initializeShop() {
    loadProducts();
    initializeFilters();
    initializeProductCards();
}

// Load and Display Products
function loadProducts(filter = 'all') {
    const productsContainer = document.getElementById('productsContainer');
    
    if (!productsContainer) return;
    
    let filteredProducts = products;
    
    if (filter !== 'all') {
        filteredProducts = products.filter(product => product.category === filter);
    }
    
    productsContainer.innerHTML = '';
    
    filteredProducts.forEach((product, index) => {
        const productCard = createProductCard(product);
        productsContainer.appendChild(productCard);
        
        // Animate product cards on load
        gsap.fromTo(productCard, 
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                delay: index * 0.1,
                ease: 'power3.out'
            }
        );
    });
}

// Create Product Card Element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-product-id', product.id);
    card.setAttribute('data-category', product.category);
    
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <div class="product-card-info">
            <h3>${product.name}</h3>
            <p>${formatPrice(product.price)}</p>
            <div class="product-actions-small">
                <button class="like-btn-small" onclick="toggleLike(${product.id})">♡</button>
                <button class="add-cart-small" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `;
    
    // Add click event to navigate to product detail
    card.addEventListener('click', (e) => {
        // Don't navigate if clicking on action buttons
        if (!e.target.closest('.product-actions-small')) {
            window.location.href = `product.html?id=${product.id}`;
        }
    });
    
    return card;
}

// Initialize Filter Functionality
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get filter value and load products
            const filter = button.getAttribute('data-filter');
            loadProducts(filter);
            
            // Animate filter button
            gsap.to(button, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: 'power2.out'
            });
        });
    });
}

// Initialize Product Card Interactions
function initializeProductCards() {
    // Add hover animations to product cards
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                
                card.addEventListener('mouseenter', () => {
                    gsap.to(card, {
                        y: -10,
                        scale: 1.02,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                    
                    gsap.to(card.querySelector('img'), {
                        scale: 1.1,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });
                
                card.addEventListener('mouseleave', () => {
                    gsap.to(card, {
                        y: 0,
                        scale: 1,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                    
                    gsap.to(card.querySelector('img'), {
                        scale: 1,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });
                
                observer.unobserve(card);
            }
        });
    });
    
    // Observe all product cards
    setTimeout(() => {
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => observer.observe(card));
    }, 100);
}

// Search Integration for Shop Page
function filterProductsBySearch(query) {
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
    );
    
    displayFilteredProducts(filteredProducts);
}

function displayFilteredProducts(filteredProducts) {
    const productsContainer = document.getElementById('productsContainer');
    
    if (!productsContainer) return;
    
    productsContainer.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        productsContainer.innerHTML = `
            <div class="no-products">
                <h3>No products found</h3>
                <p>Try adjusting your search or filter criteria</p>
            </div>
        `;
        return;
    }
    
    filteredProducts.forEach((product, index) => {
        const productCard = createProductCard(product);
        productsContainer.appendChild(productCard);
        
        // Animate product cards
        gsap.fromTo(productCard, 
            { opacity: 0, scale: 0.8 },
            {
                opacity: 1,
                scale: 1,
                duration: 0.4,
                delay: index * 0.05,
                ease: 'back.out(1.7)'
            }
        );
    });
    
    // Re-initialize card interactions
    initializeProductCards();
}

// Sort Products
function sortProducts(sortBy) {
    let sortedProducts = [...products];
    
    switch (sortBy) {
        case 'price-low':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default:
            // Default order
            break;
    }
    
    displayFilteredProducts(sortedProducts);
}

// Add to Cart Animation
function addToCartAnimation(button) {
    // Create flying cart animation
    const cart = document.createElement('div');
    cart.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: #1a1a1a;
        border-radius: 50%;
        z-index: 9999;
        pointer-events: none;
    `;
    
    const rect = button.getBoundingClientRect();
    cart.style.left = rect.left + 'px';
    cart.style.top = rect.top + 'px';
    
    document.body.appendChild(cart);
    
    // Animate to top right (cart icon position)
    gsap.to(cart, {
        x: window.innerWidth - 100,
        y: -100,
        scale: 0,
        duration: 0.8,
        ease: 'power2.out',
        onComplete: () => {
            cart.remove();
        }
    });
    
    // Button feedback
    gsap.to(button, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out'
    });
}

// Like Animation
function likeAnimation(button) {
    // Create heart particles
    for (let i = 0; i < 5; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '♥';
        heart.style.cssText = `
            position: fixed;
            color: #e74c3c;
            font-size: 20px;
            pointer-events: none;
            z-index: 9999;
        `;
        
        const rect = button.getBoundingClientRect();
        heart.style.left = rect.left + Math.random() * 30 + 'px';
        heart.style.top = rect.top + Math.random() * 30 + 'px';
        
        document.body.appendChild(heart);
        
        gsap.to(heart, {
            y: -100,
            opacity: 0,
            scale: 0.5,
            duration: 1,
            delay: i * 0.1,
            ease: 'power2.out',
            onComplete: () => {
                heart.remove();
            }
        });
    }
    
    // Button animation
    button.style.color = '#e74c3c';
    gsap.to(button, {
        scale: 1.2,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: 'back.out(1.7)'
    });
}

// Override global functions for shop page
window.addToCart = function(productId) {
    const product = getProductById(productId);
    const button = event.target;
    
    if (product) {
        addToCartAnimation(button);
        
        // Show success message
        setTimeout(() => {
            alert(`${product.name} added to cart!`);
        }, 300);
    }
};

window.toggleLike = function(productId) {
    const button = event.target;
    const isLiked = button.classList.contains('liked');
    
    if (!isLiked) {
        button.classList.add('liked');
        button.innerHTML = '♥';
        likeAnimation(button);
    } else {
        button.classList.remove('liked');
        button.innerHTML = '♡';
        button.style.color = '';
    }
};

// Lazy Loading for Product Images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializeLazyLoading);

// Infinite Scroll (Optional Enhancement)
function initializeInfiniteScroll() {
    let loading = false;
    let page = 1;
    
    window.addEventListener('scroll', () => {
        if (loading) return;
        
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
            loading = true;
            loadMoreProducts();
        }
    });
    
    function loadMoreProducts() {
        // Simulate loading more products
        setTimeout(() => {
            // In a real app, this would fetch more products from an API
            loading = false;
        }, 1000);
    }
}

// Product Quick View (Modal)
function showQuickView(productId) {
    const product = getProductById(productId);
    if (!product) return;
    
    const modal = document.createElement('div');
    modal.className = 'quick-view-modal';
    modal.innerHTML = `
        <div class="quick-view-content">
            <button class="close-modal">&times;</button>
            <div class="quick-view-layout">
                <img src="${product.image}" alt="${product.name}">
                <div class="quick-view-info">
                    <h2>${product.name}</h2>
                    <p class="price">${formatPrice(product.price)}</p>
                    <p class="description">${product.description}</p>
                    <div class="quick-actions">
                        <button onclick="addToCart(${product.id})">Add to Cart</button>
                        <button onclick="window.location.href='product.html?id=${product.id}'">View Details</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Animate modal
    gsap.fromTo(modal, 
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
    );
    
    gsap.fromTo(modal.querySelector('.quick-view-content'),
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' }
    );
    
    // Close modal events
    modal.querySelector('.close-modal').addEventListener('click', closeQuickView);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeQuickView();
    });
    
    function closeQuickView() {
        gsap.to(modal, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => modal.remove()
        });
    }
}
