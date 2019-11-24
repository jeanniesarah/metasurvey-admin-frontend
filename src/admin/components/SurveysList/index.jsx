import React from 'react';
import { Typography, Input, Button, Spin } from 'antd';
import { getSurveysList, addSurvey, addSurveyFromTemplate } from '../../../lib/api';

import logo from './logo.png';
import wind from './wind.svg';
import styles from './styles.module.css';
import Alert from "antd/es/alert";

const { Title } = Typography;
const { Search } = Input;

const SurveysList = () => {
  const [surveys, setSurveys] = React.useState(undefined);

  if (!surveys) {
    getSurveysList()
      .then(setSurveys)
      .catch(() => alert('Failed to load surveys'));

    return <Spin size="large" />;
  }

    let renderSurveys = function () {
       if(surveys.length === 0){
           return (null);
       }else{
           return (
            <section className={styles.section}>
                <Title>Your surveys <span style={{fontWeight: 400, fontSize: 14, opacity: 0.5}}>({surveys.length})</span></Title>
                <div className={styles.surveys}>
                 {surveys.map(survey => (
                 <a key={survey._id}
                    className={styles.survey_button}
                    href={`survey/${survey._id}`}>
                     <span className={styles.survey_button__text}>{survey.title}</span>
                     <Button icon="edit" type="primary" size="small">Edit survey</Button>
                 </a>
                 ))}
               </div>
             </section>
           )
           }
    };

  return (
    <div className={styles.root}>
      <section className={styles.section}>
        <Title>Create a survey</Title>

        <Search
          placeholder="Enter survey name..."
          enterButton="Create"
          size="large"
          style={{width: 400}}
          onSearch={title => {
            addSurvey({ title })
              .then(({ _id }) => {
                document.location.href = `survey/${_id}`;
              })
              .catch(() => alert('Failed to create survey'));
          }}
        />
      </section>
       {renderSurveys()}
    </div>
  );
};

export default SurveysList;
