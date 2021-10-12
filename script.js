function callBackFunction(cityLocation, addOrNotAdd){
    let errMessage = document.querySelector("#error-message");
        if (cityLocation !== ""){
            errMessage.textContent = "";
            /* Clears search bar after user input is submitted */
            let input = document.querySelector("#pick-location");
            input.value = "";
            // event.target["pick-location"].value = "";
            let weatherAPI = "https://wttr.in/" + cityLocation + "?format=j1";
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
                <div id="current-city-weather-title>
                    <h2>${city}</h2>
                        <ul id="current-city-weather">
                            <li><b>Area:</b> ${city}</li>
                            <li><b>Region:</b> ${region}</li>
                            <li><b>Country:</b> ${country}</li>
                            <li><b>Currently:</b> Feels Like ${currentWeather}˚F</li>
                        </ul>
                </div>
                <div id="future-forecast" class="display"></div>
                `;
                /* ^^ future-forecast only appears on page using javascript */

            /* Declare Variables for Today, Tomorrow, Day After*/
                /* TODAY */
                let todayAverage = data.weather[0].avgtempF;
                let todayMaxTemp = data.weather[0].maxtempF;
                let todayMinTemp = data.weather[0].mintempF;

                /* TOMORROW */
                let tomorrowAverage = data.weather[1].avgtempF;
                let tomorrowMaxTemp = data.weather[1].maxtempF;
                let tomorrowMinTemp = data.weather[1].mintempF;

                /* DAY AFTER TOMORROW*/
                let dayAfterTomorrowAverage = data.weather[2].avgtempF;
                let dayAfterTomorrowMaxTemp = data.weather[2].maxtempF;
                let dayAfterTomorrowMinTemp = data.weather[2].mintempF;

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

                if (addOrNotAdd) {       
                    /* START - ADD PREVIOUS SEARCHES */
                    // let history = document.querySelector(".history");
                    let historyP = document.querySelector(".history p");
                    historyP.textContent = ""; // clears default paragraph text
                    // historyP.innerHTML =`
                    // <ul>
                    //     <li><a href="weatherAPI" onclick="event.preventDefault()">${city}</a> - ${currentWeather}˚F</li>
                    // </ul>
                    // `
                    // let divHistoryContainer = document.createElement("div");
    
                    /* Create elements */
                    // let ul = document.createElement("ul");
                    let li = document.createElement("li");
                    let anchor = document.createElement("a");
                    anchor.textContent = `${city}`;
                    anchor.setAttribute("href", "#");
                    // anchor.setAttribute("onclick", "event.preventDefault()");
                    li.textContent =` - ${currentWeather}˚F`;
    
                    /* append elements together, adds item to list. */
                    li.prepend(anchor);
                    let ul = document.querySelector(".history ul")
                    ul.append(li);
                    // historyP.append(ul); // adds item to list.
    
                    /* When sidebar item is clicked, update main section too. */
                    let historyA = document.querySelectorAll(".history a");
                    // console.log(historyA);
    
                    historyA.forEach((tag)=>{
                        tag.addEventListener("click", (event)=>{
                            event.preventDefault();
                            // console.log(event.target.textContent);
                            let forHyperLinks = event.target.textContent; // city name clicked on
                            callBackFunction(forHyperLinks, false); // should not add
                        })
                    });
                }

                /* END - ADD PREVIOUS SEARCHES */
                }).catch((err)=>{
                    console.log(err);
            })
        } else {
            errMessage.textContent = "Please choose a location!";
        }
    // })
}

let userInputForm = document.querySelector("#user-input");
userInputForm.addEventListener("submit", (event)=>{
    event.preventDefault();
    let userInput = event.target["pick-location"].value;
    callBackFunction(userInput, true);
})