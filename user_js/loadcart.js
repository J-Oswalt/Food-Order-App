let orderCollection = JSON.parse(window.localStorage.getItem("order"));
let orderId = (orderCollection == null) ? 0 : Object.entries(orderCollection).length;

function loadFoodItemsInCart(){
    let queryString = window.location.href;
    let queryArray = queryString.split("?")[1].split("=");
    let restaurantId, filterName, filterValue, filteredFoodItems;
    let filteredFoodItemIds =[];
    //If the page is navigated from click event on cuisine names or category names on index page
    if (queryArray.length==3){
        restaurantId = queryArray[1].split("&")[0];
        filterName = queryArray[1].split("&")[1];
        filterValue = queryArray[2];
        filteredFoodItems = Object.values(JSON.parse(window.localStorage.getItem("fooditem"))).filter(fooditem=>fooditem[filterName]==filterValue);
        filteredFoodItems.forEach(filteredFoodItem=>{
            filteredFoodItemIds.push(filteredFoodItem["id"]);
        })
        
    }
    //Else page is navigated from click event on restaurant names on index page
    else{
        restaurantId = queryArray[1];
    }

    var menuData, filteredMenuByRestaurant;
    let foodItemsTable=document.getElementById("fooditems");
    let restaurantValues=Object.values(JSON.parse(window.localStorage.getItem("restaurant")));
    try{
        queryName=restaurantValues.filter(restaurantObj=>restaurantObj.id==restaurantId)[0].name;
            
        menuData = Object.values(JSON.parse(window.localStorage.getItem("menu")));
        try{
            
            filteredMenuByRestaurant=menuData.filter(menu=>menu.restaurantId==restaurantId)[0]["menu"];
            
            if(filteredMenuByRestaurant!=null){
                if(filteredFoodItemIds.length!=0){
                    filteredMenuIds = reorderMenu(filteredMenuByRestaurant, filteredFoodItemIds);
                    
                    let filteredMenuByRestaurantCp = Object.values(JSON.parse(window.localStorage.getItem("menu"))).filter(menu=>menu.restaurantId==restaurantId)[0]["menu"];
                    foodItemsTable.innerHTML='<tr><th>Food Item Image</th><th>Food Item Name</th><th>Rate</th><th>Quantity</th><th>Price</th></tr>';
                    for(let cnt =0; cnt<filteredMenuIds.length; cnt++) {
                        foodNo = filteredMenuIds[cnt];
                        var foodItem=Object.values(JSON.parse(window.localStorage.getItem("fooditem"))).filter(fooditemobj=>fooditemobj.id==foodNo);
                        var foodName = foodItem[0].title;
                        var imgurl= foodItem[0].image;
                        var price = filteredMenuByRestaurantCp[foodNo];
                        var cells = '<tr><td><img src='+imgurl+' width="50px" height="50px"></td><td class="fooditems" id='+foodNo+'>'
                            +foodName+'</td>'+
                            '<td><input type="number" id="rate'+foodNo+'" class="foodrate" value='+price+' disabled></td>'+
                            '<td><input type="number" id="qty'+foodNo+'" class="foodqty" min=0 max=10 step=1 value=0 onclick="changePrice('+foodNo+')"></td>'+
                            '<td><input type="number" id="price'+foodNo+'" class="foodprice" value=0 disabled></td></tr>'
                        foodItemsTable.innerHTML= foodItemsTable.innerHTML+cells;
    
                    }; 
                }
                else{
                    foodItemsTable.innerHTML='<tr><th>Food Item Image</th><th>Food Item Name</th><th>Rate</th><th>Quantity</th><th>Price</th></tr>';
                    Object.entries(filteredMenuByRestaurant).forEach(element => {
                        var foodItem=JSON.parse(window.localStorage.getItem("fooditem"))[element[0]]
                        var foodName = foodItem.title;
                        var imgurl= foodItem.image;
                        var cells = '<tr><td><img src='+imgurl+' width="50px" height="50px"></td><td class="fooditems" id='+foodItem.id+'>'
                            +foodName+'</td>'+
                            '<td><input type="number" id="rate'+foodItem.id+'" class="foodrate" value='+element[1]+' disabled></td>'+
                            '<td><input type="number" id="qty'+foodItem.id+'" class="foodqty" min=0 max=10 step=1 value=0 onchange="changePrice('+foodItem.id+')"></td>'+
                            '<td><input type="number" id="price'+foodItem.id+'" class="foodprice" value=0 disabled></td></tr>'
                        foodItemsTable.innerHTML= foodItemsTable.innerHTML+cells;
                    });
                }                               
                }
            }
            catch{
                document.getElementById("ordercontainer").innerHTML='<h4>No Menu Added</h4>';
            }}
            catch{
                document.getElementById("ordercontainer").innerHTML='<h4>No Menu Added</h4>';
            }
}
function reorderMenu(filteredMenuByRestaurant, filteredFoodItemIds){
    let reorderedMenuIds = [], reorderedMenuPrices = []
    
    filteredFoodItemIds.forEach(id =>{
        if (filteredMenuByRestaurant[id]!=undefined){
            reorderedMenuIds.push(id);
            reorderedMenuPrices.push(filteredMenuByRestaurant[id]);
            
            delete filteredMenuByRestaurant[id];
        }
    })   
    
    Object.entries(filteredMenuByRestaurant).forEach(menu =>{
        reorderedMenuIds.push(menu[0]);
        reorderedMenuPrices.push(menu[1]);
    })
    return reorderedMenuIds;
}


