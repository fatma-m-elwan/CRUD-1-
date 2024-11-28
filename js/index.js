var productNameInput = document.getElementById ("productName") ;
var productPriceInput = document.getElementById ("productPrice") ;
var productCategoryInput = document.getElementById ("productCategory") ;
var productDescriptionInput = document.getElementById ("productDescription") ;
var productImageInput = document.getElementById ("productImage") ;

var searchInput = document.getElementById("searchInput") ;

var btnAdd = document.getElementById("btnAdd") ;
var btnUpdate = document.getElementById("btnUpdate") ;

var currentIndex = 0;

var productList = [] ;

if( localStorage.getItem("productContainer") !== null) {

    productList = JSON.parse(localStorage.getItem("productContainer"))
    displayData()
}
console.log((productList))


function addProduct() {

    if(validitionInputs(productNameInput , "msgName") &&
     validitionInputs(productPriceInput , "msgPrice") && 
     validitionInputs(productCategoryInput , "msgCategory") && 
     validitionInputs(productDescriptionInput , "msgDescription") && 
     validitionInputs(productImageInput , "msgImage"))
    {
        var product = {
        name : productNameInput.value.trim() ,
        price : productPriceInput.value ,
        category : productCategoryInput.value.trim() ,
        description : productDescriptionInput.value.trim() ,
        image : productImageInput.files[0] ? `images/${productImageInput.files[0].name}`: `images/1.jpg` ,
    }
    productList.push(product);

    localStorage.setItem("productContainer" , JSON.stringify(productList))
    
    displayData();
    console.log(productList)
    
    clearForm()
    }
} 


function clearForm() {
    productNameInput.value = null ;
    productPriceInput.value = null ;
    productCategoryInput.value = null ;
    productDescriptionInput.value = null ;
    productImageInput.value = null ;

    productNameInput.classList.remove("is-valid") 
    productPriceInput.classList.remove("is-valid") 
    productCategoryInput.classList.remove("is-valid") 
    productDescriptionInput.classList.remove("is-valid") 
    productImageInput.classList.remove("is-valid") 

    
}


function displayData () {
    var cartoona = "";
    for (var i=0 ; i<productList.length ; i++) {
        cartoona += createCols(i)
    }
    document.getElementById("rowData").innerHTML = cartoona ;
}

function deleteItem(index) {

    productList.splice(index , 1) ;
    
    localStorage.setItem("productContainer" , JSON.stringify(productList)) ;
    console.log(productList)

    displayData()
}

function searchData() {
    var term = searchInput.value ;
    var cartoona = "" ;

    for (var i=0 ; i<productList.length ; i++){

        if(productList[i].name.toLowerCase().includes(term.toLowerCase())) {

            cartoona += createCols(i)
        }
    }
    document.getElementById("rowData").innerHTML= cartoona;
}

function createCols (i){
    var regex = new RegExp(searchInput.value , "gi")
    return `
                <div class="col py-4">
                    <div class="card h-100">
                        <img class="card-img-top" height="120" src="${productList[i].image}" alt="${productList[i].name}" />
                        <div class="card-body text-center">
                            <span class="badge bg-info"> ID : ${i + 1} </span>
                            <h3 class="card-text small"> ${productList[i].name.replace(regex , (match)=>`<span class="bg-info">${match}</span>`)}</h3>
                            <div class="d-flex flex-column gap-2">
                                <h4 class="card-text small"> ${productList[i].price}</h4>
                                <h4 class="card-text small">${productList[i].category}</h4>
                                <p class="card-text small">${productList[i].description}</p>
                            </div>
                        </div>
                        <div class="card-footer text-center">
                            <button onclick ="deleteItem(${i})"   class="btn btn-outline-danger "><i class="fas fa-trash"></i></button>
                            <button onclick = "setUpdateInfo(${i})"  class="btn btn-outline-warning "><i class="fas fa-edit"></i></button>
                        </div>
                    </div>
                </div>
            `
}

function setUpdateInfo(index) {
    currentIndex = index ;

    productNameInput.value = productList[index].name
    productPriceInput.value = productList[index].price
    productCategoryInput.value = productList[index].category
    productDescriptionInput.value = productList[index].description

    btnAdd.classList.add("d-none")
    btnUpdate.classList.remove("d-none")
}

