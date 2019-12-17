import React from 'react';
import { RadialChart } from 'react-vis';

const PieChart = ({ data }) => (
  <RadialChart data={data} width={300} height={300} showLabels />
);

export default PieChart;
