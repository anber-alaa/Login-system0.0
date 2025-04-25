/* 
Goals :- 
1- when user logged in successfuly greeting the user || redirect to login page
*/
var loader = document.querySelector('#loader')
const section = document.getElementById('home');

// ================================================
// check if user logged in
let loggedInUser;
try{
loggedInUser =  JSON.parse(localStorage.getItem('loggedInUser'))

}catch(e){
    console.error('Error parsing loggedInUser:', e);
    location.replace('login.html');
}

if(!loggedInUser){
    location.replace('login.html')
}else{
    // Ensure loader is visible initially
    loader.classList.remove('d-none')
    //createElement for greeting the user
    function createGreetingContainer(user){
        const container = document.createElement('div')
    container.classList.add(
        'd-flex',
        'flex-column',
        'justify-content-center',
        'align-items-center',
        'text-center',
        'bg-white',
        'bg-opacity-75',
        'shadow-lg',
        'rounded-3',
    )
    
    container.style.width="75%"
    container.style.minWidth="50%"
    //create greeting text <h2>
    const h2= document.createElement('h2')
    h2.classList.add(
        'mb-4',
        'fs-1',
    )
    h2.style.color='#27548A',
    h2.style.fontFamily="Oregano, cursive";
    h2.innerText=`Welcome  ${loggedInUser.username} !`;

    //create message text <p>
    const p = document.createElement('p')
    p.classList.add(
        'mb-4',
        'fs-4',
    )
    p.style.color ="#4A4A48"
    p.style.fontFamily="Delius Swash Caps, cursive";
    p.innerText=`i'm so glad you're here😊.
    Let's make something amazing together 💕`;

    //create image element
    const img = document.createElement('img')
    img.src=`./images/greeting.jpg`
    img.classList.add(
        'img-fluid',
        'mb-4',
        'mt-4',
        'rounded-3'
    )
    img.style.maxWidth="300px"

    // Append img , h2 and p in container
    container.appendChild(img)
    container.appendChild(h2);
    container.appendChild(p);

    // add container to section 
    const section = document.getElementById('home')
    section.append(container)
    return container;
    }
    
}

// Timing sequence
setTimeout(() => {
    // After 2 seconds, hide loader and show container
    loader.classList.add('d-none');
    const container = createGreetingContainer(loggedInUser);
    section.append(container);

    setTimeout(() => {
        // After 5 seconds, hide container and show loader
        container.remove();
    }, 4000); // Container visible for 5 seconds
}, 2000); // Loader visible for 2 seconds initially


//? logout
function logout(){
    localStorage.removeItem("loggedInUser"); // remove user data 
    window.location.href = "index.html"; // redirect to login page
}

// ============================================
