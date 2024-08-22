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
const sellerProImage = document.getElementById('seller-profile-image');

let userRegisteredEmail = '';
let dataArr= [];


// On auth state change(for user registeration check)
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid;
    console.log(user);
    userRegisteredEmail = user.email
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


// Check User Function
function checkUser(user) {
  if(user){
    const photoURL = JSON.parse(localStorage.getItem('user-image-url'));
    if (photoURL) {
      userNavAvatar.src = photoURL;
    }
  }
}



async function getData(){

console.log(userRegisteredEmail)
const usersCollection = collection(db, "users");
  const emailQuery = query(usersCollection, where("email", "==", userRegisteredEmail));  
  try {
    const querySnapshot = await getDocs(emailQuery);
    querySnapshot.forEach((doc) => {
      dataArr.push({ id: doc.id, ...doc.data() });
    });
    console.log(dataArr);
}catch(error){
  console.log(error);
}

}

getData();

// Render profile data
// async function renderProfData() {
  
// }

// renderProfData();


