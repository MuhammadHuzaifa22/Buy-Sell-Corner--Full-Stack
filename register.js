import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { auth } from './config.js';

// ., Call Variables
const form = document.querySelector('form');
const firstName = document.getElementById('firstname');
const lastName = document.getElementById('lastname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const userPhoto = document.getElementById('user-photo');

// .,Use  Regix
const firstNameRegex = /^[A-Z][a-zA-Z]{3,9}$/;
const passwordRegex = /^[A-Z](?=.*\d)[A-Za-z\d]{5,9}$/;
// ., Form Button Function
form.addEventListener('submit', (event) => {
    event.preventDefault();
    if(firstName.value === '' )
    if (firstNameRegex.test(firstName.value)) {

        if (passwordRegex.test(password.value)) {

            console.log()
            console.log(firstName.value);
            console.log(lastName.value)
            console.log(email.value);
            console.log(password.value);
            console.log(userPhoto.files[0])

            createUserWithEmailAndPassword(auth, email.value, password.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log(user);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(errorMessage);
                });
        } else {
            alert("Your password must:\n- Start with an uppercase letter\n- Be between 6 and 10 characters long\n- Include at least one number");

        }

    } else {
        alert("Your first name must:\n- Start with an uppercase letter\n- Be between 4 and 10 characters long\n- Only contain letters (no numbers or special characters)");

    }


})