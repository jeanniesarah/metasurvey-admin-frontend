import React from "react";
import { Typography } from "antd";

import logo from "./logo.png";
import styles from "./styles.module.css";

const { Title } = Typography;

const SurveysList = () => {
  return (
    <div className={styles.root}>
      <img className={styles.logo} src={logo} alt="MetaSurvey" />
      <Title>Create survey</Title>
    </div>
  );
};

export default SurveysList;
