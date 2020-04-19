import React, { useState } from 'react';
import { isEmpty } from 'lodash';
import { Form, Spin, Switch, Tooltip, Typography } from 'antd';

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
  const [noEmpty, setNoEmpty] = useState(DEFAULT_NO_EMPTY);

  const classes = useStyles();

  const fetchAnswers = options => {
    return getSurveyStatsAnswers(surveyId, {
      page: 1,
      pageSize: DEFAULT_PAGE_SIZE,
      noEmpty: noEmpty,
      ...options,
    }).then(setStats);
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
  const handleNoEmptyChange = value => {
    setNoEmpty(value);
    fetchAnswers({ noEmpty: value });
  };

  return (
    <>
      <Title>Answers table</Title>
      <Form.Item label="Hide rows with empty comment">
        <Switch checked={noEmpty} onChange={handleNoEmptyChange} />
      </Form.Item>
      <Paper className={classes.root}>
        <Table
          columns={columns}
          rowKey={record => record._id}
          dataSource={results}
          pagination={{
            total: pageInfo.total,
            pageSize: pageInfo.pageSize,
          }}
          onChange={handleTableChange}
        />
      </Paper>
    </>
  );
};
