import React, { useState } from 'react';
import axios from 'axios';
import { WiDaySunny, WiRain, WiCloudy, WiSnow, WiThunderstorm, WiFog } from 'react-icons/wi'; // Các icon thời tiết
import background from './images/background.jpg';
import backgroundClear from './images/bg-clear.jpg';
import backgroundRain from './images/bg-rain.jpg';
import backgroundCloud from './images/bg-cloud.jpg';
import backgroundSnow from './images/bg-snow.jpg';
import backgroundThunder from './images/bg-thunder.jpg';
import backgroundFog from './images/bg-fog.jpg';
import background404 from './images/404-not.jpg'


function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const apiKey = '1a829827882f153ee20946c06bb7bbf4'; // Thay bằng API key của bạn

  const fetchWeather = () => {
    if (city) {
      axios
       
        .then((response) => {
          setWeatherData(response.data);
          setError('');
          setIsSearching(true);
        })
        .catch((err) => {
          setError('Không tìm thấy thành phố.');
          setWeatherData(null);
        });
    } else {
      setError('Vui lòng nhập tên thành phố.');
    }
  };

  // Hàm để chọn icon dựa trên loại thời tiết
  const getWeatherIcon = (weatherMain) => {
    switch (weatherMain) {
      case 'Clear':
        return <WiDaySunny className="text-8xl text-yellow-500" />;
      case 'Rain':
        return <WiRain className="text-8xl text-blue-500" />;
      case 'Clouds':
        return <WiCloudy className="text-8xl text-gray-500" />;
      case 'Snow':
        return <WiSnow className="text-8xl text-blue-200" />;
      case 'Thunderstorm':
        return <WiThunderstorm className="text-8xl text-purple-500" />;
      case 'Fog':
      case 'Mist':
        return <WiFog className="text-8xl text-gray-400" />;
      default:
        return <WiDaySunny className="text-8xl text-yellow-500" />; // Mặc định là trời nắng
    }
  };

  // Hàm để chọn background dựa trên loại thời tiết
  const getBackgroundImage = (weatherMain) => {
    switch (weatherMain) {
      case 'Clear':
        return `url(${backgroundClear})`;
      case 'Rain':
        return `url(${backgroundRain})`;
      case 'Clouds':
        return `url(${backgroundCloud})`;
      case 'Snow':
        return `url(${backgroundSnow})`;
      case 'Thunderstorm':
        return `url(${backgroundThunder})`;
      case 'Fog':
      case 'Mist':
        return `url(${backgroundFog})`;
      default:
        return `url(${background})`;
    }
  };

  const backgroundStyle = weatherData
    ? {
        backgroundImage: getBackgroundImage(weatherData.weather[0].main),
      }
      : error
    ? {
        backgroundImage: `url(${background404})`,
      }
    : {
        backgroundImage: `url(${background})`,
      };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat "
      style={backgroundStyle}
    >
      <div className={`bg-[rgba(255,255,255,0.3)] p-8 rounded-2xl shadow-xl transition-all duration-500 ease-in-out ${isSearching ? 'max-w-md' : 'max-w-lg'} w-full` }>
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Dự báo thời tiết</h1>


        <div className={`flex items-center mb-6 transition-all duration-500 ${isSearching ? 'w-3/4 mx-auto' : 'w-full'}`}>
          <input
            type="text"
            className="border border-gray-300 p-3 rounded-l-md w-full text-gray-700 focus:ring-2 focus:ring-blue-300 focus:outline-none"
            placeholder="Nhập tên thành phố"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white p-3 rounded-r-md hover:bg-blue-700 transition ease-in-out duration-300"
            onClick={fetchWeather}
          >
            Tìm
          </button>
        </div>

        {/* Hiển thị lỗi nếu có */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Hiển thị kết quả thời tiết */}
        {weatherData && (
          <div className="relative mt-8 p-6 bg-white bg-opacity-60 rounded-lg shadow-md text-center">
            {/* Tên thành phố lên góc */}
            <h2 className="absolute top-2 left-4 text-xl font-bold text-gray-900">{weatherData.name}</h2>

            {/* Icon thời tiết thay đổi */}
            <div className="flex justify-center mb-4">
              {getWeatherIcon(weatherData.weather[0].main)}
            </div>

            {/* Nhiệt độ ở giữa */}
            <p className="text-4xl font-bold text-gray-900">{weatherData.main.temp}°C</p>

            {/* Tốc độ gió và độ ẩm cùng hàng */}
            <div className="flex justify-between mt-4">
              <p className="text-lg text-gray-700">
                <span className="font-semibold">Gió:</span> {weatherData.wind.speed} m/s
              </p>
              <p className="text-lg text-gray-700">
                <span className="font-semibold">Độ ẩm:</span> {weatherData.main.humidity}%
              </p>
            </div>

            <p className="text-lg mt-4 capitalize text-gray-700">{weatherData.weather[0].description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
