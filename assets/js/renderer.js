function renderProductCards(productsData) {
    const currentPage  = document.querySelector("#currentPage")
    let cardsContainer = document.querySelector("#productsContainerTemplate"),
        prodCard       = document.querySelector("#productCardTemplate")
    
    cardsContainer        = cardsContainer.content.cloneNode(true).firstElementChild
    prodCard              = prodCard.content.cloneNode(true).firstElementChild
    currentPage.innerHTML = ""

    productsData.forEach(prdData => {
        prodCard = prodCard.cloneNode(true)

        prodCard.querySelector(".prodTitle")
            .innerHTML = prdData.Name

        prodCard.querySelector(".prodDesc")
            .innerHTML = prdData.Description

        prodCard.querySelector(".prodPrice")
            .innerHTML = "$" + prdData.Price

        prodCard.querySelector(".prodImg")
            .setAttribute("src", prdData.ProductPicUrl)

        prodCard.querySelector(".viewMore")
            .addEventListener("click", () => {
                changeURL("product", "?pid=" + prdData.ProductId)
            })

        prodCard.querySelector(".prodToCart")
            .addEventListener("click", () => {
                addToCart(prdData)
                updateMenuTotalPrice()
            })

        cardsContainer.append(prodCard)
    })
    currentPage.append(cardsContainer)  
}

function renderViewCart(productsInCart, totalPrice){
    let currentPage   = document.querySelector("#currentPage")
    let table         =  document.querySelector("#viewCartTemplate")
                            .content.cloneNode(true).firstElementChild 
                        
    let TotalPriceRow = document.querySelector("#TotalPriceRow")
                            .content.cloneNode(true).firstElementChild 

    let cartTableBody   = table.querySelector("#cartTableBody")
    let tableRow        = table.querySelector("#tableRow")
    let tableTotalPrice = TotalPriceRow.querySelector("#tableTotalPrice")
    
    tableTotalPrice.innerHTML = "$" + totalPrice
    currentPage.innerHTML = ""

    productsInCart.forEach( prdData =>{
        tableRow = tableRow.cloneNode(true)

        tableRow.querySelector(".prodTitle")
            .innerHTML = prdData.Name

        tableRow.querySelector(".quantityToBuy")
            .innerHTML = prdData.quantityToBuy

        tableRow.querySelector(".quantityAvailable")
            .innerHTML = prdData.Quantity

        tableRow.querySelector(".prodPrice")
            .innerHTML = "$" + prdData.Price

        tableRow.querySelector(".totalProdPrice")
            .innerHTML = "$" + prdData.Price * prdData.quantityToBuy

        tableRow.querySelector(".prodImg")
            .setAttribute("src", prdData.ProductPicUrl)

        table.querySelector("tbody")
            .append(tableRow)

        tableRow.querySelector(".removeButton")
            .addEventListener("click", () => {
                removeFromCart(prdData)
                loadPageBasedOnURL() // re-render
                updateMenuTotalPrice()
            })
        
        tableRow.querySelector(".viewMore")
            .addEventListener("click", () => {
                changeURL("product", "?pid=" + prdData.ProductId)
            })

        tableRow.querySelector(".removeOneFromCart")
            .addEventListener("click", () => {
                reduceOneFromCart(prdData)
                loadPageBasedOnURL() // re-render
                updateMenuTotalPrice()
            })

        tableRow.querySelector(".addOneToCart")
            .addEventListener("click", (e) => {
                addToCart(prdData)
                loadPageBasedOnURL() // re-render
                updateMenuTotalPrice()
            })

             //addOneToCart
    })
    cartTableBody.append(TotalPriceRow)
    cartTableBody.firstElementChild.remove()
    currentPage.append(table)
}


