function loadContent(){
    loadRestaurants();
    loadFoodItems();
}
function loadRestaurants(){
    var parentElement = document.getElementById("restaurant");
    parentElement.innerHTML="";
    for(var restaurantId in restaurantCollection){
        var restaurantObj = restaurantCollection[restaurantId];
        var restaurantName = restaurantObj["name"];
        var restaurantNo = restaurantObj["id"];
        parentElement.innerHTML +='<option id="'+restaurantNo+'" value="'+restaurantNo+'">'+restaurantName+'</option>';
    };
}
function loadFoodItems(){
    var parentElement = document.getElementById("fooditems");
    var restaurantNo =document.getElementById("restaurant").value;
    console.log(restaurantNo);
    
    var fooditemCollection = JSON.parse(window.localStorage.getItem("fooditem"));
    
    if(fooditemCollection !=null){
        parentElement.innerHTML="";
        for(foodNo in fooditemCollection){
            var foodObj=fooditemCollection[foodNo];
            var fooditemName=foodObj["title"];
            var fooditemNo=foodObj["id"];
            var fooditemImage=foodObj["image"];
            var foodTableRow = '<tr><td><input type="checkbox" onchange="enablePrice(this,'+fooditemNo+')" name='+fooditemName+ 'id='+fooditemNo+'></td>' +
            '<td><img src='+fooditemImage+' style="width:50px;padding:10px"></td>'+
            '<td><label for='+fooditemNo+'>'+fooditemName+'</label></td>'+
            '<td><input type="number" class="foodprice" name="price'+fooditemNo+'" id="price'+fooditemNo+'" disabled></td></tr>'
            parentElement.innerHTML= parentElement.innerHTML+foodTableRow;        
        };
        parentElement.innerHTML= parentElement.innerHTML+"</table>"
    }
}
function enablePrice(ele,fooditemNo){
    document.getElementById('price'+fooditemNo).disabled=!ele.checked;
}
//Navigate to Admin Page
function gotoAdminPage(){
    window.location.href="admin_page.html";
}