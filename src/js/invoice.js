import './cart.js';

document.addEventListener('DOMContentLoaded', () => {
    loadInvoice();
    setupCartDisplay();
});

function loadInvoice() {
    // Get invoice ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const invoiceId = urlParams.get('id');
    
    if (!invoiceId) {
        showError('Invoice ID not found');
        return;
    }
    
    // Load invoice data from localStorage
    const invoices = JSON.parse(localStorage.getItem('simplyMacaronsInvoices') || '{}');
    const invoice = invoices[invoiceId];
    
    if (!invoice) {
        showError('Invoice not found');
        return;
    }
    
    // Populate invoice data
    populateInvoiceData(invoice);
}

function populateInvoiceData(invoice) {
    // Invoice information
    document.getElementById('invoice-id').textContent = invoice.id;
    document.getElementById('order-number').textContent = invoice.orderNumber;
    document.getElementById('order-date').textContent = formatDate(invoice.createdAt);
    document.getElementById('order-status').textContent = capitalizeFirst(invoice.status);
    
    // Customer information
    document.getElementById('customer-name').textContent = invoice.customer.name;
    document.getElementById('customer-email').textContent = invoice.customer.email;
    document.getElementById('customer-phone').textContent = invoice.customer.phone || 'Not provided';
    
    // Delivery information
    document.getElementById('delivery-type').textContent = capitalizeFirst(invoice.deliveryType);
    document.getElementById('preferred-date').textContent = formatDate(invoice.preferredDate);
    
    if (invoice.deliveryType === 'delivery') {
        document.getElementById('delivery-address-container').style.display = 'block';
        document.getElementById('delivery-address').textContent = invoice.deliveryAddress;
        document.getElementById('delivery-fee').textContent = invoice.deliveryFee ? `$${invoice.deliveryFee.toFixed(2)}` : 'TBD';
        document.getElementById('delivery-fee-summary').textContent = invoice.deliveryFee ? `$${invoice.deliveryFee.toFixed(2)}` : 'TBD';
    }
    
    // Order items
    populateOrderItems(invoice.items);
    
    // Special requests
    const specialRequests = [];
    if (invoice.customFlavor) {
        specialRequests.push(`Custom Flavor: ${invoice.customFlavor}`);
    }
    if (invoice.notes) {
        specialRequests.push(`Special Instructions: ${invoice.notes}`);
    }
    
    if (specialRequests.length > 0) {
        document.getElementById('special-requests-container').style.display = 'block';
        document.getElementById('special-requests').innerHTML = specialRequests.map(request => 
            `<p class="mb-2">${request}</p>`
        ).join('');
    }
    
    // Order summary
    document.getElementById('subtotal').textContent = `$${invoice.subtotal.toFixed(2)}`;
    document.getElementById('total').textContent = `$${invoice.total.toFixed(2)}`;
}

function populateOrderItems(items) {
    const tbody = document.getElementById('order-items');
    tbody.innerHTML = '';
    
    items.forEach(([flavorId, item]) => {
        const row = document.createElement('tr');
        const price = item.price || 3.50; // Use item.price if available
        const total = price * item.quantity;
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">${item.name || flavorId}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">${item.quantity}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">$${price.toFixed(2)}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">$${total.toFixed(2)}</div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-CA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function showError(message) {
    const container = document.querySelector('.max-w-4xl');
    container.innerHTML = `
        <div class="bg-white rounded-2xl shadow-soft p-8 text-center">
            <svg class="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Invoice Not Found</h2>
            <p class="text-gray-600 mb-6">${message}</p>
            <a href="/" class="btn-primary">
                Return to Home
            </a>
        </div>
    `;
}

function setupCartDisplay() {
    // Update cart count
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalQuantity = cart.getTotalQuantity();
        if (totalQuantity > 0) {
            cartCount.textContent = totalQuantity;
            cartCount.style.display = 'block';
        } else {
            cartCount.style.display = 'none';
        }
    }
} 