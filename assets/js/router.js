function loadPageBasedOnURL(){
    hash = window.location.hash
    switch (hash) {
        case "#products":
            loadProductsPage();
            break;

        case "#product":  
            loadProdDetailsPage();
            break;

        case "#view_cart":
            loadViewCartPage();
            break;

        case "#contact_us":
            loadContactUsPage();
            break;

        case "#about_us":
            loadAboutUsPage();
            break;
            
        default:
            history.pushState(null, null,"?page=1"); 
            loadProductsPage();
    }
    hash = hash ? hash : "#products"
    highlightCurrentActiveTab(hash)
}

function changeURL(hash, search = null){
    if(search){
        history.pushState(null, null, search);
    } else {
        history.pushState(null, null, "?");
    }
    window.location.hash = hash;
}

function getCurrentActiveTab(){
    return currentActiveTab = window.location.hash
}