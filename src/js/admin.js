let currentOrder = null;

document.addEventListener('DOMContentLoaded', () => {
    loadOrders();
});

function loadOrders() {
    const invoices = JSON.parse(localStorage.getItem('simplyMacaronsInvoices') || '{}');
    const ordersList = document.getElementById('orders-list');
    
    if (Object.keys(invoices).length === 0) {
        ordersList.innerHTML = `
            <div class="text-center py-8">
                <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <p class="text-gray-500">No orders found</p>
            </div>
        `;
        return;
    }
    
    const orders = Object.values(invoices).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    ordersList.innerHTML = orders.map(order => `
        <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div class="flex justify-between items-start">
                <div class="flex-1">
                    <div class="flex items-center space-x-4 mb-2">
                        <h3 class="text-lg font-semibold text-macaron-800">${order.orderNumber}</h3>
                        <span class="px-2 py-1 text-xs font-medium rounded-full ${
                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            order.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                        }">${order.status}</span>
                    </div>
                    <p class="text-gray-600 mb-2">${order.customer.name} - ${order.customer.email}</p>
                    <p class="text-sm text-gray-500">${formatDate(order.createdAt)}</p>
                    <div class="mt-2">
                        <span class="text-sm font-medium text-macaron-700">$${order.subtotal.toFixed(2)}</span>
                        ${order.deliveryType === 'delivery' ? 
                            `<span class="text-sm text-gray-500 ml-2">+ Delivery: ${order.deliveryFee ? '$' + order.deliveryFee.toFixed(2) : 'TBD'}</span>` : 
                            '<span class="text-sm text-gray-500 ml-2">Pickup</span>'
                        }
                    </div>
                </div>
                <button onclick="viewOrder('${order.id}')" class="btn-secondary text-sm">
                    View Details
                </button>
            </div>
        </div>
    `).join('');
}

