
let cart = [];

//functon to add to the cart
function addToCart(id, name, image){
    let existing = cart.find(item =>item.id===id);
    if (existing){
        existing.quantity++;
    } 
    else{
    cart.push({
       id: id,
       name: name,
        price: 50,
       image: image,
       quantity: 1
      });
    }
    updateCartCount();
    renderCart();
}

//function to remove items from cart
function removeFromCart(id){
    cart=cart.filter(item=>item.id !== id);
    updateCartCount();
    renderCart();
}

//count how many items in cart
function updateCartCount(){
    let count = cart.reduce((sum, item)=>sum+ item.quantity, 0);
     const el = document.getElementById("cart-count");

    if (el){
        el.textContent =count;
    }
}

//function  to toggle cart
function toggleCart(){
    const panel = document.getElementById("cart-panel");

    if (!panel) return;
    if (panel.style.display=== "none" || panel.style.display === ""){
        panel.style.display="block";
        renderCart();
    }
    else{
        panel.style.display ="none";
    }

}

//render cart
function renderCart(){
    const container=document.getElementById("cart-items");
    if (!container)return;
    container.innerHTML="";

    let total = 0;
    cart.forEach(item =>{
        total += item.price * item.quantity;
    container.innerHTML+=`
        <div style="display:flex; gap:10px; margin-bottom:10px;">
                <div>
                <p>${item.name}</p>
              <p>$${item.price} x ${item.quantity}</p>
                 
                <button onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        `;
    });
container.innerHTML +=`<h3>Total: $${total.toFixed(2)}</h3>`;
}

window.addToCart=addToCart;
window.removeFromCart=removeFromCart;
window.toggleCart=toggleCart;