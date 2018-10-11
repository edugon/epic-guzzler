function initialize() {
	addListeners();
}

function addListeners() {
	var loginButton = document.getElementById("login-button");
	var signInLink = document.getElementById("sing-in-link");
	var signButton = document.getElementById("sign-button");
	var faqButton = document.getElementById("faq-button");
	var loginForm = document.getElementById("login-form");

	loginButton.addEventListener("click", function() {
		var userValue = document.getElementById("user-input").value;
		var passwordValue = document.getElementById("password-input").value;
		confirmLogin(userValue.toLowerCase(), passwordValue);
	});
	signInLink.addEventListener("click", function(e) {
		document.getElementById("sign-in-form").style.visibility = "visible";
		loginForm.style.display = "none";
		e.preventDefault();
	});
	signButton.addEventListener("click", function() {
		var userValue = document.getElementById("user-sign-input").value;
		var passwordValue = document.getElementById("password-sign-input").value;
		var confPasswordValue = document.getElementById("conf-password-sign-input").value;
		confirmSignIn(userValue, passwordValue, confPasswordValue);
	});
	faqButton.addEventListener("click", function() {
		if(faqButton.innerHTML == "Hide") {
			document.getElementById("faq-div").innerHTML = "";
			faqButton.innerHTML = "FAQ";
		} else
			initFaqInfo();
	});
}

function confirmLogin(userInput, passwordInput) {
	if(userInput == "" || passwordInput == "")
		alert("There are empty fields");
	else {
		var dataBack = JSON.parse(localStorage.getItem("users"));
		if(dataBack != null) {
			if(dataBack.length == undefined) { // First Loop
				if(dataBack.user.name == userInput) {
					initGame(userInput, 7);
				} else
					alert("User doesn't exist");
			} else {
				var found = false;
				var userName;
				for(var i = 0; i < dataBack.length; i++) 
					if(dataBack[i].user.name == userInput) {
						userName = dataBack[i];
						found = true;
					}
				if(found) {
					if(userName.user.password != passwordInput)
						alert("Wrong password");
					else {
						initGame(userInput, 7);
					}
				} else
					alert("User doesn't exist");
			}
		} else
			alert("User doesn't exist");
	}
}

function confirmSignIn(user, password, confirmPassword) {
	if(user == "" || password == "" || confirmPassword == "")
		alert("There are empty fields");
	else {
		if(user.length < 4)
			alert("User name must have 4 characters at least");
		else if(password.length < 6)
			alert("Password must have 6 characters at least");
		else if(confirmPassword != password)
			alert("The passwords don't match");
		else {
			signInData(user, password);
		}
	}
}

function signInData(userInput, passwordInput) {
	if(typeof(Storage) !== "undefined") {
		var userData = {'user': {'name': userInput.toLowerCase(), 'password': passwordInput, 'score': 0}};
		var userList = [];
		if(localStorage.getItem("users") != undefined) {
			var found = false;
			var dataBack = JSON.parse(localStorage.getItem("users"));
			if(dataBack.length == undefined) // First Loop
				if(dataBack.user.name == userData.user.name)
					found = true;
				else
					userList.push(dataBack);
			else {
				for(var i = 0; i < dataBack.length; i++) 
					if(dataBack[i].user.name == userData.user.name)
						found = true;
			}
			if(!found) {
				for(var i = 0; i < dataBack.length; i++) 
					userList.push(dataBack[i]);
				userList.push(userData);
				localStorage.setItem("users", JSON.stringify(userList));
				location.href = "index.html";
			} else {
				alert("The user already exists");
			}
		} else {
			localStorage.setItem("users", JSON.stringify(userData));
			location.href = "index.html";
		}
	} else {
	    alert("Sorry! No Web Storage support...")
	}
}

function updateData(user, score) {
	var userList = [];
	var dataBack = JSON.parse(localStorage.getItem("users"));
	if(dataBack.length == undefined) { // First Loop
		if(dataBack.user.name == user) {
			dataBack.user.score = score;
			localStorage.setItem("users", JSON.stringify(dataBack));
		}
	} else {
		for(var i = 0; i < dataBack.length; i++)  {
			if(dataBack[i].user.name == user) 
				if(dataBack[i].user.score < score)
					dataBack[i].user.score = score;
			userList.push(dataBack[i]);
		}
		localStorage.setItem("users", JSON.stringify(userList));
	}
}