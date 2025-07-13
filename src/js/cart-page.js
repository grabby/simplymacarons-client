import { deliveryZones } from '../data/macarons.js';
import './cart.js';

document.addEventListener('DOMContentLoaded', () => {
    setupCartPage();
    setupFormValidation();
    setupDeliveryOptions();
    setMinDate();
});

function setupCartPage() {
    // Check if cart is empty
    if (cart.getTotalQuantity() === 0) {
        const cartItems = document.getElementById('cart-items');
        if (cartItems) {
            cartItems.innerHTML = `
                <div class="text-center py-12">
                    <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"></path>
                    </svg>
                    <h3 class="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                    <p class="text-gray-500 mb-6">Add some delicious macarons to get started!</p>
                    <a href="/#flavors" class="btn-primary">
                        Browse Flavors
                    </a>
                </div>
            `;
        }
        
        // Disable submit button
        const submitButton = document.getElementById('submit-order');
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Cart is Empty';
        }
        return;
    }
    
    // Enable submit button
    const submitButton = document.getElementById('submit-order');
    if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = 'Place Order';
    }
}

function setupFormValidation() {
    const form = document.getElementById('checkout-form');
    if (!form) return;
    
    form.addEventListener('submit', handleFormSubmit);
    
    // Real-time validation
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        field.addEventListener('input', validateField);
        field.addEventListener('blur', validateField);
    });
}

function setupDeliveryOptions() {
    const pickupRadio = document.getElementById('pickup');
    const deliveryRadio = document.getElementById('delivery');
    const deliverySection = document.getElementById('delivery-address-section');
    const postalCodeInput = document.getElementById('postal_code');
    const addressInput = document.getElementById('address');
    
    if (!pickupRadio || !deliveryRadio || !deliverySection) return;
    
    pickupRadio.addEventListener('change', () => {
        deliverySection.classList.add('hidden');
        postalCodeInput.removeAttribute('required');
        addressInput.removeAttribute('required');
    });
    
    deliveryRadio.addEventListener('change', () => {
        deliverySection.classList.remove('hidden');
        postalCodeInput.setAttribute('required', 'required');
        addressInput.setAttribute('required', 'required');
    });
    
    // Postal code validation only (no automatic fee calculation)
    if (postalCodeInput) {
        postalCodeInput.addEventListener('input', (e) => {
            const postalCode = e.target.value.toUpperCase();
            e.target.value = postalCode;
        });
    }
}

function setMinDate() {
    const dateInput = document.getElementById('preferred_date');
    if (!dateInput) return;
    
    // Set minimum date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];
    dateInput.setAttribute('min', minDate);
}

function validateField(event) {
    const field = event.target;
    const value = field.value.trim();
    const isRequired = field.hasAttribute('required');
    
    // Remove existing error styling
    field.classList.remove('border-red-500');
    const existingError = field.parentNode.querySelector('.form-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Validate required fields
    if (isRequired && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/\s/g, ''))) {
            showFieldError(field, 'Please enter a valid phone number');
            return false;
        }
    }
    
    // Postal code validation for delivery
    if (field.id === 'postal_code' && value) {
        const postalRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
        if (!postalRegex.test(value)) {
            showFieldError(field, 'Please enter a valid Canadian postal code');
            return false;
        }
    }
    
    return true;
}

function showFieldError(field, message) {
    field.classList.add('border-red-500');
    const errorElement = document.createElement('div');
    errorElement.className = 'form-error';
    errorElement.textContent = message;
    field.parentNode.appendChild(errorElement);
}

function validateForm() {
    const form = document.getElementById('checkout-form');
    if (!form) return false;
    
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField({ target: field })) {
            isValid = false;
        }
    });
    
    // Check if cart has items
    if (cart.getTotalQuantity() === 0) {
        showNotification('Your cart is empty. Please add some macarons before placing an order.', 'error');
        isValid = false;
    }
    
    // Validate delivery options
    const deliveryRadio = document.getElementById('delivery');
    if (deliveryRadio && deliveryRadio.checked) {
        const postalCode = document.getElementById('postal_code').value;
        const address = document.getElementById('address').value;
        
        if (!postalCode || !address) {
            showNotification('Please provide both postal code and address for delivery.', 'error');
            isValid = false;
        }
    }
    
    return isValid;
}

async function handleFormSubmit(event) {
    event.preventDefault();
    
    if (!validateForm()) {
        return;
    }
    
    const form = event.target;
    const submitButton = document.getElementById('submit-order');
    
    // Disable submit button and show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = `
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Processing...
    `;
    
    try {
        // Prepare form data
        const formData = new FormData(form);
        
        // Add order summary to form data
        formData.set('order_summary', cart.generateOrderSummary());
        formData.set('order_total', cart.getTotal().toFixed(2));
        formData.set('order_items', JSON.stringify(Array.from(cart.items.entries())));
        
        // Add customer info to cart
        cart.setCustomerInfo({
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            notes: formData.get('notes'),
            customFlavor: formData.get('custom_flavor')
        });
        
        // Add delivery details to cart
        cart.setDeliveryDetails(
            formData.get('delivery_type'),
            formData.get('address'),
            formData.get('preferred_date')
        );
        
        // Create invoice first
        const invoiceId = createInvoice(formData);
        
            // Submit to Formspree
    const response = await fetch('https://formspree.io/f/xblgbezo', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            // Clear cart after successful submission
            cart.clear();
            
            // Show success message
            showNotification('Order submitted successfully! Redirecting to your invoice...', 'success');
            
            // Redirect to invoice page
            setTimeout(() => {
                window.location.href = `/invoice.html?id=${invoiceId}`;
            }, 2000);
        } else {
            throw new Error('Failed to submit order');
        }
        
    } catch (error) {
        console.error('Error submitting order:', error);
        showNotification('There was an error submitting your order. Please try again or contact us directly.', 'error');
        
        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.textContent = 'Place Order';
    }
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
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove after 5 seconds
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

// Invoice generation and storage
function generateInvoiceId() {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 8);
    return `INV-${timestamp}-${randomStr}`.toUpperCase();
}

function storeInvoice(invoiceData) {
    const invoices = JSON.parse(localStorage.getItem('simplyMacaronsInvoices') || '{}');
    invoices[invoiceData.id] = {
        ...invoiceData,
        createdAt: new Date().toISOString()
    };
    localStorage.setItem('simplyMacaronsInvoices', JSON.stringify(invoices));
    return invoiceData.id;
}

function createInvoice(orderData) {
    const invoiceId = generateInvoiceId();
    const invoiceData = {
        id: invoiceId,
        orderNumber: `ORD-${Date.now()}`,
        customer: {
            name: orderData.get('name'),
            email: orderData.get('email'),
            phone: orderData.get('phone')
        },
        items: JSON.parse(orderData.get('order_items')),
        subtotal: parseFloat(orderData.get('order_total')),
        deliveryType: orderData.get('delivery_type'),
        deliveryAddress: orderData.get('address') || 'Pickup',
        preferredDate: orderData.get('preferred_date'),
        notes: orderData.get('notes'),
        customFlavor: orderData.get('custom_flavor'),
        status: 'pending',
        deliveryFee: null, // Will be set after confirmation
        total: parseFloat(orderData.get('order_total')) // Will be updated with delivery fee
    };
    
    storeInvoice(invoiceData);
    return invoiceId;
}

// Global function for notification access
window.showNotification = showNotification; 