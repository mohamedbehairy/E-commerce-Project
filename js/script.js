
function addToCart(name, price, image, count = 1) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productIndex = cart.findIndex(item => item.name === name && item.image === image);
    if (productIndex !== -1) {
        cart[productIndex].count += count; 
    } else {
        const product = { name, price, image, count };
        cart.push(product); 
    }
    localStorage.setItem('cart', JSON.stringify(cart)); 
    updateCartInfo(); 
}
function updateCartInfo() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.count, 0); 
    const totalPrice = cart.reduce((total, item) => total + (item.price * item.count), 0).toFixed(2); 

    const cartCountElement = document.querySelector('.num-cart');
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }

    const totalPriceElement = document.querySelector('.total-price');
    if (totalPriceElement) {
        totalPriceElement.textContent = `$${totalPrice}`;
    }
}

function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartList = document.querySelector('.cartlist');
    cartList.innerHTML = ''; 

    cart.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('row', 'align-items-center', 'py-3', 'border-bottom');

        listItem.innerHTML = `
            <div class="col-4 d-flex align-items-center">
                <img src="${item.image}" alt="${item.name}" class="img-fluid me-3" style="width: 70px;">
                <div>
                    <h5>${item.name}</h5>
                    <p class="text-secondary">Category</p>
                </div>
            </div>
            <div class="col-2">$${item.price}</div>
            <div class="col-3 d-flex align-items-center">
                <input type="number" min="1" value="${item.count}" class="form-control w-25 text-center me-2 countInput">
                <button class="btn btn-warning btn-sm editBtn">Edit</button>
                <button class="btn btn-danger btn-sm deleteBtn">🗑</button>
            </div>
            <div class="col-2">$${(item.price * item.count).toFixed(2)}</div>
        `;
        cartList.appendChild(listItem);

        listItem.querySelector('.deleteBtn').addEventListener('click', function () {
            deleteCartItem(index);
        });

        listItem.querySelector('.editBtn').addEventListener('click', function () {
            const newCount = listItem.querySelector('.countInput').value;
            editCartItem(index, newCount);
        });
    });

    const payButton = document.querySelector('.payBtn');
    if (cart.length > 0) {
        payButton.classList.remove('d-none');
        document.querySelector('.noCart').style.display = 'none'; 
    } else {
        payButton.classList.add('d-none');
        document.querySelector('.noCart').style.display = 'block'; 
    }
    updateCartInfo(); 
}
function deleteCartItem(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (index > -1) {
        if (cart[index].count > 1) {
            cart[index].count -= 1; 
        } else {
            cart.splice(index, 1); 
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
        updateCartInfo();
    }
}

function editCartItem(index, newCount) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (index > -1) {
        cart[index].count = parseInt(newCount, 10); 
        if (cart[index].count <= 0) {
            cart.splice(index, 1); 
        }
        localStorage.setItem('cart', JSON.stringify(cart)); 
        displayCartItems(); 
        updateCartInfo(); 
    }
}

document.addEventListener('DOMContentLoaded', function () {
    displayCartItems();
    updateCartInfo();
});


document.addEventListener('click', function (event) {
    if (event.target.classList.contains('addCartBtn')) {
        const item = event.target.closest('.item'); 
        const name = item.querySelector('a').textContent; 
        const price = parseFloat(item.querySelector('.pric').textContent.replace('$', '')); 
        const image = item.querySelector('img').src; 

        addToCart(name, price, image);
    }
});

function updateCartDisplay() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountElement = document.querySelector('.num-cart');
    const totalPriceElement = document.querySelector('.total-price');
    
    if (cartCountElement && totalPriceElement) {
        const totalItems = cart.reduce((total, item) => total + item.count, 0);
        const totalPrice = cart.reduce((total, item) => total + (item.price * item.count), 0).toFixed(2);
        
        cartCountElement.textContent = totalItems;
        totalPriceElement.textContent = `$${totalPrice}`;
    }
}

document.addEventListener('DOMContentLoaded', updateCartDisplay);


document.addEventListener('DOMContentLoaded', function() {
    const loveButtons = document.querySelectorAll('.love-btn');

    loveButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('active'); 
        });
    });
});

    const buttons = document.querySelectorAll('.item-button button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            button.classList.add('active');
            setTimeout(() => {
                button.classList.remove('active');
            }, 1000);
        });
    });

$('.multiple-items').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
  });