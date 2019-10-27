import React, { useState } from 'react';
import { remove } from 'lodash';
import { useParams } from 'react-router-dom';
import { Input, Spin, Typography, Button } from 'antd';
import ListOfQuestions from './components/ListOfQuestions';
import Logo from './components/Logo';
import {
  saveSurvey,
  getSurvey,
  addSurveyQuestion,
  updateSurveyQuestion,
  deleteSurveyQuestion,
} from '../../lib/api';
import styles from './styles.module.css';
import Answers from './components/Answers';
import Stats from './components/Stats';
const { Title } = Typography;

const SurveyEdit = () => {
  let { id: surveyId } = useParams();

  const [title, setTitle] = useState('');
  const [survey, setSurvey] = useState(undefined);

  const saveQuestion = ({ questionId, text }) => {
    if (!questionId) {
      addSurveyQuestion({ surveyId, text }).then(({ id, text }) => {
        const clonedQuestions = survey.questions.map(q => ({ ...q }));
        clonedQuestions.find(q => q.id === undefined).id = id;

        setSurvey({
          ...survey,
          questions: clonedQuestions,
        });
      });
    } else {
      updateSurveyQuestion({ surveyId, questionId, text });
    }
  };

  const deleteQuestion = ({ questionId }) => {
    deleteSurveyQuestion({ surveyId, questionId }).then(() => {
      const clonedQuestions = survey.questions.map(q => ({ ...q }));
      remove(clonedQuestions, q => q.id === questionId);

      setSurvey({
        ...survey,
        questions: clonedQuestions,
      });
    });
  };

  const setNewQuestion = () => {
    if (survey.questions.find(q => q.id === undefined)) {
      // already have non-saved element
      return;
    }
    const clonedQuestions = survey.questions.map(q => ({ ...q }));
    clonedQuestions.push({ text: '' });

    setSurvey({
      ...survey,
      questions: clonedQuestions,
    });
  };

  const setQuestion = ({ questionId, text }) => {
    const clonedQuestions = survey.questions.map(q => ({ ...q }));
    clonedQuestions.find(q => q.id === questionId).text = text;

    setSurvey({
      ...survey,
      questions: clonedQuestions,
    });
  };

  if (!survey) {
    getSurvey(surveyId).then(survey => {
      setSurvey(survey);
      setTitle(survey.title);
    });

    return <Spin size="large" />;
  }

  return (
    <>
      <section className={styles.section}>
        <Title>{title}</Title>
        <Button>Delete</Button>
      </section>
      <section className={styles.section}>
        <Title level={3}>Edit logo</Title>
        <Logo />
      </section>
      <section className={styles.section}>
        <Title level={3}>Edit title</Title>
        <Input
          size="large"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          onBlur={() => saveSurvey({ surveyId, title })}
        />
      </section>
      <section className={styles.section}>
        <Stats />
      </section>
      <section className={styles.section}>
        <Answers />
      </section>
      <section className={styles.section}>
        <Title level={3}>Edit questions</Title>
        <ListOfQuestions
          questions={survey.questions}
          onItemAdd={setNewQuestion}
          onItemUpdate={setQuestion}
          onItemBlur={saveQuestion}
          onItemDelete={deleteQuestion}
        />
      </section>
    </>
  );
};

export default SurveyEdit;
