import{m as i}from"./cart-DsAptGTX.js";document.addEventListener("DOMContentLoaded",()=>{const t=document.getElementById("mobile-menu-button"),e=document.getElementById("mobile-menu");t&&e&&t.addEventListener("click",()=>{e.classList.toggle("hidden")});const n=e==null?void 0:e.querySelectorAll("a");n==null||n.forEach(o=>{o.addEventListener("click",()=>{e.classList.add("hidden")})}),m(),f()});function m(){const t=document.getElementById("flavors-grid");if(!t){console.log("Flavors grid not found");return}console.log("Loading flavors, count:",i.length),t.innerHTML="",i.forEach((e,n)=>{const o=p(e,n);t.appendChild(o)}),console.log("Flavors loaded successfully")}function p(t,e){const n=document.createElement("div");return n.className="macaron-card product-card fade-in",n.style.animationDelay=`${e*.1}s`,console.log("Creating card for flavor:",t.name),n.innerHTML=`
        <div class="relative overflow-hidden h-48">
            <img src="${t.image}" alt="${t.name} Macaron" class="macaron-image h-full w-full object-cover">
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div class="p-4 flex flex-col flex-1">
            <h3 class="text-xl font-bold text-macaron-800 mb-2">${t.name}</h3>
            <p class="text-gray-600 mb-3">${t.description}</p>
            <div class="flex items-center justify-between mb-3">
                <span class="text-2xl font-bold text-macaron-600">$${t.price.toFixed(2)}</span>
                <div class="flex items-center space-x-2">
                    <span id="checkmark-${t.id}" class="hidden">
                        <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </span>
                    <span class="text-sm text-gray-500">Min: ${t.minQuantity}</span>
                </div>
            </div>
            <div class="flex items-center space-x-2 mb-3">
                <button onclick="updateQuantity('${t.id}', -1)" class="quantity-btn">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                    </svg>
                </button>
                <input type="number" 
                       id="quantity-${t.id}" 
                       value="0" 
                       min="0" 
                       class="quantity-input"
                       onchange="updateQuantity('${t.id}', 0, this.value)">
                <button onclick="updateQuantity('${t.id}', 1)" class="quantity-btn">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                    </svg>
                </button>
                <button onclick="addTenToCart('${t.id}')" class="w-8 h-8 bg-macaron-500 hover:bg-macaron-600 text-white rounded-full flex items-center justify-center transition-colors duration-200">
                    <span class="text-sm font-bold">10</span>
                </button>
            </div>
            <div class="mt-2">
                <button onclick="addToCart('${t.id}')" class="w-full btn-primary">Add to Cart</button>
            </div>
        </div>
    `,console.log("Card created with buttons for:",t.name),n}function c(t,e,n=null){const o=document.getElementById(`quantity-${t}`);if(!o)return;let a=parseInt(o.value)||0;n!==null?a=parseInt(n)||0:a+=e,a<0&&(a=0),o.value=a,r(t,a)}function r(t,e){const n=document.getElementById(`checkmark-${t}`),o=i.find(a=>a.id===t);n&&o&&(e>=o.minQuantity?n.classList.remove("hidden"):n.classList.add("hidden"))}function d(t){var o;const e=document.getElementById(`quantity-${t}`);if(!e)return;const n=parseInt(e.value)||0;if(n<10){s("Minimum quantity per flavor is 10 macarons","error");return}try{cart.addItem(t,n),e.value=0,r(t,0),s(`${n} ${(o=i.find(a=>a.id===t))==null?void 0:o.name} added to cart!`,"success")}catch(a){s(a.message,"error")}}function h(t){const e=document.getElementById(`quantity-${t}`);e&&(e.value=10,r(t,10))}window.addToCart=d;window.addTenToCart=h;window.updateQuantity=c;function f(){document.querySelectorAll('a[href^="#"]').forEach(e=>{e.addEventListener("click",n=>{n.preventDefault();const o=e.getAttribute("href").substring(1),a=document.getElementById(o);a&&a.scrollIntoView({behavior:"smooth",block:"start"})})})}function s(t,e="info"){document.querySelectorAll(".notification").forEach(u=>u.remove());const o=document.createElement("div");o.className="notification fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transform transition-all duration-300 translate-x-full";const a=e==="success"?"bg-green-500":e==="error"?"bg-red-500":"bg-blue-500",l=e==="success"?"text-green-100":e==="error"?"text-red-100":"text-blue-100";o.innerHTML=`
        <div class="flex items-center space-x-3">
            <svg class="w-5 h-5 ${l}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                ${e==="success"?'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>':e==="error"?'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>':'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>'}
            </svg>
            <span class="text-white font-medium">${t}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="text-white hover:text-gray-200">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
    `,o.classList.add(a),document.body.appendChild(o),setTimeout(()=>{o.classList.remove("translate-x-full")},100),setTimeout(()=>{o.parentElement&&(o.classList.add("translate-x-full"),setTimeout(()=>{o.parentElement&&o.remove()},300))},5e3)}const g={threshold:.1,rootMargin:"0px 0px -50px 0px"},v=new IntersectionObserver(t=>{t.forEach(e=>{e.isIntersecting&&e.target.classList.add("fade-in")})},g),b={threshold:.3,rootMargin:"0px 0px -100px 0px"},x=new IntersectionObserver(t=>{t.forEach(e=>{if(e.isIntersecting){const n=e.target;n.paused&&n.play().catch(o=>{console.log("Video autoplay prevented:",o)})}else{const n=e.target;n.paused||n.pause()}})},b);document.addEventListener("DOMContentLoaded",()=>{document.querySelectorAll(".macaron-card, .btn-primary, .btn-secondary").forEach(n=>{v.observe(n)}),document.querySelectorAll(".auto-play-video").forEach(n=>{x.observe(n)})});window.updateQuantity=c;window.addToCart=d;window.showNotification=s;document.addEventListener("DOMContentLoaded",()=>{window.cart&&window.cart.updateCartDisplay()});
