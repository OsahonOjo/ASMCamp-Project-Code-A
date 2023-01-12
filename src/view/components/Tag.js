import React from "react";

function Tag({ text, displayBlock, backgroundColor, borderColor, borderWidth, fontSize }) {
  const style = {
    display: displayBlock ? 'block' : 'inline',
    backgroundColor: backgroundColor ? backgroundColor : 'transparent',
    borderStyle: 'solid', // create borders then color for declare borderStyle before borderColor 
    borderWidth: borderWidth ? borderWidth : '4px',
    borderColor: borderColor ? borderColor : 'transparent', 
    fontSize: fontSize ? fontSize : '16px',
    width: 'fit-content'
  };

  return <div style={style}><span>{text}</span></div>
}

export default Tag;