// Import functions from firebase
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { collection, addDoc ,Timestamp} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { auth, db } from './config.js'
import { getDownloadURL, uploadBytes, ref } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";
import { storage } from "./config.js";

// ., Call Variables
const postAdBody = document.getElementById('post-ad-body');
const crossButton = document.getElementById('cross-button');
const headPostAd = document.getElementById('head-post-ad');
const userNavAvatar = document.getElementById('user-nav-avatar');
const notificationSoundError = document.getElementById('notification-sound-error');
const userPhoto = JSON.parse(localStorage.getItem('user-image-url'));
const postPic = document.getElementById('post-pic');
const form = document.querySelector('form');
const producTitle = document.getElementById('product-title');
const productDescription = document.getElementById('product-description');
const productPrice = document.getElementById('product-price');
const sellerName = document.getElementById('seller-name');
const sellerNumber = document.getElementById('seller-number');
const alertSound = document.getElementById('notification-sound2');
const toast = document.querySelector('.toast-msg');
const uloadProfileImageName = document.getElementById('uload-profile-image-name');
const photoURL = JSON.parse(localStorage.getItem('user-image-url'));
const postBtn = document.getElementById('post-btn');

let arr = [];

// ., Use Regex For Validations
const productTitleRegex = /^[A-Z][a-zA-Z\s]{9,19}$/;
const productDescriptionRegex = /^[A-Z][a-zA-Z\s]{9,39}$/;
const productPriceRegex = /^[1-9][0-9]{1,9}$/;
const nameRegex = /^[A-Z][a-zA-Z]{2,13}$/;
const userNumberRegex = /^03\d{8}$/;
const fileRegex = /^(?!.*\.gif$).*\.((jpg|jpeg|png|bmp|tiff|webp|svg)$)/i;
const iconSuccess = document.getElementById('icon-success');
const sound = document.getElementById('notification-sound');

// ., Display None Elements
toast.style.display = 'none';

// ., On Auth State Change Function (For Check User Exsistance);
onAuthStateChanged(auth, (user) => {
  if (user && userPhoto) {
    console.log("🚀 ~ onAuthStateChanged ~ user:", user.email)
    const uid = user.uid;
    checkUser(user);
  } else {
    my_modal_3.showModal();
    const msgSoundFunc = my_modal_3.showModal();
    if (msgSoundFunc) {
      notificationSoundError.play();
    }
    headPostAd.style.display = 'none'
    postAdBody.style.display = 'none';
    crossButton.addEventListener('click', () => {
      window.location = 'index.html'
    })

  }
});


// ., Check User Function (For Avatar Photo)
function checkUser(user) {
  if (user) {
    if (photoURL) {
      userNavAvatar.src = photoURL
    }
  }
}


// ., Input User Photo Function
postPic.addEventListener('change', () => {
  try {
    const userPic = postPic.files[0];
    console.log(userPic);
    uloadProfileImageName.innerHTML = `${postPic.files[0].name}`
  } catch (er) {
    console.log(er);
  }
});



