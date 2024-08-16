import { collection,getDocs, doc,addDoc,Timestamp, query, where, orderBy, } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
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
const modalDiv = document.querySelector('.modal-div');
const div = document.getElementById('div');
const preloader = document.getElementById('preloader');
const registerAfterBtn = document.getElementById('register-after-btn');


modalDiv.style.display = 'none';
registerAfterBtn.style.display = 'none';
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


userNavAvatar.src ="./Assets/Images/98bccd_0048dde95e7c467fa61477f72de95fdf~mv2.gif" 
function checkUser(user){
    
        avatarDiv.style.display = 'block';
      signInButtondiv.style.display = 'none';
      const photoURL = JSON.parse(localStorage.getItem('user-image-url'));
      if(photoURL){
        userNavAvatar.src = photoURL;
      }
    
}


// ., Sign Out Function
logOut.addEventListener('click',()=>{
  const user = auth.currentUser;
  logOut.classList.add('loading', 'loading-infinity', 'loading-md');
if (user) {
    user.delete().then(() => { 
        console.log("User deleted from Firebase");
        signOut(auth).then(() => {
            localStorage.removeItem('user-image-url');
            toast.style.display = 'block';
            toast.innerHTML = `
                <div class="toast toast-top toast-center mt-[70px]">
                    <div class="bg-gradient-to-r from-[#14b8a6] via-[#059669] to-[#047857] p-[10px] rounded-lg">
                        <span class="text-white text-sm xs:text-md sm:text-lg md:text-xl lg:text-2xl">Log out Successful and User Deleted</span>
                    </div>
                </div>`;
            signInButtondiv.style.display = 'block';
            signInButtondiv.style.display = 'flex';
            avatarDiv.style.display = 'none';
            sound.play();
            localStorage.clear();
            setTimeout(() => {
                toast.style.display = 'none';
            }, 2000);
        }).catch((error) => {
            console.error("Error signing out:", error);
        });
    }).catch((error) => {
        logOut.classList.remove('loading','loading-bars', 'loading-md');
        console.error("Error deleting user:", error);
        toast.style.display = 'block'
        toast.innerHTML = `<div class="toast toast-top toast-center mt-[70px]">
        <div class="bg-gradient-to-r from-[#f87171] via-[#ef4444] to-[#dc2626] p-[10px] rounded-lg text-white">
        <span class="text-white text-sm xs:text-md sm:text-lg md:text-xl lg:text-2xl">Please Please re-authenticate before deleting your account.</span>
        </div>
        </div>`
         logOut.style.display = 'none';
         registerAfterBtn.style.display = 'block';
        alertSound.play()
        setTimeout(() => {
          sound.play();
          toast.style.display = 'none';
          modalDiv.style.display = 'block';
          my_modal_3.showModal();
        }, 3000);
        setTimeout(() => {
          modalDiv.style.display = 'block';
          my_modal_3.close();
          modalDiv.style.display = 'none';
        }, 6000);
    });
} else {
    console.log("No user is signed in");
}


});


// ., Get data from firestore
async function getData() {
arr = [];
const q = query(collection(db, "posts"), orderBy("time", "desc"));
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  console.log(doc.id, " => ", doc.data());
  arr.push({id:doc.id,data:doc.data()})
});
console.log(arr);
renderPosts();
}
  
getData();


