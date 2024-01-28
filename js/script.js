// ? ================= Global ================= //
let links = document.querySelectorAll(".links a");

// * ================= Events ================= //
// click on links

links.forEach(function (link) {
  link.addEventListener("click", function () {
    document.querySelector(".links .active").classList.remove("active");
    link.classList.add("active");
    if (link.id === "fetchLink") {
      fetchAPi();
    } else if (link.id === "countryLink") {
      country();
    } else if (link.id === "ingedientLink") {
      ingedientList();
    } else if (link.id === "searchLink") {
      displaySearch();
    } else {
        if (link.id === "contactLink") {
            displayContact();
          }
    }
  });
});

$(".navs").hide();

$(".threeLines").on("click", function () {
  $(".navs").animate({ width: "toggle", paddingInline: "toggle" }, 500);

  if($("#iconOpen").hasClass("fa-grip-lines")){
    $("#iconOpen").removeClass("fa-grip-lines");
    $("#iconOpen").addClass("fa-xmark");
  }else{
    $("#iconOpen").removeClass("fa-xmark");
    $("#iconOpen").addClass("fa-grip-lines");
  }
});

$(".links a").on("click", function () {
  $(".navs").animate({ width: "toggle", paddingInline: "toggle" }, 500);
});

// ? ================= functions ================= //

// sidebar
$(document).on("input", "#searchByName", function () {
  search();
});
function search() {
  let term = $("#searchByName").val();
  fetchAPiDef(term);
}

$(document).on("input", "#letterSearch", function () {
  searchLetter();
});
function searchLetter() {
  let term = $("#letterSearch").val();
  fetchAPiDef(term);
}

function displaySearch() {
  document.getElementById("row").innerHTML = "";
  let serch = "";
  serch += ` 
        <div class="col-sm-12 col-lg-6">
                    <div class="searchName">
                        <input id="searchByName"  type="search" placeholder="search by name">
                    </div>
                  </div>
                  <div class="col-sm-12 col-lg-6">
                    <div class="searchLetter">
                    <input id="letterSearch" maxlength="1" type="search" placeholder="search by first letter">
                    </div>
                  </div>                    
                </div>`;
  document.getElementById("rowSearch").innerHTML = serch;
}

async function fetchAPiDef(def) {
  const options = { method: "GET", headers: { Accept: "application/json" } };
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${def}`,
    options
  );

  const response = await api.json();
  displayMealsDef(response?.meals);
}
fetchAPiDef("");
// display
function displayMealsDef(dataMenu) {
  let menu = "";
  for (let i = 0; i < dataMenu.length; i++) {
    menu += `
        <div  class="col-sm-12 col-lg-3">
                        <div class="meal" onclick="descriptionApi(this.id)" id="${dataMenu[i]?.idMeal}">
                            <img src="${dataMenu[i].strMealThumb}" alt="">
                            <div class="layer">
                                <h2>${dataMenu[i].strMeal}</h2>
                            </div>
                        </div></div>`;
  }
  document.getElementById("row").innerHTML = menu;
}

// category api
async function fetchAPi() {
  const options = { method: "GET", headers: { Accept: "application/json" } };
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`,
    options
  );

  const response = await api.json();
  displayMeals(response?.categories);
}

// display
function displayMeals(dataMenu) {
  document.getElementById("rowSearch").innerHTML = "";
  let menu = "";
  for (let i = 0; i < dataMenu.length; i++) {
    let strCategoryDescription = dataMenu[i].strCategoryDescription;
    let index = strCategoryDescription.indexOf(".");
    let slicedString = strCategoryDescription.slice(0, index);
    menu += `
        <div  class="col-sm-12 col-lg-3">
                        <div class="meal" onclick="getMeal(this.id)" id="${dataMenu[i]?.strCategory}">
                            <img src="${dataMenu[i].strCategoryThumb}" alt="">
                            <div class="layer">
                                <h2>${dataMenu[i].strCategory}</h2>
                                <p>${slicedString}</p>
                            </div>
                        </div></div>`;
  }
  document.getElementById("row").innerHTML = menu;
}

