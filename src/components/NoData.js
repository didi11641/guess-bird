import React from 'react';
import { Empty } from '@arco-design/web-react';

const NoData = () => {
  return (
    <Empty
      style={{ marginTop: '40px' }}
      description="暂无鸟类数据"
    />
  );
};

export default NoData; 