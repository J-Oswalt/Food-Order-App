function loadOrderHistory(){
    let signedInUser=JSON.parse(window.sessionStorage.getItem("signedInUser"));
    if (signedInUser==null){
        window.location.href="signin.html";
    }
    else{

        orderTable=document.getElementById("orderstable");
        try{
            let orderCollection = JSON.parse(window.localStorage.getItem("order"));
        
        let filteredOrderCollection =Object.values(orderCollection).filter(orderObj=>orderObj.userId==signedInUser["id"]);
        
        if(filteredOrderCollection.length==0){
            document.getElementById("orderhistory").innerHTML="<h3>No orders placed</h3>";
            orderTable.innerHTML="";
        }
        else{
            Object.entries(filteredOrderCollection).forEach(orderObj =>{
                var tableRow = document.createElement("tr");
                orderTable.appendChild(tableRow);
                var orderValues = orderObj[1];
                var orderText='<td>'+orderValues["id"]+'</td>'+
                                    '<td>'+orderValues["orderDate"]+'</td>'+
                                    '<td>$'+orderValues["amount"]+'</td>'+
                                    '<td><button class="btn btn-primary" id="'+orderValues["id"]+
                                    '" onclick="viewOrderDetail('+orderValues["id"]+');">View Details</button>'
                
                tableRow.innerHTML=tableRow.innerHTML+orderText;
               });
            }
        }
    
        catch{
            document.getElementById("orderhistory").innerHTML="<h3>No orders placed</h3>";
            orderTable.innerHTML="";
        }
    }
}

function viewOrderDetail(orderNo){
    window.location.href="view_orderdetail.html?id="+orderNo;
}

function loadOrderDetail(){
    //Complete Task 1 here
    let orderNo = window.location.href.split("?")[1].split("=")[1];
    let orderValues = JSON.parse(window.localStorage.getItem("order"))[orderNo];
    console.log(orderValues);
    let userCollection = JSON.parse(window.localStorage.getItem("user"));
    let foodCollection = JSON.parse(window.localStorage.getItem("fooditem"));
    let restaurantCollection = JSON.parse(window.local.getItem("restaurant"));
    let orderTable = document.getElementById("orderdetailtable");
    orderText = '<tr><td><b>Order No :</b></td><td>'+orderValues["id"]+'</td></tr>'+
        '<tr><td><b>Date Of Order :</b></td><td>'+orderValues["orderDate"]+'</td></tr>'+
        '<tr><td><b>Customer Name :</b></td><td>'+userCollection[orderValues["userId"]]["fullname"]+'</td></tr>'+
        '<tr><td><b>Shipping Address :</b></td><td>'+orderValues["shippaddr"]+'</td></tr>'+
        '<tr><td><b>Contact :</b></td><td>'+orderValues["contact"]+'</td></tr>'+
        '<tr><td><b>Ordered From Restaurant :</b></td><td>'+restaurantCollection[orderValues.restaurantId]["name"]+'</td></tr>'+
        '<tr><td><b>Food Items Ordered :</b></td></tr>'+
        '<tr><td><b>Food Item</b></td><td><b>Rate</b></td><td><b>Qty</b></td><td><b>Amount</b></td></tr>'
        foodText="";
    orderValues["foodordered"].forEach(orderObj=>{
    console.log(restaurantCollection, orderValues.restaurantId)
    foodText += '<tr><td>'+foodCollection[orderObj[1]]["title"]+'</td><td>$'+orderObj[1]+'</td><td>'+orderObj[2]+'</td><td>$'+orderObj[3]+'</td></tr>'
    })
    orderText += foodText+'<tr><td><b>Total Amount:</b></td><td>$'+orderValues["amount"]+'</td></tr>';
    orderTable.innerHTML = orderTable.innerHTML+orderText;
}