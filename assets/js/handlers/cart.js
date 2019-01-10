function addToCart(product, quantityToBuy=1){
    let totalPrice   = getFromLocalStorage("totalPrice"),
        cart         = getFromLocalStorage("cart"),
        isProdInCart = false,
        isCartEmpty  = cart.length < 1 ? true: false;

    quantityToBuy  = Number(quantityToBuy);

    if(quantityToBuy<1){
        return
    }

    if(!isCartEmpty){
        cart = cart.map( (cartProd) => {
            let isQuantityAcceptable = cartProd.quantityToBuy + quantityToBuy <= cartProd.Quantity ? true : false;
            if (cartProd.ProductId === product.ProductId) {
                isProdInCart = true;
                if (isQuantityAcceptable) {
                    cartProd.quantityToBuy += quantityToBuy;
                    totalPrice += product.Price * quantityToBuy;
                } else {
                    alert("Can not exceed available quantity");
                }
            }
            return cartProd;
        })
    } 

    if(isCartEmpty || !isProdInCart) {
        isQuantityAcceptable = quantityToBuy <= product.Quantity;
        if(isQuantityAcceptable){
            product.quantityToBuy = quantityToBuy ;
            totalPrice  += product.Price * quantityToBuy;
            cart.push(product);
        } else {
            alert("Can not exceed available quantity")
        }
    }

    sendToLocalStorage("totalPrice", totalPrice);
    sendToLocalStorage("cart", cart);
}

function removeFromCart(product){
    let totalPrice = getFromLocalStorage("totalPrice"),
        cart       = getFromLocalStorage("cart");
    
    totalPrice    -= product.Price * product.quantityToBuy;
    cart           = cart.filter(prd => prd.ProductId != product.ProductId);

    sendToLocalStorage("totalPrice", totalPrice);
    sendToLocalStorage("cart", cart);
}


function reduceOneFromCart(product){
    let totalPrice = getFromLocalStorage("totalPrice"),
        cart       = getFromLocalStorage("cart");
   
    if(cart){
        cart = cart.map( (cartProd) => {
            if(cartProd.ProductId === product.ProductId && cartProd.quantityToBuy>1){
                cartProd.quantityToBuy -= 1 ;
                totalPrice  -= product.Price;
            }
            return cartProd
        })
        sendToLocalStorage("totalPrice", totalPrice);
        sendToLocalStorage("cart", cart);
    } 
}   