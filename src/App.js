
import './App.css';
import UilReact from '@iconscout/react-unicons/icons/uil-react'
import TopButtons from './components/TopButtons';
import Input from './components/Input';
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import Forecast from './components/Forecast';
import getFormattedWeatherData from './services/weatherService';
import { useEffect, useState, React } from 'react';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';



function App() {


  const [query, setQuery] = useState({q: 'colombo'})
  const [units, setUnits] = useState('metric')
  const [weather, setWeather] = useState(null)

  useEffect(() => {

    const fetchWeather = async () => {

      const message = query.q ? query.q : "current location.";
      toast.info("Featching weather for " + message);

      await getFormattedWeatherData({...query,units}).then(
        (data) => {
          setWeather(data);
        });

    };
  
    fetchWeather();
    console.log(weather);

  }, [query,units])
  
  const formatBackground = () => {
    if (!weather) return 'from-cyan-700 to-blue-700'
    const threshold = units === 'metric' ? 20 : 60
    if (weather.temp <= threshold) return 'from-cyan-700 to-blue-700'

    return 'from-yellow-700 to-orange-700'
  }

  return (
    <div className="App">

      <div className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}>
      <TopButtons setQuery={setQuery}/>
      <Input setQuery={setQuery} units = {units} setUnits = {setUnits}/>

        {weather &&(
          <div>
            <TimeAndLocation weather={weather}/>
            <TemperatureAndDetails weather={weather}/>

            <Forecast title="hourly forecast" items={weather.hourly}/>
            <Forecast title="Daily forecast" items={weather.daily}/>
            
          </div>
        )}
      <ToastContainer autoClose={5000} theme="colored" newestOnTop={true} />
       
      </div>

      
    </div>
  );
}

export default App;
