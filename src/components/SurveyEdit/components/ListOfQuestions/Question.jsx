import React from 'react';
import { Input, Button } from 'antd';

const Question = ({ question }) => {
  return (
    <>
      <Input placeholder={'Question text'} value={question.text} />
      <Button type="danger">X</Button>
    </>
  );
};

export default Question;
