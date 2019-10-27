import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Input, Spin, Typography } from "antd";
import ListOfQuestions from "./components/ListOfQuestions";
import Logo from "./components/Logo";
import { saveSurvey, getSurvey } from "../../lib/api";
import styles from "./styles.module.css";
import { Pie } from "react-chartjs-2";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const { Title } = Typography;

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  }
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9)
];

const SurveyEdit = () => {
  let { id } = useParams();
  const classes = useStyles();

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
        <Paper className={classes.root}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">
                  <Tooltip title="Add" placement="top">
                    <span>1</span>
                  </Tooltip>
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Add" placement="top">
                    <span>2</span>
                  </Tooltip>
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Add" placement="top">
                    <span>3</span>
                  </Tooltip>
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Add" placement="top">
                    <span>4</span>
                  </Tooltip>
                </TableCell>
                <TableCell>Comment</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.name}>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </section>
      <section className={styles.section}>
        <Title level={3}>Edit questions</Title>
        <ListOfQuestions questions={survey.questions} />
      </section>
    </>
  );
};

export default SurveyEdit;
