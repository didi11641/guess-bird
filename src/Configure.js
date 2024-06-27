import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './common.css';

const ConfigurePage = () => {
  const [latitude, setLatitude] = useState('30');
  const [longitude, setLongitude] = useState('120');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/game', { state: { latitude, longitude } });
  };

  useEffect(() =>
  {
    const getLocation = () => {
      if (navigator.geolocation) {
        // 获取当前位置
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // 获取经度和纬度
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            console.log(`纬度: ${latitude}, 经度: ${longitude}`);
            setLatitude(latitude);
            setLongitude(longitude);
          },
          (error) => {
            console.error('获取位置信息失败:', error);
          }
        );
      } else {
        console.error('浏览器不支持地理定位');
      }
    };
    getLocation();
  }, []);

  return (
    <div>
      <h1>使用附近的鸟种列表:</h1>
      <form onSubmit={handleSubmit} className="form-wrapper">
        <div className="form-group">
          <label className="form-label">纬度:</label>
          <input
            type="text"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">经度:</label>
          <input
            type="text"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            className="form-input"
          />
        </div>
        <button type="submit" className="form-button">
          开始!
        </button>
      </form>
    </div>
  );
};

export default ConfigurePage;