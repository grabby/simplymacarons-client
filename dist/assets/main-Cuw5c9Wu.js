import{m as s}from"./cart-DyeD8E41.js";document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("mobile-menu-button"),t=document.getElementById("mobile-menu");e&&t&&e.addEventListener("click",()=>{t.classList.toggle("hidden")});const o=t==null?void 0:t.querySelectorAll("a");o==null||o.forEach(n=>{n.addEventListener("click",()=>{t.classList.add("hidden")})}),d(),p()});function d(){const e=document.getElementById("flavors-grid");e&&(e.innerHTML="",s.forEach((t,o)=>{const n=l(t,o);e.appendChild(n)}))}function l(e,t){const o=document.createElement("div");return o.className="macaron-card fade-in",o.style.animationDelay=`${t*.1}s`,o.innerHTML=`
        <div class="relative overflow-hidden">
            <img src="${e.image}" alt="${e.name} Macaron" class="macaron-image">
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div class="p-6">
            <h3 class="text-xl font-bold text-macaron-800 mb-2">${e.name}</h3>
            <p class="text-gray-600 mb-4">${e.description}</p>
            <div class="flex items-center justify-between mb-4">
                <span class="text-2xl font-bold text-macaron-600">$${e.price.toFixed(2)}</span>
                <span class="text-sm text-gray-500">Min: ${e.minQuantity}</span>
            </div>
            <div class="flex items-center space-x-2 mb-4">
                <button onclick="updateQuantity('${e.id}', -1)" class="quantity-btn">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                    </svg>
                </button>
                <input type="number" 
                       id="quantity-${e.id}" 
                       value="0" 
                       min="0" 
                       class="quantity-input"
                       onchange="updateQuantity('${e.id}', 0, this.value)">
                <button onclick="updateQuantity('${e.id}', 1)" class="quantity-btn">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                    </svg>
                </button>
            </div>
            <button onclick="addToCart('${e.id}')" 
                    class="w-full btn-primary">
                Add to Cart
            </button>
        </div>
    `,o}function u(e,t,o=null){const n=document.getElementById(`quantity-${e}`);if(!n)return;let i=parseInt(n.value)||0;o!==null?i=parseInt(o)||0:i+=t,i<0&&(i=0),n.value=i}function m(e){var n;const t=document.getElementById(`quantity-${e}`);if(!t)return;const o=parseInt(t.value)||0;if(o<10){a("Minimum quantity per flavor is 10 macarons","error");return}try{cart.addItem(e,o),t.value=0,a(`${(n=s.find(i=>i.id===e))==null?void 0:n.name} added to cart!`,"success")}catch(i){a(i.message,"error")}}function p(){document.querySelectorAll('a[href^="#"]').forEach(t=>{t.addEventListener("click",o=>{o.preventDefault();const n=t.getAttribute("href").substring(1),i=document.getElementById(n);i&&i.scrollIntoView({behavior:"smooth",block:"start"})})})}function a(e,t="info"){document.querySelectorAll(".notification").forEach(c=>c.remove());const n=document.createElement("div");n.className="notification fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transform transition-all duration-300 translate-x-full";const i=t==="success"?"bg-green-500":t==="error"?"bg-red-500":"bg-blue-500",r=t==="success"?"text-green-100":t==="error"?"text-red-100":"text-blue-100";n.innerHTML=`
        <div class="flex items-center space-x-3">
            <svg class="w-5 h-5 ${r}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                ${t==="success"?'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>':t==="error"?'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>':'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>'}
            </svg>
            <span class="text-white font-medium">${e}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="text-white hover:text-gray-200">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
    `,n.classList.add(i),document.body.appendChild(n),setTimeout(()=>{n.classList.remove("translate-x-full")},100),setTimeout(()=>{n.parentElement&&(n.classList.add("translate-x-full"),setTimeout(()=>{n.parentElement&&n.remove()},300))},5e3)}const h={threshold:.1,rootMargin:"0px 0px -50px 0px"},f=new IntersectionObserver(e=>{e.forEach(t=>{t.isIntersecting&&t.target.classList.add("fade-in")})},h);document.addEventListener("DOMContentLoaded",()=>{document.querySelectorAll(".macaron-card, .btn-primary, .btn-secondary").forEach(t=>{f.observe(t)})});window.updateQuantity=u;window.addToCart=m;window.showNotification=a;
