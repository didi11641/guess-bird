import React, { useState, useEffect } from 'react';
import { Input, Radio, Space } from '@arco-design/web-react';
import './AnswerInput.css'
import '@arco-design/web-react/dist/css/arco.css';
const RadioGroup = Radio.Group;

const AnswerInput = ({ type, birdObservations, onInputChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (value) => {
    if (type === 'input') {
      setInputValue(value);
    } else {
      setSelectedOption(value);
      setInputValue(value);
    }
    onInputChange(value);
  };

  return (
    <div className="answer-input">
      {type === 'input' ? (
        <Input
          placeholder="输入鸟的名称"
          value={inputValue}
          onChange={handleChange}
          style={{ width: 200 }}
        />
      ) : (
        <RadioGroup direction='vertical' onChange={handleChange}>
          {birdObservations.map((observation, index) => (
            <Radio value={observation.comName}>
              {observation.comName} {observation.sciName}
            </Radio>
          ))}
        </RadioGroup>
      )}
    </div>
  );
};

export default AnswerInput;