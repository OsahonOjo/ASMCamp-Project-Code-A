import React from "react";

interface TagProps {
  text: string;
  displayBlock?: boolean;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: string; 
  fontSize?: string;
};

/**@description A React.js component for creating a text-based tag */

function Tag({ text, displayBlock, backgroundColor, borderColor, borderWidth, fontSize }: TagProps): JSX.Element {
  const containerDivStyle = {
    display: displayBlock ? 'block' : 'inline',
    backgroundColor: backgroundColor ? backgroundColor : 'transparent',
    borderStyle: 'solid', // create borders then color for declare borderStyle before borderColor 
    borderWidth: borderWidth ? borderWidth : '0px',
    borderColor: borderColor ? borderColor : 'transparent', 
    width: 'fit-content'
  };

  const textStyle = {
    fontSize: fontSize ? fontSize : '8px',
  };

  return <div style={containerDivStyle}><span style={textStyle}>{text}</span></div>;
}

export default Tag;