import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Input, Spin, Typography } from 'antd';
import ListOfQuestions from './components/ListOfQuestions';
import Logo from './components/Logo';
import { saveSurvey, getSurvey } from '../../lib/api';
import styles from './styles.module.css';
import Answers from './components/Answers';
import Stats from './components/Stats';
const { Title } = Typography;

const SurveyEdit = () => {
  let { id } = useParams();

  const [title, setTitle] = useState('');
  const [survey, setSurvey] = useState(undefined);

  if (!survey) {
    getSurvey(id).then(survey => {
      setSurvey(survey);
      setTitle(survey.title);
    });

    return <Spin size="large" />;
  }

  return (
    <>
      <section className={styles.section}>
        <Title>Edit survey</Title>
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
          onBlur={() => saveSurvey({ id, title })}
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
        <ListOfQuestions questions={survey.questions} />
      </section>
    </>
  );
};

export default SurveyEdit;
