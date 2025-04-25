/* 
Goals:-
1- check if user is already logged in 
2- show/hide password
3- Redirect to home page
*/

// ? Global variables
var loginForm = document.getElementById("loginForm");
var formTitle = document.getElementById("formTitle");
var userEmail = document.getElementById("userEmail");
var userPassword = document.getElementById("userPassword");
var loginBtn = document.getElementById("loginBtn");
var loginMsg = document.getElementById("loginMsg");

/*================================================================= */

var users = []; // array to store users;

// ?Retrive users from localstorage
// check if there is data in localstorage
localStorage.getItem("users")
? (users = JSON.parse(localStorage.getItem("users")))
: (users = []);



// check if user is already logged in
var loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))

if(loggedInUser){
    window.location.replace( "home.html"); 
}

// login function
function login() {
    var loginError = document.getElementById('loginError');

    //validate inputs
    var isEmailValid = validateLogin(userEmail , 'emailError')
    var isPasswordValid = validateLogin(userPassword , 'passwordError')

    if (isEmailValid && isPasswordValid){
        var userExist = users.find(user => user.email === userEmail.value.trim());
        if (!userExist) {
        //1- search for user email
            loginError.innerText = "This User doesn't exist. Please register first";
            loginError.classList.remove("d-none");
            return
        }
      // check password
    if(userExist.password !== userPassword.value.trim()){
        loginError.innerText = "Password is wrong";
        loginError.classList.remove("d-none");
        return
    }
    //4- store user in localstorage and redirect
    localStorage.setItem('loggedInUser', JSON.stringify(userExist));
    
    //5- Redirect to home page
    location.replace("home.html");
    }else{
        loginError.innerText ="Incorrect email or password!"
        loginError.classList.remove('d-none')
    }
    
}

//! validation for login
function validateLogin(element, errorId) {
    var text = element.value.trim();
    var regex = {
        userEmail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // valid email .com
        userPassword: /^.{8,}$/, // 8+ characters
    };
    var errorElement = document.getElementById(errorId)
    
    if (regex[element.id].test(text)) {
        errorElement.classList.add("d-none");
        return true;
    } else {
        errorElement.classList.remove("d-none");
        return false;
    }
}

//? show /hide password
document.querySelector('.box .eye-toggle').addEventListener('click',function(){
    var passwordInput = document.getElementById('userPassword');
    var eyeIcon = this.querySelector('.bi-eye-fill')
    var eyeSlashIcon = document.querySelector('.bi-eye-slash')

    //check passwordInput 
    if(passwordInput.type === 'password'){
        passwordInput.type ='text';
        eyeIcon.classList.add('d-none')
        eyeSlashIcon.classList.remove('d-none')
    }else{
        passwordInput.type ='password';
        eyeIcon.classList.remove('d-none')
        eyeSlashIcon.classList.add('d-none')
    }
})



//? clear
function clearInputs() {
    userEmail.value = "";
    userPassword.value = "";
}
//? close form
function closeForm() {
    loginForm.classList.add("d-none");
}