import { useState, useEffect } from "react";

export default function Weather(){
    const [city, setcity] = useState('Zocca');
    const [WeatherData, setWeatherData] = useState(null);

    useEffect(() => {
        async function getWeather() {
            const key = import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY;
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`)
                }
                const result = await response.json();
                setWeatherData(result);
                console.log(result);
            } catch (error) {
                console.error(error)
            } finally {

            }
        }
        getWeather();
    }, [city]);
    return(
        <>
        <section>
            <h2>Current Weather</h2>
            {WeatherData && Array.isArray(WeatherData.weather) && WeatherData.weather[0]?.main}
            {/* <form>
                <label htmlFor="city">Enter Name of City</label>
                <input type="text" name="city" id="city"></input>
                    <button type="submit">Get Weather Update</button>
            </form> */}
        </section>
        </>
    )
}