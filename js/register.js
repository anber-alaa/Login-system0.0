/* 
Goals :-
1- Register new user in localstorage
2- Check ---> Don't repeat the email
3- After registration go to login form
*/

// ? Global variables
var registerForm = document.getElementById("registerForm");
var formTitle = document.getElementById("formTitle");
var username = document.getElementById("username");
var userEmail = document.getElementById("userEmail");
var userPassword = document.getElementById("userPassword");
var registerBtn = document.getElementById("registerBtn");
var registerMsg = document.getElementById("registerMsg");

// /*================================================================= */

var users = []; // array to store users;
//? Retrive users from localstorage
//check if there is users in local storage
localStorage.getItem("users")
  ? (users = JSON.parse(localStorage.getItem("users")))
  : (users = []); 


// check if user is already logged in
var loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))
if(loggedInUser){
  window.location.href = "home.html"; 
}


//? Register
function register() {
  var registerError = document.getElementById('registerError');

//validate all fields 
var isUsernameValid= validateRegister(username , 'usernameError')
var isEmailValid= validateRegister(userEmail , 'emailError')
var isPasswordValid= validateRegister(userPassword , 'passwordError')

  if (isUsernameValid && isEmailValid && isPasswordValid) {
// check if email is already exists
    if(users.find(user => user.email === userEmail.value.trim()) ){
        registerError.innerText="this user is already registered"
        registerError.classList.remove('d-none')
    }else{

        var user = {
            username: username.value.trim(),
            email: userEmail.value.trim(),
            password: userPassword.value.trim(),
          };
          users.push(user);
          localStorage.setItem("users", JSON.stringify(users));
          clearInputs();
          document.getElementById("registerError").classList.add("d-none");
          
          Toastify({
            text: "Created an account successfully!",
            duration: 3000,
            gravity: "top", 
            position: "right",
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
          }).showToast();
          setTimeout(function(){
            location.replace('login.html')
          },3000)
    }

  } else {
    registerError.innerText = 'Incorrect email or password'
    document.getElementById("registerError").classList.remove("d-none");

  }
}



//! validation for Register
function validateRegister(element, errorId) {
  var text = element.value.trim();
  var regex = {
    username: /^[a-zA-Z0-9]{3,}$/, // 3 characters
    userEmail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,  //valid email .com
    userPassword: /^.{8,}$/, // +8 characters
  }
  var errorElement = document.getElementById(errorId)
  if (regex[element.id].test(text)) {
    errorElement.classList.add("d-none");
    return true;
  } else {
    errorElement.classList.remove("d-none");
    return false;
  }
}


//? clear
function clearInputs() {
  username.value ="";
  userEmail.value = "";
  userPassword.value = "";
}

function closeForm() {
  registerForm.classList.add("d-none");
}

