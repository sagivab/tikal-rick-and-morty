import React from 'react';
import { BarData } from 'types/common';

type BarGroupProps = {
  barData: BarData;
  barHeight: number;
  barColor: '#ccdd35' | '#17c9dd';
};

export default function Bar({ barData, barHeight, barColor }: BarGroupProps) {
  const barPadding = 5;
  const widthScale = (n: number) => n * 5;

  const width = widthScale(barData.value);
  const yMid = barHeight * 0.5;

  return (
    <g className="bar-group opacity-80 hover:opacity-100 hover:scale-105">
      <rect
        rx={5}
        y={barPadding * 0.5}
        width={width}
        height={barHeight - barPadding}
        fill={barColor}
      />
      <text className="font-bold" x={5} y={yMid} alignmentBaseline="middle">
        {barData.title}
      </text>
      <text
        className="value-label fill-white font-bold"
        x={width - 8}
        y={yMid}
        alignmentBaseline="middle"
      >
        {barData.value}
      </text>
      {/* eslint-disable-next-line react/no-unknown-property */}
      <style jsx="true">
        {`
          .bar-group .value-label {
            text-anchor: end;
          }
        `}
      </style>
    </g>
  );
}