function viewOrder(orderId) {
    const invoices = JSON.parse(localStorage.getItem('simplyMacaronsInvoices') || '{}');
    const order = invoices[orderId];
    
    if (!order) {
        alert('Order not found');
        return;
    }
    
    currentOrder = order;
    
    const orderDetails = document.getElementById('order-details');
    orderDetails.innerHTML = `
        <div class="space-y-6">
            <!-- Order Information -->
            <div>
                <h4 class="text-lg font-semibold text-macaron-700 mb-3">Order Information</h4>
                <div class="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <span class="text-gray-600">Invoice ID:</span>
                        <span class="font-medium">${order.id}</span>
                    </div>
                    <div>
                        <span class="text-gray-600">Order Number:</span>
                        <span class="font-medium">${order.orderNumber}</span>
                    </div>
                    <div>
                        <span class="text-gray-600">Date:</span>
                        <span class="font-medium">${formatDate(order.createdAt)}</span>
                    </div>
                    <div>
                        <span class="text-gray-600">Status:</span>
                        <span class="font-medium">${order.status}</span>
                    </div>
                </div>
            </div>
            
            <!-- Customer Information -->
            <div>
                <h4 class="text-lg font-semibold text-macaron-700 mb-3">Customer Information</h4>
                <div class="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <span class="text-gray-600">Name:</span>
                        <span class="font-medium">${order.customer.name}</span>
                    </div>
                    <div>
                        <span class="text-gray-600">Email:</span>
                        <span class="font-medium">${order.customer.email}</span>
                    </div>
                    <div>
                        <span class="text-gray-600">Phone:</span>
                        <span class="font-medium">${order.customer.phone || 'Not provided'}</span>
                    </div>
                    <div>
                        <span class="text-gray-600">Preferred Date:</span>
                        <span class="font-medium">${formatDate(order.preferredDate)}</span>
                    </div>
                </div>
            </div>
            
            <!-- Delivery Information -->
            <div>
                <h4 class="text-lg font-semibold text-macaron-700 mb-3">Delivery Information</h4>
                <div class="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <span class="text-gray-600">Type:</span>
                        <span class="font-medium">${order.deliveryType}</span>
                    </div>
                    ${order.deliveryType === 'delivery' ? `
                        <div>
                            <span class="text-gray-600">Address:</span>
                            <span class="font-medium">${order.deliveryAddress}</span>
                        </div>
                        <div>
                            <span class="text-gray-600">Delivery Fee:</span>
                            <input type="number" id="delivery-fee-input" step="0.01" min="0" 
                                   value="${order.deliveryFee || ''}" 
                                   placeholder="Enter delivery fee"
                                   class="form-input w-24">
                        </div>
                    ` : ''}
                </div>
            </div>
            
            <!-- Order Items -->
            <div>
                <h4 class="text-lg font-semibold text-macaron-700 mb-3">Order Items</h4>
                <div class="border border-gray-200 rounded-lg overflow-hidden">
                    <table class="w-full text-sm">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-4 py-2 text-left">Item</th>
                                <th class="px-4 py-2 text-center">Quantity</th>
                                <th class="px-4 py-2 text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${order.items.map(([flavor, quantity]) => {
                                const price = 3.50;
                                const total = price * quantity;
                                return `
                                    <tr class="border-t border-gray-200">
                                        <td class="px-4 py-2">${flavor}</td>
                                        <td class="px-4 py-2 text-center">${quantity}</td>
                                        <td class="px-4 py-2 text-right">$${total.toFixed(2)}</td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <!-- Special Requests -->
            ${(order.customFlavor || order.notes) ? `
                <div>
                    <h4 class="text-lg font-semibold text-macaron-700 mb-3">Special Requests</h4>
                    <div class="bg-gray-50 rounded-lg p-4 text-sm">
                        ${order.customFlavor ? `<p class="mb-2"><strong>Custom Flavor:</strong> ${order.customFlavor}</p>` : ''}
                        ${order.notes ? `<p><strong>Notes:</strong> ${order.notes}</p>` : ''}
                    </div>
                </div>
            ` : ''}
            
            <!-- Order Summary -->
            <div>
                <h4 class="text-lg font-semibold text-macaron-700 mb-3">Order Summary</h4>
                <div class="space-y-2 text-sm">
                    <div class="flex justify-between">
                        <span class="text-gray-600">Subtotal:</span>
                        <span class="font-medium">$${order.subtotal.toFixed(2)}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Delivery Fee:</span>
                        <span class="font-medium">${order.deliveryFee ? '$' + order.deliveryFee.toFixed(2) : 'TBD'}</span>
                    </div>
                    <div class="flex justify-between pt-2 border-t border-gray-200">
                        <span class="font-semibold">Total:</span>
                        <span class="font-semibold">$${order.total.toFixed(2)}</span>
                    </div>
                </div>
            </div>
            
            <!-- Status Update -->
            <div>
                <h4 class="text-lg font-semibold text-macaron-700 mb-3">Update Status</h4>
                <select id="status-select" class="form-input">
                    <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
                    <option value="confirmed" ${order.status === 'confirmed' ? 'selected' : ''}>Confirmed</option>
                    <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>Completed</option>
                    <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                </select>
            </div>
        </div>
    `;
    
    document.getElementById('order-modal').classList.remove('hidden');
}

function closeOrderModal() {
    document.getElementById('order-modal').classList.add('hidden');
    currentOrder = null;
}

function updateOrder() {
    if (!currentOrder) return;
    
    const deliveryFeeInput = document.getElementById('delivery-fee-input');
    const statusSelect = document.getElementById('status-select');
    
    const deliveryFee = deliveryFeeInput ? parseFloat(deliveryFeeInput.value) || 0 : currentOrder.deliveryFee;
    const status = statusSelect.value;
    
    // Update order data
    currentOrder.deliveryFee = deliveryFee;
    currentOrder.status = status;
    currentOrder.total = currentOrder.subtotal + deliveryFee;
    
    // Save to localStorage
    const invoices = JSON.parse(localStorage.getItem('simplyMacaronsInvoices') || '{}');
    invoices[currentOrder.id] = currentOrder;
    localStorage.setItem('simplyMacaronsInvoices', JSON.stringify(invoices));
    
    // Show success message
    alert('Order updated successfully!');
    
    // Reload orders list and close modal
    loadOrders();
    closeOrderModal();
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-CA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Global functions for modal access
window.viewOrder = viewOrder;
window.closeOrderModal = closeOrderModal;
window.updateOrder = updateOrder; 