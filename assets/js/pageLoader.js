function loadContactUsPage() {
    renderContactUs()
}
function loadAboutUsPage() {
    renderAboutUs()
}

function loadViewCartPage() {
    const productsInCart = getFromLocalStorage("cart")
    const totalPrice     = getFromLocalStorage("totalPrice")
    if (productsInCart) {
        renderViewCart(productsInCart,totalPrice)
    }
}

function loadProdDetailsPage() {
    const productId = window.location.search.slice(5)
    const products  = getFromLocalStorage("products")
    if (products) {
        const productData = products.find( product => 
            product.ProductId == productId
        )
        if(productData){
            const cartProducts    = getFromLocalStorage("cart")
            const productFromCart = cartProducts.find( product =>
                 product.ProductId == productId
            )
            if(productFromCart){
                renderProdViewDetails(productData, productFromCart.quantityToBuy)
            } else {
                renderProdViewDetails(productData)
            }
        }
    }
}

function loadProductsPage() {
    let productsData  = getFromLocalStorage("products")
    const search      = window.location.search.slice(6);
    const page        = isNaN(search) ? 1 : search;
    const prodPerPage = 16;

    const innerBound = (page - 1) * prodPerPage;
    const outerBound =  page      * prodPerPage;

    if (productsData) {
        renderProductCards(productsData.slice(innerBound, outerBound));
        renderProductsPagination(productsData.length, prodPerPage);
    } 
}