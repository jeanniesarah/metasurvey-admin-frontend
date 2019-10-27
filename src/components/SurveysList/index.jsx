import React from "react";
import { Typography, Input } from "antd";

import logo from "./logo.png";
import styles from "./styles.module.css";

const { Title } = Typography;
const { Search } = Input;

const SurveysList = () => {
  return (
    <div className={styles.root}>
      <img className={styles.logo} src={logo} alt="MetaSurvey" />
      <Title>Create survey</Title>
      <Search
        placeholder="meta-octopus"
        enterButton="Create"
        size="large"
        onSearch={value => console.log(value)}
      />
    </div>
  );
};

export default SurveysList;
