import * as React from 'react';

import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

const data = [
    { label: 'Lot', value: 400, color: '#0088FE' },
    { label: 'Inbound Call', value: 300, color: '#00C49F' },
    { label: 'Outbound Call', value: 300, color: '#FFBB28' },
    { label: 'Global Lead', value: 200, color: '#FF8042' },
    { label: 'Service', value: 400, color: '#FF5733' },
    { label: 'Facebook', value: 300, color: '#5B65E0' },
    { label: 'Friends & Family', value: 300, color: '#FFA057' },
    { label: 'Referral', value: 200, color: '#67C0DD' },
    { label: 'Repeat Customer', value: 200, color: '#FFD700' },
    { label: 'Other', value: 200, color: '#47D572' },
  ];
  

const sizing = {
  margin: { right: 5 },
  width: 200,
  height: 200,
  legend: { hidden: true },
};
const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);

const getArcLabel = (params) => {
  const percent = params.value / TOTAL;
  return `${(percent * 100).toFixed(0)}%`;
};

export default function PieChartWithCustomizedLabel() {
  return (
    <PieChart
      series={[
        {
          outerRadius: 80,
          data,
          arcLabel: getArcLabel,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontSize: 14,
        },
      }}
      {...sizing}
    />
  );
}
