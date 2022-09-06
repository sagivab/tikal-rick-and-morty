import React, { ReactElement } from 'react';
import Bar from 'components/Bar';
import { BarData } from 'types/common';

type BarcharProps = {
  chartData: BarData[];
  // eslint-disable-next-line react/require-default-props
  height?: number | string;
  // eslint-disable-next-line react/require-default-props
  width?: number | string;
  // eslint-disable-next-line react/require-default-props
  barHeight?: number;
  // eslint-disable-next-line react/require-default-props
  children?: ReactElement;
};

export default function Barchart({
  chartData,
  height = 300,
  width = 400,
  barHeight = 40,
  children,
}: BarcharProps) {
  const chartDataOrdered = chartData.sort((a, b) => (a.value < b.value ? 1 : -1));
  const barGroups = chartDataOrdered.map((d, i) => {
    const barColor = i % 2 === 0 ? '#ccdd35' : '#17c9dd';
    return (
      <g transform={`translate(0, ${i * barHeight})`} key={d.title}>
        <Bar barData={d} barHeight={barHeight} barColor={barColor} />
      </g>
    );
  });

  return (
    <div>
      {children}
      <svg width={width} height={height} className="p-4 animate-center-in" data-testid="svg-root">
        <g className="group container">{barGroups}</g>
        {/* eslint-disable-next-line react/no-unknown-property */}
        <style jsx="true">
          {`
            .container .bar-group:hover {
              opacity: 1;
            }
          `}
        </style>
      </svg>
    </div>
  );
}
