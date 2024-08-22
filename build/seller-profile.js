import { collection, getDocs, doc, addDoc, Timestamp, query, where, orderBy, } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { auth, db } from './config.js';


// Declare Variables
const userNavAvatar = document.getElementById('user-nav-avatar');
const notificationSoundError = document.getElementById('notification-sound-error');
const profileDetail = document.getElementById('profile-detail');
const crossButton = document.getElementById('cross-button');
const sellerProfAddress = document.getElementById('seller-prof-address');
const sellerProfName = document.getElementById('seller-prof-name');
const sellerPhoto = JSON.parse(localStorage.getItem('selectedCard-new')).sellerPhoto;
const sellerName = JSON.parse(localStorage.getItem('selectedCard-new')).sellerName;
const sellerProImage = document.getElementById('seller-profile-image');


// On auth state change(for user registeration check)
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid;
    console.log(user);
    userNavAvatar.src = "./Assets/Images/98bccd_0048dde95e7c467fa61477f72de95fdf~mv2.gif"
    checkUser(user);
  } else {
    profileDetail.style.display = 'none';
    console.log('You are not registered yet');
    my_modal_3.showModal();
    const msgSoundFunc = my_modal_3.showModal();
    if (msgSoundFunc) {
      notificationSoundError.play();
    }
    crossButton.addEventListener('click', () => {
      window.location = 'index.html';
    })
  }

});


function checkUser(user) {
  const photoURL = JSON.parse(localStorage.getItem('user-image-url'));
  if (photoURL) {
    userNavAvatar.src = photoURL;
  }
}

async function renderProfData() {
  if(sellerPhoto){
    sellerProImage.src = `${sellerPhoto}`;
  }
  sellerProfName.innerHTML = `${sellerName}`;
}

renderProfData();