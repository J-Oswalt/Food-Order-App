let userCollection = JSON.parse(window.localStorage.getItem("user"));
let userId = (userCollection == null) ? 0 : Object.entries(userCollection).length;

let userCredentialCollection = JSON.parse(window.localStorage.getItem("usercredential"));


function register(){
    let email = document.getElementById("email");
    let repeatPwd = document.getElementById("pwd-repeat");
    if(email.className == "form-control invalid" || repeatPwd.className == "form-control invalid"){
        window.history.back();
        document.getElementById("formMsg").innerHTML="<b>Please fill all form values correctly</b>";
        document.getElementById("formMsg").style.color = "red";
        email.className == "form-control invalid" ? email.focus() : repeatPwd.focus();
        return false;
    }
    else{
        userId += 1;
        var uname = document.getElementById("username").value;
        var fullname = document.getElementById("name").value;
        var emaild = document.getElementById("email").value;
        var addr = document.getElementById("addr").value;
        var contact = document.getElementById("contact").value;

        var pwd = document.getElementById("pwd").value;
        saveUser(userId, uname, fullname, emaild, addr, contact, pwd);
        alert("Thank you for registering with us!");
        document.forms["registerForm"].submit();
        let signedInUser = new Map();
        signedInUser.set("id", userId);
            
        let userData = JSON.stringify(Object.fromEntries(signedInUser));
            window.sessionStorage.setItem("signedInUser", userData);
            window.location.href="../user_view/index.html";
        
        return true;
    }
}

//Save user data on add/edit
function saveUser(userNo, uname, fullname, emaild, addr, contact, pwd){
    let user, userCredential;
    if(userCollection==null){
        user = new Map();
        userCredential = new Map();
    }
    else{
        user = new Map(Object.entries(userCollection));
        userCredential = new Map(Object.entries(userCredentialCollection));
    }
    user.set(""+userNo, {
        "id" : userNo,
        "fullname" : fullname,
        "email" : emaild,
        "address" : addr,
        "contact" : contact  
    });
    userCredential.set(""+userNo,{
        "username" : uname,
        "pwd" : pwd,
    });
    
    let userData = JSON.stringify(Object.fromEntries(user));
    window.localStorage.setItem("user", userData);
    let userCredentialData = JSON.stringify(Object.fromEntries(userCredential));
    window.localStorage.setItem("usercredential", userCredentialData);
}

function signin(){
    let username = document.forms["SignInForm"].username.value;
    let pwd = document.forms["SignInForm"].pwd.value;
    let userInfo = searchUser(username);
    console.log(userInfo);
    if(userInfo==null){
        document.getElementById("signinValidity").innerHTML = "<b>Kindly register</b>";
            document.getElementById("signinValidity").style.color = "red";
    }
    else{
    if(userInfo.length != 0){
        let userNo = userInfo[0][0];
        console.log(userInfo[0][1].pwd);
        if(pwd == userInfo[0][1].pwd){
            let signedInUser = new Map();
            signedInUser.set("id", userNo);
            
            let userData = JSON.stringify(Object.fromEntries(signedInUser));
            window.sessionStorage.setItem("signedInUser", userData);
            window.location.href="../user_view/index.html";

        }
        else
        {
            document.getElementById("signinValidity").innerHTML = "<b>Invalid password</b>";
            document.getElementById("signinValidity").style.color = "red";
            document.getElementById("pwd").focus();
        }
    }
    else{
        document.getElementById("signinValidity").innerHTML = "<b>Invalid username or password</b>";
        document.getElementById("signinValidity").style.color = "red";
        document.getElementById("username").focus();
    }
}
}
//Find users details by username
function searchUser(username){
    try{
        let userCredentialData = JSON.parse(window.localStorage.getItem("usercredential"));
    let userCredentialValues = Object.entries(userCredentialData);
    return userCredentialValues.filter(userCredentialValue => userCredentialValue[1].username == username);
    }
    catch{
        return null
    }
}

