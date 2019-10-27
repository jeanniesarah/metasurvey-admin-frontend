import React, { useState } from 'react';
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

  return (
    <>
      <Title>Stats</Title>
      <Pie
        data={{
          labels: stats.map(s => s.text),// ['Red', 'Green', 'Yellow'],
          datasets: [
            {
              data: stats.map(s => s.yesCount), //[300, 50, 100],
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
