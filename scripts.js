import data from './data.js'

const itemsContainer = document.querySelector('#items')

// the length of our data determines how many times this loop goes around
data.forEach(function (mood, i) {
	// create a new div element and give it a class name
	const newDiv = document.createElement('div');
	newDiv.className = 'item'
	// create an image element
	const img = document.createElement('img');
	// this will change each time we go through the loop. Can you explain why?
	img.src = mood.image
	img.width = 300
	img.height = 300
	// Add the image to the div
	newDiv.appendChild(img)
	// put new div inside items container
	itemsContainer.appendChild(newDiv)
	// create a paragraph element for a description
	const desc = document.createElement('P')
	// give the paragraph text from the data
	desc.innerText = mood.desc
	// append the paragraph to the div
	newDiv.appendChild(desc)
	// do the same thing for price
	const price = document.createElement('P')
	price.innerText = mood.price
	newDiv.appendChild(price)
	// Make a button 
	const button = document.createElement('button')
    //add class to button
    button.className = 'add-to-cart'
	// add an  id name to the button
	button.dataset.id = mood.name
	// creates a custom attribute called data-price. That will hold price for each element in the button
	button.dataset.price = mood.price
	button.innerHTML = "Add to Cart"
	newDiv.appendChild(button)
})

const cart = []

const addItemToCart = (id, price) => {
    // Loop over cart items. 
    for (let i = 0; i < cart.length; i += 1) {
      // If we find a matching item increase the quantity
      if (cart[i].id === id) {
        cart[i].qty += 1
        return // exit this function early
      }
    }
    // If no matching items were found add a new item
    cart.push({ id, price, qty: 1 })
  }

document.body.addEventListener('click', (e) => {
    if (e.target.matches('.add-to-cart')) {
      console.log(e.target)
      addItemToCart(e.target.dataset.id, e.target.dataset.price)
      console.log(cart) // Use console.log to test your work
      displayCart() // Display the cart! 
    }
  })

  const displayCart = () => {
    let cartStr = ''
    for (let i = 0; i < cart.length; i += 1) {
      const item = cart[i]
      cartStr += `<li>
        <span>${item.id}</span>
        <input type="number" value="${item.qty}" class="input-qty" data-id="${item.id}">
        <span>${item.price}</span>
        <span>${(item.price * item.qty).toFixed(2)}</span>
        <button class="button-add" data-id="${item.id}">+</button>
        <button class="button-sub" data-id="${item.id}">-</button>
      </li>`
    }
    // Get the cart 
    const cartItems = document.querySelector('#cart-items')
    // Set the inner html of the cart
    cartItems.innerHTML = cartStr
  }

