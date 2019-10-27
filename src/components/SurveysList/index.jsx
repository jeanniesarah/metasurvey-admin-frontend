import React from 'react';
import { Typography, Input, Button } from 'antd';

import logo from './logo.png';
import styles from './styles.module.css';

const { Title } = Typography;
const { Search } = Input;

const SurveysList = () => {
  const [surveys, setSurveys] = React.useState(undefined);
  const token = window.localStorage.getItem('token');

  if (!token) {
    window.location.replace('https://getmetasurvey.com');
  }

  if (!surveys) {
    fetch(`https://meta-survey-app.herokuapp.com/api/admin/survey`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then(body => body.json())
      .then(setSurveys)
      .catch(() => alert('Failed to load surveys'));

    return null;
  }

  return (
    <div className={styles.root}>
      <div className={styles.pillbox}>
        <img className={styles.logo} src={logo} alt="MetaSurvey" />
        <Button>Logout</Button>
      </div>
      <section className={styles.section}>
        <Title>Create survey</Title>
        <Search
          placeholder="meta-octopus"
          enterButton="Create"
          size="large"
          onSearch={value => console.log(value)}
        />
      </section>
      <section className={styles.section}>
        <Title>Your surveys</Title>

        <div className={styles.surveys}>
          {surveys.map(survey => (
            <Button type="primary" shape="round" size="large">
              <a href={`survey/${survey._id}`}>{survey.title}</a>
            </Button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SurveysList;
