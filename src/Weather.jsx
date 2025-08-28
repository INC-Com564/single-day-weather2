import { useState, useEffect } from "react";

export default function Weather(){
    const [city, setcity] = useState('Zocca');
    const [WeatherData, setWeatherData] = useState(null);
    const [loading, setloading] = useState(false);
    const [Error, setError] = useState({message: "", status: false});


    function weatherDisplay(){
       if(WeatherData){
        return(
            <div id="weather-div">
                <p>Description <span>{WeatherData.weather[0].description}</span></p>
                <p>Icon <span>{WeatherData.weather[0].icon}</span></p>
                <p>Feels like <span>{WeatherData.main.feels_like}</span></p>
            </div>
        )
       }
    }
    useEffect(() => {
        async function getWeather() {
            setloading(true)
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
                setError({message: error.message, status: true});
            } finally {
              setloading(false);
            }
        }
        getWeather();
    }, [city]);
    return(
        <>
        <section>
            <h2>Current Weather for {city}</h2>

            {loading && <p>Loading...</p>}

            {Error.status && <p>ERROR ERROR... Weather App Down! {Error.message}</p>}
            {WeatherData && weatherDisplay()}
            {/* <form>
                <label htmlFor="city">Enter Name of City</label>
                <input type="text" name="city" id="city"></input>
                    <button type="submit">Get Weather Update</button>
            </form> */}
        </section>
        </>
    )
}