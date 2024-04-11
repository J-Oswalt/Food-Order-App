var cuisineCollection = JSON.parse(window.localStorage.getItem("cuisine"));
var cuisineId = 0;
for(var cuisine in cuisineCollection){
    cuisineId++;
}
console.log(cuisineId);

// Submission of Add Cuisine Page Form
function addCuisine() {
    cuisineId += 1;
    console.log(cuisineId);
    var cname = document.getElementById("cuisine").value;
    var desc = document.getElementById("desc").value;
    var isActive = (document.getElementById("isActive").checked == true)? "Yes" : "No";
    var cimg = document.getElementById("cuisineimg").value;
    saveCuisine(cuisineId,cname, desc, isActive, cimg);
    alert("Cuisine Added Successfully!");
    gotoAdminPage();
  }

  //Save cuisine data on add/edit
function saveCuisine(cuisineNo,cname, desc, isActive, cimg){
    var cuisine;
    if(cuisineCollection==null){
        cuisine = {};
    }
    else{
        cuisine = cuisineCollection;
    }
    cuisine[cuisineNo] = {
        "id" : cuisineNo,
        "name" : cname,
        "description" : desc,
        "isActive" : isActive,
        "image" : cimg
    }
    var cuisineData = JSON.stringify(cuisine);
    window.localStorage.setItem("cuisine", cuisineData);
}
//View All Categories Page
function listCuisines(){
    let cuisineTable = document.getElementById("cuisineTable");
    if(cuisineCollection !=null){
        for(var cuisineId in cuisineCollection){
            var cuisineObj = cuisineCollection[cuisineId];
            var cuisineValues = cuisineObj[1];
            cuisineTable.innerHTML +="<tr><td>"+cuisineObj['id']+"</td>"+
                            "<td>"+cuisineObj['name']+"</td>"+
                            "<td>"+cuisineObj['description']+"</td>"+
                            "<td>"+cuisineObj['isActive']+"</td>"+
                            '<td><img src="'+cuisineObj['image']+'" width = "100px"'+'></td>'+
                            '<td><button id="'+cuisineObj['id']+'" class="btn btn-primary">Edit</button></td></tr>';           
        }
    }
}
//Navigate to Admin Page
function gotoAdminPage(){
    window.location.href="admin_page.html";
}