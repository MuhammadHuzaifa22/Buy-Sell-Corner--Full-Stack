// ., Call Variables

const form = document.querySelector('form');
const email = document.getElementById('email');
const password = document.getElementById('password');


form.addEventListener('submit',(event)=>{
    event.preventDefault();
    console.log(email.value);
    console.log(password.value);

})
