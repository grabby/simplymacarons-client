import { macaronFlavors, deliveryZones, pricing } from '../data/macarons.js';

class Cart {
  constructor() {
    this.items = new Map();
    this.deliveryZone = null;
    this.deliveryAddress = '';
    this.pickupDate = '';
    this.customerInfo = {
      name: '',
      email: '',
      phone: '',
      notes: '',
      customFlavor: ''
    };
    this.loadFromStorage();
  }

  addItem(flavorId, quantity) {
    if (quantity < pricing.minQuantityPerFlavor) {
      throw new Error(`Minimum quantity per flavor is ${pricing.minQuantityPerFlavor}`);
    }
    
    const flavor = macaronFlavors.find(f => f.id === flavorId);
    if (!flavor) {
      throw new Error('Invalid flavor');
    }

    this.items.set(flavorId, {
      ...flavor,
      quantity: quantity
    });
    
    this.saveToStorage();
    this.updateCartDisplay();
    
    // Debug: Log cart state
    console.log('Cart updated:', {
      totalQuantity: this.getTotalQuantity(),
      items: Array.from(this.items.entries())
    });
  }

  removeItem(flavorId) {
    this.items.delete(flavorId);
    this.saveToStorage();
    this.updateCartDisplay();
  }

  updateQuantity(flavorId, quantity) {
    if (quantity === 0) {
      this.removeItem(flavorId);
      return;
    }
    
    if (quantity < pricing.minQuantityPerFlavor) {
      throw new Error(`Minimum quantity per flavor is ${pricing.minQuantityPerFlavor}`);
    }

    const item = this.items.get(flavorId);
    if (item) {
      item.quantity = quantity;
      this.saveToStorage();
      this.updateCartDisplay();
    }
  }

  getTotalQuantity() {
    return Array.from(this.items.values()).reduce((total, item) => total + item.quantity, 0);
  }

  getSubtotal() {
    const totalQuantity = this.getTotalQuantity();
    const pricePerMacaron = totalQuantity >= pricing.discountThreshold ? pricing.discountPrice : pricing.regularPrice;
    
    return Array.from(this.items.values()).reduce((total, item) => {
      return total + (item.quantity * pricePerMacaron);
    }, 0);
  }

  getDeliveryFee() {
    // Delivery fee will be determined after order confirmation
    return 0;
  }

  getTotal() {
    // Total will be updated with delivery fee after confirmation
    return this.getSubtotal();
  }

  getDiscountAmount() {
    const totalQuantity = this.getTotalQuantity();
    if (totalQuantity < pricing.discountThreshold) return 0;
    
    return Array.from(this.items.values()).reduce((total, item) => {
      return total + (item.quantity * (pricing.regularPrice - pricing.discountPrice));
    }, 0);
  }

  setDeliveryZone(postalCode) {
    this.deliveryZone = null;
    
    for (const zone of deliveryZones) {
      if (zone.postalCodes.some(code => postalCode.toUpperCase().startsWith(code))) {
        this.deliveryZone = zone;
        break;
      }
    }
    
    this.saveToStorage();
    this.updateCartDisplay();
  }

  setCustomerInfo(info) {
    this.customerInfo = { ...this.customerInfo, ...info };
    this.saveToStorage();
  }

  setDeliveryDetails(deliveryType, address = '', date = '') {
    this.deliveryType = deliveryType;
    this.deliveryAddress = address;
    this.pickupDate = date;
    this.saveToStorage();
  }

  clear() {
    this.items.clear();
    this.deliveryZone = null;
    this.deliveryAddress = '';
    this.pickupDate = '';
    this.customerInfo = {
      name: '',
      email: '',
      phone: '',
      notes: '',
      customFlavor: ''
    };
    this.saveToStorage();
    this.updateCartDisplay();
  }

  saveToStorage() {
    const cartData = {
      items: Array.from(this.items.entries()),
      deliveryZone: this.deliveryZone,
      deliveryAddress: this.deliveryAddress,
      pickupDate: this.pickupDate,
      customerInfo: this.customerInfo,
      deliveryType: this.deliveryType
    };
    localStorage.setItem('simplyMacaronsCart', JSON.stringify(cartData));
  }

