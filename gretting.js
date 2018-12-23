const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

    const USER_LS = "currentUser",  
    SHOWING_ON = "showing";

    function saveName(text) {
        localStorage.setItem(USER_LS, text);
    }
    

    function handleSubmit(event) {
        event.preventDefault();
        const currentValue = input.value;
        paintGreeting(currentValue);
        saveName(currentValue);
    }

    function askforName() {
     form.classList.add(SHOWING_ON); 
     form.addEventListener("submit", handleSubmit);   
    }


function paintGreeting(text) {

    greeting.innerText = `Hello ${text}`;
    greeting.classList.add(SHOWING_ON);
    form.classList.remove(SHOWING_ON);
    
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null) {
        askforName();
    } else {
        paintGreeting(currentUser);
    }
}   

function init() {
loadName();

}

init();