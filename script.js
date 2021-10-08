let userLocation = "Detroit"
let url = "https://wttr.in/" + userLocation + "?format=j1";


fetch(url)
    .then((res)=>{
        return res.json();
    }).then((data)=>{
        console.log(data);
        /* Declare variables */
        let city = data.nearest_area[0].areaName[0].value;
        let region = data.nearest_area[0].region[0].value;
        let country = data.nearest_area[0].country[0].value;
        let currentWeather = data.current_condition[0].FeelsLikeF;
        // console.log(city, region, country, currentWeather);

        /* Using a for loop to get city */
        // let areaList = data.nearest_area;
        // for(let nearest of areaList){
        //     let { areaName } = nearest;
        //     let city = areaName[0].value;
        //     console.log(city);
        // }

let getWeatherButton = document.querySelector("#get-weather-button");
getWeatherButton.addEventListener("submit", (e)=>{
    e.preventDefault();

    // grab value of `userInput`
    let weatherLocation = e.target["pick-location"].value;
    console.log("weatherLocation", weatherLocation);

    // make input field blank after each input is submitted
    e.target["pick-location"].value = "";

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
})

/*
If another search is made, the user should:
 See the main .display element change to account for the new city, updating all relevant information.
 See the new city name appear at the bottom of the list in the .history element, with the "feels like" temperature.
*/




    }).catch((err)=>{
        console.log(err);
    })