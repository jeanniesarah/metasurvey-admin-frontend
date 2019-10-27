import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Input, Spin, Typography } from "antd";
import { saveSurvey, getSurvey } from "../../lib/api";
import styles from "./styles.module.css";

const { Title } = Typography;
const SurveyEdit = () => {
  let { id } = useParams();

  const [title, setTitle] = useState("");
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

        <Input
          size="large"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          onBlur={() => saveSurvey({ id, title })}
        />
      </section>
      <section className={styles.section}>
        <Title>Stats</Title>
      </section>
      <section className={styles.section}>
        <Title>Answers</Title>
      </section>
    </>
  );
};

export default SurveyEdit;
