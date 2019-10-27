import React, { useState } from 'react';
import { Spin, Typography } from 'antd';
import Tooltip from '@material-ui/core/Tooltip';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import styles from './styles.module.css';
import { getSurveyStatsAnswers } from '../../../../lib/api';
const { Title } = Typography;

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
    maxHeight: 500,
    overflow: 'auto',
  },
  table: {
    minWidth: 650,
  },
});
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', ' ', ' ', '✓', ' '),
  createData('Ice cream sandwich', ' ', ' ', '✓', ' '),
  createData('Eclair', ' ', '✓', '✓', ' '),
  createData('Cupcake', ' ', ' ', '✓', '✓'),
  createData('Gingerbread', '✓', ' ', '✓', ' '),
];

export default ({ surveyId }) => {
  const [stats, setStats] = useState(undefined);

  const classes = useStyles();
  if (!stats) {
    getSurveyStatsAnswers(surveyId)
        .then(setStats);

    return <Spin size="large" />;
  }

  const { questions, results } = stats;

  return (
    <>
      <Title>Answers</Title>
      <Paper className={classes.root}>
        <Table
          className={classes.table}
          aria-label="simple table"
          stickyHeader
        >
          <TableHead>
            <TableRow>
              {questions.map((question, index) => <TableCell>
                <Tooltip key={question._id} title={question.text} placement="top">
                  <span className={styles.badge}>{index + 1}</span>
                </Tooltip>
              </TableCell>)}
              <TableCell>Comment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((row) => (
              <TableRow key={row._id}>
                {row.answers.map(answer => <TableCell>{ answer ? '✓' : ''}</TableCell>)}
                <TableCell component="th" scope="row">
                  {row.comment}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
};
