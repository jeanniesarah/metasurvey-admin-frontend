import React, { useState } from 'react';
import { isEmpty } from 'lodash';
import { Spin, Tooltip, Typography } from 'antd';

import { Table } from 'antd';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import styles from './styles.module.css';
import { getSurveyStatsAnswers } from '../../../../../lib/api';
const { Title } = Typography;

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_NO_EMPTY = false;

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
    overflow: 'auto',
  },
  table: {
    minWidth: 650,
  },
});

export default ({ surveyId }) => {
  const [stats, setStats] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const classes = useStyles();

  const fetchAnswers = options => {
    // setIsLoading(true);
    return getSurveyStatsAnswers(surveyId, {
      page: 1,
      pageSize: DEFAULT_PAGE_SIZE,
      noEmpty: DEFAULT_NO_EMPTY,
      ...options,
    })
      .then(setStats)
      .then(() => setIsLoading(false));
  };

  if (!stats) {
    fetchAnswers();
    return <Spin size="large" />;
  }

  /**
    pageInfo: {
      page: 1
      pageSize: 20
      total: 1728
      totalPages: 87
    }
   */
  const { questions, results, pageInfo } = stats;

  if (isEmpty(results)) {
    return null;
  }

  const columns = [];
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    columns.push({
      title: ({ sortOrder, sortColumn, filters }) => (
        <Tooltip
          key={question._id}
          title={question.text}
          placement="topLeft"
        >
          <span className={styles.badge}>{i + 1}</span>
        </Tooltip>
      ),
      render: answer => (answer ? '✅' : '❌'),
      dataIndex: `answers[${i}]`,
    });
  }
  columns.push({
    title: "Users' comment",
    dataIndex: 'comment',
  });

  const handleTableChange = (pagination, filters, sorter) => {
    const page = pagination.current;
    fetchAnswers({ page });
  };

  return (
    <>
      <Title>Answers table</Title>
      <Paper className={classes.root}>
        <Table
          columns={columns}
          rowKey={record => record._id}
          dataSource={results}
          pagination={{
            total: pageInfo.total,
            pageSize: pageInfo.pageSize,
          }}
          loading={isLoading}
          onChange={handleTableChange}
        />
      </Paper>
    </>
  );
};
