let getWeather = document.querySelector("#get-weather-button");

getWeather.addEventListener("click", (event)=>{
    event.preventDefault();
    function locationInputFunc() {
        let locationInput = document.querySelector("#pick-location").value;
        document.querySelector(".display").innerHTML = locationInput;
        
        // make input field blank after input is submitted
        event.target["pick-location"].value = "";
    }

    /* Fetch - information for url */
    let userLocation = "";
    let url = "https://wttr.in/" + userLocation + "?format=j1";
    fetch(url)
        .then((res)=>{
            return res.json();
        }).then((data)=>{
            let city = data.nearest_area[0].areaName[0].value;
            userLocation = city;

            /* Declare variables */
            let region = data.nearest_area[0].region[0].value;
            let country = data.nearest_area[0].country[0].value;
            let currentWeather = data.current_condition[0].FeelsLikeF;

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