  loadFromStorage() {
    const cartData = localStorage.getItem('simplyMacaronsCart');
    if (cartData) {
      try {
        const data = JSON.parse(cartData);
        this.items = new Map(data.items || []);
        this.deliveryZone = data.deliveryZone;
        this.deliveryAddress = data.deliveryAddress || '';
        this.pickupDate = data.pickupDate || '';
        this.customerInfo = data.customerInfo || {
          name: '',
          email: '',
          phone: '',
          notes: '',
          customFlavor: ''
        };
        this.deliveryType = data.deliveryType;
      } catch (e) {
        console.error('Error loading cart from storage:', e);
      }
    }
  }

  updateCartDisplay() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartDiscount = document.getElementById('cart-discount');
    const deliveryFee = document.getElementById('delivery-fee');
    const finalTotal = document.getElementById('final-total');

    // Update cart count badge
    if (cartCount) {
      const totalQuantity = this.getTotalQuantity();
      cartCount.textContent = totalQuantity;
      if (totalQuantity > 0) {
        cartCount.style.display = 'block';
        cartCount.classList.remove('hidden');
        console.log('Cart badge should be visible with quantity:', totalQuantity);
      } else {
        cartCount.style.display = 'none';
        cartCount.classList.add('hidden');
        console.log('Cart badge should be hidden - empty cart');
      }
    } else {
      console.warn('Cart count element not found');
    }

