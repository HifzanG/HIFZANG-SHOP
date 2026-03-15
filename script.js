let cart = JSON.parse(localStorage.getItem("cart")) || []
let wish = JSON.parse(localStorage.getItem("wish")) || []

function toast(msg){
let t=document.getElementById("toast")
if(!t) return
t.innerText=msg
t.style.display="block"
setTimeout(()=>{t.style.display="none"},2000)
}

function addCart(name,price,img){
cart.push({name,price,img})
localStorage.setItem("cart",JSON.stringify(cart))
toast("🛒 Added to cart!")
let cartIcon=document.querySelector(".floating-cart")
cartIcon.style.transform="scale(1.3)"
setTimeout(()=>{cartIcon.style.transform="scale(1)"},300)
}

function addWish(name,price,img){
wish.push({name,price,img})
localStorage.setItem("wish",JSON.stringify(wish))
toast("❤️ Added to wishlist")
}

function loadCart(){
let container=document.getElementById("cartItems")
if(!container) return
container.innerHTML=""
let total=0
cart.forEach((item,index)=>{
total+=item.price
container.innerHTML+=`
<div class="cart-item">
<img src="${item.img}">
<div>
<p>${item.name}</p>
<p>RM${item.price}</p>
<button onclick="removeItem(${index})">Remove</button>
</div>
</div>
`
})
document.getElementById("total").innerText=total
}

function removeItem(i){
cart.splice(i,1)
localStorage.setItem("cart",JSON.stringify(cart))
loadCart()
}

// Dark mode toggle with icon change
function toggleDark(){
document.body.classList.toggle("dark")
let icon = document.getElementById("darkIcon")
icon.innerText = document.body.classList.contains("dark") ? "☀️" : "🌙"
}

function scrollProducts(){document.getElementById("products").scrollIntoView({behavior:"smooth"})}
function goCart(){window.location="cart.html"}

document.getElementById("search")?.addEventListener("keyup",function(){
let value=this.value.toLowerCase()
document.querySelectorAll(".product-card").forEach(card=>{
let name=card.dataset.name.toLowerCase()
card.style.display=name.includes(value)?"block":"none"
})
})

loadCart()