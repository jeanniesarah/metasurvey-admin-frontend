import React from 'react';
import { Typography, Input, Button, Spin } from 'antd';
import { Redirect } from 'react-router-dom';

import logo from './logo.png';
import styles from './styles.module.css';

const { Title } = Typography;
const { Search } = Input;

const SurveysList = () => {
  const [surveys, setSurveys] = React.useState(undefined);
  const token = window.localStorage.getItem('token');

  if (!token) {
    return <Redirect to="/login" />;
  }

    const createFromTemplate = (templateId) => {
        fetch(
            `https://meta-survey-app.herokuapp.com/api/admin/templates/clone/${templateId}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
            }
        )
            .then(() => window.location.reload())
            .catch(() => alert('Failed to create survey'));
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

    return <Spin size="large" />;
  }

  return (
    <div className={styles.root}>
      <div className={styles.pillbox}>
        <img className={styles.logo} src={logo} alt="MetaSurvey" />
        <Button
          onClick={() => {
            window.localStorage.removeItem('token');
            window.location.reload();
          }}
        >
          Logout
        </Button>
      </div>
      <section className={styles.section}>
        <Title>Create survey</Title>
        <Search
          placeholder="meta-octopus"
          enterButton="Create"
          size="large"
          onSearch={title => {
            fetch(
              `https://meta-survey-app.herokuapp.com/api/admin/survey`,
              {
                method: 'POST',
                body: JSON.stringify({
                  title,
                }),
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: 'Bearer ' + token,
                },
              }
            )
              .then(() => window.location.reload())
              .catch(() => alert('Failed to create survey'));
          }}
        />
        <div style={{ marginTop: 10, textAlign: 'right' }}>
            <div style={{ marginBottom: 10 }}>
                <Button size="large" type="primary" onClick={() => createFromTemplate('5db55de9168ea235f0e7e616')}>Create for SaaS</Button>
            </div>
            <div style={{ marginBottom: 10 }}>
                <Button size="large" type="primary" onClick={() => createFromTemplate('5db55de9168ea235f0e7e617')}>Create for Chrome Extension</Button>
            </div>
            <div style={{ marginBottom: 10 }}>
                <Button size="large" type="primary" onClick={() => createFromTemplate('5db55de9168ea235f0e7e618')}>Create for General Purpose</Button>
            </div>
        </div>
        </section>
      <section className={styles.section}>
        <Title>Your surveys</Title>

        <div className={styles.surveys}>
          {surveys.map(survey => (
            <Button
              type="primary"
              shape="round"
              size="large"
              key={survey._id}
            >
              <a href={`survey/${survey._id}`}>{survey.title}</a>
            </Button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SurveysList;
