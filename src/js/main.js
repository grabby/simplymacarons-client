import { macaronFlavors } from '../data/macarons.js';
import './cart.js';

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Close mobile menu when clicking on a link
    const mobileMenuLinks = mobileMenu?.querySelectorAll('a');
    mobileMenuLinks?.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
    
    // Load flavors
    loadFlavors();
    
    // Smooth scrolling for anchor links
    setupSmoothScrolling();
});

function loadFlavors() {
    const flavorsGrid = document.getElementById('flavors-grid');
    if (!flavorsGrid) {
        console.log('Flavors grid not found');
        return;
    }
    
    console.log('Loading flavors, count:', macaronFlavors.length);
    flavorsGrid.innerHTML = '';
    
    macaronFlavors.forEach((flavor, index) => {
        const flavorCard = createFlavorCard(flavor, index);
        flavorsGrid.appendChild(flavorCard);
    });
    
    console.log('Flavors loaded successfully');
}

function createFlavorCard(flavor, index) {
    const card = document.createElement('div');
    card.className = 'macaron-card product-card fade-in';
    card.style.animationDelay = `${index * 0.1}s`;
    
    console.log('Creating card for flavor:', flavor.name);
    
    card.innerHTML = `
        <div class="relative overflow-hidden h-48">
            <img src="${flavor.image}" alt="${flavor.name} Macaron" class="macaron-image h-full w-full object-cover">
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div class="p-4 flex flex-col flex-1">
            <h3 class="text-xl font-bold text-macaron-800 mb-2">${flavor.name}</h3>
            <p class="text-gray-600 mb-3">${flavor.description}</p>
            <div class="flex items-center justify-between mb-3">
                <span class="text-2xl font-bold text-macaron-600">$${flavor.price.toFixed(2)}</span>
                <div class="flex items-center space-x-2">
                    <span id="checkmark-${flavor.id}" class="hidden">
                        <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </span>
                    <span class="text-sm text-gray-500">Min: ${flavor.minQuantity}</span>
                </div>
            </div>
            <div class="flex items-center space-x-2 mb-3">
                <button onclick="updateQuantity('${flavor.id}', -1)" class="quantity-btn">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                    </svg>
                </button>
                <input type="number" 
                       id="quantity-${flavor.id}" 
                       value="0" 
                       min="0" 
                       class="quantity-input"
                       onchange="updateQuantity('${flavor.id}', 0, this.value)">
                <button onclick="updateQuantity('${flavor.id}', 1)" class="quantity-btn">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                    </svg>
                </button>
                <button onclick="addTenToCart('${flavor.id}')" class="w-8 h-8 bg-macaron-500 hover:bg-macaron-600 text-white rounded-full flex items-center justify-center transition-colors duration-200">
                    <span class="text-sm font-bold">10</span>
                </button>
            </div>
            <div class="mt-2">
                <button onclick="addToCart('${flavor.id}')" class="w-full btn-primary">Add to Cart</button>
            </div>
        </div>
    `;
    
    console.log('Card created with buttons for:', flavor.name);
    return card;
}

function updateQuantity(flavorId, change, newValue = null) {
    const input = document.getElementById(`quantity-${flavorId}`);
    if (!input) return;
    
    let currentValue = parseInt(input.value) || 0;
    
    if (newValue !== null) {
        currentValue = parseInt(newValue) || 0;
    } else {
        currentValue += change;
    }
    
    // Ensure minimum quantity
    if (currentValue < 0) currentValue = 0;
    
    input.value = currentValue;
    
    // Update checkmark visibility
    updateCheckmark(flavorId, currentValue);
}

function updateCheckmark(flavorId, quantity) {
    const checkmark = document.getElementById(`checkmark-${flavorId}`);
    const flavor = macaronFlavors.find(f => f.id === flavorId);
    
    if (checkmark && flavor) {
        if (quantity >= flavor.minQuantity) {
            checkmark.classList.remove('hidden');
        } else {
            checkmark.classList.add('hidden');
        }
    }
}

function addToCart(flavorId) {
    const input = document.getElementById(`quantity-${flavorId}`);
    if (!input) return;
    
    const quantity = parseInt(input.value) || 0;
    
    if (quantity < 10) {
        showNotification('Minimum quantity per flavor is 10 macarons', 'error');
        return;
    }
    
    try {
        cart.addItem(flavorId, quantity);
        input.value = 0;
        updateCheckmark(flavorId, 0);
        showNotification(`${quantity} ${macaronFlavors.find(f => f.id === flavorId)?.name} added to cart!`, 'success');
    } catch (error) {
        showNotification(error.message, 'error');
    }
}

function addTenToCart(flavorId) {
    const input = document.getElementById(`quantity-${flavorId}`);
    if (!input) return;
    input.value = 10;
    updateCheckmark(flavorId, 10);
}

// Make functions globally accessible
window.addToCart = addToCart;
window.addTenToCart = addTenToCart;
window.updateQuantity = updateQuantity;

function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transform transition-all duration-300 translate-x-full`;
    
    const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
    const iconColor = type === 'success' ? 'text-green-100' : type === 'error' ? 'text-red-100' : 'text-blue-100';
    
    notification.innerHTML = `
        <div class="flex items-center space-x-3">
            <svg class="w-5 h-5 ${iconColor}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                ${type === 'success' ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>' :
                  type === 'error' ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>' :
                  '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>'}
            </svg>
            <span class="text-white font-medium">${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="text-white hover:text-gray-200">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
    `;
    
    notification.classList.add(bgColor);
    
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    setTimeout(() => {
        if (notification.parentElement) {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Video auto-play observer
const videoObserverOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
};

const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const video = entry.target;
            if (video.paused) {
                // Gently start playing the video
                video.play().catch(error => {
                    console.log('Video autoplay prevented:', error);
                });
            }
        } else {
            // Pause video when it goes out of view
            const video = entry.target;
            if (!video.paused) {
                video.pause();
            }
        }
    });
}, videoObserverOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.macaron-card, .btn-primary, .btn-secondary');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Observe videos for auto-play
    const autoPlayVideos = document.querySelectorAll('.auto-play-video');
    autoPlayVideos.forEach(video => {
        videoObserver.observe(video);
    });
});

// Global functions for cart access
window.updateQuantity = updateQuantity;
window.addToCart = addToCart;
window.showNotification = showNotification;

// Ensure cart is properly initialized and displayed
document.addEventListener('DOMContentLoaded', () => {
    // Make sure cart is available globally
    if (window.cart) {
        window.cart.updateCartDisplay();
    }
}); 