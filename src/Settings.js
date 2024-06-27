import { useState } from 'react';
import { Radio, Input, Space } from '@arco-design/web-react';
import { DifficultyLevels } from './difficulty';
const RadioGroup = Radio.Group;

function HotspotSelector({ selectedHotspot, onHotspotChange }) {
  return (
    <Input value={selectedHotspot} onChange={onHotspotChange}></Input>
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
