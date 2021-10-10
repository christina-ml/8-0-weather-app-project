/* select user input form */
let userInputForm = document.querySelector("#user-input");

userInputForm.addEventListener("submit", (event)=>{
    event.preventDefault();

    /* Get information on user input, not button*/
    let userLocation = event.target["pick-location"].value;

    /* Clears search bar after user input is submitted */
    event.target["pick-location"].value = "";

    /* Fetch - information for url */
    fetch("https://wttr.in/" + userLocation + "?format=j1")
    .then((res)=>{
        return res.json();
    }).then((data)=>{
        console.log(data); /* see all the data */
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
        let todayAverage = "80";
        let todayMaxTemp = "88";
        let todayMinTemp = "72";

        /* TOMORROW */
        let tomorrowAverage = "80";
        let tomorrowMaxTemp = "88";
        let tomorrowMinTemp = "72";

        /* DAY AFTER TOMORROW*/
        let dayAfterTomorrowAverage = "80";
        let dayAfterTomorrowMaxTemp = "88";
        let dayAfterTomorrowMinTemp = "72";

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
        `





        }).catch((err)=>{
            console.log(err);
    })
// let errMessage = document.querySelector("#error-message");
})