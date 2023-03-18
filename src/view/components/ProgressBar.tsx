import React from "react";

import { styles } from "./styles/commonDisplayStyles";

interface ProgressBarProps {
  percentage: number,
  hasLabel: boolean,
  labelOnRightSide: boolean
};

export default function ProgressBar({ percentage, hasLabel, labelOnRightSide }: ProgressBarProps): JSX.Element {

  const TEXT_COLOR = styles.vDarkModeTextColor3;
  const MAX = 100;

  const progressBarStyle = {
    background: '#bdc1c6',
    backgroundColor: 'orange',
    color: 'red'
  };

  const labelStyle = {
    fontSize: "16px",
    fontWeight: "normal",
    color: TEXT_COLOR,
    paddingRight: "10px",
  };

  let percent = percentage > MAX ? MAX : percentage;

  const label = <label style={labelStyle} htmlFor="progress-bar">{percentage}%</label>;

  return (
    <div>
      {hasLabel && !labelOnRightSide ? label : null}
      <progress id="progress-bar" value={percent} max={MAX} style={{ verticalAlign: 'middle' }}></progress> 
      {hasLabel && labelOnRightSide ? label : null}
    </div>
  );
}


  // if (!labelOnRightSide) {
  //   return (
  //     <>
  //       {hasLabel ? <label style={{ fontSize: '20px' }} htmlFor="progress-bar">{percentage}%</label> : null}
  //       <progress id="progress-bar" value={percentage} max={MAX}></progress>
  //     </>
  //   );
  // }
  // else {
  //   return (
  //     <>
  //       <progress id="progress-bar" value={percentage} max={MAX}></progress> 
  //       {hasLabel ? <label style={{ fontSize: '20px' }} htmlFor="progress-bar">{percentage}%</label> : null}
  //     </>
  //   );
  // }