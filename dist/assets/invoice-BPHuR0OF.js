import"./style-BRF-I4tH.js";import"./cart-DsAptGTX.js";document.addEventListener("DOMContentLoaded",()=>{m(),y()});function m(){const e=new URLSearchParams(window.location.search).get("id");if(!e){l("Invoice ID not found");return}const n=JSON.parse(localStorage.getItem("simplyMacaronsInvoices")||"{}")[e];if(!n){l("Invoice not found");return}u(n)}function u(t){document.getElementById("invoice-id").textContent=t.id,document.getElementById("order-number").textContent=t.orderNumber,document.getElementById("order-date").textContent=s(t.createdAt),document.getElementById("order-status").textContent=a(t.status),document.getElementById("customer-name").textContent=t.customer.name,document.getElementById("customer-email").textContent=t.customer.email,document.getElementById("customer-phone").textContent=t.customer.phone||"Not provided",document.getElementById("delivery-type").textContent=a(t.deliveryType),document.getElementById("preferred-date").textContent=s(t.preferredDate),t.deliveryType==="delivery"&&(document.getElementById("delivery-address-container").style.display="block",document.getElementById("delivery-address").textContent=t.deliveryAddress,document.getElementById("delivery-fee").textContent=t.deliveryFee?`$${t.deliveryFee.toFixed(2)}`:"TBD",document.getElementById("delivery-fee-summary").textContent=t.deliveryFee?`$${t.deliveryFee.toFixed(2)}`:"TBD"),i(t.items);const e=[];t.customFlavor&&e.push(`Custom Flavor: ${t.customFlavor}`),t.notes&&e.push(`Special Instructions: ${t.notes}`),e.length>0&&(document.getElementById("special-requests-container").style.display="block",document.getElementById("special-requests").innerHTML=e.map(o=>`<p class="mb-2">${o}</p>`).join("")),document.getElementById("subtotal").textContent=`$${t.subtotal.toFixed(2)}`,document.getElementById("total").textContent=`$${t.total.toFixed(2)}`}function i(t){const e=document.getElementById("order-items");e.innerHTML="",t.forEach(([o,n])=>{const d=document.createElement("tr"),r=n.price||3.5,c=r*n.quantity;d.innerHTML=`
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">${n.name||o}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">${n.quantity}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">$${r.toFixed(2)}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">$${c.toFixed(2)}</div>
            </td>
        `,e.appendChild(d)})}function s(t){return new Date(t).toLocaleDateString("en-CA",{year:"numeric",month:"long",day:"numeric"})}function a(t){return t.charAt(0).toUpperCase()+t.slice(1)}function l(t){const e=document.querySelector(".max-w-4xl");e.innerHTML=`
        <div class="bg-white rounded-2xl shadow-soft p-8 text-center">
            <svg class="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Invoice Not Found</h2>
            <p class="text-gray-600 mb-6">${t}</p>
            <a href="/" class="btn-primary">
                Return to Home
            </a>
        </div>
    `}function y(){const t=document.getElementById("cart-count");if(t){const e=cart.getTotalQuantity();e>0?(t.textContent=e,t.style.display="block"):t.style.display="none"}}
