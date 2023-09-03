let mealRow = document.getElementById('meal-row-body')
let descRow = document.getElementById('row-desc-clicked')

$(document).ready(function () { 
  
    $(".spinner").fadeOut(1000, function () {
    $("#loading").fadeOut(1000, function () {
      $("body").css("overflow", "auto")
      $("#loading").remove()
    });
  });


  /*
  // // // Start SideBar
  let allLi = $(".inner-sideBar ul li")
  // allLi.eq(0).slideUp(1000)
  // allLi.eq(1).slideUp(500)
  // allLi.eq(2).slideUp(500)
  // allLi.eq(3).slideUp(500)
  // allLi.eq(4).slideUp(500)
  */
  let innerWidth = $(".inner-sideBar").innerWidth()
  $("#side-bar").css({ left: -innerWidth })
  $("#bars").click(function () {
    if ($("#side-bar").css("left") == "0px") {
      openNav()
    } else {
      closeNav()
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
  // // End Side Bar
  
  // // start get home Data
  async function getData(meal) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`);
    let data = await response.json();
    
    displayData(data.meals);
  }
  getData("");
  
  function displayData(arr) {
    let box = ``
    for (let i = 0; i < arr.length; i++) {
      box += `
        <div class="col-md-3">
          <div class="item-pic position-relative">
            <img src="${arr[i].strMealThumb}" class="w-100" alt="meal">
            <div class="layer p-3 d-flex align-items-center">
              <h2>${arr[i].strMeal}</h2>
            </div>
          </div>
        </div>
        `
    }
    mealRow.innerHTML = box;
    /*
      // let allItems = Array.from(document.querySelectorAll(".item-pic"));
      // allItems.forEach((item) => {
      //   $(item).click(function () {
      //     mealDescription(item.id)
      //   })
      // })
      */
    }
  /*
  // async function mealDescription(id) {
  //   let res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
  //   let data = await res.json();
  //   displayMealDesc(data.meals)
  // }
  
  // function displayMealDesc(clickedMeal) {

  //   let box = `
  // <div class="col-md-4 ">
  //   <div class="meal-clicked text-white rounded-3 overflow-hidden">
  //   <img src="${clickedMeal[0].strMealThumb}" class="w-100" alt="">
  //   </div>
  //   <h2 class="text-white p-2">${clickedMeal[0].strMeal}</h2>
  //   </div>
  // <div class="col-md-8">
  // <div class="instructon px-3 mx-2 text-white">
  //     <h2 class="text-white text-capitalize">instructions</h2>
  //     <p>${clickedMeal[0].strInstructions}</p>
  //     <h3><span>Area:</span> ${clickedMeal[0].strArea}</h3>
  //     <h3><span>Category:</span> ${clickedMeal[0].strCategory}</h3>
  //     <h3>Recipes:
  //     <ul class="list-unstyled d-flex flex-wrap">
  //       <li class="recipes py-2 px-1 fs-6 m-2 rounded-2 fw-medium"><small >${clickedMeal[0].strMeasure1}</small></li>
  //     </ul>
  //     </h3>
  //     <h3><span>Tags:</span>
  //     <ul class="list-unstyled d-flex flex-wrap m-1">
  //     <li class="tags py-2 px-1 fs-5 m-2 rounded-2 fw-semibold"><small>${clickedMeal[0].strTags}</small></li>
  //     </ul>
  //     </h3>
  //     <a href="${clickedMeal[0].strSource}" class="btn btn-success me-2" target="_blank">Source</a>
  //     <a href="${clickedMeal[0].strYoutube}" class="btn btn-danger" target="_blank">Youtube</a>
  //     </div>
  //     </div>`
  //   descRow.innerHTML = box;
  //   $("#home").addClass("d-none")
  // }
*/

// Get Search Data
  $("#search-link").click(function () {
    $("#home").addClass('d-none');
    // $("#side-bar").animate({ left: "0px" }, 700)
    // console.log("dddddddddddddddddddddddddd");
  })
  let searchByName = document.getElementById('searchName')
  $("#searchName").keyup( function () {
    let c =searchByName.value;
    getData(c)
    // displayData()
  })




































})