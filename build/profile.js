
// Import functions.
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { auth, db } from './config.js'



// Declare Varaibles 
const userNavAvatar = document.getElementById('user-nav-avatar');
const userPhoto = JSON.parse(localStorage.getItem('user-image-url'));
const photoURL = JSON.parse(localStorage.getItem('user-image-url'));
const sound = document.getElementById('notification-sound');
const sound2 = document.getElementById('notification-sound2');
const contentSection = document.getElementById('content');
const imageUser = document.getElementById('image-user');
const profName = document.getElementById('prof-name');
const profEmail = document.getElementById('prof-email');
const crossButton = document.getElementById('cross-btn')
const localStorageData = JSON.parse(localStorage.getItem('user-prof-email'));
const localStorageDataName = JSON.parse(localStorage.getItem('user-prof-name'));

//  Display none for some elements.
contentSection.style.display = 'none';

// ., On Auth State Change Function (For Check User Exsistance);
onAuthStateChanged(auth, (user) => {
    if (user && userPhoto) {
      console.log("🚀 ~ onAuthStateChanged ~ user:", user)
      const uid = user.uid;
      checkUser(user);
      imageUser.src = photoURL;
      renderDetails(user)
      contentSection.style.display = 'block';
    } else {
      my_modal_3.showModal();
      const msgSoundFunc = my_modal_3.showModal();
      if(msgSoundFunc){
        
        sound2.play()
      }
      contentSection.style.display = 'none';
     crossButton.addEventListener('click', () => {
        window.location = 'index.html'
      })
  
    }
  });

  // ., Check User Function (For Avatar Photo)
function checkUser(user) {
    if (user) {
      if (photoURL) {
        userNavAvatar.src = photoURL;
      }
    }
  }

function  renderDetails(user){
    console.log(localStorageData)
    profName.innerHTML = `${localStorageDataName}`
    profEmail.innerHTML =  ` <i class="fa-solid fa-envelope"></i> Email: ${localStorageData}`
       
}