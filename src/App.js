import React, {useState} from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BirdSoundGame from './BirdSoundGame';
import SettingDrawer from './SettingDrawer';
import { Space, Layout } from '@arco-design/web-react';
// import ConfigurePage from './Configure';
import './App.css';
import { DifficultyLevels } from './difficulty';

const Header = Layout.Header;
const Footer = Layout.Footer;

function App() {
  const [settings, setSettings] = useState({
    source: 'nearby_obs',
    loc: [30, 120],
    locId: 'L7204750',
    difficulty: DifficultyLevels.EASY,
    // 其他设置...
  });

  return (
    <Layout>
      <Header>
        <SettingDrawer settings={settings} setSettings={setSettings} />
      </Header>
      <BirdSoundGame settings={settings} />
    </Layout>
  );
}

export default App;