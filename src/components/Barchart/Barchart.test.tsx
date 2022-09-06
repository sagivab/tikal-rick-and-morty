import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Barchart from '.';

const barchartDataMock = [
  {
    title: 'firstItem',
    value: 40,
  },
  {
    title: 'secondItem',
    value: 20,
  },
  {
    title: 'thirdItem',
    value: 10,
  },
];

describe('Barchart', () => {
  it('Renders Barchart correctly', () => {
    render(<Barchart chartData={barchartDataMock} />);

    expect(screen.getByTestId('svg-root')).toBeInTheDocument();
    barchartDataMock.forEach(data => {
      expect(screen.getByText(data.title)).toBeInTheDocument();
      expect(screen.getByText(data.value)).toBeInTheDocument();
    });
  });
});
