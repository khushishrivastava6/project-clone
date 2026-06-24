const products = [
{
id:1,
name:"Wireless Headphones",
price:1999,
image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"
},
{
id:2,
name:"Smart Watch",
price:2499,
image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"
},
{
id:3,
name:"Laptop",
price:55999,
image:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400"
},
{
id:4,
name:"Running Shoes",
price:2999,
image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"
},
{
id:5,
name:"Backpack",
price:1499,
image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400"
},
{
id:6,
name:"Camera",
price:39999,
image:"https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400"
},
{
id:7,
name:"Gaming Mouse",
price:999,
image:"https://images.unsplash.com/photo-1527814050087-3793815479db?w=400"
},
{
id:8,
name:"Bluetooth Speaker",
price:1799,
image:"https://images.unsplash.com/photo-1507878866276-a947ef722fee?w=400"
},
{
id:9,
name:"Keyboard",
price:1299,
image:"https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400"
}
];

let cart = [];

function displayProducts(productList){

const container=document.getElementById("productContainer");

container.innerHTML="";

productList.forEach(product=>{

container.innerHTML+=`
<div class="product-card">
<img src="${product.image}">
<h3>${product.name}</h3>
<p class="price">₹${product.price}</p>
<button onclick="addToCart(${product.id})">
Add to Cart
</button>
</div>
`;

});

}

function addToCart(id){

const product=products.find(p=>p.id===id);

const existing=cart.find(item=>item.id===id);

if(existing){
existing.quantity++;
}
else{
cart.push({...product,quantity:1});
}

updateCart();

}

function updateCart(){

const cartItems=document.getElementById("cartItems");
const cartCount=document.getElementById("cartCount");
const cartTotal=document.getElementById("cartTotal");

cartItems.innerHTML="";

let total=0;
let count=0;

cart.forEach(item=>{

total+=item.price*item.quantity;
count+=item.quantity;

cartItems.innerHTML+=`
<div class="cart-item">
<h4>${item.name}</h4>
<p>₹${item.price}</p>
<p>Quantity: ${item.quantity}</p>

<button onclick="increaseQuantity(${item.id})">+</button>
<button onclick="decreaseQuantity(${item.id})">-</button>
<button onclick="removeItem(${item.id})">Remove</button>
</div>
`;

});

cartCount.innerText=count;
cartTotal.innerText=total;

}

function increaseQuantity(id){
cart.find(item=>item.id===id).quantity++;
updateCart();
}

function decreaseQuantity(id){

let item=cart.find(item=>item.id===id);

if(item.quantity>1){
item.quantity--;
}
else{
removeItem(id);
}

updateCart();

}

function removeItem(id){
cart=cart.filter(item=>item.id!==id);
updateCart();
}

function toggleCart(){
document.getElementById("cartPanel")
.classList.toggle("active");
}

function searchProducts(){

const value=document
.getElementById("searchInput")
.value.toLowerCase();

const filtered=products.filter(product=>
product.name.toLowerCase().includes(value)
);

displayProducts(filtered);

}

function checkout(){

if(cart.length===0){
alert("Cart is Empty!");
}
else{
alert("Order Placed Successfully!");
cart=[];
updateCart();
toggleCart();
}

}

displayProducts(products);
