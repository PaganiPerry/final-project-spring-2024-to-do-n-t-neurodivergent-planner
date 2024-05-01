




console.log("JavaScript is linked!");

const firebaseConfig = {
	apiKey: "AIzaSyDLx8YWsKy8Webah6CtzMes28RWdmdxs2M",
	authDomain: "planner-login-with-firebase-db.firebaseapp.com",
	projectId: "planner-login-with-firebase-db",
	storageBucket: "planner-login-with-firebase-db.appspot.com",
	messagingSenderId: "867348618218",
	appId: "1:867348618218:web:c0f16e87a2770c789c7093"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig)
 const auth = getAuth(app);
 const database = getDatabase(app);


 /*const auth = firebase.auth()
 const database = firebase.database()*/


 function register() {
	var email = document.getElementById('email').value;
	var password = document.getElementById('password').value;
	var full_name = document.getElementById('full_name').value;

	// Basic validation for email and password
	if (!validateEmail(email) || !validatePassword(password)) {
	  alert('Email or password is not valid');
	  return;
	}

	// Check if the full name field is not empty
	if (!validateField(full_name)) {
	  alert('Full name is required');
	  return;
	}

	// Create a new user with email and password
	auth.createUserWithEmailAndPassword(email, password)
	  .then(function() {
		 var user = auth.currentUser;
		 var database_ref = database.ref();

		 // User data to be stored in the database
		 var user_data = {
			email: email,
			full_name: full_name,
			last_login: Date.now()
		 };

		 // Set the user data in the database
		 database_ref.child('users/' + user.uid).set(user_data);
		 alert('User Created');
	  })
	  .catch(function(error) {
		 var error_code = error.code;
		 var error_message = error.message;
		 alert(error_message);
	  });
 }



//setting up login function
function login(){
	email = document.getElementById('email').value
	password = document.getElementById('password').value

	//validate input fields
	if (validateEmail(email) == false || validatePassword(password)==false){
		alert('Email or password is OUTTA line')
		return
		//Don't continue runnning the code (obviously other code runs but the code pertaining to the relevant operations)
	}
	auth.signInWithEmailAndPassword(email, password)
	.then(function(){
		//declare user variable
		var user = auth.currentUser
		//Adding this user to our database
		var database_ref = database.ref()
		//creating user data (its an object that essentially stores all of the users data)
		var user_data  = {

			last_login : Date.now()
		}
		database_ref.child('users/' + user.uid).update(user_data)
		alert('User logen in')

	})
	.catch(function(error) {
		var error_code = error.code;
		var error_message = error.message;
		alert(error_message);
	 });
}

//form validation fields
function validateEmail(email){
	expression = /^[^@]+@\w+(\.\w+)+\w$/
	if (expression.test(email) == true){
		//Email is good
		return true
	} else {
		//Email is NOT good
		return false
	}
}

function validatePassword(password) {
	return password.length >= 6;
 }


function validateField(field){
	if (field ==null) {
		return false
	}
	if (field.length <=0){
		return false
	} else {
		return true
	}
}
