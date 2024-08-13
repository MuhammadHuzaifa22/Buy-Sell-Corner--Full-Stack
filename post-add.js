import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { auth } from './config.js'

// ., Call Variables
const postAdBody = document.getElementById('post-ad-body');
const modalDiv = document.querySelector('.modal-div');
const crossButton = document.getElementById('cross-button');
const headPostAd = document.getElementById('head-post-ad');
const userNavAvatar = document.getElementById('user-nav-avatar');
const notificationSoundError = document.getElementById('notification-sound-error');
const userPhoto = JSON.parse(localStorage.getItem('user-image-url'));


onAuthStateChanged(auth, (user) => {
  if (user && userPhoto) {
    const uid = user.uid;
    checkUser(user)
  } else {
    my_modal_3.showModal();
    const msgSoundFunc = my_modal_3.showModal();
  if(msgSoundFunc){
    notificationSoundError.play();
  } 
    headPostAd.style.display = 'none'
    postAdBody.style.display = 'none';
    crossButton.addEventListener('click', () => {
    window.location = 'index.html'
    })

  }
});



function checkUser(user) {
  if (user) {
    const photoURL = JSON.parse(localStorage.getItem('user-image-url'));
    if (photoURL) {
      userNavAvatar.src = photoURL
    }
  }
}


