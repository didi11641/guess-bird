import { useState, useEffect } from 'react';
import { Radio, Input, Space, Link, Typography } from '@arco-design/web-react';
import { DifficultyLevels } from './difficulty';
import { fetchHotspotName } from './netUtils';

const RadioGroup = Radio.Group;
const { Text } = Typography;

function HotspotSelector({ selectedHotspot, onHotspotChange }) {
  const [hotspotName, setHotspotName] = useState('');

  useEffect(() => {
    const getHotspotName = async () => {
      if (selectedHotspot) {
        const name = await fetchHotspotName(selectedHotspot);
        setHotspotName(name || '');
      }
    };
    getHotspotName();
  }, [selectedHotspot]);

  return (
    <Space direction='vertical'>
      <Link href="https://ebird.org/hotspots" target="_blank">
        点击此处查找兴趣点代号
      </Link>
      <Text type="secondary">
        请在 eBird 热点地图中选择热点，并从热点详情页面的 URL 中复制热点代号（例如：L2345678）
      </Text>
      <Input 
        value={selectedHotspot} 
        onChange={onHotspotChange}
        placeholder="请输入热点代号"
      />
      {hotspotName && (
        <Text type="success">
          已选择热点：{hotspotName}
        </Text>
      )}
    </Space>
  );
}

function Settings({settings, setSettings}) {
  const handleSourceChange = (value) => {
    setSettings({ ...settings, source: value });
  };

  const handleDifficultyChange = (value) => {
    setSettings({ ...settings, difficulty: value });
  };

  const handleHotspotChange = (value) => {
    // 更新选中的兴趣点状态
    setSettings({...settings, locId: value });
  };

  return (
    <div>
      <h2>选择数据源:</h2>
      <Space direction='vertical'>
        <RadioGroup
          type = "button"
          value={settings.source}
          onChange={handleSourceChange}
        >
          <Radio value="nearby_obs">
            附近最近14天的观察记录

          </Radio>
          <Radio value="hotspot">使用兴趣点
          </Radio>
        </RadioGroup>
        {settings.source === 'hotspot' && (
            <HotspotSelector selectedHotspot={settings.locId} onHotspotChange={handleHotspotChange} />
        )}
      </Space>

      <h2>选择难度:</h2>
      <RadioGroup
        type = "button"
        options={[
          { label: '简单', value: DifficultyLevels.EASY },
          { label: '中等', value: DifficultyLevels.MEDIUM },
          { label: '困难', value: DifficultyLevels.HARD },
        ]}
        value={settings.difficulty}
        onChange={handleDifficultyChange}
      />
    </div>
  );
}
export default Settings;
