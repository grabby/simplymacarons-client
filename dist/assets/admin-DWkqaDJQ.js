import"./style-BRF-I4tH.js";let s=null;document.addEventListener("DOMContentLoaded",()=>{r()});function r(){const a=JSON.parse(localStorage.getItem("simplyMacaronsInvoices")||"{}"),n=document.getElementById("orders-list");if(Object.keys(a).length===0){n.innerHTML=`
            <div class="text-center py-8">
                <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <p class="text-gray-500">No orders found</p>
            </div>
        `;return}const e=Object.values(a).sort((t,d)=>new Date(d.createdAt)-new Date(t.createdAt));n.innerHTML=e.map(t=>`
        <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div class="flex justify-between items-start">
                <div class="flex-1">
                    <div class="flex items-center space-x-4 mb-2">
                        <h3 class="text-lg font-semibold text-macaron-800">${t.orderNumber}</h3>
                        <span class="px-2 py-1 text-xs font-medium rounded-full ${t.status==="pending"?"bg-yellow-100 text-yellow-800":t.status==="confirmed"?"bg-green-100 text-green-800":"bg-gray-100 text-gray-800"}">${t.status}</span>
                    </div>
                    <p class="text-gray-600 mb-2">${t.customer.name} - ${t.customer.email}</p>
                    <p class="text-sm text-gray-500">${i(t.createdAt)}</p>
                    <div class="mt-2">
                        <span class="text-sm font-medium text-macaron-700">$${t.subtotal.toFixed(2)}</span>
                        ${t.deliveryType==="delivery"?`<span class="text-sm text-gray-500 ml-2">+ Delivery: ${t.deliveryFee?"$"+t.deliveryFee.toFixed(2):"TBD"}</span>`:'<span class="text-sm text-gray-500 ml-2">Pickup</span>'}
                    </div>
                </div>
                <button onclick="viewOrder('${t.id}')" class="btn-secondary text-sm">
                    View Details
                </button>
            </div>
        </div>
    `).join("")}function m(a){const e=JSON.parse(localStorage.getItem("simplyMacaronsInvoices")||"{}")[a];if(!e){alert("Order not found");return}s=e;const t=document.getElementById("order-details");t.innerHTML=`
        <div class="space-y-6">
            <!-- Order Information -->
            <div>
                <h4 class="text-lg font-semibold text-macaron-700 mb-3">Order Information</h4>
                <div class="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <span class="text-gray-600">Invoice ID:</span>
                        <span class="font-medium">${e.id}</span>
                    </div>
                    <div>
                        <span class="text-gray-600">Order Number:</span>
                        <span class="font-medium">${e.orderNumber}</span>
                    </div>
                    <div>
                        <span class="text-gray-600">Date:</span>
                        <span class="font-medium">${i(e.createdAt)}</span>
                    </div>
                    <div>
                        <span class="text-gray-600">Status:</span>
                        <span class="font-medium">${e.status}</span>
                    </div>
                </div>
            </div>
            
            <!-- Customer Information -->
            <div>
                <h4 class="text-lg font-semibold text-macaron-700 mb-3">Customer Information</h4>
                <div class="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <span class="text-gray-600">Name:</span>
                        <span class="font-medium">${e.customer.name}</span>
                    </div>
                    <div>
                        <span class="text-gray-600">Email:</span>
                        <span class="font-medium">${e.customer.email}</span>
                    </div>
                    <div>
                        <span class="text-gray-600">Phone:</span>
                        <span class="font-medium">${e.customer.phone||"Not provided"}</span>
                    </div>
                    <div>
                        <span class="text-gray-600">Preferred Date:</span>
                        <span class="font-medium">${i(e.preferredDate)}</span>
                    </div>
                </div>
            </div>
            
            <!-- Delivery Information -->
            <div>
                <h4 class="text-lg font-semibold text-macaron-700 mb-3">Delivery Information</h4>
                <div class="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <span class="text-gray-600">Type:</span>
                        <span class="font-medium">${e.deliveryType}</span>
                    </div>
                    ${e.deliveryType==="delivery"?`
                        <div>
                            <span class="text-gray-600">Address:</span>
                            <span class="font-medium">${e.deliveryAddress}</span>
                        </div>
                        <div>
                            <span class="text-gray-600">Delivery Fee:</span>
                            <input type="number" id="delivery-fee-input" step="0.01" min="0" 
                                   value="${e.deliveryFee||""}" 
                                   placeholder="Enter delivery fee"
                                   class="form-input w-24">
                        </div>
                    `:""}
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
                            ${e.items.map(([d,o])=>{const c=3.5*o;return`
                                    <tr class="border-t border-gray-200">
                                        <td class="px-4 py-2">${d}</td>
                                        <td class="px-4 py-2 text-center">${o}</td>
                                        <td class="px-4 py-2 text-right">$${c.toFixed(2)}</td>
                                    </tr>
                                `}).join("")}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <!-- Special Requests -->
            ${e.customFlavor||e.notes?`
                <div>
                    <h4 class="text-lg font-semibold text-macaron-700 mb-3">Special Requests</h4>
                    <div class="bg-gray-50 rounded-lg p-4 text-sm">
                        ${e.customFlavor?`<p class="mb-2"><strong>Custom Flavor:</strong> ${e.customFlavor}</p>`:""}
                        ${e.notes?`<p><strong>Notes:</strong> ${e.notes}</p>`:""}
                    </div>
                </div>
            `:""}
            
            <!-- Order Summary -->
            <div>
                <h4 class="text-lg font-semibold text-macaron-700 mb-3">Order Summary</h4>
                <div class="space-y-2 text-sm">
                    <div class="flex justify-between">
                        <span class="text-gray-600">Subtotal:</span>
                        <span class="font-medium">$${e.subtotal.toFixed(2)}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Delivery Fee:</span>
                        <span class="font-medium">${e.deliveryFee?"$"+e.deliveryFee.toFixed(2):"TBD"}</span>
                    </div>
                    <div class="flex justify-between pt-2 border-t border-gray-200">
                        <span class="font-semibold">Total:</span>
                        <span class="font-semibold">$${e.total.toFixed(2)}</span>
                    </div>
                </div>
            </div>
            
            <!-- Status Update -->
            <div>
                <h4 class="text-lg font-semibold text-macaron-700 mb-3">Update Status</h4>
                <select id="status-select" class="form-input">
                    <option value="pending" ${e.status==="pending"?"selected":""}>Pending</option>
                    <option value="confirmed" ${e.status==="confirmed"?"selected":""}>Confirmed</option>
                    <option value="completed" ${e.status==="completed"?"selected":""}>Completed</option>
                    <option value="cancelled" ${e.status==="cancelled"?"selected":""}>Cancelled</option>
                </select>
            </div>
        </div>
    `,document.getElementById("order-modal").classList.remove("hidden")}function l(){document.getElementById("order-modal").classList.add("hidden"),s=null}function p(){if(!s)return;const a=document.getElementById("delivery-fee-input"),n=document.getElementById("status-select"),e=a?parseFloat(a.value)||0:s.deliveryFee,t=n.value;s.deliveryFee=e,s.status=t,s.total=s.subtotal+e;const d=JSON.parse(localStorage.getItem("simplyMacaronsInvoices")||"{}");d[s.id]=s,localStorage.setItem("simplyMacaronsInvoices",JSON.stringify(d)),alert("Order updated successfully!"),r(),l()}function i(a){return new Date(a).toLocaleDateString("en-CA",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})}window.viewOrder=m;window.closeOrderModal=l;window.updateOrder=p;
