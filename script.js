let inputbar = document.getElementById("inputbar");
let searchBtn = document.getElementById("search");

async function checkWeather(city){
    try {
        const response = await fetch(`https://wttr.in/${city}?format=j1`);
        if (!response.ok) {
            alert("Something went wrong...");
            return;
        }
        
        const data = await response.json();

        console.log("Full API data:", data);

        const currentData = data.current_condition[0];

        document.querySelector(".city").textContent = city;
        document.querySelector(".temperature").textContent = currentData.temp_C + "°C";
        document.querySelector(".humidity").textContent = currentData.humidity + "%";
        document.querySelector(".windspeed").textContent = currentData.windspeedKmph + " KM/H";

        const Icon = currentData.weatherDesc[0].value.toLowerCase();
        let weatherIcon = document.querySelector(".icons-img");

        if (Icon.includes("clear")) {
            weatherIcon.src = "images/clear.png";
        } else if (Icon.includes("cloud")) {
            weatherIcon.src = "images/clouds.png";
        } else if (Icon.includes("rain")) {
            weatherIcon.src = "images/rain.png";
        } else if (Icon.includes("mist") || Icon.includes("fog")) {
            weatherIcon.src = "images/mist.png";
        } else if (Icon.includes("drizzle")) {
            weatherIcon.src = "images/drizzle.png";
        } else if (Icon.includes("snow")) {
            weatherIcon.src = "images/snow.png";
        } else if (Icon.includes("wind")) {
            weatherIcon.src = "images/wind.png";
        } else {
            weatherIcon.src = "images/clear.png";
        }

    } catch(error) {
        console.error("Error fetching data:", error);
        alert("Error fetching weather data. Check console for details.");
    }
}

// ✅ Default call (page loads with London weather)
checkWeather("London");

// ✅ Button click
searchBtn.addEventListener("click", () => {
    let city = inputbar.value.trim();
    if (city) {
        checkWeather(city);
    }
});
