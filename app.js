import { signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { collection, addDoc, setDoc, doc,getDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getDownloadURL, uploadBytes, ref ,getStorage} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";
import { auth, db } from './config.js';


// ., Call Variables
const form = document.querySelector('form');
const email = document.getElementById('email');
const password = document.getElementById('password');
const toast = document.querySelector('.toast-msg');
const sound = document.getElementById('notification-sound');
const alertSound = document.getElementById('notification-sound2');
const userPhoto = JSON.parse(localStorage.getItem('user-image-url'));
const uploadFileName = document.getElementById('upload-file-name');
const uploadText = document.getElementById('upload-text');
const userPic = document.getElementById('user-photo');
const storage = getStorage();
const loginBtn = document.getElementById('log-in');

// ., Display none of some elements.
uploadFileName.style.display = 'none';
uploadText.style.display = 'none';
toast.style.display = 'none';

// ., Form Button Function
form.addEventListener('submit',(event) => {
    event.preventDefault();
    console.log(email.value);
    console.log(password.value);
    if ((email.value === '' || email.value === null) && (password.value === '' || password.value === null)) {
        toast.style.display = 'block'
        toast.innerHTML = `<div class="toast toast-top toast-center mt-[70px]">
<div class="bg-gradient-to-r from-[#f87171] via-[#ef4444] to-[#dc2626] p-[10px] rounded-lg text-white">
<span class="text-white text-sm xs:text-md sm:text-lg md:text-xl lg:text-2xl">Please fill <b>Input</b> field</span>
</div>
   </div>`
   alertSound.play()
   setTimeout(() => {
    toast.style.display = 'none';
}, 3000)
        return
    } else if ((email.value !== '' || email.value !== null) && (password.value === '' || password.value === null)) {
        toast.style.display = 'block'
        toast.innerHTML = `<div class="toast toast-top toast-center mt-[70px]">
<div class="bg-gradient-to-r from-[#f87171] via-[#ef4444] to-[#dc2626] p-[10px] rounded-lg text-white">
<span class="text-white text-sm xs:text-md sm:text-lg md:text-xl lg:text-2xl">Please fill <b>Password</b> field</span>
</div>
   </div>`
   alertSound.play()
   setTimeout(() => {
    toast.style.display = 'none';
}, 3000)
        return
    } else if ((email.value === '' || email.value === null) && (password.value !== '' || password.value !== null)) {
        toast.style.display = 'block'
        toast.innerHTML = `<div class="toast toast-top toast-center mt-[70px]">
<div class="bg-gradient-to-r from-[#f87171] via-[#ef4444] to-[#dc2626] p-[10px] rounded-lg text-white">
<span class="text-white text-sm xs:text-md sm:text-lg md:text-xl lg:text-2xl">Please fill <b> Email</b> field</span>
</div>
   </div>`
   alertSound.play()
   setTimeout(() => {
    toast.style.display = 'none';
}, 3000)
        return
    } else if (email.value === '' || email.value === null) {
        toast.style.display = 'block'
        toast.innerHTML = `<div class="toast toast-top toast-center mt-[70px]">
<div class="bg-gradient-to-r from-[#f87171] via-[#ef4444] to-[#dc2626] p-[10px] rounded-lg text-white">
<span class="text-white text-sm xs:text-md sm:text-lg md:text-xl lg:text-2xl">Please fill <b>Email</b> field</span>
</div>
   </div>`
   alertSound.play()
   setTimeout(() => {
    toast.style.display = 'none';
}, 3000)
        return
    } else if (password.value === '' || password.value === null) {
        toast.style.display = 'block'
        toast.innerHTML = `<div class="toast toast-top toast-center mt-[70px]">
<div class="bg-gradient-to-r from-[#f87171] via-[#ef4444] to-[#dc2626] p-[10px] rounded-lg text-white">
<span class="text-white text-sm xs:text-md sm:text-lg md:text-xl lg:text-2xl">Please fill <b>Password</b> field</span>
</div>
   </div>`
   alertSound.play()
   setTimeout(() => {
    toast.style.display = 'none';
}, 3000)
        return
    }

 // ., Sign In With Email And Password
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
        if(userPhoto){
            const user = userCredential.user;
            console.log("🚀 ~ .then ~ user:", user);
            loginBtn.classList.add('loading', 'loading-spinner', 'text-error');
            toast.style.display = 'block'
            toast.innerHTML = `<div class="toast toast-top toast-center mt-[70px]">
            <div class="bg-gradient-to-r from-[#14b8a6] via-[#059669] to-[#047857] p-[10px] rounded-lg">
            <span class="text-white text-sm xs:text-md sm:text-lg md:text-xl lg:text-2xl">Log in Successfull</span>
            </div>
            </div>`
            sound.play()
            setTimeout(() => {
                toast.style.display = 'none';
                window.location = 'index.html'
            }, 1000);
        localStorage.setItem('user-email',JSON.stringify(email.value));
        form.reset();
    }else{
        uploadFileName.style.display = 'block';
        uploadText.style.display = 'block';
        if(userPic.files[0]){
            getURL(userPic.files[0]);
            return
        };
        console.log(userPic.files[0])
        toast.style.display = 'block';
        toast.innerHTML = `<div class="toast toast-top toast-center mt-[70px]">
        <div class="bg-gradient-to-r from-[#f87171] via-[#ef4444] to-[#dc2626] p-[10px] rounded-lg text-white">
        <span class="text-white text-sm xs:text-md sm:text-lg md:text-xl lg:text-2xl">Your <b>profile photo</b> is not set.<br>
        Please <b>upload profile picture</b> to <b>continue</b>.</span>
        </div>
        </div>`
        alertSound.play();
        if(!localStorage.setItem('user-email',JSON.stringify(email.value))){
            localStorage.setItem('user-email',JSON.stringify(email.value));
        }
        setTimeout(() => {
            toast.style.display = 'none';
        }, 3000); 
    }
    })

        .catch((error) => {
            const errorMessage = error.message;
            toast.style.display = 'block'
            toast.innerHTML = `<div class="toast toast-top toast-center mt-[70px]">
            <div class="bg-gradient-to-r from-[#f87171] via-[#ef4444] to-[#dc2626] p-[10px] rounded-lg text-white">
            <span class="text-white text-sm xs:text-md sm:text-lg md:text-xl lg:text-2xl">${errorMessage}</span>
            </div>
            </div>`
            alertSound.play()
            setTimeout(() => {
                toast.style.display = 'none';
            }, 3000);
        });
   
    })

    
// ., On auth state change
onAuthStateChanged(auth,async (user) => {
    if (user) {
        const uid = user.uid;
        console.log(user.email);
    }else{                
        console.log('You are not registered yet');
    }
    
});



// Get Url Function
async function getURL(file){
    const storageRef = ref(storage, `userPhotos/${file.name}`);
    await uploadBytes(storageRef, file);
    const photoURL = await getDownloadURL(storageRef);
    console.log("🚀 ~ getURL ~ photoURL:", photoURL);
    localStorage.setItem('user-image-url',JSON.stringify(photoURL));
    toast.style.display = 'block'
    toast.innerHTML = `<div class="toast toast-top toast-center mt-[70px]">
    <div class="bg-gradient-to-r from-[#14b8a6] via-[#059669] to-[#047857] p-[10px] rounded-lg text-white">
    <span class="text-white text-sm xs:text-md sm:text-lg md:text-xl lg:text-2xl">Log in Successfull</span>
    </div>
    </div>`
    sound.play();

setTimeout(() => {
    toast.style.display = 'none';
    window.location = 'index.html'
}, 1000);
}