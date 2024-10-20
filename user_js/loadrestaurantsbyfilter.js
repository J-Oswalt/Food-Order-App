function loadRestaurantNames(){
        
    let filterOption=window.location.href.split("?")[1].split("=")[0];
    let filterValue=window.location.href.split("?")[1].split("=")[1];
    
    headingText=(filterOption=="cuisine")?filterValue+" food":filterValue;
    
    foodArr=loadByFilter(filterOption,filterValue);
    if (foodArr){
    console.log(foodArr[0]);
    console.log(foodArr[1]);
    if(foodArr[1].length>0){
        document.getElementById("restaurantheading").innerHTML="Restaurants delivering "+headingText;
        loadFilteredRestaurants(foodArr[1],filterOption, filterValue);
    }
    else{
        document.getElementById("restaurantheading").innerHTML="No Restaurants delivering "+headingText;
    }
    }
    // else{
    //     document.getElementById("restaurantheading").innerHTML="No Restaurants delivering "+headingText;
    // }
}

function loadByFilter(filterOption,filterValue){
let Collection = JSON.parse(window.localStorage.getItem("fooditem"));
if(Collection !=null){
    CollectionObjects=Object.values(Collection);
    foodIds=CollectionObjects.filter(fooditem=>fooditem[filterOption]==filterValue).map(fooditem=>fooditem.id);
    try{
        let MenuCollection=Object.values(JSON.parse(window.localStorage.getItem("menu")));
        let restaurantIds=[]
        MenuCollection.forEach(MenuItem=>{
        
        filteredMenu=Object.keys(MenuItem["menu"]).filter(foodid=>{
            if(foodIds.filter(id=>id==foodid).length>0){
                return foodid;
            }
        });
        if(filteredMenu.length>0){
            restaurantIds.push(MenuItem["restaurantId"]);
        }
    })
   
    return [foodIds,restaurantIds];
    }
    catch(Error){
        return;
    }
    
}
}

function loadFilteredRestaurants(restaurantIds, filter, filterValue){
let styleText="width:200px;height:200px;border-radius:5px 25px";
let restaurantTable = document.getElementById("restaurant");
let restaurantCollection = Object.values(JSON.parse(window.localStorage.getItem("restaurant")));

if(restaurantCollection !=null){
    filterData=restaurantCollection.filter(filteredItem=>{
        if(restaurantIds.filter(id=>id==filteredItem["id"]).length>0){
           return filteredItem;
        }
    });
    if(filterData!=null){
        filterData.forEach(filterObj =>{
            var filterValues = filterObj;
        
            var filterText ='<div class="col" id="cat'+filterValues["id"]+'">'+
            '<a class="restaurant" href="cart.html?restaurant'+'='+filterValues["id"]+'&'+filter+'='+filterValue+'">'+
            '<img src="'+filterValues["image"]+'" class="mx-auto d-block" style="'+styleText+'"><p style="text-align:center;">'+filterValues["name"]+'</p></a></div>'
        
            restaurantTable.innerHTML = restaurantTable.innerHTML+filterText;
        });
    }
    else{
        restaurantTable.innerHTML="No Restaurants Available";
    }
}
else{
    restaurantTable.innerHTML="No Restaurants Available";
}
}