// ., Form Button Submit Function
form.addEventListener('submit',async (event) => {
  event.preventDefault();


  // ., Undefined OR Null Vaildations
  if ((!postPic.files[0]) && (producTitle.value === '' || producTitle.value === null) && (productDescription.value === '' || productDescription.value === null) && (productPrice.value === '' || productPrice.value === null) && (sellerName.value === '' || sellerName.value === null) && (sellerNumber.value === '' || sellerNumber.value === null)) {
    toast.style.display = 'block';
    toast.innerHTML = `<div class="toast toast-top toast-center mt-[70px]">
    <div class="bg-gradient-to-r from-[#f87171] via-[#ef4444] to-[#dc2626] p-[10px] rounded-lg text-white">
    <span class="text-white text-sm xs:text-md sm:text-lg md:text-xl lg:text-2xl">Please <b>fill all input fields.</b></span>
    </div>
    </div>`
    alertSound.play()
    setTimeout(() => {
      toast.style.display = 'none';
    }, 3000);
    return
  }

  if (!postPic.files[0]) {
    toast.style.display = 'block';
    toast.innerHTML = `<div class="toast toast-top toast-center mt-[70px]">
    <div class="bg-gradient-to-r from-[#f87171] via-[#ef4444] to-[#dc2626] p-[10px] rounded-lg text-white">
    <span class="text-white text-sm xs:text-md sm:text-lg md:text-xl lg:text-2xl">Please <b>upload an image.</b></span>
    </div>
    </div>`
    alertSound.play()
    setTimeout(() => {
      toast.style.display = 'none';
    }, 3000);
    return
  }
  console.log(postPic.files[0].name);


  if (producTitle.value === '' || producTitle.value === null) {
    toast.style.display = 'block';
    toast.innerHTML = `<div class="toast toast-top toast-center mt-[70px]">
    <div class="bg-gradient-to-r from-[#f87171] via-[#ef4444] to-[#dc2626] p-[10px] rounded-lg text-white">
    <span class="text-white text-sm xs:text-md sm:text-lg md:text-xl lg:text-2xl">Please <b>fill -Product Title- field.</b></span>
    </div>
    </div>`
    alertSound.play()
    setTimeout(() => {
      toast.style.display = 'none';
    }, 3000);
    return
  }

  if (productDescription.value === '' || productDescription.value === null) {
    toast.style.display = 'block';
    toast.innerHTML = `<div class="toast toast-top toast-center mt-[70px]">
    <div class="bg-gradient-to-r from-[#f87171] via-[#ef4444] to-[#dc2626] p-[10px] rounded-lg text-white">
    <span class="text-white text-sm xs:text-md sm:text-lg md:text-xl lg:text-2xl">Please <b>fill -Product Description- field.</b></span>
    </div>
    </div>`
    alertSound.play()
    setTimeout(() => {
      toast.style.display = 'none';
    }, 3000);
    return
  }

  if (productPrice.value === '' || productPrice.value === null) {
    toast.style.display = 'block';
    toast.innerHTML = `<div class="toast toast-top toast-center mt-[70px]">
    <div class="bg-gradient-to-r from-[#f87171] via-[#ef4444] to-[#dc2626] p-[10px] rounded-lg text-white">
    <span class="text-white text-sm xs:text-md sm:text-lg md:text-xl lg:text-2xl">Please <b>fill -Product Price- field.</b></span>
    </div>
    </div>`
    alertSound.play()
    setTimeout(() => {
      toast.style.display = 'none';
    }, 3000);
    return
  }

  if (sellerName.value === '' || sellerName.value === null) {
    toast.style.display = 'block';
    toast.innerHTML = `<div class="toast toast-top toast-center mt-[70px]">
    <div class="bg-gradient-to-r from-[#f87171] via-[#ef4444] to-[#dc2626] p-[10px] rounded-lg text-white">
    <span class="text-white text-sm xs:text-md sm:text-lg md:text-xl lg:text-2xl">Please <b>fill -Name- field.</b></span>
    </div>
    </div>`
    alertSound.play()
    setTimeout(() => {
      toast.style.display = 'none';
    }, 3000);
    return
  }

  if (sellerNumber.value === '' || sellerNumber.value === null) {
    toast.style.display = 'block';
    toast.innerHTML = `<div class="toast toast-top toast-center mt-[70px]">
    <div class="bg-gradient-to-r from-[#f87171] via-[#ef4444] to-[#dc2626] p-[10px] rounded-lg text-white">
    <span class="text-white text-sm xs:text-md sm:text-lg md:text-xl lg:text-2xl">Please <b>fill -Number- field.</b></span>
    </div>
    </div>`
    alertSound.play()
    setTimeout(() => {
      toast.style.display = 'none';
    }, 3000);
    return
  }

  // ., Regexes
  if (!fileRegex.test(postPic.files[0].name)) {
    toast.style.display = 'block';
    toast.innerHTML = `<div class="toast toast-top toast-center mt-[70px]">
    <div class="bg-gradient-to-r from-[#f87171] via-[#ef4444] to-[#dc2626] p-[10px] rounded-lg text-white">
    <span class="text-white text-sm xs:text-md sm:text-lg md:text-xl lg:text-2xl">"Invalid file type. Please ensure the following:"<br>
    "1. <b>The file is not a GIF.</b>"<br>
    "2. The <b>file is an image with one of the following extensions: JPG, JPEG, PNG, BMP.</b>"</span>
    </div>
    </div>`
    alertSound.play()
    setTimeout(() => {
      toast.style.display = 'none';
    }, 3000);
    return;
  }

  if (!productTitleRegex.test(producTitle.value)) {
    toast.style.display = 'block';
      toast.innerHTML = `<div class="toast toast-top toast-center mt-[70px]">
    <div class="bg-gradient-to-r from-[#f87171] via-[#ef4444] to-[#dc2626] p-[10px] rounded-lg text-white">
    <span class="text-white text-sm xs:text-md sm:text-lg md:text-xl lg:text-2xl">
    "Invalid product title. Please ensure the following:"<br>
    "1. The <b>title should start with a capital letter.</b>"<br>
    "2. The <b>title should be between 6 and 20 characters long.</b>"<br>
    "3. The <b>title can only contain letters and spaces.</b>"
    </span>
    </div>
    </div>`;
    alertSound.play()
    setTimeout(() => {
      toast.style.display = 'none';
    }, 3000);
    return;
    
  }

  if (!productDescriptionRegex.test(productDescription.value)) {
    toast.style.display = 'block';
    toast.innerHTML = `<div class="toast toast-top toast-center mt-[70px]">
    <div class="bg-gradient-to-r from-[#f87171] via-[#ef4444] to-[#dc2626] p-[10px] rounded-lg text-white">
    <span class="text-white text-sm xs:text-md sm:text-lg md:text-xl lg:text-2xl">
    "Invalid product description. Please ensure the following:"<br>
    "1. The <b>description should start with a capital letter.</b>"<br>
    "2. The <b>description should be between 10 and 40 characters long.</b>"<br>
    "3. The <b>description cannot contain numbers or symbols.</b>"<br>
    "4. The <b>description can only contain letters and spaces.</b>"
    </span>
    </div>
    </div>`;
    alertSound.play()
    setTimeout(() => {
      toast.style.display = 'none';
    }, 3000);
    return
  }

  if (!productPriceRegex.test(productPrice.value)) {
    toast.style.display = 'block';
    toast.innerHTML = `<div class="toast toast-top toast-center mt-[70px]">
    <div class="bg-gradient-to-r from-[#f87171] via-[#ef4444] to-[#dc2626] p-[10px] rounded-lg text-white">
    <span class="text-white text-sm xs:text-md sm:text-lg md:text-xl lg:text-2xl">
    "Invalid product price. Please ensure the following:"<br>
    "1. The <b>price should not contain any letters or symbols.</b>"<br>
    "2. The <b>price cannot start with the digit '0'.</b>"<br>
    "3. The <b>price should be between 2 and 10 digits long.</b>"
    </span>
    </div>
    </div>`;
    alertSound.play()
    setTimeout(() => {
      toast.style.display = 'none';
    }, 3000);
    return
  }

  if (!nameRegex.test(sellerName.value)) {
    toast.style.display = 'block';
    toast.innerHTML = `<div class="toast toast-top toast-center mt-[70px]">
    <div class="bg-gradient-to-r from-[#f87171] via-[#ef4444] to-[#dc2626] p-[10px] rounded-lg text-white">
    <span class="text-white text-sm xs:text-md sm:text-lg md:text-xl lg:text-2xl">
    "Invalid name. Please ensure the following:"<br>
    "1. The <b>name starts with a capital letter.</b>"<br>
    "2. The <b>name is between 3 and 13 characters long.</b>"<br>
    "3. The <b>name contains only letters (no numbers or symbols).</b>"<br>
    "4. The <b>name is not entirely uppercase.</b>"
    </span>
    </div>
    </div>`;
    alertSound.play()
    setTimeout(() => {
      toast.style.display = 'none';
    }, 3000);
    return
  }

  if (userNumberRegex.test(sellerNumber.value)) {
    toast.style.display = 'block';
    toast.innerHTML = `<div class="toast toast-top toast-center mt-[70px]">
    <div class="bg-gradient-to-r from-[#f87171] via-[#ef4444] to-[#dc2626] p-[10px] rounded-lg text-white">
    <span class="text-white text-sm xs:text-md sm:text-lg md:text-xl lg:text-2xl">
    "Invalid user number. Please ensure the following:"<br>
    "1. The <b>number starts with '03'.</b>"<br>
    "2. The <b>number is exactly 10 digits long.</b>"<br>
    "3. The <b>number does not contain letters or symbols.</b>"
    </span>
    </div>
    </div>`;
    alertSound.play()
    setTimeout(() => {
      toast.style.display = 'none';
    }, 3000);
    return
  }

  //  Send data to firestore
  try {
    postBtn.classList.add('loading' ,'loading-bars' ,'loading-md');
    postBtn.style.marginTop = '-20px'; 
    console.log(photoURL);
    showUrl(postPic.files[0]);
     const fileUrl = await showUrl(postPic.files[0])
    console.log("🚀 ~ form.addEventListener ~ fileUrl:", fileUrl)
     const docRef = await addDoc(collection(db, "posts"), {
       postImage:fileUrl,
      producTitle: producTitle.value,
      productDescription:productDescription.value,
      productPrice:productPrice.value,
      sellerName:sellerName.value,
      sellerNumber:sellerNumber.value,
      photoURL:photoURL,
      time: Timestamp.fromDate(new Date())
    });
    form.reset();
    console.log("Document written with ID: ", docRef.id);
    postBtn.classList.remove('loading' ,'loading-bars' ,'loading-md');
    my_modal_4.showModal();
    postBtn.style.marginTop = '0px'; 
    sound.play();
    setTimeout(()=>{
  setTimeout(()=>{
    iconSuccess.classList.remove('fa-regular')
    iconSuccess.classList.add('fa-solid')
  },100)
},2000)
      arr.push({
      postImage:fileUrl,
      producTitle: producTitle.value,
      productDescription:productDescription.value,
      productPrice:productPrice.value,
      sellerName:sellerName.value,
      sellerNumber:sellerNumber.value,
      photoURL:photoURL,
      time: Timestamp.fromDate(new Date()),
    });
    console.log(arr);
  } catch (e) {
    postBtn.classList.add('loading' ,'loading-bars' ,'loading-md');
    console.error("Error adding document: ", e);
  }


})


// ., Show URL function
async function showUrl(file) {
  try {
    const userEmail = localStorage.getItem('user-email');
    const storageRef = ref(storage, `uploads/${userEmail}/${file.name}`);
      const uploadImg = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      return url;
  } catch (error) {
     console.error('Error uploading file:', error);
    
  }
}



