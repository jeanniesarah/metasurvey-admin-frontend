import React from 'react';
import { Button, Icon } from 'antd';
import Question from './Question';

const ListOfQuestions = ({ questions }) => {
  return (
    <>
      {questions.map(question => (
        <Question key={question.id} question={question} style={{ marginBottom: 10 }} />
      ))}
      <Button style={{ marginTop: 10 }}><Icon type="plus" /> New question</Button>
    </>
  );
};

export default ListOfQuestions;
