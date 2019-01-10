renderMenu()
loadPageBasedOnURL()
updateMenuTotalPrice()

if(!getFromLocalStorage("cart")){
    sendToLocalStorage("cart", [])
}

if(!getFromLocalStorage("products")){
    loadProductsPage()
}

window.onhashchange = function() { 
    loadPageBasedOnURL()
}