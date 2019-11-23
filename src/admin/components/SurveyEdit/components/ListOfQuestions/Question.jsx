import React from 'react';
import { Input, Button } from 'antd';

const Question = ({ question, style, onUpdate, onBlur, onDelete }) => {
    const { id: questionId } = question;
  return (
    <div style={{ width: 400, display: 'flex', ...style }}>
      <Input placeholder={'Question text'}
             value={question.text}

             onChange={e => onUpdate({ questionId, text: e.target.value })}
             onBlur={e => onBlur({ questionId, text: e.target.value })}
             style={!questionId ? { marginRight: 51 } : {}}
      />
        {questionId &&
        <Button style={{marginLeft: 10}}
                type="danger"
                onClick={() => onDelete({questionId})}>X</Button>
        }
    </div>
  );
};

export default Question;