// meals categoryName
async function getMeal(categoryName) {
  const options2 = { method: "GET", headers: { Accept: "application/json" } };
  const mealApi = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`,
    options2
  );
  const mealResponse = await mealApi.json();
  displayMealsCtegoryName(mealResponse?.meals);
}
// display meals
function displayMealsCtegoryName(dataMenu) {
  let menuMeal = "";
  for (let i = 0; i < dataMenu.length; i++) {
    menuMeal += `
        <div  class="col-sm-12 col-lg-3">
                        <div class="meal" onclick="descriptionApi(this.id) " id="${dataMenu[i]?.idMeal}">
                            <img src="${dataMenu[i].strMealThumb}" alt="">
                            <div class="layer">
                                <h2>${dataMenu[i].strMeal}</h2>
                            </div>
                        </div>
                        </div>`;
  }
  document.getElementById("row").innerHTML = menuMeal;
}
// window description api
async function descriptionApi(mealDes) {
  const optionsDescription = {
    method: "GET",
    headers: { Accept: "application/json" },
  };
  const mealApiDescription = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealDes}`,
    optionsDescription
  );
  const mealResponseDescription = await mealApiDescription.json();
  descriptionMeal(mealResponseDescription?.meals[0]);
}
// window description

function descriptionMeal(id) {
  let desMeal = "";
  let ingredients = ``;

  for (i = 1; i <= 20; i++) {
    if (id[`strIngredient${i}`]) {
      ingredients += `<span class="alert alert-info me-2 my-1 p-2">${
        id[`strMeasure${i}`]
      } ${id[`strIngredient${i}`]}</span>`;
    }
  }

  desMeal += `
    <div class="col-sm-12 col-lg-6">
                        <div class="leftDes">
                            <img src="${id.strMealThumb}" alt="">
                            <h1>${id.strMeal}</h1>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-6">
                        <div class="rightDes">
                            <h3>Instructions</h3>
                            <p${id.strInstructions}</p>
                            <div class="lista">
                                <strong>area: <span>${id.strArea}</span></strong><br>
                                <strong>category: <span>${id.strCategory}</span></strong>
                                <div class="recipes">
                                    <strong>recipes :</strong>
                                    <div class="container">
                                        <div class="row">
                                            <div class="col-sm-12">
                                                <div class="res">
                                                ${ingredients}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tags">
                                    <strong>tags :</strong><br>
                                    <button id="leftBtn"><a href="${id.strSource}">source</a></button>
                                    <button id="rightBtn"><a href="${id.strYoutube}">youtube</a></button>
                                </div>
                                
                                
                            </div>
                        </div>
                    </div>`;

  document.getElementById("row").innerHTML = desMeal;
}

// ////////////////////////////////////////////////////////////////////////////////////

// ? ================= Global ================= //
let area = document.getElementById("countryLink");

// ! ================= functions ================= //

// api area

async function country(areaCuntry) {
  const optionsArea = {
    method: "GET",
    headers: { Accept: "application/json" },
  };
  const apiArea = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=${areaCuntry}`,
    optionsArea
  );
  const responseArea = await apiArea.json();

  displayArea(responseArea?.meals);
}
// display area
function displayArea(dataArea) {
  document.getElementById("rowSearch").innerHTML = "";
  let countries = "";
  for (let i = 0; i < dataArea.length; i++) {
    countries += `
                    <div class="col-sm-12 col-lg-3 ">
                        <div class="contry" onclick="countryMeal(this.id)" id="${dataArea[i].strArea}">
                            <i class="fa-solid fa-house"></i>
                            <h2>${dataArea[i].strArea}</h2>
                        </div>
                    </div>`;
  }
  document.getElementById("row").innerHTML = countries;
}

// country meals
async function countryMeal(countryList) {
  const optionsCountry = {
    method: "GET",
    headers: { Accept: "application/json" },
  };
  const apiCountryMeal = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${countryList}`,
    optionsCountry
  );
  const responseCountry = await apiCountryMeal.json();
  displayCountry(responseCountry?.meals);
}

//  display country meals
function displayCountry(countryMealparam) {
  let displayCountryMeal = "";
  for (i = 0; i < countryMealparam.length; i++) {
    displayCountryMeal += `
        <div  class="col-sm-12 col-lg-3">
                        <div class="meal" onclick="descriptionApi(this.id)" id="${countryMealparam[i]?.idMeal}">
                            <img src="${countryMealparam[i].strMealThumb}" alt="">
                            <div class="layer">
                                <h2>${countryMealparam[i].strMeal}</h2>
                            </div>
                        </div></div>`;
  }
  document.getElementById("row").innerHTML = displayCountryMeal;
}

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////

// ingedient

