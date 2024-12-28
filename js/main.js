let leftMenu = $(".leftMenu"),
    rightMenu = $(".rightMenu"),
    triggle = $("#triggle"),
    menuItem = $(".nav-item li"); 

triggle.click(function () {
    let menuWidth = leftMenu.outerWidth(); 
    
    if (triggle.hasClass("open")) { // "لو كان مفتوح"
        // اقفلو"
        triggle.removeClass("open").addClass("close");
        
        leftMenu.animate({ left: "0" }, 1000);
        rightMenu.animate({ left: menuWidth }, 1000);

        menuItem.each(function (index) {
            $(this).animate(
                { paddingTop: "3px", opacity: "1" },
                index * 100 + 1000 
            );
        });
    } else { 
        triggle.removeClass("close").addClass("open");// "لو كان مقفول"
        // افتحو"
        
        leftMenu.animate({ left: `-${menuWidth}` }, 1000);
        rightMenu.animate({ left: "0" }, 1000, function () {

            menuItem.animate({ paddingTop: "500px", opacity: "0" }, 1000);
        });
    }
});


let allMovies = [];
let imgPath="https://image.tmdb.org/t/p/w500/";

let moviesContainer = document.getElementById("movies-container");
let category = "now_playing";

async function getMovies(categoryItem) {
    let moviesResponse = await fetch(`https://api.themoviedb.org/3/movie/${categoryItem}?api_key=8613e4e1776af4e8633cc311d67b3e09&language=en-US&page=1`);
    moviesResponse = await moviesResponse.json();
    allMovies = moviesResponse.results;

    displayMovies();
}

getMovies(category);

function displayMovies()
{
    cartoona = "";
    for(let i=0 ; i<allMovies.length ; i++)
    {
        cartoona+=`<div class="col-md-4">
                        <div class="movie-item overflow-hidden my-3">
                            <figure>
                                <img class="img-fluid" src="${imgPath+allMovies[i].poster_path}" alt="film photo" class="w-100">
                            </figure>

                            <div class="layer">
                                <h2 class="fw-bold">${allMovies[i].title}</h2>
                                <p>${allMovies[i].overview}</p>
                                <p>${allMovies[i].release_date}</p>
                                <p class="movie-rate border border-success rounded-circle">${allMovies[i].vote_average}</p>
                            </div>
                        </div>
                    </div>`;
    }
    moviesContainer.innerHTML = cartoona;
};

let menuItems = document.querySelectorAll(".nav-item a");
for(let i=0 ; i<menuItems.length ; i++)
{
    menuItems[i].addEventListener("click" , function(){
        let category = this.getAttribute("movieTitle");
        getMovies(category);
      })
}

/**************************************input search ************************************************/

let searchResultContainer = document.getElementById("searchResult");
let searchResult = [];
let searchFilm = document.getElementById("search");
searchFilm.addEventListener("keyup" , function(){
    search(searchFilm.value);
});

async function search(query)
{
    if(query=="")
    {
        searchResultContainer.innerHTML = "";
        return false;
    }
    let moviesResponse = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=8613e4e1776af4e8633cc311d67b3e09&language=en-US&query=${query}&page=1&include_adult=false`)
    moviesResponse = await moviesResponse.json();
    searchResult = moviesResponse.results;
    displayResult();
}

function displayResult()
{
    let cartoona = "";
    for(let i=0 ; i<searchResult.length ; i++)
    {
        cartoona+=`<div class="col-md-4">
                        <div class="movie-item overflow-hidden my-3">
                            <figure>
                                <img class="img-fluid" src="${imgPath+searchResult[i].poster_path}" alt="film photo" class="w-100">
                            </figure>

                            <div class="layer">
                                <h2 class="fw-bold">${searchResult[i].title}</h2>
                                <p>${searchResult[i].overview}</p>
                                <p>${searchResult[i].release_date}</p>
                                <p class="movie-rate border border-success rounded-circle">${searchResult[i].vote_average}</p>
                            </div>
                        </div>
                    </div>`;
    }
    searchResultContainer.innerHTML = cartoona;
}

/*******************************************contact-us**********************************************/
  const nameRegex = /^[a-zA-Z ]{3,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^(?:\+?20)?(?:0)?1[0-9]{9}$/i;
  const ageRegex = /^[1-9][0-9]?$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;


  const inputs = [
    { id: 'name', regex: nameRegex, errorClass: 'name-masege', errorMessage: 'Name must be at least 3 characters.' },
    { id: 'mail', regex: emailRegex, errorClass: 'mail-masege', errorMessage: 'Enter a valid email address.' },
    { id: 'phone', regex: phoneRegex, errorClass: 'phone-masege', errorMessage: 'NOt Vaild Phone Number Must Be As (01234567891,201234567890,+201234567890 )' },
    { id: 'age', regex: ageRegex, errorClass: 'age-masege', errorMessage: 'Age must be a number between 1 and 99.' },
    { id: 'pass', regex: passwordRegex, errorClass: 'pass-masege', errorMessage: 'Password Must more than 8 char and atleast one uppercase, lowercase' },
    { id: 're-pass', match: 'pass', errorClass: 'repass-masege', errorMessage: 'Passwords do not match.' }
  ];

  const submitBtn = document.querySelector('.button-sl');
  let firstInputEntered = false;

  inputs.forEach(({ id, regex, match, errorClass, errorMessage }) => {
    const input = document.getElementById(id);
    const errorElement = document.querySelector(`.${errorClass}`);

    input.addEventListener('input', () => {
      let isValid;
      if (regex) {
        isValid = regex.test(input.value);
      } else if (match) {
        const matchValue = document.getElementById(match).value;
        isValid = input.value === matchValue;
      }

      if (isValid) {
        input.classList.add('valid');
        input.classList.remove('invalid');
        errorElement.textContent = '';
      } else {
        input.classList.add('invalid');
        input.classList.remove('valid');
        errorElement.textContent = errorMessage;
      }

      if (!firstInputEntered) {
        firstInputEntered = true;
        submitBtn.classList.add('moving');
      }

      validateForm();
    });
  });

  function validateForm() {
    const allValid = inputs.every(({ id, regex, match }) => {
      const input = document.getElementById(id);
      if (regex) {
        return regex.test(input.value);
      } else if (match) {
        const matchValue = document.getElementById(match).value;
        return input.value === matchValue;
      }
    });

    if (allValid) {
      submitBtn.classList.remove('moving');
      submitBtn.style.transform = 'none';
      submitBtn.style.backgroundColor = 'red';
    }
  }

  submitBtn.addEventListener('mouseover', () => {
    if (submitBtn.classList.contains('moving')) {
      const x = Math.random() * 200 - 100;
      const y = Math.random() * 200 - 100;
      submitBtn.style.transform = `translate(${x}px, ${y}px)`;
    }
  });