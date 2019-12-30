import React, { FC } from 'react';
import { RadialChart, RadialChartPoint } from 'react-vis';

type Props = { data: Array<RadialChartPoint> };

const PieChart: FC<Props> = ({ data }) => (
  <div data-testid="piechart">
    <RadialChart data={data} width={300} height={300} showLabels />
  </div>
);

export default PieChart;