function updateData ( ) {
     var product = {
        name : productNameInput.value.trim() ,
        price : productPriceInput.value.trim() ,
        category : productCategoryInput.value ,
        description : productDescriptionInput.value.trim() ,
        image : productImageInput.files[0] ? `images/${productImageInput.files[0].name}`: `images/1.jpg` ,
    }
    productList.splice(currentIndex , 1 , product)
    localStorage.setItem("productContainer" , JSON.stringify(productList))
    
    displayData()
    clearForm()

    btnAdd.classList.remove("d-none")
    btnUpdate.classList.add("d-none")
    
}

// function validitionNameInput() {
//     var text = productNameInput.value ;
//     var regex = /^[a-zA-Z][a-zA-Z0-9 ]{2,19}$/
//     var msgName = document.getElementById("msgName")

//     if(regex.test(text)){
//         productNameInput.classList.add("is-valid")
//         productNameInput.classList.remove("is-invalid")
        
//         msgName.classList.add("d-none")

//         return true
//     }
//     else{
//         productNameInput.classList.add("is-invalid")
//         productNameInput.classList.remove("is-valid")

//         msgName.classList.remove("d-none")
        
//         return false
//     }
// }

// function validitionPriceInput() {
//     var text = productPriceInput.value ;
//     var regex = /^\d{1,10}(\.\d{1,2})?$/;
//     var msgPrice = document.getElementById("msgPrice");

//     if(regex.test(text)){
//         productPriceInput.classList.add("is-valid")
//         productPriceInput.classList.remove("is-invalid")
        
//         msgPrice.classList.add("d-none")

//         return true
//     }
//     else{
//         productPriceInput.classList.add("is-invalid")
//         productPriceInput.classList.remove("is-valid")

//         msgPrice.classList.remove("d-none")
        
//         return false
//     }
// }

// function validitionCategoryInput() {
//     var text = productCategoryInput.value ;
//     var regex = /^(mobile|tv|screens|electronic)$/i;
//     var msgCategory = document.getElementById("msgCategory");

//     if(regex.test(text)){
//         productCategoryInput.classList.add("is-valid")
//         productCategoryInput.classList.remove("is-invalid")
        
//         msgCategory.classList.add("d-none")

//         return true
//     }
//     else{
//         productCategoryInput.classList.add("is-invalid")
//         productCategoryInput.classList.remove("is-valid")

//         msgCategory.classList.remove("d-none")
        
//         return false
//     }
// }

// function validitionDescriptionInput() {
//     var text = productDescriptionInput.value ;
//     var regex = /^[\w\W\s]{3,150}$/m;
//     var msgDescription = document.getElementById("msgDescription");

//     if(regex.test(text)){
//         productDescriptionInput.classList.add("is-valid")
//         productDescriptionInput.classList.remove("is-invalid")
        
//         msgDescription.classList.add("d-none")

//         return true
//     }
//     else{
//         productDescriptionInput.classList.add("is-invalid")
//         productDescriptionInput.classList.remove("is-valid")

//         msgDescription.classList.remove("d-none")
        
//         return false
//     }
// }

// function validitionImageInput() {
//     var text = productImageInput.value ;
//     var regex = /^.{1,}\.(jpg|jpeg|png|svg|avif)$/;
//     var msgImage = document.getElementById("msgImage");

//     if(regex.test(text)){
//         productImageInput.classList.add("is-valid")
//         productImageInput.classList.remove("is-invalid")
        
//         msgImage.classList.add("d-none")

//         return true
//     }
//     else{
//         productImageInput.classList.add("is-invalid")
//         productImageInput.classList.remove("is-valid")

//         msgImage.classList.remove("d-none")
        
//         return false
//     }
// }
function validitionInputs(element , msgId) {
    var text = element.value ;
    var msg = document.getElementById(msgId);

    var regex = {
        productName : /^[a-zA-Z][a-zA-Z0-9 ]{2,19}$/ ,
        productPrice : /^\d{1,10}(\.\d{1,2})?$/ ,
        productCategory : /^(mobile|tv|screens|electronic)$/i ,
        productDescription : /^[\w\W\s]{3,150}$/m ,
        productImage : /^.{1,}\.(jpg|jpeg|png|svg|avif)$/
    }

    if(regex[element.id].test(text)){
        element.classList.add("is-valid")
        element.classList.remove("is-invalid")
        
        msg.classList.add("d-none")

        return true
    }
    else{
        element.classList.add("is-invalid")
        element.classList.remove("is-valid")

        msg.classList.remove("d-none")
        
        return false
    }
}