function renderPosts() {
  const div = document.getElementById('item-card'); // Assuming this is your container's ID
  div.innerHTML = '';

  // Apply flexbox, gap, and wrap classes to the container
  div.className = 'flex flex-wrap gap-[50px] justify-center';

  if (arr.length === 0) {
    preloader.style.display = 'none';
    div.innerHTML = `<h1 class="text-md sm:text-lg md:text-xl lg:text-2xl font-medium">No Post yet</h1>`;
    return;
  }

   arr.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'card bg-base-100 w-full xs:w-full sm:w-[350px] md:w-[350px] lg:w-[350px] shadow-xl mt-[-10px]';
    card.innerHTML = `
      <figure>
        <img
          src="${item.data.postImage}"
          alt="Product Image"
          class="h-[250px] md:h-[250px] lg:h-[250px] w-full xs:w-[300px] sm:w-full md:w-full lg:w-full lg:shadow-[0px_0px_2px_gray] transition-transform duration-300 hover:scale-105"/>
          <div class="absolute  right-0 transform rotate-45 mt-[-140px] origin-bottom-right" id="ribbon-${index}">
          <span class="bg-green-700 text-white text-xs font-semibold px-3 py-1">AZAADI SALE</span>
      </div>
      </figure>
      <div class="p-4 bg-gray-100 rounded-lg">
      <div class="mt-4">
          <h2 id="product-title" class="text-lg font-semibold text-sm sm:text-md md:text-lg lg:text-xl transition-colors duration-300 hover:text-green-500">${item.data.producTitle}</h2>
          <p id="product-description" class="text-gray-500 text-xs sm:text-sm md:text-md lg:text-lg">${item.data.productDescription}</p>
          <div id="product-price" class="text-xs sm:text-sm md:text-md lg:text-lg flex items-center gap-[10px] mt-2">
  <span class="font-normal text-[10px] xs:text-[10px] sm:text-xs md:text-sm lg:text-md">RS</span>
  <span class="text-xl font-bold text-blue-600">${item.data.productPrice}</span>
  <span class="font-normal text-[10px] xs:text-[10px] sm:text-xs md:text-sm lg:text-md">PKR</span>
  <h1 class="text-red-500 text-xl font-bold line-through" id="officialPrice-${index}">${item.data.officialPrice}</h1>
  <span class="text-white-600 text-sm sm:text-md md:text-lg lg:text-xl text-white font-semibold bg-green-500 rounded-md p-[3px]" id="officialPriceDetail-${index}">30% off</span>
</div>

          <button class="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center transition duration-300 ease-in-out" id="buy-now-button-${index}">
              <!-- Buy Icon -->
              <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l1.5 7m8.5-7l-1.5 7M10 21h4"></path>
              </svg>
              Buy Now
          </button>
      </div>
      <div class="mt-4 border-t pt-4 flex items-center">
          <img id="seller-photo" src="${item.data.photoURL}" alt="Seller" class="w-10 h-10 rounded-full border-2 border-green-500 shadow-md h-[35px] w-[35px] sm:h-[40px] sm:w-[40px] md:h-[45px] md:w-[45px] lg:h-[50px] lg:w-[50px]">
          <div class="ml-3">
              <p id="seller-name" class="text-gray-700 font-semibold text-xs sm:text-sm md:text-md lg:text-lg">
              <i class="fa-solid fa-user text-green-600"></i> Seller: ${item.data.sellerName}
              </p>
              <p id="seller-contact" class="text-gray-500 text-sm text-xs sm:text-sm md:text-md lg:text-lg">
              <i class="fa-solid fa-phone text-green-600"></i> ${item.data.sellerNumber}
              </p>
          </div>
      </div>
  </div>
  
  </div>
`;




// Old Price
const oldPrice =  card.querySelector(`#officialPrice-${index}`)
const officialPriceDetail = card.querySelector(`#officialPriceDetail-${index}`);
if(item.data.officialPrice){
  console.log(item.data.officialPrice);
  oldPrice.style.display = 'block';
  officialPriceDetail.style.display = 'block';
}else{
  oldPrice.style.display = 'none';
  officialPriceDetail.style.display = 'none';
}


let dataToSave;
div.appendChild(card);
card.addEventListener("click",()=>{
  if(oldPrice.style.display === 'block'){
      dataToSave = {
      postImage: item.data.postImage,
      title: item.data.producTitle,
      description: item.data.productDescription,
      price: item.data.productPrice,
      sellerPhoto: item.data.photoURL,
      sellerName: item.data.sellerName,
      sellerNumber: item.data.sellerNumber,
      officialPrice:item.data.officialPrice,
    };
  }else{
    dataToSave = {
      postImage: item.data.postImage,
      title: item.data.producTitle,
      description: item.data.productDescription,
      price: item.data.productPrice,
      sellerPhoto: item.data.photoURL,
      sellerName: item.data.sellerName,
      sellerNumber: item.data.sellerNumber
    };
  }
    localStorage.setItem('selectedCard', JSON.stringify(dataToSave));
  console.log('Selected card saved to local storage:', dataToSave);
  window.location = 'single-product.html';
})



const buyBtn = card.querySelector(`#buy-now-button-${index}`);
buyBtn.addEventListener('click', () => {
  if(oldPrice.style.display === 'block'){
    dataToSave = {
    postImage: item.data.postImage,
    title: item.data.producTitle,
    description: item.data.productDescription,
    price: item.data.productPrice,
    sellerPhoto: item.data.photoURL,
    sellerName: item.data.sellerName,
    sellerNumber: item.data.sellerNumber,
    officialPrice:item.data.officialPrice,
  };
}else{
  dataToSave = {
    postImage: item.data.postImage,
    title: item.data.producTitle,
    description: item.data.productDescription,
    price: item.data.productPrice,
    sellerPhoto: item.data.photoURL,
    sellerName: item.data.sellerName,
    sellerNumber: item.data.sellerNumber
  };
}

  // Save the selected card's data to local storage
  localStorage.setItem('selectedCard', JSON.stringify(dataToSave));
  console.log('Selected card saved to local storage:', dataToSave);
  window.location = 'single-product.html';
});


const sale = card.querySelector(`#ribbon-${index}`)
if(item.data.sale){
  sale.style.display = 'block'
}else{
  sale.style.display = 'none'
}


});


preloader.style.display = 'none';
}
