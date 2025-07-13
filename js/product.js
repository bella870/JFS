// Product Detail Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeProductPage();
});

function initializeProductPage() {
    loadProductDetails();
    initializeProductInteractions();
    initializeImageZoom();
    initializeSizeSelection();
    loadSuggestedProducts();
    initializeProductAnimations();
}

// Load Product Details from URL
function loadProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (!productId) {
        // Redirect to shop if no product ID
        window.location.href = 'shop.html';
        return;
    }
    
    const product = getProductById(parseInt(productId));
    
    if (!product) {
        // Show error if product not found
        showProductNotFound();
        return;
    }
    
    updateProductDisplay(product);
    updatePageTitle(product.name);
}

// Update Product Display
function updateProductDisplay(product) {
    const productImage = document.getElementById('productImage');
    const productTitle = document.getElementById('productTitle');
    const productPrice = document.getElementById('productPrice');
    
    if (productImage) {
        productImage.src = product.image;
        productImage.alt = product.name;
    }
    
    if (productTitle) {
        productTitle.textContent = product.name;
    }
    
    if (productPrice) {
        productPrice.textContent = formatPrice(product.price);
    }
    
    // Update product description if it exists in the HTML
    const descriptionElement = document.querySelector('.product-description p');
    if (descriptionElement && product.description) {
        descriptionElement.textContent = product.description;
    }
}

// Update Page Title
function updatePageTitle(productName) {
    document.title = `${productName} - JEDIS FASHION SENSE`;
}

// Show Product Not Found
function showProductNotFound() {
    const productDetail = document.querySelector('.product-detail');
    if (productDetail) {
        productDetail.innerHTML = `
            <div class="container">
                <div class="product-not-found">
                    <h1>Product Not Found</h1>
                    <p>Sorry, the product you're looking for doesn't exist.</p>
                    <a href="shop.html" class="cta-button">Back to Shop</a>
                </div>
            </div>
        `;
    }
}

// Initialize Product Interactions
function initializeProductInteractions() {
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    const likeBtn = document.getElementById('likeBtn');
    
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', handleAddToCart);
    }
    
    if (likeBtn) {
        likeBtn.addEventListener('click', handleLikeToggle);
    }
}

// Handle Add to Cart
function handleAddToCart(e) {
    e.preventDefault();
    
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const selectedSize = document.querySelector('.size-btn.active')?.textContent;
    
    if (!selectedSize) {
        alert('Please select a size before adding to cart.');
        return;
    }
    
    const product = getProductById(productId);
    if (product) {
        // Add to cart animation
        addToCartAnimation(e.target);
        
        // Show success message
        setTimeout(() => {
            alert(`${product.name} (Size: ${selectedSize}) added to cart!`);
        }, 500);
        
        // Update cart count if exists
        updateCartCount();
    }
}

// Handle Like Toggle
function handleLikeToggle(e) {
    e.preventDefault();
    
    const button = e.target.closest('.like-btn');
    const isLiked = button.classList.contains('liked');
    
    if (!isLiked) {
        button.classList.add('liked');
        button.style.color = '#e74c3c';
        likeAnimation(button);
        
        // Save to localStorage
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        saveLikedProduct(productId);
    } else {
        button.classList.remove('liked');
        button.style.color = '';
        
        // Remove from localStorage
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        removeLikedProduct(productId);
    }
}

// Initialize Image Zoom
function initializeImageZoom() {
    const productImage = document.getElementById('productImage');
    
    if (productImage) {
        let isZoomed = false;
        
        productImage.addEventListener('click', () => {
            if (!isZoomed) {
                gsap.to(productImage, {
                    scale: 1.5,
                    duration: 0.5,
                    ease: 'power2.out',
                    transformOrigin: 'center center'
                });
                productImage.style.cursor = 'zoom-out';
                isZoomed = true;
            } else {
                gsap.to(productImage, {
                    scale: 1,
                    duration: 0.5,
                    ease: 'power2.out'
                });
                productImage.style.cursor = 'zoom-in';
                isZoomed = false;
            }
        });
        
        productImage.style.cursor = 'zoom-in';
    }
}

