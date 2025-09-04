import { useState, useEffect } from 'react';
import { FiSun, FiCloud, FiChevronDown, FiCheck } from 'react-icons/fi';

function App() {
  const [selectedDay, setSelectedDay] = useState('Today');
  const [isLoading, setIsLoading] = useState(true);
  const [isCelsius, setIsCelsius] = useState(true);

  // Temperature conversion
  const celsiusToFahrenheit = (c) => Math.round((c * 9/5) + 32);
  const getDisplayTemp = (temp) => isCelsius ? `${temp}°C` : `${celsiusToFahrenheit(temp)}°F`;

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Weather data
  const weatherData = {
    'Today': { 
      temp: 32, 
      condition: 'Sunny',
      hourly: [
        { time: 'Now', temp: 32, condition: 'Sunny', icon: <FiSun className="text-black" /> },
        { time: '1 PM', temp: 33, condition: 'Sunny', icon: <FiSun className="text-black" /> },
        { time: '2 PM', temp: 32, condition: 'Partly Cloudy', icon: <div className="flex"><FiSun className="text-black" /><FiCloud className="text-black ml-0.5" /></div> },
        { time: '3 PM', temp: 31, condition: 'Partly Cloudy', icon: <div className="flex"><FiSun className="text-black" /><FiCloud className="text-black ml-0.5" /></div> },
        { time: '4 PM', temp: 30, condition: 'Cloudy', icon: <FiCloud className="text-black" /> },
        { time: '5 PM', temp: 29, condition: 'Cloudy', icon: <FiCloud className="text-black" /> },
        { time: '6 PM', temp: 28, condition: 'Partly Cloudy', icon: <div className="flex"><FiSun className="text-black" /><FiCloud className="text-black ml-0.5" /></div> },
      ],
      icon: <FiSun className="text-black" />
    },
    'Sunday': { temp: 22, condition: 'Cloudy', icon: <FiCloud className="text-black" /> },
    'Saturday': { temp: 27, condition: 'Partly Cloudy', icon: <div className="flex"><FiSun className="text-black" /><FiCloud className="text-black ml-0.5" /></div> },
    'Friday': { temp: 33, condition: 'Sunny', icon: <FiSun className="text-black" /> },
    'Thursday': { temp: 20, condition: 'Rainy', icon: <FiCloud className="text-black" /> },
    'Wednesday': { temp: 25, condition: 'Clear', icon: <FiSun className="text-black" /> },
    'Tuesday': { temp: 37, condition: 'Hot', icon: <FiSun className="text-black" /> }
  };

  const days = Object.keys(weatherData);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-800 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg font-medium">Loading Weather Data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-300/40 text-gray-800 p-4 md:p-8 rounded-2xl shadow-xl/30">
      <div className="max-w-md mx-auto">
        {/* Header with Date */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</h1>
        </div>

        {/* Current Weather */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-md">
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-500">Currently</p>
            <div className="flex items-center bg-gray-100 rounded-full p-1">
              <button 
                className={`px-3 py-1 rounded-full transition-colors ${isCelsius ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
                onClick={() => setIsCelsius(true)}
              >
                °C
              </button>
              <button 
                className={`px-3 py-1 rounded-full transition-colors ${!isCelsius ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
                onClick={() => setIsCelsius(false)}
              >
                °F
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <h2 className="text-5xl font-light text-gray-900">
              {getDisplayTemp(weatherData[selectedDay].temp)}
            </h2>
            <div className="text-right">
              <p className="text-xl text-gray-900">{weatherData[selectedDay].condition}</p>
              <div className="flex justify-end mt-2 text-2xl">
                {weatherData[selectedDay].icon}
              </div>
            </div>
          </div>
        </div>

        {/* Hourly Forecast */}
        {selectedDay === 'Today' && (
          <div className="bg-white rounded-xl p-6 mb-6 shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Hourly Forecast</h3>
              <button className="text-blue-600 flex items-center font-medium">
                Today <FiCheck className="ml-1" />
              </button>
            </div>
            
            {/* First row */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              {weatherData['Today'].hourly.slice(0, 4).map((hour, index) => (
                <div key={index} className="flex flex-col items-center">
                  <p className="text-sm font-medium text-gray-500 mb-1">{hour.time}</p>
                  <div className="my-2 text-2xl">
                    {hour.icon}
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{hour.condition}</p>
                  <p className="text-lg font-medium text-gray-900">
                    {getDisplayTemp(hour.temp)}
                  </p>
                </div>
              ))}
            </div>

            {/* Second row */}
            <div className="grid grid-cols-3 gap-4">
              {weatherData['Today'].hourly.slice(4, 7).map((hour, index) => (
                <div key={index + 4} className="flex flex-col items-center">
                  <p className="text-sm font-medium text-gray-500 mb-1">{hour.time}</p>
                  <div className="my-2 text-2xl">
                    {hour.icon}
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{hour.condition}</p>
                  <p className="text-lg font-medium text-gray-900">
                    {getDisplayTemp(hour.temp)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7-Day Forecast */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">7-Day Forecast</h3>
          <div className="space-y-3">
            {days.map(day => (
              <div 
                key={day}
                className={`flex justify-between items-center p-3 rounded-lg transition-all duration-200 cursor-pointer ${
                  selectedDay === day ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedDay(day)}
              >
                <div className="flex items-center">
                  <span className="w-8 mr-3 flex justify-center text-xl">
                    {weatherData[day].icon}
                  </span>
                  <span className={selectedDay === day ? 'font-bold text-blue-700' : 'text-gray-900'}>{day}</span>
                </div>
                <div className="flex items-center">
                  <span className={`text-lg mr-3 ${selectedDay === day ? 'font-bold text-blue-700' : 'text-gray-900'}`}>
                    {getDisplayTemp(weatherData[day].temp)}
                  </span>
                  <span className="text-sm text-gray-500">{weatherData[day].condition}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;