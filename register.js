import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { setDoc, doc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { getDownloadURL, uploadBytes, ref } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-storage.js";

import { auth, db, storage } from './config.js';

// Declare Variables
const userAddress = document.getElementById('address');
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
const sound = document.getElementById('notification-sound');
const alertSound = document.getElementById('notification-sound2')
const userAddressRegex = /^[\w\s,-]{8,25}$/;


// .,Regex
const firstNameRegex = /^[A-Z][a-zA-Z]{3,9}$/;
const lastNameRegex = /^[A-Z][a-zA-Z]{3,9}$/;
const passwordRegex = /^[A-Z](?=.*\d)[A-Za-z\d]{5,9}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const toast = document.querySelector('.toast-msg');

// ., Elemet Display Section
loadingGif.style.display = 'none';
loadingMsg.style.display = 'none';
toast.style.display = 'none';
uploadImageTag.innerHTML = 'Upload Profile Photo';

// ., Input User Photo Function
userPhoto.addEventListener('change', () => {
    try {
        const userPic = userPhoto.files[0];
        console.log(userPic);
        uploadImageTag.innerHTML = `${userPhoto.files[0].name}`
    } catch (er) {
        console.log(er);
    }
});


// .,Form Button Function
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Validate form inputs
    if (userAddress.value === '' || userAddress.value === null || firstName.value === '' || lastName.value === '' || email.value === '' || password.value === '' || userPhoto.files.length === 0) {
        toast.style.display = 'block';
        toast.innerHTML = `<div class="toast toast-top toast-center mt-[20px]">
        <div class="bg-gradient-to-r from-[#f87171] via-[#ef4444] to-[#dc2626] p-[10px] rounded-lg text-white">
        <span class="text-white text-sm xs:text-md sm:text-lg md:text-xl lg:text-2xl">
        Please fill <b>all</b> fields and <b>upload a photo</b>.
              </span>
              </div>
              </div>`
        alertSound.play()
        setTimeout(() => {
            toast.style.display = 'none'
        }, 3000)
        return;
    }

    if (!userAddressRegex.test(userAddress.value)) {
        toast.style.display = 'block';
        toast.innerHTML = `<div class="toast toast-top toast-center mt-[20px]">
          <div class="bg-gradient-to-r from-[#f87171] via-[#ef4444] to-[#dc2626] p-[10px] rounded-lg text-white">
           <span class="text-white text-sm xs:text-md sm:text-lg md:text-xl lg:text-2xl">
            Your address should meet the following rules:<br>
            1. Minimum length: <b>8 characters</b><br>
            2. Maximum length: <b>25 characters</b><br>
            3. Can include <b>letters, numbers, spaces, commas, and hyphens</b>
        </span>
    </div>
</div>`;
        alertSound.play()
        firstName.addEventListener('click', () => {
            if (toast.style.display === 'block') {
                toast.style.display = 'none';
            }
        })
        setTimeout(() => {
            toast.style.display = 'none'
        }, 3000)
        return;
    }

    if (!firstNameRegex.test(firstName.value)) {
        toast.style.display = 'block'
        toast.innerHTML = `<div class="toast toast-top toast-center mt-[20px]">
        <div class="bg-gradient-to-r from-[#f87171] via-[#ef4444] to-[#dc2626] p-[10px] rounded-lg text-white">
        <span class="text-white text-sm xs:text-md sm:text-lg md:text-xl lg:text-2xl">Your first name must: <br>
              Start with an <b>uppercase</b> letter<br>
              Be between <b>4 and 10 characters</b> long<br>
              Only contain <b>letters</b> (no numbers or special characters)<br>
              Not contain <b>sapces</b>
              </span>
              </div>
              </div>`
        alertSound.play()
        firstName.addEventListener('click', () => {
            if (toast.style.display === 'block') {
                toast.style.display = 'none';
            }
        })
        setTimeout(() => {
            toast.style.display = 'none'
        }, 3000)

        return;
    }

    if (!lastNameRegex.test(lastName.value)) {
        toast.style.display = 'block'
        toast.innerHTML = `<div class="toast toast-top toast-center mt-[20px]">
        <div class="bg-gradient-to-r from-[#f87171] via-[#ef4444] to-[#dc2626] p-[10px] rounded-lg text-white">
        <span class="text-white text-sm xs:text-md sm:text-lg md:text-xl lg:text-2xl">Your last name must: <br>
              Start with an <b>uppercase</b> letter<br>
              Be between <b>4 and 10 characters</b> long<br>
              Only contain <b>letters</b> (no numbers or special characters)<br>
              Not contain <b>sapces</b>
              </span>
              </div>
              </div>`
        alertSound.play()
        lastName.addEventListener('click', () => {
            if (toast.style.display === 'block') {
                toast.style.display = 'none';
            }
        })
        setTimeout(() => {
            toast.style.display = 'none';
        }, 3000)
        return;

    }

    if (!emailRegex.test(email.value)) {
        toast.style.display = 'block'
        toast.innerHTML = `<div class="toast toast-top toast-center mt-[20px]">
            <div class="bg-gradient-to-r from-[#f87171] via-[#ef4444] to-[#dc2626] p-[10px] rounded-lg text-white">
            <span class="text-white text-sm xs:text-md sm:text-lg md:text-xl lg:text-2xl">Invalid email format. Please make sure your email follows these rules: <br>
            "1. Contains <b>no spaces</b>."<br>
            "2. Contains one <b>'@' symbol</b>."<br>
            "3. Has text before and after the <b>'@'</b>."<br>
            "4. Contains a <b>'.'</b> after the <b>'@'</b> and some text after the <b>.</b>."
            </span>
            </div>
            </div>`
        alertSound.play()
        email.addEventListener('click', () => {
            if (toast.style.display === 'block') {
                toast.style.display = 'none';
            }
        })
        setTimeout(() => {
            toast.style.display = 'none'
        }, 3000)
        return;
    }

    if (!passwordRegex.test(password.value)) {
        toast.style.display = 'block';
        toast.innerHTML = `<div class="toast toast-top toast-center mt-[20px]">
        <div class="bg-gradient-to-r from-[#f87171] via-[#ef4444] to-[#dc2626] p-[10px] rounded-lg text-white">
        <span class="text-white text-sm xs:text-md sm:text-lg md:text-xl lg:text-2xl">
            Your password must:<br>
            1. Start with an <b>uppercase letter</b>.<br>
            2. Be between <b>6 and 10 characters long</b>.<br>
            3. Include at least <b>one number</b>.
            </span>
            </div>
            </div>`;
        alertSound.play()
        password.addEventListener('click', () => {
            if (toast.style.display === 'block') {
                toast.style.display = 'none';
            }
        })
        setTimeout(() => {
            toast.style.display = 'none';
        }, 3000)
        return;
    }

    uploadFileName.addEventListener('click', () => {
        console.log('btn work');
        console.log(userPhoto.files[0]);
        uploadImageTag.innerHTML = userPhoto.files[0].name;
    });

    registerBtn.classList.add('loading', 'loading-bars', 'loading-md');
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
        const user = userCredential.user;
        form.style.display = 'none';
        loadingMsg.style.display = 'block';
        loadingMsg.innerHTML = 'Registering...';
        loadingGif.style.display = 'block';
        const file = userPhoto.files[0];
        const storageRef = ref(storage, `userPhotos/${user.uid}/${file.name}`);
        await uploadBytes(storageRef, file);
        const photoURL = await getDownloadURL(storageRef);
        userProfileImage.src = photoURL;
        localStorage.setItem('user-image-url', JSON.stringify(photoURL));
        msgRegistered.innerHTML = `${firstName.value} ${lastName.value}`; registerEmailMessage.innerHTML = `<span class="font-light xs:font-normal sm:font-medium md:font-semibold lg:font-bold">You are registered</span> with this email <b>${email.value}</b>`;
        myModal.showModal();
        const myModalFunc = myModal.showModal();
        if(myModalFunc){
            sound.play();
        }
        const soundPlayFunc = sound.play();
        if(soundPlayFunc){
            form.style.display = 'block'
            loadingGif.style.display = 'none';
            loadingMsg.style.display = 'none';
            loadingMsg.innerHTML = '';
            registerBtn.classList.remove('loading', 'loading-bars', 'loading-md');
        }
        const currentAddress = JSON.stringify(userAddress.value);
        const userOldAddress = JSON.parse(localStorage.getItem('user-address'));

        if(userOldAddress === '' || userOldAddress === null){
          localStorage.setItem('user-address',JSON.stringify(userAddress.value));
        }else{
            localStorage.setItem('user-address-new',JSON.stringify(userAddress.value));
        }

      

     
        localStorage.setItem('user-prof-email',JSON.stringify(email.value));
        localStorage.setItem('user-prof-name',JSON.stringify(firstName.value));
        localStorage.setItem('user-prof-lastname',JSON.stringify(lastName.value));
        await setDoc(doc(db, 'users', user.uid), {
            userAddress: userAddress.value,
            uid: user.uid,
            email: user.email,
            userPhoto: photoURL,
            firstName: firstName.value,
            lastName: lastName.value,
        });
        userAddress.value = '';
        firstName.value = '';
        lastName.value = '';
        email.value = '';
        password.value = '';
        crossButton.addEventListener('click', () => {
            window.location = 'login.html';
        });

    } catch (error) {
        registerBtn.classList.remove('loading', 'loading-bars', 'loading-md');
        console.error('Error registering user:', error.message);
        toast.style.display = 'block'
        toast.innerHTML = `<div class="toast toast-top toast-center mt-[70px]">
<div class="bg-gradient-to-r from-[#f87171] via-[#ef4444] to-[#dc2626] p-[10px] rounded-lg text-white">
<span class="text-white text-sm xs:text-md sm:text-lg md:text-xl lg:text-2xl">${error.message}</span>
</div>
   </div>`
        alertSound.play()
        setTimeout(() => {
            toast.style.display = 'none';
        }, 3000);
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