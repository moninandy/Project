import { useState,useEffect } from 'react'
import './App.css'
/*Images */
import SearchIcon from './assets/Search.png';
import SunIcon from './assets/sunny.jpg';
import CloudyIcon from './assets/cloudyy.png';
import HumidityIcon from './assets/humidity.png';
import RainyIcon from './assets/Raniyy.jpg';
import WindIcon from './assets/wind.jpg';
import ClearIcon from './assets/clear.jpg'
// Weather App Details

const WeatherDetails=({icon,temp,city,country,lat,lon,humidity,wind}) =>{
  return(
<>
<div className='image'>
  <img src={icon} alt="Image"   />
</div>
<div className='temp'>{temp} °C </div>
<div className='location'>{city}</div>
<div className='country'>{country}</div>
<div className='cord'>
  <div>
    <span className='lat'>latitude</span>
    <span>{lat}</span>
    </div>
    <div>
    <span className='lon'>longitude</span>
    <span>{lon}</span>
    </div>
    </div>
    <div class="data-container">
      <div className="element">
        <img src={HumidityIcon} alt="humidity" className="icon"/>
      
      <div className='data'>
        <div className="humidity-percent">{humidity}</div>
        <div className='text'>Humidity</div>
      </div>
       </div>
       <div className="element">
        <img src={WindIcon} alt="wind" className="icon"/>
      <div className='data'>
        <div className="wind-percent">{wind}</div>
        <div className='text'>Wind Speed</div>
      </div>
       </div>
</div>
</>
  )
};









function App() {
const[icon,setIcon]=useState(SunIcon);
const[temp,setTemp]=useState();
const[city,setCity]=useState("chennai");
const[country,setCountry]=useState("IN");
const[lat,setLat]=useState(0);
const[lon,setLon]=useState(0);
const[humidity,setHumidity]=useState("");
const[wind,setWind]=useState("");
const[text,setText]=useState("chennai");
const[cityNotFound, setCityNotFound]=useState(false);
const[loading, setLoading]=useState(false);
const[error,setError]=useState(null);

const weatherIconMap={
  "01d":ClearIcon,
  "01n":ClearIcon,
  "02d":CloudyIcon,
  "02n":CloudyIcon,
  "03d":CloudyIcon,
  "03n":RainyIcon,
  "04d":RainyIcon,
  "04n":RainyIcon,
  "09d":RainyIcon,
  "09n":RainyIcon,
  "10d":RainyIcon,
  "10n":RainyIcon,
  "13d":RainyIcon,
  "13n":RainyIcon,


};




const search=async ()=>{
  setLoading(true);
  let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=584675862794c96cf1282a4a535f9de8&units=Metric`;

try{
  let res= await fetch(url);
  let data= await res.json();
 //console.log(data);
 if(data.cod==="404"){
  console.log("city not found");
  setCityNotFound(true);
  setLoading(false)
  return;
 }
 setHumidity(data.main.humidity);
 setWind(data.wind.speed);
 setTemp(Math.floor(data.main.temp));
 setCity(data.name);
 setCountry(data.sys.country);
 setLat(data.coord.lat);
 setLon(data.coord.lon);

const weatherIconCode=data.weather[0].icon;
setIcon(weatherIconMap[weatherIconCode] || ClearIcon);
setCityNotFound(false);
}catch(error){
  console.log("Error Occured", error.message);
  setError("An erroe while fetching data");
}finally{
setLoading(false);
}
}
const handleCity =(e) =>{
setText(e.target.value);

}
const handleKeyDown=(e)=>{
  if(e.key ==="Enter"){
    search();
  }
}
useEffect(function (){
  search();
}, [])


  return (
    <>
      <div className="container">
         <div className="input-container">
             <input type="text" 
             className='cityInput'
              placeholder='search City' 
              onChange={handleCity}
              value={text}
              onKeyDown={handleKeyDown}/>
              <div className='search-icon'>
                <img src={SearchIcon} alt =" " width="15px" onClick={()=>search()}/>
              </div>
              
         </div>
         {loading && <div className='loading-message'>Loading...</div>}
        {error && <div className='error-message'>{error}</div>}
        {cityNotFound && <div className='city-not-found'>City not found</div>}
    
          {!loading && !cityNotFound && <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} lon={lon} humidity={humidity} wind={wind}/>}
        </div>

        
    </>
  )
}

export default App