function renderProdViewDetails(prdData, Ordered = -1){
    let currentPage   = document.querySelector("#currentPage"),
        prodCard      = document.querySelector("#productViewDetailsTemplate")
        
    currentPage.innerHTML = ""
    prodCard      = prodCard.content.cloneNode(true).firstElementChild
    quantityToBuy = prodCard.querySelector(".prodQuantity")
    
    prodCard.querySelector(".prodTitle")
        .innerHTML = prdData.Name
    
    prodCard.querySelector(".prodDesc")
        .innerHTML = prdData.Description

    prodCard.querySelector(".QAvailable")
        .innerHTML = prdData.Quantity

    prodCard.querySelector(".Ordered")
        .innerHTML = Ordered == -1 ? 0: Ordered 

    prodCard.querySelector(".Availability")
        .innerHTML = prdData.Quantity>0 ? 
            "In-Stock":"Out-Of-Stock"
    
    prodCard.querySelector(".prodPrice")
        .innerHTML = "$" + prdData.Price
    
    prodCard.querySelector(".prodImg")
        .setAttribute("src", prdData.ProductPicUrl)
        
    prodCard.querySelector(".prodToCart")
        .addEventListener("click", () => {
            addToCart(prdData, quantityToBuy.value)
            updateMenuTotalPrice()
            loadPageBasedOnURL() // re-render
        })
    currentPage.append(prodCard)
}

function renderContactUs(){
    const currentPage     = document.querySelector("#currentPage")
    let contactUsDiv      = document.querySelector("#contactUsTemplate")
        
    contactUsDiv          = contactUsDiv.content.cloneNode(true)
    const myForm          = contactUsDiv.querySelector("#myForm")

    myForm.addEventListener("submit", () => {
        event.preventDefault()
        submitFormData("http://js.vacsera.com/api/final-project", myForm)
    })

    currentPage.innerHTML = ""
    currentPage.append(contactUsDiv)
}

function renderAboutUs(){
    const currentPage     = document.querySelector("#currentPage")
    let aboutUsDiv        = document.querySelector("#aboutUs")

    aboutUsDiv            = aboutUsDiv.content.cloneNode(true)
    
    currentPage.innerHTML = ""
    currentPage.append(aboutUsDiv)
}

function renderProductsPagination(numOfProducts, prodPerPage){
    const currentPage  = document.querySelector("#currentPage")
    let pagination     = document.querySelector("#pagination"),
    paginationLi       = document.querySelector("#paginationLi")
    
    pagination         = pagination.content.cloneNode(true).firstElementChild
    paginationLi       = paginationLi.content.cloneNode(true).firstElementChild
    paginationUl       = pagination.querySelector("#paginationUl")
    
    const numOfPages   = Math.ceil(numOfProducts / prodPerPage)

    for(i=1;i<=numOfPages; i++){
        let j = i
        paginationLi = paginationLi.cloneNode(true)
        paginationLi.querySelector(".page-link")
                .innerHTML = j

        paginationLi.querySelector(".page-link") 
            .addEventListener("click", ()=>{
                changeURL("#products", "?page=" + j)
            }) 

        paginationUl.append(paginationLi)
    }

    pagination.append(paginationUl)
    currentPage.append(pagination)  
}

function updateMenuTotalPrice(){
    let totalPrice         = getFromLocalStorage("totalPrice"),
        menuPriceDiv       = document.querySelector("#totalPrice")

    totalPrice             = totalPrice ? totalPrice: 0
    menuPriceDiv.innerHTML = "$" + totalPrice
}

function highlightCurrentActiveTab(hash){
    let tabs = document.querySelectorAll("ul li a.nav-link")
    let currentActiveTab = document.querySelector(hash)

    if(currentActiveTab){
        for(i=0;i<tabs.length;i++){
            tabs[i].classList.remove("active")
        }
    
        currentActiveTab.classList.add("active")
    }
}

function renderMenu(){
    let body         = document.body
    let menuBar      = document.querySelector("#menuBarTemplate")
    menuBar          = menuBar.content.cloneNode(true).firstElementChild
    anchorTags       = menuBar.querySelectorAll("li a")

    anchorTags.forEach((tag)=>{
        if(tag.id == "products"){
            tag.addEventListener("click",()=>{
                changeURL("#" + tag.id,"?page=1")
            })
        } else {
            tag.addEventListener("click",()=>{
                changeURL("#" + tag.id)
            })
        }
    })

    body.insertBefore(menuBar, body.childNodes[0]);
}