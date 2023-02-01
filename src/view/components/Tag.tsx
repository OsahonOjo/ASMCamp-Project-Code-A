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
  const style = {
    display: displayBlock ? 'block' : 'inline',
    backgroundColor: backgroundColor ? backgroundColor : 'transparent',
    borderStyle: 'solid', // create borders then color for declare borderStyle before borderColor 
    borderWidth: borderWidth ? borderWidth : '0px',
    borderColor: borderColor ? borderColor : 'transparent', 
    fontSize: fontSize ? fontSize : '16px',
    width: 'fit-content'
  };

  return <div style={style}><span>{text}</span></div>;
}

export default Tag;