    if (cartItems) {
      cartItems.innerHTML = '';
      
      if (this.items.size === 0) {
        cartItems.innerHTML = '<p class="text-gray-500 text-center py-8">Your cart is empty</p>';
        return;
      }

      Array.from(this.items.values()).forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'flex items-center justify-between p-3 border-b border-gray-100';
        itemElement.innerHTML = `
          <div class="flex-1">
            <h4 class="font-medium text-gray-900">${item.name}</h4>
            <p class="text-sm text-gray-600">$${item.price.toFixed(2)} each</p>
          </div>
          <div class="flex items-center space-x-2">
            <button onclick="cart.updateQuantity('${item.id}', ${item.quantity - 1})" 
                    class="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
              </svg>
            </button>
            <span class="w-8 text-center font-medium">${item.quantity}</span>
            <button onclick="cart.updateQuantity('${item.id}', ${item.quantity + 1})" 
                    class="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
            </button>
            <button onclick="cart.removeItem('${item.id}')" 
                    class="ml-2 text-red-500 hover:text-red-700">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </button>
          </div>
        `;
        cartItems.appendChild(itemElement);
      });
    }

    if (cartTotal) {
      cartTotal.textContent = `$${this.getSubtotal().toFixed(2)}`;
    }

    if (cartDiscount) {
      const discount = this.getDiscountAmount();
      if (discount > 0) {
        cartDiscount.textContent = `-$${discount.toFixed(2)}`;
        cartDiscount.parentElement.style.display = 'flex';
      } else {
        cartDiscount.parentElement.style.display = 'none';
      }
    }

    if (deliveryFee) {
      // Hide delivery fee section since it will be determined after order confirmation
      deliveryFee.parentElement.style.display = 'none';
    }

    if (finalTotal) {
      finalTotal.textContent = `$${this.getTotal().toFixed(2)}`;
    }
  }

  generateOrderSummary() {
    const items = Array.from(this.items.values());
    const totalQuantity = this.getTotalQuantity();
    const pricePerMacaron = totalQuantity >= pricing.discountThreshold ? pricing.discountPrice : pricing.regularPrice;
    const discount = this.getDiscountAmount();

    let summary = `
      <h2 style="color: #d94a4a; font-family: 'Playfair Display', serif; font-size: 24px; margin-bottom: 20px;">
        Simply Macarons - Order Summary
      </h2>
      
      <div style="background: #fef7f7; padding: 20px; border-radius: 12px; margin-bottom: 20px;">
        <h3 style="color: #7a2f2f; font-family: 'Quicksand', sans-serif; margin-bottom: 15px;">Order Details</h3>
        
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="border-bottom: 2px solid #fbdcdc;">
              <th style="text-align: left; padding: 10px; color: #7a2f2f;">Flavor</th>
              <th style="text-align: center; padding: 10px; color: #7a2f2f;">Quantity</th>
              <th style="text-align: right; padding: 10px; color: #7a2f2f;">Price</th>
            </tr>
          </thead>
          <tbody>
    `;

    items.forEach(item => {
      const itemTotal = item.quantity * pricePerMacaron;
      summary += `
        <tr style="border-bottom: 1px solid #fbdcdc;">
          <td style="padding: 10px; color: #7a2f2f;">${item.name}</td>
          <td style="text-align: center; padding: 10px; color: #7a2f2f;">${item.quantity}</td>
          <td style="text-align: right; padding: 10px; color: #7a2f2f;">$${itemTotal.toFixed(2)}</td>
        </tr>
      `;
    });

    summary += `
          </tbody>
        </table>
        
        <div style="margin-top: 20px; padding-top: 15px; border-top: 2px solid #fbdcdc;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
            <span style="color: #7a2f2f;">Subtotal:</span>
            <span style="color: #7a2f2f;">$${this.getSubtotal().toFixed(2)}</span>
          </div>
    `;

    if (discount > 0) {
      summary += `
        <div style="display: flex; justify-content: space-between; margin-bottom: 5px; color: #22c55e;">
          <span>Bulk Discount (60+ macarons):</span>
          <span>-$${discount.toFixed(2)}</span>
        </div>
      `;
    }

    // Delivery fee will be determined after order confirmation
    summary += `
      <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
        <span style="color: #7a2f2f;">Delivery Fee:</span>
        <span style="color: #7a2f2f;">TBD (will be confirmed after order review)</span>
      </div>
    `;

    summary += `
          <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 18px; margin-top: 10px; padding-top: 10px; border-top: 2px solid #fbdcdc;">
            <span style="color: #7a2f2f;">Total:</span>
            <span style="color: #7a2f2f;">$${this.getTotal().toFixed(2)}</span>
          </div>
        </div>
      </div>
    `;

    // Customer Information
    summary += `
      <div style="background: #fef7f7; padding: 20px; border-radius: 12px; margin-bottom: 20px;">
        <h3 style="color: #7a2f2f; font-family: 'Quicksand', sans-serif; margin-bottom: 15px;">Customer Information</h3>
        <p style="color: #7a2f2f; margin-bottom: 5px;"><strong>Name:</strong> ${this.customerInfo.name}</p>
        <p style="color: #7a2f2f; margin-bottom: 5px;"><strong>Email:</strong> ${this.customerInfo.email}</p>
        ${this.customerInfo.phone ? `<p style="color: #7a2f2f; margin-bottom: 5px;"><strong>Phone:</strong> ${this.customerInfo.phone}</p>` : ''}
        <p style="color: #7a2f2f; margin-bottom: 5px;"><strong>Delivery Type:</strong> ${this.deliveryType}</p>
        ${this.deliveryAddress ? `<p style="color: #7a2f2f; margin-bottom: 5px;"><strong>Address:</strong> ${this.deliveryAddress}</p>` : ''}
        ${this.pickupDate ? `<p style="color: #7a2f2f; margin-bottom: 5px;"><strong>Preferred Date:</strong> ${this.pickupDate}</p>` : ''}
        ${this.customerInfo.notes ? `<p style="color: #7a2f2f; margin-bottom: 5px;"><strong>Notes:</strong> ${this.customerInfo.notes}</p>` : ''}
        ${this.customerInfo.customFlavor ? `<p style="color: #7a2f2f; margin-bottom: 5px;"><strong>Custom Flavor Request:</strong> ${this.customerInfo.customFlavor}</p>` : ''}
      </div>
    `;

    return summary;
  }
}

// Initialize cart globally
window.cart = new Cart();

// Update cart display on page load and ensure it's visible
document.addEventListener('DOMContentLoaded', () => {
  // Ensure cart is initialized
  if (!window.cart) {
    window.cart = new Cart();
  }
  
  // Update cart display
  cart.updateCartDisplay();
  
  // Force a re-render of the cart badge
  setTimeout(() => {
    cart.updateCartDisplay();
  }, 100);
}); 