import React from "react";

interface TagProps {
  text: {
    content: string;
    style: object;
  };
  container: {
    baseStyle: {
      display?: string;
      backgroundColor?: string;
      borderColor?: string;
      borderWidth?: string;
      borderStyle?: string;
      width?: string;
    };
    otherStyle?: object;
  };
};

/**@description A React.js component for creating a text-based tag */

export default function Tag({ text, container }: TagProps): JSX.Element {
  const containerStyle = {
    // wordWrap: 'nowrap',
    display: container.baseStyle.display ? container.baseStyle.display : 'inline',
    backgroundColor: container.baseStyle.backgroundColor ? container.baseStyle.backgroundColor : 'transparent',
    borderColor: container.baseStyle.borderColor ? container.baseStyle.borderColor : 'transparent', 
    borderWidth: container.baseStyle.borderWidth ? container.baseStyle.borderWidth : '0px',
    borderStyle: container.baseStyle.borderStyle ? container.baseStyle.borderStyle : 'solid', // must declare borderStyle before borderColor 
    width: container.baseStyle.width ? container.baseStyle.width : 'fit-content',
    ...container.otherStyle
  };

  return (
    <div style={containerStyle}>
      <span style={{ ...text.style }}>{text.content}</span>
    </div>
  );
}