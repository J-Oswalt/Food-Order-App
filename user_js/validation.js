function validateEmail(){
    let email = document.getElementById("email");
    var validRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (email.value.match(validRegex)) {
        document.getElementById("emailValidity").innerHTML = "Valid email address!";
        email.className ="form-control valid";
    } else {
        document.getElementById("emailValidity").innerHTML = "Invalid email address!";
        email.className ="form-control invalid";
    }
}
function validatePwd(){
    let pwd = document.getElementById("pwd");
    let repeatPwd = document.getElementById("pwd-repeat");
    let pwdValidityPara = document.getElementById("pwdValidity");
    if(repeatPwd.value == pwd.value){
        pwdValidityPara.innerHTML = "OK";
        repeatPwd.className ="form-control valid";
    }
    else{
        pwdValidityPara.innerHTML = "Incorrect Password";
        repeatPwd.className ="form-control invalid";
    }
}
function checkPasswordStrength() {
	var number = /([0-9])/;
	var alphabets = /([a-zA-Z])/;
	var special_characters = /([~,!,@,#,$,%,^,&,*,-,_,+,=,?,>,<])/;
	var password = $('#pwd').val().trim();
	if (password.length < 6) {
		$('#pwd-strength-status').removeClass();
		$('#pwd-strength-status').addClass('weak-password');
		$('#pwd-strength-status').html("Weak (should be atleast 6 characters.)");
        $('#pwd-strength-status').css("color", "red");
        $('#pwd-strength-status').css('font-weight','bold');
	} else {
		if (password.match(number) && password.match(alphabets) && password.match(special_characters)) {
			$('#pwd-strength-status').removeClass();
			$('#pwd-strength-status').addClass('strong-password');
			$('#pwd-strength-status').html("Strong");
            $('#pwd-strength-status').css("color", "green");
            $('#pwd-strength-status').css('font-weight','bold');
		}
		else {
			$('#pwd-strength-status').removeClass();
			$('#pwd-strength-status').addClass('medium-password');
			$('#pwd-strength-status').html("Medium (should include alphabets, numbers and special characters.)");
            $('#pwd-strength-status').css("color", "orange");
            $('#pwd-strength-status').css('font-weight','bold');
		}
	}
}