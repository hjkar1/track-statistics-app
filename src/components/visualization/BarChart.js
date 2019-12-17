import React from 'react';
import { XYPlot, XAxis, YAxis, HorizontalBarSeries } from 'react-vis';
import '../../../node_modules/react-vis/dist/style.css';

const BarChart = ({ data }) => {
  return (
    <XYPlot
      yType="ordinal"
      width={300}
      height={300}
      margin={{ left: 100 }}
      xDomain={[0, 1]}
    >
      <XAxis />
      <YAxis />
      <HorizontalBarSeries data={data} />
    </XYPlot>
  );
};

export default BarChart;
