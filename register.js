import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { setDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { getDownloadURL, uploadBytes, ref } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";

import { auth, db, storage } from './config.js';

// Call Variables
const form = document.querySelector('form');
const firstName = document.getElementById('firstname');
const lastName = document.getElementById('lastname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const userPhoto = document.getElementById('user-photo');
const msgRegistered = document.getElementById('msg-registered');
const myModal = document.getElementById('my_modal_3');
const userProfileImage = document.getElementById('user-profile-image');
const registerEmailMessage = document.getElementById('register-email-message');
const crossButton = document.getElementById('cross-button');
const registerBtn = document.getElementById('register-btn');
const loadingGif = document.getElementById('loading-gif');
const loadingMsg = document.getElementById('loading-msg');
const uploadImageTag = document.getElementById('upload-image-tag');
const uploadFileName = document.getElementById('upload-file-name');

uploadImageTag.innerHTML = 'Upload Profile Photo';
loadingMsg.style.display = 'none';
loadingGif.style.display = 'none';

// .,Regex
const firstNameRegex = /^[A-Z][a-zA-Z]{3,9}$/;
const lastNameRegex = /^[A-Z][a-zA-Z]{3,9}$/;
const passwordRegex = /^[A-Z](?=.*\d)[A-Za-z\d]{5,9}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// .,Form Button Function
form.addEventListener('submit', async (event) => {
    event.preventDefault();


    if (firstName.value === '' || lastName.value === '' || email.value === '' || password.value === '' || userPhoto.files.length === 0) {
        alert('Please fill all fields and upload a photo.');
        return;
    }

    if (!firstNameRegex.test(firstName.value)) {
        alert("Your first name must:\n- Start with an uppercase letter\n- Be between 4 and 10 characters long\n- Only contain letters (no numbers or special characters)");
        return;
    }

    if (!lastNameRegex.test(lastName.value)) {
        alert("Your last name must:\n- Start with an uppercase letter\n- Be between 4 and 10 characters long\n- Only contain letters (no numbers or special characters)");
        return;
    }

    if (!emailRegex.test(email.value)) {
        alert("Invalid email format. Please make sure your email follows these rules:\n\n" +
            "1. Contains no spaces.\n" +
            "2. Contains one '@' symbol.\n" +
            "3. Has text before and after the '@'.\n" +
            "4. Contains a '.' after the '@' and some text after the '.'.");
        return;
    }

    if (!passwordRegex.test(password.value)) {
        alert("Your password must:\n- Start with an uppercase letter\n- Be between 6 and 10 characters long\n- Include at least one number");
        return;
    }
    uploadFileName.addEventListener('click',()=>{
        console.log('btn work')
        console.log(userPhoto.files[0])
        uploadImageTag.innerHTML = userPhoto.files[0].name
        
        
    })

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
        form.style.display = 'none';
        loadingMsg.style.display = 'block';
        loadingMsg.innerHTML = 'Registering...'
        loadingGif.style.display = 'block';
        const user = userCredential.user;
        const file = userPhoto.files[0];
        const storageRef = ref(storage, `userPhotos/${user.uid}/${file.name}`);
        const uploadResult = await uploadBytes(storageRef, file);
        const photoURL = await getDownloadURL(storageRef);
        console.log('Photo URL:', photoURL);
        userProfileImage.src = photoURL;
        console.log(registerBtn.textContent);

        msgRegistered.innerHTML = `${firstName.value} ${lastName.value}`;
        registerEmailMessage.innerHTML = `<span class="font-light xs:font-normal sm:font-medium md:font-semibold lg:font-bold text-teal-600">You are registered</span> with this email <b>${email.value}</b>`;
        myModal.showModal();

        form.style.display = 'block'
        loadingGif.style.display = 'none';
        loadingMsg.style.display = 'none';
        loadingMsg.innerHTML = '';

        await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            email: user.email,
            userPhoto: photoURL,
            firstName: firstName.value,
            lastName: lastName.value
        });


        firstName.value = '';
        lastName.value = '';
        email.value = '';
        password.value = '';
        userPhoto.value = '';
        crossButton.addEventListener('click', () => {
            window.location = 'login.html';
        });

    } catch (error) {
        console.error('Error registering user:', error.message);
        alert(`Error: ${error.message}`);
    }
});


async function showUrl(file) {
    const storageRef = ref(storage, email.value);
    try {
        const uploadImg = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        return url;
    } catch (error) {
        console.error('Error uploading file:', error);
    }
}
