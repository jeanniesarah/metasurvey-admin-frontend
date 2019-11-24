import React from 'react';
import {Input, Button, message, Icon} from 'antd';

const Question = ({ question, style, onUpdate, saveQuestion, onDelete }) => {
    const { id: questionId } = question;
    const { Search } = Input;

  return (
    <div style={{ width: 400, display: 'flex', ...style }}>
<Search
      placeholder="Question text"
      enterButton="Save"
      value={question.text}
      onChange={e => onUpdate({ questionId, text: e.target.value })}
      onSearch={value => saveQuestion({ questionId, text: value })}
      style={!questionId ? { marginRight: 56 } : {}}
    />
        {questionId &&
        <Button style={{marginLeft: 10}}
                type="danger"
                onClick={() => {
                    onDelete({questionId});
                    message.success('Successfully removed the question.');
                }}><Icon type="delete" /></Button>
        }
    </div>
  );
};

export default Question;
