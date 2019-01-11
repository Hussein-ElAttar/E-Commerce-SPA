renderMenu()

if(!getFromLocalStorage("products")){
    getDataFromApi()
    .then((response) => {
        productsData = response.ProductCollection;
        sendToLocalStorage("products", productsData);
        loadPageBasedOnURL()
    }).catch(() => {
        console.log("check your api url");
    })
}

updateMenuTotalPrice()

if(!getFromLocalStorage("cart")){
    sendToLocalStorage("cart", [])
}

window.onhashchange = function() { 
    loadPageBasedOnURL()
}