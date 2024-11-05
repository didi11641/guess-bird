import React, { useState, useEffect, useRef, useMemo } from 'react';
import AudioPlayer from './AudioPlayer';
import AnswerInput from './AnswerInput';
import NoData from './components/NoData';
import { Message, Icon, Button, Radio, Space, Typography } from '@arco-design/web-react';
import ScoreBoard from './components/ScoreBoard';

import { getRandomElements } from './utils';
import { fetchNearbyBirdObservations, fetchAudioRecordings } from './netUtils';
import './BirdSoundGame.css';
const IconFont = Icon.addFromIconFontCn({
  src: '//at.alicdn.com/t/font_180975_26f1p759rvn.js',
});

const BirdSoundGame = ({settings}) => {
  const [answerType, setAnswerType] = useState('select');
  const [tips, setTips] = useState([]);

  const [birdObservations, setBirdObservations] = useState([]);
  const [audioUrl, setAudiotUrl] = useState("");
  const [speciesIndex, setSpeciesIndex] = useState(0);
  const [audioJSON, setAudioJSON] = useState({});
  const [audioIndex, setAudioIndex] = useState(-1);
  const inputRef = useRef('');

  const [score, setScore] = useState({
    correct: 0,
    total: 0,
    history: []
  });

  const [tempHistory, setTempHistory] = useState([]);

  const getOptionNumByDifficulty = (difficulty) => {
    // TODO: Calculate similarity.
    if (difficulty === 'easy') {
      return 3;
    } else if (difficulty === 'medium') {
      return 5;
    } else {
      return 8;
    }
  };

  const answerOptions = useMemo(
    () => getRandomElements(birdObservations,getOptionNumByDifficulty(settings.difficulty), speciesIndex),
    [birdObservations, speciesIndex, settings.difficulty]);

  const showTips = () => {
    const recording = audioJSON['recordings'][audioIndex];
    setTips([
      `给个英文名吧: ${recording['en']}`,
    ]);
  };

  const onInputChange = (val) => {
    inputRef.current = val;
  };

  const switchSpecies = () => {
    if (birdObservations.length <= 0) {
      return;
    }
    const index = Math.floor(Math.random() * birdObservations.length);
    setSpeciesIndex(index);
    setAudioIndex(-1);
    console.log(`Switch species to ${birdObservations[index]['comName']} index=${index}`);
  };

  const skipSpecies = () => {
    const currentBird = birdObservations[speciesIndex]['comName'];
    
    // 将跳过的记录添加到临时历史
    setTempHistory(prev => [...prev, {
      bird: currentBird,
      userAnswer: '跳过',
      isCorrect: false,
      timestamp: new Date().toLocaleString()
    }]);

    // 只更新总数
    setScore(prev => ({
      ...prev,
      total: prev.total + 1
    }));

    const msg = `AH~ 好遗憾, 答案其实是...  ${currentBird}!\n下一题?`;
    if (window.confirm(msg)) {
      switchSpecies();
    }
  };

  const handleSubmit = () => {
    const isCorrect = inputRef.current === birdObservations[speciesIndex]['comName'];
    const currentBird = birdObservations[speciesIndex]['comName'];
    
    if (isCorrect) {
      // 答对时，将临时历史和当前答对的记录一起添加到正式历史中
      setScore(prev => ({
        correct: prev.correct + 1,
        total: prev.total + 1,
        history: [
          ...prev.history,
          ...tempHistory,
          {
            bird: currentBird,
            userAnswer: inputRef.current,
            isCorrect: true,
            timestamp: new Date().toLocaleString()
          }
        ]
      }));
      // 清空临时历史
      setTempHistory([]);

      Message.success({
        icon: <IconFont type='icon-success' />,
        content: 'Correct! Next~',
      })
      setTips(['']);
      switchSpecies();
    } else {
      // 答错时，只添加到临时历史
      setTempHistory(prev => [...prev, {
        bird: currentBird,
        userAnswer: inputRef.current,
        isCorrect: false,
        timestamp: new Date().toLocaleString()
      }]);
      
      // 更新总数
      setScore(prev => ({
        ...prev,
        total: prev.total + 1
      }));

      Message.error({
        icon: <IconFont type='icon-error' />,
        content: 'No~ Try again.',
      })
    }
  };

  const switchAudio = () => {
    if (!('numRecordings' in audioJSON)) {
      return;
    }
    console.log('Switch audio.');
    const num = audioJSON['numRecordings']
    // At most 30 records
    const max = Math.min(num, 10);
    setAudioIndex((audioIndex + 1) % max);
  };

  useEffect(() => {
    switchAudio();
  }, [audioJSON]);

  useEffect(() => {
    if (isNaN(audioIndex) || audioIndex < 0 || !('numRecordings' in audioJSON)) {
      return;
    }
    const url = audioJSON['recordings'][audioIndex]['file']
    console.log(`Audio recording: ${url}`);
    try {
      const rewrite_url = '/audio' + new URL(url).pathname
      console.log(`rewrite to: ${rewrite_url}`);
      setAudiotUrl(rewrite_url)
    } catch (error) {
      console.log(error);
      Message.error({
        icon: <IconFont type='icon-error' />,
        content: '获取录音失败, 换个试试吧~',
      })
    }
  }, [audioIndex]);

  useEffect(() => {
    const { loc, lodId } = settings;
    console.log(`Fetching bird observations: source=${settings.source} loc=${loc} lodId=${lodId}`);
    fetchNearbyBirdObservations(loc[0], loc[1]).then(data => {
      setBirdObservations(data);
    });
  }, [settings.loc, settings.lodId, settings.source]);

  useEffect(() => {
    if (speciesIndex >= 0 && birdObservations.length > 0) {
      const record = birdObservations[speciesIndex];
      fetchAudioRecordings(record['sciName']).then(data => {
        setAudioJSON(data);
      });
    }
  }, [speciesIndex]);

  useEffect(() => {
    switchSpecies();
  }, [birdObservations])

return (
  <div className="bird-sound-game-container">
    <div className="bird-sound-game">
      <div className="game-main">
        {birdObservations.length === 0 && 
          <Typography.Text>No birds observed in this region.</Typography.Text>
        }
        
        {birdObservations.length > 0 && (
          <>
            <div className="region">
              记录地点: {birdObservations[speciesIndex]['locName']}
            </div>
            
            {'numRecordings' in audioJSON && audioIndex >= 0 && audioIndex < audioJSON['numRecordings'] &&
              <div className="region">
                记录类型: {audioJSON['recordings'][audioIndex]['type']}
              </div>
            }

            <AudioPlayer src={audioUrl} />

            <AnswerInput 
              type={answerType} 
              birdObservations={answerOptions} 
              onInputChange={onInputChange} 
            />

            <div className="answer-section">
              <Radio.Group
                type="button"
                value={answerType}
                onChange={setAnswerType}
              >
                <Radio value="input">直接输入</Radio>
                <Radio value="select">选项选择</Radio>
              </Radio.Group>
            </div>

            <Space className="buttons">
              <Button type="primary" onClick={handleSubmit}>提交</Button>
              <Button onClick={skipSpecies}>跳过这题</Button>
              <Button onClick={switchAudio}>换个录音</Button>
            </Space>

            <Button className="tip-button" type="dashed" onClick={showTips}>
              Give me some tips~
            </Button>
            <div className="hints">
              {tips.map((item, index) => (
                <Typography.Text key={index}>{item}</Typography.Text>
              ))}
            </div>
          </>
        )}
        
        {birdObservations === null && <NoData/>}
      </div>

      <div className="game-sidebar">
        <ScoreBoard score={score} />
      </div>
    </div>
  </div>
);
};

export default BirdSoundGame;