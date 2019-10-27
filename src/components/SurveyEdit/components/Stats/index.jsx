import React, { useState } from 'react';
import { isEmpty } from 'lodash';
import { Pie } from 'react-chartjs-2';
import { Spin, Typography } from 'antd';
import { getSurveyStatsPiechart } from '../../../../lib/api';
const { Title } = Typography;

export default ({ surveyId }) => {
    const [stats, setStats] = useState(undefined);

    if (!stats) {
        getSurveyStatsPiechart(surveyId)
            .then(setStats);

        return <Spin size="large" />;
    }

    if (isEmpty(stats) || !Array.isArray(stats)) {
        return null;
    }


  return (
    <>
      <Title>Stats</Title>
      <Pie
        data={{
          labels: stats.map(s => s.text),// ['Red', 'Green', 'Yellow'],
          datasets: [
            {
              data: stats.map(s => s.yesCount), //[300, 50, 100],
                backgroundColor: [
                    'rgba(255, 99, 132)',
                    'rgba(54, 162, 235)',
                    'rgba(255, 206, 86)',
                    'rgba(75, 192, 192)',
                    'rgba(153, 102, 255)',
                    'rgba(255, 159, 64)',
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
            },
          ],
        }}
        legend={{
          position: 'right',
        }}
      />
    </>
  );
};
