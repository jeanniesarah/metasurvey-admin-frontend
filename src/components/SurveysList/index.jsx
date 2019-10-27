import React from 'react';
import { Typography, Input, Button } from 'antd';

import logo from './logo.png';
import styles from './styles.module.css';

const { Title } = Typography;
const { Search } = Input;

const SurveysList = () => {
  return (
    <div className={styles.root}>
      <img className={styles.logo} src={logo} alt="MetaSurvey" />
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
          <Button type="primary" shape="round" size="large">
            <a href="survey/meta-octopus">meta-octopus</a>
          </Button>
          <Button type="primary" shape="round" size="large">
            <a href="survey/super-chipmunk">super-chipmunk</a>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default SurveysList;
