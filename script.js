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
        `
        }).catch((err)=>{
            console.log(err);
    })
// let errMessage = document.querySelector("#error-message");
})