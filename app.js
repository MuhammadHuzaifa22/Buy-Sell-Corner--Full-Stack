import { signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { collection, addDoc, setDoc, doc,getDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { auth, db } from './config.js';


// ., Call Variables
const form = document.querySelector('form');
const email = document.getElementById('email');
const password = document.getElementById('password');
const toast = document.querySelector('.toast-msg');
const sound = document.getElementById('notification-sound');
const alertSound = document.getElementById('notification-sound2');
const userPhoto = JSON.parse(localStorage.getItem('user-image-url'));
toast.style.display = 'none';
let EmaiLVal;

// ., Form Button Function
form.addEventListener('submit',(event) => {
    event.preventDefault();
    console.log(email.value);
    console.log(password.value);
    if ((email.value === '' || email.value === null) && (password.value === '' || password.value === null)) {
        toast.style.display = 'block'
        toast.innerHTML = `<div class="toast toast-top toast-center mt-[70px]">
<div class="bg-red-500 text-white  p-4 rounded-lg">
<span class="text-white text-sm xs:text-md sm:text-lg md:text-xl lg:text-2xl">Please fill <b>Input</b> field</span>
</div>
   </div>`
   alertSound.play()
   setTimeout(() => {
    toast.style.display = 'none';
}, 1000)
        return
    } else if ((email.value !== '' || email.value !== null) && (password.value === '' || password.value === null)) {
        toast.style.display = 'block'
        toast.innerHTML = `<div class="toast toast-top toast-center mt-[70px]">
<div class="bg-red-500 text-white  p-4 rounded-lg">
<span class="text-white text-sm xs:text-md sm:text-lg md:text-xl lg:text-2xl">Please fill <b>Password</b> field</span>
</div>
   </div>`
   alertSound.play()
   setTimeout(() => {
    toast.style.display = 'none';
}, 1000)
        return
    } else if ((email.value === '' || email.value === null) && (password.value !== '' || password.value !== null)) {
        toast.style.display = 'block'
        toast.innerHTML = `<div class="toast toast-top toast-center mt-[70px]">
<div class="bg-red-500 text-white  p-4 rounded-lg">
<span class="text-white text-sm xs:text-md sm:text-lg md:text-xl lg:text-2xl">Please fill <b> Email</b> field</span>
</div>
   </div>`
   alertSound.play()
   setTimeout(() => {
    toast.style.display = 'none';
}, 1000)
        return
    } else if (email.value === '' || email.value === null) {
        toast.style.display = 'block'
        toast.innerHTML = `<div class="toast toast-top toast-center mt-[70px]">
<div class="bg-red-500 text-white  p-4 rounded-lg">
<span class="text-white text-sm xs:text-md sm:text-lg md:text-xl lg:text-2xl">Please fill <b>Email</b> field</span>
</div>
   </div>`
   alertSound.play()
   setTimeout(() => {
    toast.style.display = 'none';
}, 1000)
        return
    } else if (password.value === '' || password.value === null) {
        toast.style.display = 'block'
        toast.innerHTML = `<div class="toast toast-top toast-center mt-[70px]">
<div class="bg-red-500 text-white  p-4 rounded-lg">
<span class="text-white text-sm xs:text-md sm:text-lg md:text-xl lg:text-2xl">Please fill <b>Password</b> field</span>
</div>
   </div>`
   alertSound.play()
   setTimeout(() => {
    toast.style.display = 'none';
}, 1000)
        return
    }
if(userPhoto){
 // ., Sign In With Email And Password
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log("🚀 ~ .then ~ user:", user);
    toast.style.display = 'block'
    toast.innerHTML = `<div class="toast toast-top toast-center mt-[70px]">
  <div class="alert alert-success">
  <span class="text-white text-sm xs:text-md sm:text-lg md:text-xl lg:text-2xl">Log in Successfull</span>
  </div>
  </div>`
       sound.play()
       setTimeout(() => {
                toast.style.display = 'none';
                window.location = 'index.html'
            }, 900);
        form.reset();
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.style.display = 'block'
            toast.innerHTML = `<div class="toast toast-top toast-center mt-[70px]">
            <div class="bg-red-500 text-white p-4 rounded-lg">
            <span class="text-white text-sm xs:text-md sm:text-lg md:text-xl lg:text-2xl">${errorMessage}</span>
            </div>
            </div>`
            alertSound.play()
            setTimeout(() => {
                toast.style.display = 'none';
            }, 2000);
        });
    }else{
        toast.style.display = 'block'
        toast.innerHTML = `<div class="toast toast-top toast-center mt-[70px]">
            <div class="bg-red-500 text-white p-4 rounded-lg">
            <span class="text-white text-sm xs:text-md sm:text-lg md:text-xl lg:text-2xl">Your profile <b>image</b> is not set.
            <br> Please <b>register</b> again and upload your prfile Photo</span>
            </div>
            </div>`
            alertSound.play()
            setTimeout(() => {
                toast.style.display = 'none';
            }, 3000);
            
            const newEmail = email.value;
            console.log(newEmail);
            const returnedEmail = getNewEmail(newEmail);
    }
    })


function getNewEmail(newEmail){
    console.log(newEmail);
    return newEmail;
}
        

//  User Email Check
function userEmailCheck(userEmail){
    const REmail = getNewEmail()
    console.log("🚀 ~ userEmailCheck ~ REmail:", REmail)
    if(userEmail === REmail){
     console.log(`Your Email is regsitered`);
     return 'Your Email is regsitered';
    }else{
        console.log('You eamil is not registered');
    }
}


onAuthStateChanged(auth,async (user) => {
    if (user) {
        const uid = user.uid;
        console.log(user.email);
        getData(user.uid)
        userEmailCheck(user.email) 
    }else{                
        console.log('You are not registered yet');
    }
    
});


// ., Get User
let dataArr = [];
async function getData(uid) {
    if (!uid) {
        console.error('No UID available'); // Check if uid is undefined
        return;
    }
    try {
        const userDocRef = doc(db, 'users', uid); // Ensure uid is defined before using it
        console.log("🚀 ~ getData ~ userDocRef:", userDocRef);
        const userDocSnap = await getDoc(userDocRef);        
    } catch (error) {
        console.error("Error getting document:", error);
    }
}