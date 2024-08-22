// Import functions from firebase
import { getDocs } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { collection, addDoc, Timestamp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { auth, db } from './config.js'
import { getDownloadURL, uploadBytes, ref } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-storage.js";
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
let productPrice = document.getElementById('product-price');
const sellerName = document.getElementById('seller-name');
const sellerNumber = document.getElementById('seller-number');
const selectBrand = document.getElementById('select-brand');
const selectCondition = document.getElementById('select-condition');
const alertSound = document.getElementById('notification-sound2');
const toast = document.querySelector('.toast-msg');
const uloadProfileImageName = document.getElementById('uload-profile-image-name');
const photoURL = JSON.parse(localStorage.getItem('user-image-url'));
const postBtn = document.getElementById('post-btn');
const iconSuccess = document.getElementById('icon-success');
const sound = document.getElementById('notification-sound');
const wantText = document.getElementById('want-text');
const sellerAddress = JSON.parse(localStorage.getItem('user-address'));
const userEmail = JSON.parse(localStorage.getItem('user-email'));
const modal_two_button = document.getElementById('modal-two-button');
const modal_two = document.getElementById('my_modal_2');
let userAddressData = '';
let matchLogged = false;
let matchFound = false; 
let getDataArr = [];
let postCount = 0;



let azadisale = false;
let arr = [];
const saleBtn = document.getElementById('sale-btn');
const alertTag = document.getElementById('alert-tag');
let brandsArr = []

// ., Use Regex For Validations
const productTitleRegex = /^[A-Z][A-Za-z0-9\s!@#$%^&*(),.?":{}|<>]{2,49}$/;
const productDescriptionRegex = /^[A-Z][A-Za-z0-9\s!@#$%^&*(),.?":{}|<>]{5,99}$/;
const productPriceRegex = /^[1-9][0-9]{1,9}$/;
const nameRegex = /^[A-Z][a-zA-Z]{2,13}$/;
const userNumberRegex = /^03\d{8}$/;
const fileRegex = /^(?!.*\.gif$).*\.((jpg|jpeg|png|bmp|tiff|webp|svg)$)/i;



// ., Display None Elements
toast.style.display = 'none';
alertTag.style.display = 'none';




const brandCategories = [
  {
    category: "Electronics",
    brands: [
      "Apple",
      "Samsung",
      "Google",
      "Xiaomi",
      "Huawei",
      "OPPO",
      "Vivo",
      "OnePlus",
      "Realme",
      "Nokia",
      "Dell",
      "HP",
      "Lenovo",
      "Acer",
      "Asus",
      "Microsoft",
      "MSI",
      "Razer",
      "Alienware",
      "Orient",
      "Singer",
      "USha",
      "Crompton Greaves",
      "Bajaj",
      "Luminous",
      "V-Guard",
      "LG",
      "Haier",
      "Whirlpool",
      "Panasonic",
      "Hitachi",
      "Godrej",
      "Blue Star",
      "Electrolux",
      "Kelvinator",
      "Dawlance",
      "Supreme",
      "PEL",
      "Changhong"
    ]
  },
  {
    category: "Automobiles",
    brands: [
      "Suzuki",
      "Toyota",
      "Honda",
      "KIA",
      "Hyundai",
      "Yamaha",
      "United Auto Industries (UAI)",
      "Atlas Honda"
    ]
  },
  {
    category: "Food & Beverages",
    brands: [
      "Nestle",
      "Coca-Cola",
      "Pepsi",
      "Unilever",
      "Engro Foods",
      "Shezan",
      "Murree Brewery",
      "National Foods"
    ]
  },
  {
    category: "Textiles & Apparel",
    brands: [
      "Gul Ahmed",
      "Nishat Linen",
      "Sapphire",
      "Khaadi",
      "Alkaram",
      "J.",
      "Maria B.",
      "Sana Safinaz",
      "Limelight",
      "Bonanza"
    ]
  },
  {
    category: "Telecommunication",
    brands: [
      "Jazz",
      "Telenor",
      "Zong",
      "Ufone"
    ]
  },
  {
    category: "Banking",
    brands: [
      "Habib Bank",
      "United Bank",
      "Standard Chartered Bank",
      "MCB Bank",
      "Allied Bank"
    ]
  }
];





// Sale button function
saleBtn.addEventListener('click', () => {
  if (azadisale === false) {
    azadisale = true;
    saleBtn.innerHTML = 'OFF';
    wantText.innerHTML = `You are Joined Azaadi sale <i class="fa-solid fa-circle-check"></i> , <span class="font-normal text-xl">(click the button to left)</span>`
    alertTag.style.display = 'block';
    if (productPrice.value === '' || productPrice.value === null) {

      alertTag.innerHTML = `In this sale, your product price will be reduced by 30%. ,<span class="bg-stone-200"> Eg: 100 - 30% = ${Math.round(100 * 0.7)}</span>`
      alertTag.style.border = '1px solid black';
      alertTag.style.padding = '5px';
      alertTag.classList.add('rounded-box');
    } else {
      alertTag.innerHTML = `In this sale, your product price will be reduced by 30%. ,<span class="bg-stone-200"> Eg: Your Product Price ${productPrice.value} - 30% = ${Math.round(productPrice.value * 0.7)}</span>`
      alertTag.style.border = '1px solid black';
      alertTag.classList.add('rounded-box');
      alertTag.style.padding = '5px'
    }
    alertTag.style.marginTop = '10px'
    console.log(Math.round(productPrice))
    postBtn.style.marginTop = '30px'

  } else {
    azadisale = false;
    saleBtn.innerHTML = 'ON'
    alertTag.style.display = 'none';
    wantText.innerHTML = 'Want to join the Azadi sale? Click here!'
  }
  getSaleValue(azadisale)
})



// Azzadi sale function
function getSaleValue(sale) {
  console.log(sale);
  return sale
}

let userRegisteredEmail = 'sdsds'


let foundCategory = '';
// ., On Auth State Change Function (For Check User Exsistance);
onAuthStateChanged(auth, (user) => {
  if (user && userPhoto) {
    console.log("🚀 ~ onAuthStateChanged ~ user:", user.email)
    const uid = user.uid;
    checkUser(user);
    userRegisteredEmail = user.email; 
    getEmail(user.email)
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
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  console.log(azadisale)
  console.log(selectBrand.value);
  console.log(selectCondition.value);

  for (let i = 0; i < brandCategories.length; i++) {
    if (brandCategories[i].brands.includes(selectBrand.value)) {
      foundCategory = brandCategories[i].category;
      break;
    }
  }

  console.log(foundCategory);



  // ., Undefined OR Null Vaildations
  if ((!postPic.files[0]) && (producTitle.value === '' || producTitle.value === null) && (productDescription.value === '' || productDescription.value === null) && (productPrice.value === '' || productPrice.value === null) && (sellerName.value === '' || sellerName.value === null) && (sellerNumber.value === '' || sellerNumber.value === null) && (selectBrand.value === '' || selectBrand.value === null) && (selectCondition.value === '' || selectCondition.value === null)) {
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


  if (selectBrand.value === '' || selectBrand.value === null) {
    toast.style.display = 'block';
    toast.innerHTML = `<div class="toast toast-top toast-center mt-[70px]">
    <div class="bg-gradient-to-r from-[#f87171] via-[#ef4444] to-[#dc2626] p-[10px] rounded-lg text-white">
    <span class="text-white text-sm xs:text-md sm:text-lg md:text-xl lg:text-2xl">Please <b>fill -select brand- field.</b></span>
    </div>
    </div>`
    alertSound.play()
    setTimeout(() => {
      toast.style.display = 'none';
    }, 3000);
    return
  }


  if (selectCondition.value === '' || selectCondition.value === null) {
    toast.style.display = 'block';
    toast.innerHTML = `<div class="toast toast-top toast-center mt-[70px]">
    <div class="bg-gradient-to-r from-[#f87171] via-[#ef4444] to-[#dc2626] p-[10px] rounded-lg text-white">
    <span class="text-white text-sm xs:text-md sm:text-lg md:text-xl lg:text-2xl">Please <b>fill -select condition- field.</b></span>
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
    toastContainer.innerHTML = `<div class="toast toast-top toast-center mt-[70px]">
    <div class="bg-gradient-to-r from-[#f87171] via-[#ef4444] to-[#dc2626] p-[10px] rounded-lg text-white">
      <span class="text-white text-sm xs:text-md sm:text-lg md:text-xl lg:text-2xl">Invalid <b>product title!</b> Please ensure the title:<br>
      - Starts with a capital letter<br>
      - Has a minimum length of 3 characters<br>
      - Has a maximum length of 50 characters<br>
      - Can include letters, numbers, spaces, and common symbols.</span>
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
      <span class="text-white text-sm xs:text-md sm:text-lg md:text-xl lg:text-2xl">Invalid <b>product description!</b> Please ensure the description:<br>
      - Starts with a capital letter<br>
      - Has a minimum length of 6 characters<br>
      - Has a maximum length of 100 characters<br>
      - Can include letters, numbers, spaces, and common symbols.</span>
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
  </div>`
  
    alertSound.play()
    setTimeout(() => {
      toast.style.display = 'none';
    }, 3000);
    return
  }

  if (!userNumberRegex.test(sellerNumber.value)) {
    
  
    if (toast) {
      toast.style.display = 'block';
      toast.innerHTML = `
        <div class="bg-gradient-to-r from-[#f87171] via-[#ef4444] to-[#dc2626] p-4 rounded-lg flex items-center text-white mt-[100px] mx-auto">
          <!-- Icon -->
          <i class="fa-solid fa-exclamation-triangle text-3xl md:text-4xl mr-3"></i>
          <!-- Message -->
          <div class="flex flex-col">
            <span class="text-sm sm:text-base md:text-lg lg:text-xl">
              "Invalid user number. Please ensure the following:"
            </span>
            <ul class="list-disc list-inside text-xs sm:text-sm md:text-base lg:text-lg mt-2">
              <li><b>The number starts with '03'.</b></li>
              <li><b>The number is exactly 10 digits long.</b></li>
              <li><b>The number does not contain letters or symbols.</b></li>
            </ul>
          </div>
        </div>`;
  
  
      if (alertSound) {
        alertSound.play();
      }
  
      setTimeout(() => {
        toast.style.display = 'none';
      }, 3000);
    } else {
      console.error('Toast element not found');
    }
    return;
  }
  

  let azadiSale = getSaleValue(azadisale);
  console.log("🚀 ~ form.addEventListener ~ azadisale:", azadiSale)

  
let sellerEmail = getEmail();
console.log("🚀 ~ form.addEventListener ~ sellerEmail:", sellerEmail)

const sellerAddress = JSON.parse(localStorage.getItem('seller-address')).userAddress;
console.log("🚀 ~ form.addEventListener ~ sellerAddress:", sellerAddress)


  
  if (azadiSale === false) {
    //  Send data to firestore
    try {
      if(toast.style.display === 'block'){
        toast.style.display = 'none';
      }
      postBtn.classList.add('loading', 'loading-bars', 'loading-md');
      postBtn.style.marginTop = '-20px';
      console.log(photoURL);
      showUrl(postPic.files[0]);
      const fileUrl = await showUrl(postPic.files[0]);
      console.log("🚀 ~ form.addEventListener ~ fileUrl:", fileUrl);
      let newAddress = sellerAddress;
      const docRef = await addDoc(collection(db, "posts"), {
        postImage: fileUrl,
        producTitle: producTitle.value,
        productDescription: productDescription.value,
        productPrice: productPrice.value,
        sellerName: sellerName.value,
        sellerNumber: sellerNumber.value,
        photoURL: photoURL,
        brand: selectBrand.value,
        selectCondition: selectCondition.value,
        category: foundCategory,
        time: Timestamp.fromDate(new Date()),
        sellerAddressNew: sellerAddress,
        
      });
      form.reset();
      azadisale = false;
      saleBtn.innerHTML = 'ON';
      alertTag.style.display = 'none';
      uloadProfileImageName.innerHTML = 'Upload Product Photo';
      console.log("Document written with ID: ", docRef.id);
      postBtn.classList.remove('loading', 'loading-bars', 'loading-md');
      my_modal_4.showModal();
      postBtn.style.marginTop = '0px';
      sound.play();
      setTimeout(() => {
        setTimeout(() => {
          iconSuccess.classList.remove('fa-regular')
          iconSuccess.classList.add('fa-solid')
        }, 100)
      }, 2000)
      arr.push({
        postImage: fileUrl,
        producTitle: producTitle.value,
        productDescription: productDescription.value,
        productPrice: productPrice.value,
        sellerName: sellerName.value,
        sellerNumber: sellerNumber.value,
        photoURL: photoURL,
        category: foundCategory,
        time: Timestamp.fromDate(new Date()),
      });
      console.log(arr);
    } catch (e) {
      postBtn.classList.add('loading', 'loading-bars', 'loading-md');
      console.error("Error adding document: ", e);
    }


  } else {
    let officialPrice = productPrice.value;
    productPrice = Math.round(productPrice.value * 0.7);
    console.log("🚀 ~ form.addEventListener ~ productPrice:", productPrice)


    //  Send data to firestore
    try {
      if(toast.style.display === 'block'){
        toast.style.display = 'none';
      }
      postBtn.classList.add('loading','loading-bars', 'loading-md');
      postBtn.style.marginTop = '10px';
      console.log(photoURL);
      showUrl(postPic.files[0]);
      const fileUrl = await showUrl(postPic.files[0]);
      let newAddress = sellerAddress;
      const docRef = await addDoc(collection(db, "posts"), {
        postImage: fileUrl,
        producTitle: producTitle.value,
        productDescription: productDescription.value,
        productPrice: productPrice,
        officialPrice: officialPrice,
        sellerName: sellerName.value,
        sellerNumber: sellerNumber.value,
        brand: selectBrand.value,
        photoURL: photoURL,
        category: foundCategory,
        time: Timestamp.fromDate(new Date()),
        sale: azadisale,
        sellerAddressNew: sellerAddress,
      });
      form.reset();
      azadisale = false;
      saleBtn.innerHTML = 'ON'
      alertTag.style.display = 'none';
      uloadProfileImageName.innerHTML = 'Upload Product Photo';
      console.log("Document written with ID: ", docRef.id);
      postBtn.classList.remove('loading', 'loading-bars', 'loading-md');
      my_modal_4.showModal();
      postBtn.style.marginTop = '0px';
      sound.play();
      setTimeout(() => {
        setTimeout(() => {
          iconSuccess.classList.remove('fa-regular')
          iconSuccess.classList.add('fa-solid')
        }, 100)
      }, 2000)
      arr.push({
        postImage: fileUrl,
        producTitle: producTitle.value,
        productDescription: productDescription.value,
        productPrice: productPrice,
        officialPrice: officialPrice,
        sellerName: sellerName.value,
        sellerNumber: sellerNumber.value,
        photoURL: photoURL,
        time: Timestamp.fromDate(new Date()),
        sale: azadisale
      });
      console.log(arr);
    } catch (e) {
      postBtn.classList.add('loading', 'loading-bars', 'loading-md');
      console.error("Error adding document: ", e);
    }

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



function  getEmail(email){
  console.log(email)
return email
}


// ., Get data from firestore
async function getData() {
  const getUserEmail = getEmail();
  getDataArr = [];
  getEmail()
  const querySnapshot = await getDocs(collection(db, "users"));
  console.log("🚀 ~ getData ~ getUserEmail:", getUserEmail)
querySnapshot.forEach((doc) => {
  getDataArr.push({id:doc.id,...doc.data()})
});

console.log(getDataArr)

  for (let i = 0; i < getDataArr.length; i++) {
    getUserData(getDataArr[i])
    if (getDataArr[i].email === userRegisteredEmail) {
      console.log('Match found');
      postCount +=  1;
      console.log(getDataArr[i])
      console.log(postCount);
      matchLogged = true;
      break; 
    }
  }
 
  console.log(getDataArr);
  }
    
modal_two_button.addEventListener('click',()=>{
console.log('work');
modal_two.showModal();
})


let userAddress = '';

async function getUserData(data){
  const userData = await data;
  userAddress = userData;
  userAdressShow()
  return userAddress
}

function userAdressShow(){
console.log(userAddress)
userAddressData = userAddress
localStorage.setItem('seller-address',JSON.stringify(userAddressData));
return
}


getData();