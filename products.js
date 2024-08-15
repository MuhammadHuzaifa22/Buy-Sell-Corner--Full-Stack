import { collection,getDocs, doc,Timestamp, query, where, orderBy, } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
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
    const q = query(collection(db, "posts"), orderBy("time", "asc"));
  const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  console.log(doc.id, " => ", doc.data());
  arr.push({id:doc.id,data:doc.data()})
});
console.log(arr);
renderPosts();
}
  
getData();


function renderPosts(){
    console.log(arr)
    div.innerHTML = '';
    if(arr == []){
      preloader.style.display = 'none';
      div.innerHTML = `<h1 class="text-md sm:text-lg md:text-xl lg:text-2xl font-medium">No Post yet</h1>`
    }

arr.reverse().map((item,index)=>{
  div.innerHTML += `<div id="product-card" class="card bg-base-100 w-full xs:w-full sm:w-[350px] md:w-[350px] lg:w-[350px] shadow-xl">
  <figure>
  <img
  src="${item.data.postImage}"
    alt="Shoes"
    class="h-[250px] md:h-[250px] lg:h-[250px]  w-full xs:w-[300px] sm:w-full md:w-full lg:w-full lg:shadow-[0px_0px_2px_gray] transition-transform duration-300 hover:scale-105"/>
    </figure>
    <div id="card-body" class="card-body">
    <h2 id="product-title" class="card-title font-semibold text-sm sm:text-md md:text-lg lg:text-xl transition-colors duration-300 hover:text-green-500">${item.data.producTitle}</h2>
  <p id="product-description" class="text-xs sm:text-sm md:text-md lg:text-lg">${item.data.productDescription}</p>
  <div id="card-actions" class="card-actions flex justify-between items-center mt-[8px]">
  <h1 id="product-price" class="text-xs sm:text-sm md:text-md lg:text-lg font-bold">
  <span class="font-normal text-[10px] xs:text-[10px] sm:text-xs md:text-sm lg:text-md">RS</span> ${item.data.productPrice} 
  <span class="font-normal text-[10px] xs:text-[10px] sm:text-xs md:text-sm lg:text-md">PKR</span>
  </h1>
    <button
      id="buy-now-button"
      class="flex justify-center items-center gap-2 w-fit p-[4px] cursor-pointer rounded-md shadow-xl text-white font-medium bg-gradient-to-r from-[#ffa1fc] via-[#ff45f9] to-[#f714f0] hover:shadow-lg hover:scale-105 duration-300 hover:from-[#ff8ffb] hover:to-[#ed00e5]"
      >
      Buy Now
    </button>
  </div>
  <div id="seller-info" class="flex items-center gap-4 p-3 border border-gray-200 rounded-lg shadow-sm">
  <div class="flex-shrink-0">
  <img src="${item.data.photoURL}" alt="Seller Photo" class="h-[35px] w-[35px] sm:h-[40px] sm:w-[40px] md:h-[45px] md:w-[45px] lg:h-[50px] lg:w-[50px] rounded-full border-2 border-green-500 shadow-md">
  </div>
  <div class="flex flex-col">
    <h1 class="text-xs sm:text-sm md:text-md lg:text-lg font-medium">
      <span id="seller-name" class="font-semibold text-gray-800"><i class="fa-solid fa-user text-green-600"></i> Seller: ${item.data.sellerName}</span>
      </h1>
    <h1 class="text-xs sm:text-sm md:text-md lg:text-lg font-medium">
      
      <span id="seller-contact" class="text-gray-800"><i class="fa-solid fa-phone text-green-600"></i> Contact: ${item.data.sellerNumber}</span>
    </h1>
  </div>
</div>
</div>
</div>

`
preloader.style.display = 'none'
})   
}

const renderPostsFunc = renderPosts();
if(renderPostsFunc){
  preloader.style.display = 'none'
}

