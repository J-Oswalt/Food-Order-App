var restaurantCollection = JSON.parse(
  window.localStorage.getItem("restaurant")
);
var foodItemsCollection = JSON.parse(window.localStorage.getItem("fooditem"));
var menuCollection = JSON.parse(window.localStorage.getItem("menu"));
var menuId = 0;
for (var menu in menuCollection) {
  menuId++;
}

// Submission of Add Restaurant Page Form
function addMenu() {
  menuId += 1;
  var rno = document.getElementById("restaurant").value;
  var foodInMenu = {};
  var allprices = document.getElementsByClassName("foodprice");
  for (itemprice of allprices) {
    if (itemprice.disabled == false) {
      var foodId = parseInt(itemprice.id.split("price")[1]);
      foodInMenu[foodId] = itemprice.value;
      console.log(foodInMenu);
    }
  }
  saveMenu(menuId, rno, foodInMenu);
  alert("Menu added successfully!");
  gotoAdminPage();
}

//Save menu items data on add/edit
function saveMenu(menuId, rno, foodInMenu) {
  var menu, updatedMenuId, updatedMenu;

  updatedMenu = foodInMenu;
  if (menuCollection == null) {
    menu = {};
    updatedMenuId = 1;
  } else {
    menu = menuCollection;
    updatedMenuId = menuId;
    for (var menuNo in menuCollection) {
      if (menuCollection[menuNo]["restaurantId"] === rno) {
        updatedMenuId = menuNo;
        updatedMenu = menuCollection[menuNo]["menu"];
        for (const foodItemId in foodInMenu) {
          updatedMenu[foodItemId] = foodInMenu[foodItemId];
        }
        break;
      }
    }
  }
  menu[updatedMenuId] = {
    "id": updatedMenuId,
    "restaurantId": rno,
    "menu": updatedMenu,
  };

  var menuData = JSON.stringify(menu);
  window.localStorage.setItem("menu", menuData);
}

function loadRestaurants() {
  var parentElement = document.getElementById("restaurant");
  parentElement.innerHTML = "";
  for (var restaurantId in restaurantCollection) {
    var restaurantObj = restaurantCollection[restaurantId];
    var restaurantName = restaurantObj["name"];
    var restaurantNo = restaurantObj["id"];
    parentElement.innerHTML +=
      '<option id = "' +
      restaurantNo +
      '" value ="' +
      restaurantNo +
      '">' +
      restaurantName +
      "</option>";
  }
}

//View All Menu Page
function listMenu() {
  var restaurantNo = document.getElementById("restaurant").value;
  var foodItemsTable = document.getElementById("fooditems");
  for (menuId in menuCollection) {
    var menuObj = menuCollection[menuId];
    foodItemsTable.innerHTML = '<p style="color:red;">No Menu Added</p>';
    if (menuObj["restaurantId"] === restaurantNo) {
      foodItemsTable.innerHTML =
        "<tr><th>Food Item Image</th><th>Food Item Name</th><th>Price</th></tr>";
      var foodmenu = menuObj["menu"];
      for (fooditemId in foodmenu) {
        var foodItem = foodItemsCollection[fooditemId];
        var foodName = foodItem.title;
        var imgurl = foodItem.image;
        var cells =
          "<tr><td><img src=" +
          imgurl +
          ' width="150px" height="150px"></td><td>' +
          foodName +
          "</td><td>" +
          foodmenu[fooditemId] +
          "</td></tr>";
        foodItemsTable.innerHTML += cells;
      }
      break;
    }
  }
}
//Navigate to Admin Page
function gotoAdminPage() {
  window.location.href = "admin_page.html";
}
