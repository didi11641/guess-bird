import { useState } from 'react';
import { Drawer, Space, Link, Button } from '@arco-design/web-react';
import { IconSettings, IconStar } from '@arco-design/web-react/icon';

import Settings from './Settings';

function SettingDrawer({settings, setSettings}) {
  const [showDrawer, setShowDrawer] = useState(false);
  const [placement, setPlacement] = useState('left');
  const handleResize = () => {
    const { innerHeight, innerWidth } = window;
    const isLandscape = innerWidth > innerHeight;
    setPlacement(isLandscape ? 'left' : 'top');
  };
  window.addEventListener('resize', handleResize);
  const closeDrawer = () => {
    setShowDrawer(false);
  };
  const openDrawer = () => {
    setShowDrawer(true);
  };
  return (
    <div>
        <Button
          type='text'
          onClick={
            () => {
              openDrawer();
            }
          }
          icon={<IconSettings style={{fontSize: 28, color: "black"}} />}>
        </Button>
        <Drawer
          title="设置"
          placement={placement}
          width = {500}
          height = {"80%"}
          visible={showDrawer}
          footer={null}
          onCancel={() => {
            closeDrawer(false);
          }}
        >
          <Settings settings={settings} setSettings={setSettings}/>
        </Drawer>

    </div>
  );
}
export default SettingDrawer;
