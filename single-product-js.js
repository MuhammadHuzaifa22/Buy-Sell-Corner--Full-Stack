// Import functions.
import { collection,getDoc, doc,addDoc,Timestamp, query, where, orderBy, } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { auth, db } from './config.js'

// Declare variables.
const contentSection = document.getElementById('content');
const userNavAvatar = document.getElementById('user-nav-avatar');
const userPhoto = JSON.parse(localStorage.getItem('user-image-url'));
const crossButton = document.getElementById('cross-button');
const photoURL = JSON.parse(localStorage.getItem('user-image-url'));
const headTag = document.getElementById('head-tag');
const priceTag = document.getElementById('price-tag');
const headTagTitle = document.getElementById('head-tag-title');
const descriptionHead = document.getElementById('description-head');
const sellerNameTag = document.getElementById('seller-name-tag');
const areaTag = document.getElementById('area-tag');
const priceTagDetail = document.getElementById('price-tag-detail');
const descriptionHeadDetail = document.getElementById('description-head-detail');
const sound = document.getElementById('notification-sound');
const sound2 = document.getElementById('notification-sound2');
const sound3 = document.getElementById('notification-sound3');
const favoriteIcon = document.getElementById('favorite-icon');
const textIcon = document.getElementById('text-icon');
const azadiSaleRibbon = document.getElementById('azadi-sale-ribbon');
const anchorTageSellerProf = document.getElementById('anchor-tage-seller-prof');
const brandCondition = document.getElementById('brand-condition');
const brandDetail = document.getElementById('brand-detail');
let arr = [];

//  Display none for some elements.
contentSection.style.display = 'none';

// ., On Auth State Change Function (For Check User Exsistance);
onAuthStateChanged(auth, (user) => {
  if (user && userPhoto) {
    console.log("🚀 ~ onAuthStateChanged ~ user:", user)
    const uid = user.uid;
    checkUser(user);
    contentSection.style.display = 'block';
  } else {
    my_modal_3.showModal();
    sound2.play();
    contentSection.style.display = 'none';
    crossButton.addEventListener('click', () => {
      window.location = 'index.html'
    })
  }
});




let dataArr = [];

async function getDataById() {
  const docId = localStorage.getItem('docId');
  if (dataArr.length === 0) {
    const docRef = doc(db, "single-post", docId);
    const docSnap = await getDoc(docRef); // Use getDoc() to fetch a single document
    if (docSnap.exists()) {
      console.log(docSnap.id, " => ", docSnap.data());
      dataArr.push(docSnap.data());
      console.log(dataArr);
      renderData();
    } else {
      console.log("No such document!");
    }
  } else {
    console.log("Data has already been fetched.");
  }
}

getDataById();


// ., Check User Function (For Avatar Photo)
function checkUser(user) {
  if (user) {
    if (photoURL) {
      userNavAvatar.src = photoURL
    }
  }
}


async function renderData() {
    const imageDiv = document.getElementById('imageDiv');
      const sellerPic = document.getElementById('seller-pic');
      dataArr.forEach((item)=>{
        const newPostImage = item.postImage
        const newSellerPhoto = item.sellerPhoto
        const newTitle = item.title
        const newDescription = item.description
        const newPrice = item.price
        const newSellerName = item.sellerName
        const newSellerNumber = item.sellerNumber
        const newSellerAddress = item.sellAddress
        const newBrand = item.brand
        const newCategory = item.brand
        const newCondition = item.condition
        const officialPrice = item.officialPrice;
        imageDiv.src = newPostImage;
        sellerPic.src = newSellerPhoto;
        headTag.innerHTML = newTitle;
        headTagTitle.innerHTML = newTitle;
        descriptionHead.innerHTML = newDescription
        sellerNameTag.innerHTML = newSellerName      
        areaTag.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${newSellerAddress}`;      
        descriptionHeadDetail.innerHTML = newDescription;
        if(officialPrice){
      priceTag.innerHTML = `<span class="text-sm sm:text-md md:text-xl lg:text-2xl">RS</span> ${newPrice} <span class="text-sm sm:text-md md:text-xl lg:text-2xl">PKR</span> <span class="text-red-500 text-sm sm:text-md md:text-xl lg:text-2xl line-through">${officialPrice}</span><br><br> <span class="bg-green-500 text-white p-[5px] text-sm sm:text-md md:text-xl lg:text-2xl">30% Off</span>`;
      priceTagDetail.innerHTML = `<span class="text-sm sm:text-md md:text-xl lg:text-2xl">RS</span> ${newPrice} <span class="text-sm sm:text-md md:text-xl lg:text-2xl">PKR</span> <span class="text-red-500 text-sm sm:text-md md:text-xl lg:text-2xl line-through">${officialPrice}</span>  <span class="bg-green-500 text-white p-[5px] text-sm sm:text-md md:text-xl lg:text-2xl">30% Off</span>`
      azadiSaleRibbon.style.display = 'block';
    }else{
      priceTag.innerHTML = `<span class="text-sm sm:text-md md:text-xl lg:text-2xl">RS</span> ${newPrice} <span class="text-sm">PKR</span> `;
      priceTagDetail.innerHTML = `<span class="text-sm sm:text-md md:text-xl lg:text-2xl">RS</span> ${newPrice} <span class="text-sm">PKR</span> `
      azadiSaleRibbon.style.display = 'none';
        }
        brandDetail.innerHTML = newBrand;
        brandCondition.innerHTML = newCondition;
      })
  
  
    favoriteIcon.addEventListener('click',() => {
      if (favoriteIcon.innerHTML === '<i class="fa-regular fa-heart" aria-hidden="true"></i>') {
        favoriteIcon.innerHTML = `<i class="fa-solid fa-heart" aria-hidden="true"></i>`;
        textIcon.innerHTML = `<b>Added</b>`;
        sound3.play();
      } else {
        sound3.play();
        textIcon.innerHTML = 'Add to wishlist';
        favoriteIcon.innerHTML = '<i class="fa-regular fa-heart" aria-hidden="true"></i>';
      }
    });

    anchorTageSellerProf.addEventListener('click',()=>{
      window.location = 'seller-profile.html';
    })
  }