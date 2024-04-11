var categoryCollection = JSON.parse(window.localStorage.getItem("category"));

var categoryId = 0;
for(var category in categoryCollection){
    categoryId++;
}

// Submission of Add Category Page Form
function addCategory() {
    categoryId += 1;
    console.log(categoryId);
    var cname = document.getElementById("category").value;
    var desc = document.getElementById("description").value;
    var isActive = (document.getElementById("isActive").checked == true)? "Yes" : "No";
    var cimg = document.getElementById("categoryimg").value;
    saveCategory(categoryId,cname, desc, isActive, cimg);
    alert("Category Added Successfully!");
    gotoAdminPage();     
  }
//Save category data on add/edit
function saveCategory(categoryNo,cname, desc, isActive, cimg){
    var category;
    if(categoryCollection==null){
        category = {};
    }
    else{
        category = categoryCollection;
    }
    category[categoryNo] = {
        "id" : categoryNo,
        "name" : cname,
        "description" : desc,
        "isActive" : isActive,
        "image" : cimg
    }
    
    var categoryData = JSON.stringify(category);
    window.localStorage.setItem("category", categoryData);
}
function listCategories(){
    var categoryTable = document.getElementById("categoryTable");
    if(categoryCollection !=null){
        for(var categoryId in categoryCollection){
            var categoryObj = categoryCollection[categoryId];
            categoryTable.innerHTML +="<tr><td>"+categoryObj['id']+"</td>"+
                            "<td>"+categoryObj['name']+"</td>"+
                            "<td>"+categoryObj['description']+"</td>"+
                            "<td>"+categoryObj['isActive']+"</td>"+
                            '<td><img src="'+categoryObj['image']+'" width = "100px"'+'></td>'+
                            '<td><button id="'+categoryObj['id']+'" class="btn btn-primary">Edit</button></td></tr>';
        };
    }
}
//Navigate to Admin Page
function gotoAdminPage(){
    window.location.href="admin_page.html";
}