import React from 'react';
import { Button } from 'antd';
import Question from './Question';

const ListOfQuestions = ({ questions }) => {
  return (
    <>
      {questions.map(question => (
        <Question key={question.id} question={question} />
      ))}
      <Button>Add question</Button>
    </>
  );
};

export default ListOfQuestions;
