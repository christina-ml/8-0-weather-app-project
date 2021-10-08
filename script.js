let userLocation = "Detroit"
let url = "https://wttr.in/" + userLocation + "?format=j1";


fetch(url)
    .then((res)=>{
        return res.json();
    }).then((data)=>{
        // console.log(data);
        let city = data.nearest_area[0].areaName[0].value;
        console.log(city);

        /* Using a for loop to get city */
        let areaList = data.nearest_area;
        for(let nearest of areaList){
            let { areaName } = nearest;
            let city = areaName[0].value;
            // console.log(city);
        }


/*
When a user enters text into the search form and presses submit, they should:
 See the text disappear from the search bar.
 See the name of the city that was searched as well as the area, region, country, and currently "feels like" temperature for that location.
 See detailed information for the current day and the next two days below the main .display element.
 See the city name and "feels like" temperature show up in the .history element.
*/

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
    <h2>Toronto</h2>
            <ul id="current-city-weather">
                <li><b>Area:</b> Toronto</li>
                <li><b>Region:</b> Ontario</li>
                <li><b>Country:</b> Canada</li>
                <li><b>Currently:</b> Feels Like 92˚F</li>
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