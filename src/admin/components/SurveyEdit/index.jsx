import React, { useState } from 'react';
import { remove } from 'lodash';
import { useParams } from 'react-router-dom';
import { Input, Spin, Typography, Button } from 'antd';
import ListOfQuestions from './components/ListOfQuestions';
import Logo from './components/Logo';
import {
  saveSurvey,
  getSurvey,
  deleteSurvey,
  addSurveyQuestion,
  updateSurveyQuestion,
  deleteSurveyQuestion,
} from '../../../lib/api';
import { copyTextToClipboard } from '../../../lib/clipboard';
import styles from './styles.module.css';
import Answers from './components/Answers';
import Stats from './components/Stats';
import logo from '../SurveysList/logo.png';
const { Title } = Typography;

const userSurveyDomain = 'https://public.getmetasurvey.com';

const SurveyEdit = () => {
  let { id: surveyId } = useParams();

  const [title, setTitle] = useState('');
  const [survey, setSurvey] = useState(undefined);

  const userSurveyUrl = `${userSurveyDomain}/?survey_id=${surveyId}`;

  const deleteSurveyWithConfirm = () => {
    /* eslint-disable no-restricted-globals */
    if (confirm('Are you sure?')) {
      deleteSurvey({ surveyId }).then(() => {
        document.location.href = '../surveys';
      });
    }
    /* eslint-enable no-restricted-globals */
  };

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
    <div className={styles.root}>
      <section className={styles.section}>
        <Title>{title}</Title>
        <p>
          Send this link to users:
          <br/>
          <a href={userSurveyUrl} target={'_blank'}>{userSurveyUrl}</a>
          <Button icon="copy" style={{ marginLeft: 10 }} onClick={() => copyTextToClipboard(userSurveyUrl)} />
        </p>
        <Button
          icon="left"
          style={{ marginRight: 10 }}
          href={'../surveys'}
        >
          Back to list
        </Button>
        <Button type={'danger'} onClick={deleteSurveyWithConfirm}>
          Delete survey
        </Button>
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
        <Stats surveyId={surveyId} />
      </section>
      <section className={styles.section}>
        <Answers surveyId={surveyId} />
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
    </div>
  );
};

export default SurveyEdit;