// Initialize Size Selection
function initializeSizeSelection() {
    const sizeButtons = document.querySelectorAll('.size-btn');
    
    sizeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            sizeButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Animate button selection
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

// Load Suggested Products
function loadSuggestedProducts() {
    const suggestedGrid = document.querySelector('.suggested-grid');
    
    if (!suggestedGrid) return;
    
    const urlParams = new URLSearchParams(window.location.search);
    const currentProductId = parseInt(urlParams.get('id'));
    
    // Get 3 random products excluding current product
    const otherProducts = products.filter(p => p.id !== currentProductId);
    const suggestedProducts = shuffleArray(otherProducts).slice(0, 3);
    
    suggestedGrid.innerHTML = '';
    
    suggestedProducts.forEach((product, index) => {
        const productCard = createSuggestedProductCard(product);
        suggestedGrid.appendChild(productCard);
        
        // Animate cards
        gsap.fromTo(productCard, 
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                delay: index * 0.2,
                ease: 'power3.out'
            }
        );
    });
}

// Create Suggested Product Card
function createSuggestedProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <div class="product-card-info">
            <h3>${product.name}</h3>
            <p>${formatPrice(product.price)}</p>
            <div class="product-actions-small">
                <button class="like-btn-small" onclick="toggleSuggestedLike(${product.id}, this)">♡</button>
                <button class="add-cart-small" onclick="addSuggestedToCart(${product.id}, this)">Add to Cart</button>
            </div>
        </div>
    `;
    
    // Add click event to navigate to product
    card.addEventListener('click', (e) => {
        if (!e.target.closest('.product-actions-small')) {
            window.location.href = `product.html?id=${product.id}`;
        }
    });
    
    return card;
}

// Initialize Product Animations
function initializeProductAnimations() {
    // Animate product details on scroll
    const detailItems = document.querySelectorAll('.detail-item');
    
    detailItems.forEach((item, index) => {
        gsap.fromTo(item,
            { opacity: 0, x: -30 },
            {
                opacity: 1,
                x: 0,
                duration: 0.6,
                delay: index * 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // Animate product info sections
    const productInfo = document.querySelector('.product-info');
    if (productInfo) {
        gsap.fromTo(productInfo.children,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out',
                delay: 0.3
            }
        );
    }
}

// Utility Functions
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function addToCartAnimation(button) {
    // Create cart icon animation
    const cart = document.createElement('div');
    cart.innerHTML = '🛒';
    cart.style.cssText = `
        position: fixed;
        font-size: 24px;
        z-index: 9999;
        pointer-events: none;
    `;
    
    const rect = button.getBoundingClientRect();
    cart.style.left = rect.left + rect.width / 2 + 'px';
    cart.style.top = rect.top + 'px';
    
    document.body.appendChild(cart);
    
    // Animate to top navigation
    gsap.to(cart, {
        x: window.innerWidth - 100,
        y: -rect.top + 20,
        scale: 0.5,
        duration: 1,
        ease: 'power2.out',
        onComplete: () => {
            cart.remove();
        }
    });
    
    // Button feedback
    gsap.to(button, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out'
    });
}

function likeAnimation(button) {
    // Create heart particles
    for (let i = 0; i < 8; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '♥';
        heart.style.cssText = `
            position: fixed;
            color: #e74c3c;
            font-size: ${16 + Math.random() * 8}px;
            pointer-events: none;
            z-index: 9999;
        `;
        
        const rect = button.getBoundingClientRect();
        heart.style.left = rect.left + Math.random() * rect.width + 'px';
        heart.style.top = rect.top + Math.random() * rect.height + 'px';
        
        document.body.appendChild(heart);
        
        gsap.to(heart, {
            y: -150,
            x: (Math.random() - 0.5) * 100,
            opacity: 0,
            scale: Math.random() * 0.5 + 0.5,
            rotation: Math.random() * 360,
            duration: 2,
            delay: i * 0.1,
            ease: 'power2.out',
            onComplete: () => {
                heart.remove();
            }
        });
    }
}

function updateCartCount() {
    // Update cart count in navigation if it exists
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        let count = parseInt(cartCount.textContent) || 0;
        cartCount.textContent = count + 1;
        
        // Animate cart count
        gsap.to(cartCount, {
            scale: 1.3,
            duration: 0.2,
            yoyo: true,
            repeat: 1,
            ease: 'back.out(1.7)'
        });
    }
}

function saveLikedProduct(productId) {
    let likedProducts = JSON.parse(localStorage.getItem('likedProducts') || '[]');
    if (!likedProducts.includes(productId)) {
        likedProducts.push(productId);
        localStorage.setItem('likedProducts', JSON.stringify(likedProducts));
    }
}

function removeLikedProduct(productId) {
    let likedProducts = JSON.parse(localStorage.getItem('likedProducts') || '[]');
    likedProducts = likedProducts.filter(id => id !== productId);
    localStorage.setItem('likedProducts', JSON.stringify(likedProducts));
}

function loadLikedState() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const likedProducts = JSON.parse(localStorage.getItem('likedProducts') || '[]');
    
    if (likedProducts.includes(productId)) {
        const likeBtn = document.getElementById('likeBtn');
        if (likeBtn) {
            likeBtn.classList.add('liked');
            likeBtn.style.color = '#e74c3c';
        }
    }
}

// Suggested product interactions
window.toggleSuggestedLike = function(productId, button) {
    const isLiked = button.classList.contains('liked');
    
    if (!isLiked) {
        button.classList.add('liked');
        button.innerHTML = '♥';
        button.style.color = '#e74c3c';
        saveLikedProduct(productId.toString());
    } else {
        button.classList.remove('liked');
        button.innerHTML = '♡';
        button.style.color = '';
        removeLikedProduct(productId.toString());
    }
};

window.addSuggestedToCart = function(productId, button) {
    const product = getProductById(productId);
    if (product) {
        addToCartAnimation(button);
        setTimeout(() => {
            alert(`${product.name} added to cart!`);
        }, 300);
    }
};

// Load liked state when page loads
document.addEventListener('DOMContentLoaded', loadLikedState);

// Share Product Functionality
function shareProduct() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const product = getProductById(parseInt(productId));
    
    if (product && navigator.share) {
        navigator.share({
            title: product.name,
            text: `Check out this ${product.name} from JEDIS FASHION SENSE`,
            url: window.location.href
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            alert('Product link copied to clipboard!');
        });
    }
}

// Image Gallery (if multiple images exist)
function initializeImageGallery() {
    const thumbnails = document.querySelectorAll('.product-thumbnail');
    const mainImage = document.getElementById('productImage');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            const newSrc = thumbnail.src;
            
            // Fade effect when changing images
            gsap.to(mainImage, {
                opacity: 0.5,
                duration: 0.2,
                onComplete: () => {
                    mainImage.src = newSrc;
                    gsap.to(mainImage, {
                        opacity: 1,
                        duration: 0.2
                    });
                }
            });
            
            // Update active thumbnail
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            thumbnail.classList.add('active');
        });
    });
}

// Product Review System (placeholder for future implementation)
function initializeReviews() {
    // This would integrate with a review system
    console.log('Review system ready for integration');
}

// Size Guide Modal
function showSizeGuide() {
    const modal = document.createElement('div');
    modal.className = 'size-guide-modal';
    modal.innerHTML = `
        <div class="size-guide-content">
            <button class="close-modal">&times;</button>
            <h2>Size Guide</h2>
            <div class="size-chart">
                <table>
                    <thead>
                        <tr>
                            <th>Size</th>
                            <th>Chest (inches)</th>
                            <th>Length (inches)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>XS</td><td>34-36</td><td>26</td></tr>
                        <tr><td>S</td><td>36-38</td><td>27</td></tr>
                        <tr><td>M</td><td>38-40</td><td>28</td></tr>
                        <tr><td>L</td><td>40-42</td><td>29</td></tr>
                        <tr><td>XL</td><td>42-44</td><td>30</td></tr>
                        <tr><td>XXL</td><td>44-46</td><td>31</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}
