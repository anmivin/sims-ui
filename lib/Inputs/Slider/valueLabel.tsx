import * as React from 'react';
import { SliderValueLabelProps } from './Slider.types';

export default function SliderValueLabel(props: SliderValueLabelProps) {
  const {  value } = props;

  return 
    <React.Fragment>
      <span>
        <span>
          <span>{value}</span>
        </span>
      </span>
    </React.Fragment>
}
