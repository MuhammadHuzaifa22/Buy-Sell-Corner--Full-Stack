import { getDocs, collection } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { onAuthStateChanged,signOut  } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { auth, db } from './config.js';


// ., Call Variables
const avatarDiv = document.getElementById('avatar-div');
const signInButtondiv = document.getElementById('sign-in-button-div');
const userNavAvatar = document.getElementById('user-nav-avatar');
const logOut = document.getElementById('log-out');
const sound = document.getElementById('notification-sound');
const alertSound = document.getElementById('notification-sound2');
const toast = document.querySelector('.toast-msg');

// ., Declare Empty Arrays
let arr = [];
avatarDiv.style.display = 'none';


onAuthStateChanged(auth,async (user) => {
    if (user) {
        const uid = user.uid;
        console.log(user);
        userNavAvatar.src ="./Assets/Images/98bccd_0048dde95e7c467fa61477f72de95fdf~mv2.gif" 
        checkUser(user)   
        }else{
            console.log('You are not registered yet');
        }

});


function checkUser(user){
  userNavAvatar.src ="./Assets/Images/98bccd_0048dde95e7c467fa61477f72de95fdf~mv2.gif" 
    if(user){
      signInButtondiv.style.display = 'none';
      avatarDiv.style.display = 'block';
      const photoURL = JSON.parse(localStorage.getItem('user-image-url'));
      if(photoURL){
        userNavAvatar.src = photoURL;
      }
    }
}


// ., Sign Out Function
logOut.addEventListener('click',()=>{
  signOut(auth).then(() => {
      localStorage.removeItem('user-image-url');
      toast.style.display = 'block'
      toast.innerHTML = `<div class="toast toast-top toast-center mt-[70px]">
<div class="alert alert-success">
<span class="text-white text-sm xs:text-md sm:text-lg md:text-xl lg:text-2xl">Log out Successfull</span>
</div>
 </div>`
      signInButtondiv.style.display = 'block';
      signInButtondiv.style.display = 'flex';
      avatarDiv.style.display = 'none';
 sound.play();
 setTimeout(() => {
  toast.style.display = 'none';
}, 2000);

}).catch((error) => {
  toast.style.display = 'block'
  toast.innerHTML = `<div class="toast toast-top toast-center mt-[70px]">
<div class="bg-red-500 text-white p-4 rounded-lg">
  <span class="text-white text-sm xs:text-md sm:text-lg md:text-xl lg:text-2xl">${error}</span>
 </div>
     </div>`
     alertSound.play();
     setTimeout(() => {
         toast.style.display = 'none';
     }, 2000);
});

});