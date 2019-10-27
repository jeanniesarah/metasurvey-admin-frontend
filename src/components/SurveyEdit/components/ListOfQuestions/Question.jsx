import React from 'react';
import { Input, Button } from 'antd';

const Question = ({ question, style }) => {
  return (
    <div style={{ display: 'flex', ...style }}>
      <Input placeholder={'Question text'} value={question.text} />
      <Button style={{ marginLeft: 10 }} type="danger">X</Button>
    </div>
  );
};

export default Question;
