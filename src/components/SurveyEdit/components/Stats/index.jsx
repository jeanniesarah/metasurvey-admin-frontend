import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Typography } from 'antd';
const { Title } = Typography;

export default props => {
  return (
    <>
      <Title>Stats</Title>
      <Pie
        data={{
          labels: ['Red', 'Green', 'Yellow'],
          datasets: [
            {
              data: [300, 50, 100],
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
