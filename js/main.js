let homeRow = document.getElementById('meal-row-body');
let descRow = document.getElementById("row-desc-clicked")
let clickedMeal = [];
let clickedCategory = [];

// // // //       Start Loading           // // //


$(document).ready(function () {
  $('#loading').fadeOut(1000, function () {
    $('body').css("overflow", "auto")
    $("#loading").remove()
  });


  // // // Start SideBar
  // allLi.eq(0).slideUp(1000)
  // allLi.eq(1).slideUp(500)
  // allLi.eq(2).slideUp(500)
  // allLi.eq(3).slideUp(500)
  // allLi.eq(4).slideUp(500)

  // inner loading functions
  function loadFadeIn() {
    $(".spinner").fadeIn(100, function () {
      $("#loading").css("zIndex", 999).fadeIn(100)
    })
  }

  function loadFadeOut() {
    $(".spinner").fadeOut(1000, function () {
      $("#loading").fadeOut(1000)
    })
  }
// End inner Loading function
  let innerWidth = $(".inner-sideBar").innerWidth()
  $("#side-bar").css({ left: -innerWidth })
  $("#bars").click(function () {
    let allLi = $(".inner-sideBar ul li")
    if ($("#side-bar").css("left") == "0px") {
      openNav()
      allLi.eq(0).removeClass('animate__backInUp')
      allLi.eq(1).removeClass('animate__backInUp')
      allLi.eq(2).removeClass('animate__backInUp')
      allLi.eq(3).removeClass('animate__backInUp')
      allLi.eq(4).removeClass('animate__backInUp')

    } else {
      closeNav()
      allLi.eq(0).addClass('animate__backInUp')
      allLi.eq(1).addClass('animate__backInUp')
      allLi.eq(2).addClass('animate__backInUp')
      allLi.eq(3).addClass('animate__backInUp')
      allLi.eq(4).addClass('animate__backInUp')
    }

  })

  function openNav() {
    $("#side-bar").animate({ left: -innerWidth }, 700)
    $("#bars").removeClass("fa-x");
    $("#bars").addClass("fa-align-justify");
  }
  function closeNav() {
    $("#side-bar").animate({ left: "0px" }, 700)
    $("#bars").removeClass("fa-align-justify");
    $("#bars").addClass("fa-x");
  }
  // // // End Side Bar
  // home data api
  async function getHomeData() {
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    let data = await res.json();
    displayHomeMeal(data.meals)
  }
  // clicked img data api ========================================================================>>>>&&&
  async function getClickedImgData(id) {
loadFadeIn()
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    let imgData = await res.json();
    loadFadeOut()
    return imgData.meals;
  }
  // /// // // //
  function displayHomeMeal(arr) {
    let mealItem = ``
    for (let i = 0; i < arr.length; i++) {
      mealItem += ` 
    <div class="col-md-3">
      <div class="item-pic position-relative">
        <img src="${arr[i].strMealThumb}" class="w-100" alt="meal">
        <div class="layer p-3 d-flex align-items-center">
        <h2>${arr[i].strMeal}</h2>
        </div>
      </div>
    </div>`
    }
    homeRow.innerHTML = mealItem;

    let allItems = Array.from(document.querySelectorAll(".item-pic"));
    // console.log("all", allItems);
    for (let j = 0; j < allItems.length; j++) {
      allItems[j].addEventListener("click", async () => {
        console.log(arr[j].idMeal);
        clickedMeal = await getClickedImgData(arr[j].idMeal);
        console.log(clickedMeal);
        $('#home').addClass('d-none');
        $('#meal-description').removeClass('d-none');
        displayMealDesc()
      })
    }

  }


  getHomeData();



  function displayMealDesc() {
    let recpies = ``;
    for (let i = 1; i <= 20; i++) {
      if (clickedMeal[0][`strMeasure${i}`] != " " && clickedMeal[0][`strMeasure${i}`] != "") {
        recpies += `
          <li class="recipes py-2 px-1 fs-6 m-2 rounded-2 fw-medium"><small >${clickedMeal[0][`strMeasure${i}`]} ${clickedMeal[0][`strIngredient${i}`]}</small></li>
        `
      }
    }
    let tags = clickedMeal[0].strTags?.split(",");

    console.log(tags);
    let showTag = tags.map((tag) => {

      return `<li class="tags py-2 px-1 fs-5 m-2 rounded-2 fw-semibold"><small>${tag}</small></li>`
    }).join("")
    console.log(showTag);
    let box = `
  <div class="col-md-4 ">
    <div class="meal-clicked text-white rounded-3 overflow-hidden">
    <img src="${clickedMeal[0].strMealThumb}" class="w-100" alt="">
    </div>
    <h2 class="text-white p-2">${clickedMeal[0].strMeal}</h2>
    </div>
  <div class="col-md-8">
  <div class="instructon px-3 mx-2 text-white">
      <h2 class="text-white text-capitalize">instructions</h2>
      <p>${clickedMeal[0].strInstructions}</p>
      <h3><span>Area:</span> ${clickedMeal[0].strArea}</h3>
      <h3><span>Category:</span> ${clickedMeal[0].strCategory}</h3>
      <h3>Recipes:
      <ul class="list-unstyled d-flex flex-wrap">
      ${recpies}
      </ul>
      </h3>
      <h3><span>Tags:</span>
      <ul class="list-unstyled d-flex flex-wrap m-1">
      ${showTag}
      </ul>
      </h3>
      <a href="${clickedMeal[0].strSource}" class="btn btn-success me-2" target="_blank">Source</a>
      <a href="${clickedMeal[0].strYoutube}" class="btn btn-danger" target="_blank">Youtube</a>
      </div>
      </div>`
    descRow.innerHTML = box;
  }




  // strMealThumb
  // strMeal
  // strInstructions
  // strArea
  // strCategory
  // strMeasure1
  // strTags
  // strSource
  // strYoutube



  // // get search data by name
  $("#search-link").click(function () {
    $("#home").addClass('d-none');
    $("#meal-description").addClass('d-none')
    $("#area").addClass('d-none')
    $("#ingredients").addClass('d-none')
    $("#contact").addClass('d-none')
    $('#search').removeClass('d-none');

  })

  let searchResult = [];
  $("#searchName").keyup(async function () {
    let x = document.getElementById('searchName').value;
    searchResult = await getSearchNameData(x);
    $("home").removeClass('d-block');
    $("#meal-description").removeClass('d-none')

    searchNameDisplay(searchResult);
  })

  async function getSearchNameData(seaValue) {
loadFadeIn()
    let searchRes = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${seaValue}`)
    let searchData = await searchRes.json();
    loadFadeOut()
    return searchData.meals;

  }

  function searchNameDisplay(arr) {
    let searchCartoona = ``;
    for (let i = 0; i < arr.length; i++) {
      searchCartoona += ` 
    <div class="col-md-3">
      <div class="item-pic position-relative">
        <img src="${arr[i].strMealThumb}" class="w-100" alt="meal">
        <div class="layer p-3 d-flex align-items-center">
        <h2>${arr[i].strMeal}</h2>
        </div>
      </div>
      </div>`
    }
    document.getElementById('search-row').innerHTML = searchCartoona;
    let allItems = Array.from(document.querySelectorAll("#search .item-pic"));
    console.log("allsea", allItems);
    for (let j = 0; j < allItems.length; j++) {
      allItems[j].addEventListener("click", async () => {
        // console.log(arr[j].idMeal);
        clickedMeal = await getClickedImgData(arr[j].idMeal);
        console.log("desc sEa", clickedMeal);
        $('#home').addClass('d-none');
        $('#meal-description').removeClass('d-none');
        displayMealDesc()
        $('#search').addClass('d-none');
      })
    }

  }

  // search by letter

  $("#search-link").click(function () {

    $("#home").addClass('d-none');
    $('#search').removeClass('d-none');
    $("#side-bar").animate({ left: -innerWidth }, 700);
    $("#bars").addClass("fa-align-justify");
    $("#bars").removeClass("fa-x");

  })
  let searchLetterResult = [];
  $("#searchLetter").keyup(async function () {
    let x = document.getElementById('searchLetter').value;
    if (x != "") {
      searchLetterResult = await getSearchLetterData(x);
    } else {
      getHomeData()
    }
  })

  async function getSearchLetterData(seaValue) {
loadFadeIn()
    let searchRes = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${seaValue}`)
    let searchData = await searchRes.json();
    loadFadeOut()
    searchLetterDisplay(searchData.meals)
  }

  function searchLetterDisplay(arr) {
    let searchCartoona = ``;
    for (let i = 0; i < arr.length; i++) {
      searchCartoona += ` 
    <div class="col-md-3">
      <div class="item-pic position-relative">
        <img src="${arr[i].strMealThumb}" class="w-100" alt="meal">
        <div class="layer p-3 d-flex align-items-center">
        <h2>${arr[i].strMeal}</h2>
        </div>
      </div>
    </div>`
    }
    document.getElementById('search-row').innerHTML = searchCartoona;
    let allItems = Array.from(document.querySelectorAll("#search .item-pic"));
    console.log("allsea", allItems);
    for (let j = 0; j < allItems.length; j++) {
      allItems[j].addEventListener("click", async () => {
        // console.log(arr[j].idMeal);
        clickedMeal = await getClickedImgData(arr[j].idMeal);
        console.log("desc sEa", clickedMeal);
        $('#home').addClass('d-none');
        $('#meal-description').removeClass('d-none');
        displayMealDesc()
        $('#search').addClass('d-none');
      })
    }
  }

  // // // ===============================================Category=================================================

  $("#category-link").click(async function () {
    $("#home").addClass('d-none');
    $('#area').addClass('d-none');
    $('#search').addClass('d-none');
    $('#ingredients').addClass('d-none');
    $('#contact').addClass('d-none');
    $('#categories').removeClass('d-none');
    openNav();
    await getCategoryData();
  })
  let dataList = [];
  async function getCategoryData() {
loadFadeIn()
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let categData = await res.json();
    dataList = categData.categories;
    loadFadeOut()
    console.log(categData);

    categoryDisplay(dataList);
  }




  function categoryDisplay(cate) {
    let cartoona = ``;
    for (let i = 0; i < cate.length; i++) {
      cartoona += `
            <div class="col-md-3">
          <div  class="item-pic position-relative" >
            <img src="${cate[i].strCategoryThumb}" class="w-100" alt="meal">
            <div class="layer p-3 text-center ">
              <h2>${cate[i].strCategory}</h2>
              <p>${cate[i].strCategoryDescription.slice(0, 120)}</p>
            </div>
            </div>
        </div>
        `
    }
    document.getElementById("category-row").innerHTML = cartoona;
    let cateItems = Array.from(document.querySelectorAll("#categories .item-pic"));
    for (let j = 0; j < cateItems.length; j++) {
      cateItems[j].addEventListener("click", async function () {
        clickedCategory = await getCategoryList(cate[j].strCategory);
        console.log(clickedCategory);
        categoryInnerDisplay()
      })
    }
  }


  // // =========================================Get Category List===========================================
  async function getCategoryList(dd) {
loadFadeIn()
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${dd}`);
    let cateFilter = await res.json();
    loadFadeOut()
    // console.log("bozoo", cateFilter);
    return cateFilter.meals;
  }

  let innerCategory = [];
  function categoryInnerDisplay() {
    document.getElementById("category-row").innerHTML = "";
    let cartoona = ``;
    for (let i = 0; i < clickedCategory.length; i++) {
      cartoona += `
            <div class="col-md-3">
          <div  class="item-pic position-relative categ-inner" >
            <img src="${clickedCategory[i].strMealThumb}" class="w-100" alt="meal">
            <div class="layer p-3 d-flex align-items-center ">
              <h2>${clickedCategory[i].strMeal}</h2>
              
            </div>
            </div>
        </div>
        `
    }

    document.getElementById("category-row").innerHTML = cartoona;

    let allItems = Array.from(document.querySelectorAll("#categories .item-pic"));
    console.log("allsea", allItems);
    for (let j = 0; j < allItems.length; j++) {
      allItems[j].addEventListener("click", async () => {
        clickedMeal = await getClickedImgData(clickedCategory[j].idMeal);
        console.log("desc sEa", clickedMeal);
        $('#home').addClass('d-none');
        $('#meal-description').removeClass('d-none');
        displayMealDesc()
        $('#search').addClass('d-none');
        $("#categories").addClass('d-none')
      })
    }
  }

  // // // ===========================================end All Category===========================================

  // // // ===================================================Get Area==========================================

  $("#area-link").click(async function () {
    $("#home").addClass('d-none');
    $('#categories').addClass('d-none');
    $('#search').addClass('d-none');
    $('#ingredients').addClass('d-none');
    $('#contact').addClass('d-none');
    $('#area').removeClass('d-none');
    openNav();
    await getAreaData();
  })
  let dataListArea = [];
  async function getAreaData() {
loadFadeIn()
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    let areaData = await res.json();
    dataListArea = areaData.meals;
    loadFadeOut()
    console.log(areaData);

    areaDisplay(dataListArea);
  }


  function areaDisplay(area) {
    let cartoona = ``;
    for (let i = 0; i < area.length; i++) {
      cartoona += `
          <div class="col-md-3">
            <div class="item-area  position-relative text-white text-center ">
              <i class="fa-solid fa-house-laptop fa-5x "></i>
              <h2 >${area[i].strArea}</h2>
            </div>
          </div>
        `
    }

    document.getElementById("area-row").innerHTML = cartoona;

    let areaItems = Array.from(document.querySelectorAll("#area .item-area"));
    console.log(areaItems);
    for (let j = 0; j < areaItems.length; j++) {
      areaItems[j].addEventListener("click", async function () {
        // console.log(area[j].strArea);
        clickedCategory = await getAreaList(area[j].strArea);
        console.log(clickedCategory);
        areaInnerDisplay()
      })
    }
  }

  // // ======================== Get Area List ================================
  async function getAreaList(areaName) {
loadFadeIn()
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`);
    let areaFilter = await res.json();
    loadFadeOut()
    // console.log("bozoo", areaFilter);
    return areaFilter.meals;
  }


  // let innerArea = [];
  function areaInnerDisplay() {
    document.getElementById("area-row").innerHTML = "";
    let cartoona = ``;
    for (let i = 0; i < clickedCategory.length; i++) {
      cartoona += `
            <div class="col-md-3">
          <div  class="item-pic position-relative categ-inner" >
            <img src="${clickedCategory[i].strMealThumb}" class="w-100" alt="meal">
            <div class="layer p-3 d-flex align-items-center ">
              <h2>${clickedCategory[i].strMeal}</h2>
            </div>
            </div>
        </div>
        `
    }

    document.getElementById("area-row").innerHTML = cartoona;

    let allItems = Array.from(document.querySelectorAll("#area .item-pic"));
    console.log("allsea", allItems);
    for (let j = 0; j < allItems.length; j++) {
      allItems[j].addEventListener("click", async () => {
        clickedMeal = await getClickedImgData(clickedCategory[j].idMeal);
        console.log("desc sEa", clickedMeal);
        $('#home').addClass('d-none');
        $('#meal-description').removeClass('d-none');
        displayMealDesc()
        $('#search').addClass('d-none');
        $("#categories").addClass('d-none')
        $("#area").addClass('d-none')
      })
    }
  }

  // // // ===============================================End Get Area==========================================

  // // // ===============================================Start Get Ingredients==========================================


  $("#ingred-link").click(async function () {
    $("#home").addClass('d-none');
    $('#categories').addClass('d-none');
    $('#search').addClass('d-none');
    $('#area').addClass('d-none');
    $('#contact').addClass('d-none');
    $('#ingredients').removeClass('d-none');
    openNav();
    await getIngredData();
  })
  let dataListIngred = [];
  async function getIngredData() {
loadFadeIn()
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let ingredData = await res.json();
    dataListIngred = ingredData.meals.slice(0, 20);
    loadFadeOut()
    console.log(dataListIngred);

    ingredDisplay(dataListIngred);
  }


  function ingredDisplay(ingred) {

    let cartoona = ``;
    for (let i = 0; i < ingred.length; i++) {
      cartoona += `
          <div class="col-md-3">
            <div class="item-ingred  position-relative text-white text-center ">
              <i class="fa-solid fa-drumstick-bite fa-4x"></i>
              <h2 >${ingred[i].strIngredient}</h2>
              <p >${ingred[i].strDescription.slice(0, 120)}</p>
            </div>
          </div>
        `
    }

    document.getElementById("ingredients-row").innerHTML = cartoona;

    let ingredItems = Array.from(document.querySelectorAll("#ingredients .item-ingred"));
    console.log(ingredItems);
    for (let j = 0; j < ingredItems.length; j++) {
      ingredItems[j].addEventListener("click", async function () {
        // console.log(area[j].strArea);
        clickedCategory = await getingredList(ingred[j].strIngredient);
        console.log(clickedCategory);
        ingredInnerDisplay()
      })
    }
  }

  // // // ingred list

  async function getingredList(ingredName) {
loadFadeIn()
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredName}`);
    let ingredFilter = await res.json();
    loadFadeOut()
    // console.log("ing", ingredFilter.meals);
    return ingredFilter.meals;
  }


  // let innerArea = [];
  function ingredInnerDisplay() {
    document.getElementById("ingredients-row").innerHTML = "";
    let cartoona = ``;
    for (let i = 0; i < clickedCategory.length; i++) {
      cartoona += `
            <div class="col-md-3">
          <div  class="item-pic position-relative categ-inner" >
            <img src="${clickedCategory[i].strMealThumb}" class="w-100" alt="meal">
            <div class="layer p-3 d-flex align-items-center ">
              <h2>${clickedCategory[i].strMeal}</h2>
              
            </div>
            </div>
        </div>
        `
    }

    document.getElementById("ingredients-row").innerHTML = cartoona;

    let allItems = Array.from(document.querySelectorAll("#ingredients .item-pic"));
    console.log("allsea", allItems);
    for (let j = 0; j < allItems.length; j++) {
      allItems[j].addEventListener("click", async () => {
        clickedMeal = await getClickedImgData(clickedCategory[j].idMeal);
        console.log("desc ingred", clickedMeal);
        $('#home').addClass('d-none');
        $('#search').addClass('d-none');
        $('#meal-description').removeClass('d-none');
        displayMealDesc()
        $("#categories").addClass('d-none')
        $("#area").addClass('d-none')
        $("#ingredients").addClass('d-none')
      })
    }
  }

  // // // ===============================================End Get Ingredients==========================================


  // // // ===============================================Start Get Contacts==========================================
  $("#contact-link").click(function () {
    $("#home").addClass('d-none');
    $('#categories').addClass('d-none');
    $('#search').addClass('d-none');
    $('#area').addClass('d-none');
    $('#ingredients').addClass('d-none');
    document.getElementById("contact").classList.replace('d-none','d-flex')
    // $('#contact').addClass('d-flex');
    openNav();

    
  })
  $("#Name").keyup(() => {
    // console.log("name");
    if (nameRegexValid() == true) {
      $("#NameAlert").addClass("d-none");
      $("#NameAlert").removeClass("d-block");
    } else {
      $("#NameAlert").removeClass("d-none");
      $("#NameAlert").addClass("d-block");
      
    }
    checkAll();
  })

  $("#Email").keyup(() => {
    if (emailRegexValid() == true) {
      $("#EmailAlert").addClass("d-none");
      $("#EmailAlert").removeClass("d-block");
    } else {
      $("#NameAlert").removeClass("d-none");
      $("#NameAlert").addClass("d-block");
    }
    checkAll();
  })

  $("#Phone").keyup(() => {
    if (phoneRegexValid() == true) {
      $("#PhoneAlert").addClass("d-none");
      $("#PhoneAlert").removeClass("d-block");
    } else {
      $("#PhoneAlert").removeClass("d-none");
      $("#PhoneAlert").addClass("d-block");
    }
    checkAll();
  })

  $("#Age").keyup(() => {
    if (ageRegexValid() == true) {
      $("#AgeAlert").addClass("d-none");
      $("#AgeAlert").removeClass("d-block");
    } else {
      $("#AgeAlert").removeClass("d-none");
      $("#AgeAlert").addClass("d-block");
    }
    checkAll();
  })
  $("#Password").keyup(() => {
    if (passwordRegexValid() == true) {
      $("#PasswordAlert").addClass("d-none");
      $("#PasswordAlert").removeClass("d-block");
    } else {
      $("#PasswordAlert").removeClass("d-none");
      $("#PasswordAlert").addClass("d-block");
    }
    checkAll();
  })
  $("#Repassword").keyup(() => {
    if (repasswordRegexValid() == true) {
      $("#RepasswordAlert").addClass("d-none");
      $("#RepasswordAlert").removeClass("d-block");
    } else {
      $("#RepasswordAlert").removeClass("d-none");
      $("#RepasswordAlert").addClass("d-block");
    }
    checkAll();
  })

  function checkAll() {
    if (nameRegexValid() == true &&
      emailRegexValid() == true &&
      phoneRegexValid() == true &&
      ageRegexValid() == true &&
      passwordRegexValid() == true &&
      repasswordRegexValid() == true) {
        submit.removeAttribute("disabled")
      } else {
        submit.setAttribute("disabled", true)
      }
}


  // $('#loading').removeClass('d-none');
  // $('#loading').fadeIn(0)


  // $('#loading').fadeOut(500, () => {
  //   $('#loading').addClass('d-none')
  // })







  function nameRegexValid() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("Name").value))
  }

  function emailRegexValid() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("Email").value))
  }

  function phoneRegexValid() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("Phone").value))
  }

  function ageRegexValid() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("Age").value))
  }

  function passwordRegexValid() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("Password").value))
  }

  function repasswordRegexValid() {
    return document.getElementById("repasswordInput").value == document.getElementById("Repassword").value
  }
  // // // ===============================================End Get Contacts==========================================




});


// https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast












































// })