async function ingedientList(list) {
  const optionsIngedient = {
    method: "GET",
    headers: { Accept: "application/json" },
  };
  const apiIngedient = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=${list}`,
    optionsIngedient
  );
  const responseIngedient = await apiIngedient.json();
  displayIngedient(responseIngedient?.meals);
}

// display ingedient

function displayIngedient(ingedientparam) {
  document.getElementById("rowSearch").innerHTML = "";
  let displayIn = "";
  for (let i = 0; i < ingedientparam.length; i++) {

    displayIn += `
            <div class="col-sm-12 col-lg-3">
                <div class="meal" id="${ingedientparam[i].strIngredient}" onclick="ingedientMeal(this.id)">
                    <i class="fa-solid fa-drumstick-bite"></i>
                    <h2>${ingedientparam[i]?.strIngredient}</h2>
                    <p>${ingedientparam[i]?.strDescription? ingedientparam[i]?.strDescription?.substring(0,50):''}</p>
                </div>
            </div>`;
  }
  document.getElementById("row").innerHTML = displayIn;
}

// ingedient meal
async function ingedientMeal(mealF) {
  const optionsIngedientMeal = {
    method: "GET",
    headers: { Accept: "application/json" },
  };
  const apiIngedientMeal = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${mealF}`,
    optionsIngedientMeal
  );
  const responseIngedientMeal = await apiIngedientMeal.json();

  displayIngedientMeal(responseIngedientMeal?.meals);
}

// display ingedient meal
function displayIngedientMeal(dataNMeal) {
  let ingrdMeal = "";
  for (let i = 0; i < dataNMeal.length; i++) {
    ingrdMeal += `
        <div  class="col-sm-12 col-lg-3">
                        <div class="meal" onclick="descriptionApi(this.id)" id="${dataNMeal[i]?.idMeal}" >
                            <img src="${dataNMeal[i].strMealThumb}" alt="">
                            <div class="layer">
                                <h2>${dataNMeal[i].strMeal}</h2>
                            </div>
                        </div>
                        </div>`;
  }
  document.getElementById("row").innerHTML = ingrdMeal;
}

// ////////////////////////////////////////////////////////////////////////////////
//  ================= validation ================= //
// let nameValid = document.getElementById("nameValid");

function validationPassword(){
  const passwordValid = document.getElementById("passwordValid");
  const rules2Sign = document.querySelector(".rules2Sign");
  const success2Sign = document.querySelector(".success2Sign");

    var passwordSign = passwordValid.value;
    var regxPasswordSign =/^[0-9]{3}$/;
     if( regxPasswordSign.test(passwordSign) ){
        passwordValid.classList.add('is-valid');
        passwordValid.classList.remove('is-invalid');
        rules2Sign.style.display ='none';
        success2Sign.style.display='block';
        return true
    }else{
        passwordValid.classList.add('is-invalid');
        passwordValid.classList.remove('is-valid');
        rules2Sign.style.display ='block';
        success2Sign.style.display='none';
        return false
    }
}

// re password
function validateRePassword() {
  const rePassValid = document.getElementById("rePassValid");
  const rulesRESign = document.querySelector(".rulesRESign");
  const successRESign = document.querySelector(".successRESign");
    var password = document.getElementById('passwordValid').value;
    var rePassword = rePassValid.value;
    var regxPassword = /^[0-9]{3}$/;
    if (regxPassword.test(password) && regxPassword.test(rePassword) && password == rePassword) {
      rePassValid.classList.add('is-valid');
      rePassValid.classList.remove('is-invalid');
      rulesRESign.style.display = 'none';
      successRESign.style.display = 'block';

      return true;
    }
    else {

      rePassValid.classList.add('is-invalid');
      rePassValid.classList.remove('is-valid');
      rulesRESign.style.display = 'block';
      successRESign.style.display = 'none';
      return false;
    }
  }

