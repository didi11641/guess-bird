import React from 'react';
import { Typography, Space } from '@arco-design/web-react';

const ScoreBoard = ({ score }) => {
  return (
    <div className="score-board" style={{ 
      marginTop: '20px', 
      padding: '16px', 
      border: '1px solid #e5e6eb', 
      borderRadius: '4px' 
    }}>
      <Typography.Title heading={6}>得分统计</Typography.Title>
      <Space direction="vertical" style={{ width: '100%' }}>
        <div className="score-summary">
          <Typography.Text>
            正确率: {score.total > 0 ? Math.round(score.correct / score.total * 100) : 0}% 
            ({score.correct}/{score.total})
          </Typography.Text>
        </div>
        
        <Typography.Title heading={6}>最近记录</Typography.Title>
        <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
          {score.history.slice(-5).reverse().map((record, index) => (
            <div key={index} style={{ 
              padding: '8px', 
              marginBottom: '4px',
              backgroundColor: record.isCorrect ? '#e8f5e9' : '#ffebee',
              borderRadius: '4px'
            }}>
              <Typography.Text>
                {record.bird} - {record.userAnswer} 
                {record.isCorrect ? ' ✓' : ' ✗'}
              </Typography.Text>
            </div>
          ))}
        </div>
      </Space>
    </div>
  );
};

export default ScoreBoard; 