import React from "react";
import PropTypes from 'prop-types';

function ProgressBar({ percentage, hasLabel, labelOnRightSide }) {

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

ProgressBar.propTypes = {
  percentage: PropTypes.number,
  hasLabel: PropTypes.bool,
  labelOnRightSide: PropTypes.bool
};

export default ProgressBar;