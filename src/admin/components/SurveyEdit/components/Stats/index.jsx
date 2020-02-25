import React, { useState } from 'react';
import { isEmpty } from 'lodash';
import { Bar } from 'react-chartjs-2';
import { Spin, Typography } from 'antd';
import { getSurveyStatsPiechart } from '../../../../../lib/api';
const { Title } = Typography;

export default ({ surveyId }) => {
  const [stats, setStats] = useState(undefined);

  if (!stats) {
    getSurveyStatsPiechart(surveyId).then(setStats);

    return <Spin size="large" />;
  }

  if (isEmpty(stats) || !Array.isArray(stats)) {
    return null;
  }

  let allQuestionsHasZeroAnswers = true;
  if (stats !== undefined) {
    let statsCount = stats.length;
    for (let i = 0; i < statsCount; i++) {
      if (stats[i]['yesCount'] !== 0 || stats[i]['noCount'] !== 0) {
        allQuestionsHasZeroAnswers = false;
        break;
      }
    }
  }
  if (allQuestionsHasZeroAnswers) {
    return null;
  }

  return (
    <>
      <div style={{ width: stats.length * 100 }}>
        <Title>Answers stats</Title>
        <Bar
          data={{
            labels: stats.map(
              (s, index) => index + 1 + '. ' + s.text.substring(0, 30)
            ), // ['Red', 'Green', 'Yellow'],
            datasets: [
              {
                // last 0 is to make graph have Y axis start with 0. Hack
                data: [...stats.map(s => s.yesCount), 0], //[300, 50, 100],
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
              {
                // last 0 is to make graph have Y axis start with 0. Hack
                data: [...stats.map(s => s.noCount), 0], //[300, 50, 100],
                backgroundColor: [
                  'rgba(201, 0, 43)',
                  'rgba(12, 79, 124)',
                  'rgba(188, 133, 0)',
                  'rgba(30, 84, 84)',
                  'rgba(68, 0, 204)',
                  'rgba(166, 83, 0)',
                  'rgba(201, 0, 43, 0.5)',
                  'rgba(12, 79, 124, 0.5)',
                  'rgba(188, 133, 0, 0.5)',
                  'rgba(30, 84, 84, 0.5)',
                  'rgba(68, 0, 204, 0.5)',
                  'rgba(166, 83, 0, 0.5)',
                  'rgba(201, 0, 43, 0.2)',
                  'rgba(12, 79, 124, 0.2)',
                  'rgba(188, 133, 0, 0.2)',
                  'rgba(30, 84, 84, 0.2)',
                  'rgba(68, 0, 204, 0.2)',
                  'rgba(166, 83, 0, 0.2)',
                ],
              },
            ],
          }}
          legend={{
            // position: 'right',
            display: false,
          }}
        />
      </div>
    </>
  );
};