//This function should change the price as per the quantity selected for a particular food item 
//and it should also call the displayTotal() function
function changePrice(foodNo){
    //Complete Task 1
    var rate=document.getElementById("rate"+foodNo).value;
    var qty=document.getElementById("qty"+foodNo).value;
    document.getElementById("price"+foodNo).value=rate*qty;
    displayTotal();
}

//This function should compute the total value based on all the prices 
//and should also enable/disable the input elements for shipping address and contact number based on the total amount value.
function displayTotal(){
    //Complete Task 2
  
    var prices=document.getElementsByClassName("foodprice");
    let amount=0;
    for (let i = 0; i < prices.length; i++) {
        amount=amount+parseInt(prices[i].value);
    }
    document.getElementById("amount").value=amount;
    if (amount==0){
        document.getElementById("order").disabled=true;
        document.getElementById("shipaddr").disabled=true;
        document.getElementById("contact").disabled=true;
    }
    else{ 
        document.getElementById("order").disabled=false;
        document.getElementById("shipaddr").disabled=false;
        document.getElementById("contact").disabled=false;
    }
}
//Function to place an order
//Should check if the amount is greater than 0, shipping address and contact details are provided 
//And then only should place an order by displaying successful message and navigating back to index page
//Otherwise should display appropriate alert message
function placeOrder(){
    let amount = document.getElementById("amount").value;
    let address = document.getElementById("shipaddr").value;
    let contact = document.getElementById("contact").value;
    let signedInUser=Object.values(JSON.parse(window.sessionStorage.getItem("signedInUser")))[0];
    if(amount == 0 || address == "" || contact == ""){
        alert("Select fooditems & provide address and contact details to place and order!")
    }
    else{
        let foodqties=document.getElementsByClassName("foodqty");
        let orderedFoodqty=Object.entries(foodqties).filter(foodqtyobj=>foodqtyobj[1].value>0);
        let orderedfoodIds=[];
        Object.values(orderedFoodqty).forEach(orderedFoodqtyObj=>{
            orderedfoodIds.push(orderedFoodqtyObj[1].id.split("qty")[1]);
        })
        let foodOrdered =[]
        orderedfoodIds.forEach(orderedfoodId=>{
            let queryString = window.location.href;
            let queryArray = queryString.split("?")[1].split("=");            
            if (queryArray.length == 3){
                restaurantId = queryArray[1].split("&")[0];
                filterName = queryArray[1].split("&")[1];
                filterValue = queryArray[2];
            }
            else{
                restaurantId = queryArray[1];
                }
            
            foodOrdered.push([orderedfoodId,
                document.getElementById("rate"+orderedfoodId).value,
                document.getElementById("qty"+orderedfoodId).value,
                document.getElementById("price"+orderedfoodId).value])
        })
        orderId += 1;
        console.log(foodOrdered)
        orderObj={
            "id" : orderId,
            "userId" : signedInUser,
            "shippaddr" : address,
            "contact" : contact,
            "orderDate": new Date(),
            "foodordered" : foodOrdered,
            "restaurantId" : restaurantId,
            "amount" : amount
        }
        saveOrder(orderId, orderObj);
        alert("Order placed successfully");
        window.location.href="index.html";
    }   
}

function saveOrder(orderNo,orderObj){
    let order;
    if(orderCollection==null){
        order = new Map();
    }
    else{
        order = new Map(Object.entries(orderCollection));
    }
    console.log(order);
    order.set(""+orderNo, orderObj);
    let orderData = JSON.stringify(Object.fromEntries(order));
    window.localStorage.setItem("order", orderData);
}