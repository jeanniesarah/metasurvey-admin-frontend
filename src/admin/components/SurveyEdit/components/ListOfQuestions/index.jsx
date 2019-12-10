import React from 'react';
import { Button, Icon } from 'antd';
import Question from './Question';

const ListOfQuestions = ({ questions, onItemAdd, onItemUpdate, saveQuestion, onItemDelete }) => {
  return (
    <div>
      {questions.map((question, index) => (
        <Question key={question.id || index} index={index} question={question} style={{ marginBottom: 10 }} onUpdate={onItemUpdate} saveQuestion={saveQuestion} onDelete={onItemDelete} />
      ))}
      <Button style={{ marginTop: 10 }} type="primary" onClick={onItemAdd}><Icon type="plus" /> New question</Button>
    </div>
  );
};

export default ListOfQuestions;
