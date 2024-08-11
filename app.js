import { signInWithEmailAndPassword ,GoogleAuthProvider,signInWithPopup} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { collection, addDoc, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { auth, db } from './config.js';

// ., Call Variables
const form = document.querySelector('form');
const email = document.getElementById('email');
const password = document.getElementById('password');
const toast = document.querySelector('.toast-msg');
const googleBtn = document.getElementById('google-btn');
const provider = new GoogleAuthProvider();
toast.style.display = 'none';

// ., Form Button Function
form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(email.value);
    console.log(password.value);
    if ((email.value === '' || email.value === null) && (password.value === '' || password.value === null)) {
        alert(`Please fill input fields`);
        return
    } else if ((email.value !== '' || email.value !== null) && (password.value === '' || password.value === null)) {
        alert(`Please fill -Password- field`);
        return
    } else if ((email.value === '' || email.value === null) && (password.value !== '' || password.value !== null)) {
        alert(`Please fill -Email- field`);
        return
    } else if (email.value === '' || email.value === null) {
        alert(`Please fill -Email- field`);
        return
    } else if (password.value === '' || password.value === null) {
        alert(`Please fill -Password- field`);
        return
    }
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
            setTimeout(() => {
                toast.style.display = 'none';
                window.location = 'index.html'
            }, 900);
 form.reset();
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
})


// ., Google Button Function
googleBtn.addEventListener('click',()=>{
    signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(user);
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      alert(errorMessage);
    });

})