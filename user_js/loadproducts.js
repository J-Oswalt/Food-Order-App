function loadProductContent(){
    document.getElementById("wholemenu").innerHTML='<button class="btn btn-info" onclick=location.href="../user_view/productdetail.html?wholemenu=yes"><h5>See All Menu Options</h5></button>';
    loadCuisines();
    loadCategories();
    loadRestaurants();
    
}
let styleText="",hrefText="";

function loadCuisines(){
    hrefText="../user_view/select_restaurant.html";
    styleText="width:100px;height:100px;border-radius:10px 25px;padding:5px;margin:auto;";
    let cuisineTable = document.getElementById("cuisine");
    let cuisineCollection = JSON.parse(window.localStorage.getItem("cuisine"));
    if(cuisineCollection !=null){
        for(var cuisineId in cuisineCollection){
            var cuisineObj = cuisineCollection[cuisineId];
            cuisineTable.innerHTML +='<div class="col" id="cat'+cuisineObj["id"]+'">'+
            '<a class="cuisine" href="'+hrefText+'?'+"cuisine"+'='+cuisineObj["name"]+'">'+
            '<img src="'+cuisineObj["image"]+'" class="mx-auto d-block" style="'+styleText+'"><p style="text-align:center;">'+cuisineObj["name"]+'</p></a></div>'
        }
    }
}
function loadCategories(){
    hrefText="../user_view/select_restaurant.html";
    styleText="width:100px;height:100px;border-radius:50%;padding:5px;margin:auto;";
    let categoryTable = document.getElementById("category");
    let categoryCollection = JSON.parse(window.localStorage.getItem("category"));
    if(categoryCollection !=null){
        for(var categoryId in categoryCollection){
            var categoryObj = categoryCollection[categoryId];
            categoryTable.innerHTML +='<div class="col" id="cat'+categoryObj["id"]+'">'+
            '<a class="category" href="'+hrefText+'?'+"category"+'='+categoryObj["name"]+'">'+
            '<img src="'+categoryObj["image"]+'" class="mx-auto d-block" style="'+styleText+'"><p style="text-align:center;">'+categoryObj["name"]+'</p></a></div>'
        }
    }
}

function loadRestaurants(){
    hrefText="../user_view/cart.html";
    styleText="width:200px;height:200px;border-radius:5px 25px";
    let restaurantTable = document.getElementById("restaurant");
    let restaurantCollection = JSON.parse(window.localStorage.getItem("restaurant"));
    if(restaurantCollection !=null){
        for(var restaurantId in restaurantCollection){
            var restaurantObj = restaurantCollection[restaurantId];
            restaurantTable.innerHTML +='<div class="col" id="cat'+restaurantObj["id"]+'">'+
            '<a class="restaurant" href="'+hrefText+'?'+"restaurant"+'='+restaurantObj["id"]+'">'+
            '<img src="'+restaurantObj["image"]+'" class="mx-auto d-block" style="'+styleText+'"><p style="text-align:center;">'+restaurantObj["name"]+'</p></a></div>'
        }
    }
}