// validation age
function validationAge(){
  const rulesAgeSign = document.querySelector(".rulesAgeSign");
  const successAgeSign = document.querySelector(".successAgeSign");
  const ageValid = document.getElementById("ageValid");

    var ageV = ageValid.value;
    var regxageV = /^(1[89]|[2-7]\d|80)$/;

    if(regxageV.test(ageV)){
        rulesAgeSign.style.display ='none';
        successAgeSign.style.display='block';
        ageValid.classList.add('is-valid');
        ageValid.classList.remove('is-invalid');
        return true
    }else{
        rulesAgeSign.style.display ='block';
        successAgeSign.style.display='none';
        ageValid.classList.add('is-invalid');
        ageValid.classList.remove('is-valid');
        return false
    };
}
// name validation
function validationName(){
  const rulesNSign = document.querySelector(".rulesNSign");
  const successNSign = document.querySelector(".successNSign");
    var nameSign = nameValid.value;
    var regxNameSign = /^\w{3,10}$/;

    if(regxNameSign.test(nameSign)){
        rulesNSign.style.display ='none';
        successNSign.style.display='block';
        nameValid.classList.add('is-valid');
        nameValid.classList.remove('is-invalid');
        return true
    }else{
        rulesNSign.style.display ='block';
        successNSign.style.display='none';
        nameValid.classList.add('is-invalid');
        nameValid.classList.remove('is-valid');
        return false
    };
}
// validation phone
function validationPhone(){
    const phoneValid = document.getElementById("phoneValid");
    const rulesPHSign = document.querySelector(".rulesPHSign");
    const successPHSign = document.querySelector(".successPHSign");
    var phoneValidD = phoneValid.value;
    var regxphoneValidD =/^(010|011|012)\d{8}$/;

    if(regxphoneValidD.test(phoneValidD)){
        rulesPHSign.style.display ='none';
        successPHSign.style.display='block';
        phoneValid.classList.add('is-valid');
        phoneValid.classList.remove('is-invalid');
        return true
    }else{
        rulesPHSign.style.display ='block';
        successPHSign.style.display='none';
        phoneValid.classList.add('is-invalid');
        phoneValid.classList.remove('is-valid');
        return false
    };
}
// email validation
function validaionEmail(){
  const emailValid = document.getElementById("emailValid");
  const rulesSign = document.querySelector(".rulesSign");
  const successSign = document.querySelector(".successSign");
    var email= emailValid.value;
    var regxEmailSign = /^[a-zA-z]{3,9}@(gmail|yahoo)\.com$/;

    if(regxEmailSign.test(email)){
        rulesSign.style.display ='none';
        successSign.style.display='block';
        emailValid.classList.add('is-valid');
        emailValid.classList.remove('is-invalid');
        return true
    }else{
        rulesSign.style.display ='block';
        successSign.style.display='none';
        emailValid.classList.add('is-invalid');
        emailValid.classList.remove('is-valid');
        return false
    };

}

// submit button

function displayContact() {
  document.getElementById("row").innerHTML = "";
  let contact = "";
  contact += `  <div class="col-sm-12 col-lg-6">
  <div class="contactLeft">
      <div class="name">
          <input oninput="validateForm()" id="nameValid" class="form-control" type="text" placeholder="enter your name">
          <div class="rulesNSign">
              <p>your name should have from 3 to 10 charcters without spicial charcters</p>
             </div>
             <div class="successNSign">
              <p>successfuly vaild </p>
             </div>
      </div>
      <div class="number">
          <input oninput="validateForm()" id="phoneValid" class="form-control" type="text" placeholder="enter your phone">
          <div class="rulesPHSign">
              <p>your number should start with "011"or "012" or "010" and must have 11 number without any character</p>
             </div>
             <div class="successPHSign">
              <p>successfuly vaild </p>
             </div>
      </div>
      <div class="passwordSign">
          <input oninput="validateForm()" id="passwordValid" class="form-control" type="password" placeholder="enter your password">
          <div class="rules2Sign">
              <p>your password must be 3 numbers only</p>
             </div>
             <div class="success2Sign">
              <p>successfuly vaild </p>
             </div>
          </div>  
  </div>
</div>
<div class="col-sm-12 col-lg-6">
  <div class="contactLeft">
      <div class="email">
          <input oninput="validateForm()" id="emailValid" class="form-control" type="email" placeholder="enter your Email">
          <div class="rulesSign">
              <p>your E-mail should have from 6 to 8 charcters ,"@", gmail or yahoo only and dont forget ".com"</p>
             </div>
             <div class="successSign">
              <p>successfuly vaild </p>
             </div>
      </div>
      <div class="age">
          <input oninput="validateForm()" id="ageValid" class="form-control" type="text" placeholder="enter your age">
          <div class="rulesAgeSign">
              <p>your age start from 18 till 80 , number only</p>
             </div>
             <div class="successAgeSign">
              <p>successfuly vaild </p>
             </div>
      </div>
      <div class="passwordSign">
          <input oninput="validateForm()" id="rePassValid" class="form-control" type="password" placeholder="repassword again">
          <div class="rulesRESign">
              <p>your password must be 9 and match password</p>
             </div>
             <div class="successRESign">
              <p>successfuly vaild </p>
             </div>
          </div>  
  </div>
</div>
<div class="col-sm-12">
  <div class="btnSubmit">
  <button disabled id="submitButton" class="form-control" type="submit">submit</button>
  </div>
</div>  
       `;
  document.getElementById("rowCont").innerHTML = contact;
  

}


function validateForm(){
    var isPasswordValid = validationPassword();
    var isprePasswordValid = validateRePassword();

    var isAgeValid = validationAge();
    var isNameValid = validationName();
    var isPhoneValid = validationPhone();
    var isEmailValid = validaionEmail();
    var submitButton = document.getElementById('submitButton');

    if (validationPassword() &&  validateRePassword() && validationAge() && validationName() && validationPhone() && validaionEmail()) {
     
      submitButton.removeAttribute("disabled");
    } else {
        submitButton.setAttribute("disabled",true);
    }
  }
