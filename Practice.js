const inputbar = document.getElementById("inputbar");
const searchbar = document.getElementById("search");

async function checkWeather(city){
    try{
        let response = await fetch(`https://wttr.in/${city}?format=j1`);
        if(!response.ok){
            alert("Something went wrong...");
            return;
        }

        let data = await response.json();
        console.log("Fetched Data: " + data);

        let currentData = data.current_condition[0];

        document.querySelector(".temperature").innerText = currentData.temp_C + "°C";
        document.querySelector(".city").innerText = city;
        document.querySelector(".humidity").innerText = currentData.humidity + "%";
        document.querySelector(".windspeed").innerText = currentData.windspeedKmph + "km/h";

        const Icon = currentData.weatherDesc[0].value.toLowerCase();
        let weatherIcon = document.querySelector(".icons-img");

        if(Icon.includes("clear")){
            weatherIcon.src = "images/clear.png";
        }
        else if(Icon.includes("snow")){
            weatherIcon.src = "images/snow.png";
        }
        else if(Icon.includes("rain")){
            weatherIcon.src = "images/rain.png";
        }
        else if(Icon.includes("drizzle")){
            weatherIcon.src = "images/drizzle.png";
        }
        else if(Icon.includes("wind")){
            weatherIcon.src = "images/wind.png";
        }
        else if(Icon.includes("mist") || Icon.includes("fog")){
            weatherIcon.src = "images/mist.png";
        }
        else if(Icon.includes("cloud")){
            weatherIcon.src = "images/clouds.png";
        } else {
            weatherIcon.src = "images/clear.png";
        }

    }catch(error){
        alert("Something went wrong: " + error);
        return;
    }
}

checkWeather("London");

searchbar.addEventListener("click",()=>{
    let city = inputbar.value.trim();
    if(city){
        checkWeather(city);
    } else {
    alert("Something went wrong.");
}})
