function getWeatherFunction(weatherAPI){
/* Fetch - information for url */
fetch(weatherAPI)
    .then((res)=>{
        return res.json();
    }).then((data)=>{
        // console.log(data); /* see all the data */
        let city = data.nearest_area[0].areaName[0].value;
        let region = data.nearest_area[0].region[0].value;
        let country = data.nearest_area[0].country[0].value;
        let currentWeather = data.current_condition[0].FeelsLikeF;

        /* select main display section */
        let weatherDisplay = document.querySelector(".display");
        weatherDisplay.innerHTML = `
        <h2>${city}</h2>
            <ul id="current-city-weather">
                <li><b>Area:</b> ${city}</li>
                <li><b>Region:</b> ${region}</li>
                <li><b>Country:</b> ${country}</li>
                <li><b>Currently:</b> Feels Like ${currentWeather}˚F</li>
            </ul>
        `;
        /*
        - Three sections below the main section should show information for the next few days.
        - See detailed information for the current day and the next two days below the main `.display` element.
        */
    /* Declare Variables for Today, Tomorrow, Day After*/
        /* TODAY */
        let todayAverage = data.weather[0].avgtempF;
        let todayMaxTemp = data.weather[0].maxtempF;
        let todayMinTemp = data.weather[0].mintempF;
        // console.log("todayAverage:", todayAverage, todayMaxTemp, todayMinTemp); // test

        /* TOMORROW */
        let tomorrowAverage = data.weather[1].avgtempF;
        let tomorrowMaxTemp = data.weather[1].maxtempF;
        let tomorrowMinTemp = data.weather[1].mintempF;
        //  console.log("tomorrowAverage:", tomorrowAverage, tomorrowMaxTemp, tomorrowMinTemp); // test

        /* DAY AFTER TOMORROW*/
        let dayAfterTomorrowAverage = data.weather[2].avgtempF;
        let dayAfterTomorrowMaxTemp = data.weather[2].maxtempF;
        let dayAfterTomorrowMinTemp = data.weather[2].mintempF;
        //  console.log("dayAfterTomorrowAverage:", dayAfterTomorrowAverage, dayAfterTomorrowMaxTemp, dayAfterTomorrowMinTemp); // test

        /* select section where `future-forecast` info will be */
        let futureForecast = document.querySelector("#future-forecast");
        /* Add innerHTML and string interpolation */
        futureForecast.innerHTML = `
            <div id="todays-weather">
            <h3>Today</h3>
            <ul class="temperature-forecast">
                <li><b>Average Temperature:</b> ${todayAverage}˚F</li>
                <li><b>Max Temperature:</b> ${todayMaxTemp}˚F</li>
                <li><b>Min Temperature:</b> ${todayMinTemp}˚F</li>
            </ul>
        </div>
        <div id="tomorrows-weather">
            <h3>Tomorrow</h3>
            <ul class="temperature-forecast">
                <li><b>Average Temperature:</b> ${tomorrowAverage}˚F</li>
                <li><b>Max Temperature:</b> ${tomorrowMaxTemp}˚F</li>
                <li><b>Min Temperature:</b> ${tomorrowMinTemp}˚F</li>
            </ul>
        </div>
        <div id="day-after-weather">
            <h3>Day After Tomorrow</h3>
            <ul class="temperature-forecast">
                <li><b>Average Temperature:</b> ${dayAfterTomorrowAverage}˚F</li>
                <li><b>Max Temperature:</b> ${dayAfterTomorrowMaxTemp}˚F</li>
                <li><b>Min Temperature:</b> ${dayAfterTomorrowMinTemp}˚F</li>
            </ul>
        </div>
        `;

        /*
        - The sidebar retains a link to the search.
        - See the city name and "feels like" temperature show up in the `.history` element.
        - See the new city name appear at the bottom of the list in the `.history` element, with the "feels like" temperature.
        If one of the links in the `.history` element is clicked, the user should:
        - See the main section of the page show weather information about that city.
        - _Not see_ a new link show up in the `.history` element.
        */
        /* select section for previous searches - paragraph */

        if (clickedAnchor === undefined) {
        let history = document.querySelector(".history");
        /* prevent default on link so page does not refresh
        Link to the weather API page */
        history.innerHTML += `
        <a href="${weatherAPI}" onclick="event.preventDefault()">${city}</a> - ${currentWeather}˚F
        `;
        }

        clickedPreviousFunction(); // when `a` exists
        /* Append the li's to the `history p` section every time search is made */
        // let history = document.querySelector(".history");
        
        // let historyHtml = `<a href="weatherAPI" onclick="event.preventDefault()">${city}</a> - ${currentWeather}˚F`

        // let historyLi = document.querySelector(".history li");
        // historyLi.append(historyHtml);

        // history.append(historyLi);

        }).catch((err)=>{
            console.log(err);
    })
}

/* select user input form */
let userInputForm = document.querySelector("#user-input");

userInputForm.addEventListener("submit", (event)=>{
    event.preventDefault();

    /* Get information on user input, not button*/
    let userLocation = event.target["pick-location"].value;

    /* Clears search bar after user input is submitted */
    event.target["pick-location"].value = "";

    let weatherAPI = "https://wttr.in/" + userLocation + "?format=j1";

    getWeatherFunction(weatherAPI);
    // let errMessage = document.querySelector("#error-message");
})


// getWeatherFunction();
let clickedAnchor;

/* EVENT LISTENER */
function clickedPreviousFunction() {
    document.querySelector(".history a").addEventListener("click", (event)=>{
        event.preventDefault();
        clickedAnchor = event.target.href;
        getWeatherFunction(clickedAnchor); // call function
    });
}