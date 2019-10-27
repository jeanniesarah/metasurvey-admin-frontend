import React from 'react';
import { Button, Icon } from 'antd';
import Question from './Question';

const ListOfQuestions = ({ questions, onItemAdd, onItemUpdate, onItemBlur, onItemDelete }) => {
  return (
    <>
      {questions.map((question, index) => (
        <Question key={question.id || index} question={question} style={{ marginBottom: 10 }} onUpdate={onItemUpdate} onBlur={onItemBlur} onDelete={onItemDelete} />
      ))}
      <Button style={{ marginTop: 10 }} onClick={onItemAdd}><Icon type="plus" /> New question</Button>
    </>
  );
};

export default ListOfQuestions;
