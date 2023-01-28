import React from "react";
import PropTypes from 'prop-types';

interface ProgressBarProps {
  percentage: number,
  hasLabel: boolean,
  labelOnRightSide: boolean
};

export default function ProgressBar({ percentage, hasLabel, labelOnRightSide }: ProgressBarProps): JSX.Element {

  const MAX = 100;
  percentage = percentage > MAX ? MAX : percentage;
  
  if (!labelOnRightSide) {
    return (
      <>
        {hasLabel ? <label htmlFor="progress-bar">{percentage}%</label> : null}
        <progress id="progress-bar" value={percentage} max={MAX}></progress>
      </>
    );
  }
  else {
    return (
      <>
        <progress id="progress-bar" value={percentage} max={MAX}></progress> 
        {hasLabel ? <label htmlFor="progress-bar">{percentage}%</label> : null}
      </>
    );
  }
}