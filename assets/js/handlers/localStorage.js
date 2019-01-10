function sendToLocalStorage(itemName,item){
    item = JSON.stringify(item)
    window.localStorage.setItem(itemName, item)
}

function getFromLocalStorage(itemName){
    let item = null;
    try {
        item = JSON.parse(window.localStorage.getItem(itemName))
    } catch (error) {
        
    } 
    return item
}