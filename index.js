const container = document.querySelector(".container");
const search = document.querySelector(".search-container button");
const Weather = document.querySelector(".weather");
const weatherDetails = document.querySelector(".weather-details");
const not_found = document.querySelector(".not-found-404");

function getCardinalDirection(angle) {
    const directions = ['↑ N', '↗ NE', '→ E', '↘ SE', '↓ S', '↙ SW', '← W', '↖ NW'];
    return directions[Math.round(angle / 45) % 8];
}

search.addEventListener('click', () => {
    const apiKey = '63302c32cb55231008f0acd4e42ac6b5'
    const city = document.querySelector('.search').value;
    console.log(city)
    if (city === "") {
        return;
    }
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric `).then(response => response.json()).then(json => {
        console.log(json)
        console.log(json.cod)
        if (json.cod === '404') {
            container.style.height = '350px';
            // Weather.style.display = "none";
            // weatherDetails.style.display = "none";
            not_found.style.display = "block";
            not_found.classList.add('fadeIn')
            return;
        }
        not_found.style.display = "none";
        not_found.classList.remove('fadeIn')
        const img = document.querySelector(".weather img");
        const temp = document.querySelector(".temperature");
        const desc = document.querySelector(".description");
        const humidity = document.querySelector('.humidity .humidityValue');
        const wind = document.querySelector('.wind .windValue');
        switch (json.weather[0].main) {
            case "Clear":
                img.src = "assets//clear.png";
                break;
            case "Snow":
                img.src = "assets//snow.png";
                break;
            case "Rain":
                img.src = "assets//rain.png";
                break;
            case "Cloud":
                img.src = "assets//cloud.png";
                break;
            case "Mist":
                img.src = "assets//mist.png";
                break;
            default:
                img.src = ""
        }
        temp.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        desc.innerHTML = `${json.weather[0].description}`
        humidity.innerHTML =`${parseInt(json.main.humidity)}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}kmph ${getCardinalDirection(json.wind.deg)}`;
        Weather.style.display = '';
        weatherDetails.style.display = "";
        Weather.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height="550px"

    })
})