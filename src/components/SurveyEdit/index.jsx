import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Input, Spin, Typography } from "antd";
import ListOfQuestions from "./components/ListOfQuestions";
import Logo from "./components/Logo";
import { saveSurvey, getSurvey } from "../../lib/api";
import styles from "./styles.module.css";
import { Pie } from "react-chartjs-2";

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
        <Title>Stats</Title>
        <Pie
          data={{
            labels: ["Red", "Green", "Yellow"],
            datasets: [
              {
                data: [300, 50, 100]
              }
            ]
          }}
          legend={{
            position: "right"
          }}
        />
      </section>
      <section className={styles.section}>
        <Title>Answers</Title>
      </section>
      <section className={styles.section}>
        <Title level={3}>Edit questions</Title>
        <ListOfQuestions questions={survey.questions} />
      </section>
    </>
  );
};

export default SurveyEdit;
