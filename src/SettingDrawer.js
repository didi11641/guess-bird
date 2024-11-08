import { useState, useEffect } from 'react';
import { Drawer, Space, Link, Button } from '@arco-design/web-react';
import { IconSettings, IconStar } from '@arco-design/web-react/icon';

import Settings from './Settings';

function SettingDrawer({settings, setSettings}) {
  const [showDrawer, setShowDrawer] = useState(false);
  const [placement, setPlacement] = useState('left');
  const [drawerSize, setDrawerSize] = useState({ width: 500, height: '80%' });

  // 监听屏幕方向变化
  useEffect(() => {
    const handleResize = () => {
      const { innerHeight, innerWidth } = window;
      const isLandscape = innerWidth > innerHeight;
      
      if (isLandscape) {
        // 横屏模式
        setPlacement('left');
        setDrawerSize({ width: 500, height: '100%' });
      } else {
        // 竖屏模式
        setPlacement('top');
        setDrawerSize({ width: '100%', height: '70%' });
      }
    };

    // 初始化和监听窗口变化
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <Button
        type='text'
        onClick={() => setShowDrawer(true)}
        icon={<IconSettings style={{fontSize: 28, color: "black"}} />}
      />
      <Drawer
        title="设置"
        placement={placement}
        width={drawerSize.width}
        height={drawerSize.height}
        visible={showDrawer}
        onCancel={() => setShowDrawer(false)}
        autoFocus={false}
        maskClosable={true}  // 允许点击遮罩关闭
        closable={true}     // 显示关闭按钮
        footer={null}       // 移除底部按钮区域
        style={{ 
          maxHeight: '90vh',  // 限制最大高度
        }}
      >
        <Settings settings={settings} setSettings={setSettings}/>
      </Drawer>
    </div>
  );
}

export default SettingDrawer;
