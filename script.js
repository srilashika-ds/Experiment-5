async function getWeather() {
    const city = document.getElementById("cityInput").value;

    if (city === "") {
        document.getElementById("weatherResult").innerHTML =
            "Please enter a city name.";
        return;
    }

    try {
        const response = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`
        );

        const locationData = await response.json();

        if (!locationData.results) {
            document.getElementById("weatherResult").innerHTML =
                "City not found.";
            return;
        }

        const latitude = locationData.results[0].latitude;
        const longitude = locationData.results[0].longitude;
        const cityName = locationData.results[0].name;

        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code&timezone=auto`
        );

        const weatherData = await weatherResponse.json();

        const temperature = weatherData.current.temperature_2m;
        const humidity = weatherData.current.relative_humidity_2m;

        document.getElementById("weatherResult").innerHTML = `
            <h2>${cityName}</h2>
            <p>🌡️ Temperature: ${temperature}°C</p>
            <p>💧 Humidity: ${humidity}%</p>
        `;

    } catch (error) {
        document.getElementById("weatherResult").innerHTML =
            "Unable to fetch weather data.";
    }
}
