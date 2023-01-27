import React from "react";

interface CollapsibleParagraphProps {
  text: string,
  limit?: number,
  paragraphStyle?: any
};

export default function CollapsibleParagraph({ text, limit,   paragraphStyle }: CollapsibleParagraphProps): JSX.Element {

  const DEFAULT_LIMIT = 80;
  const [isCollapsed, setIsCollapsed] = React.useState(true);
  const buttonStyle = {
    borderStyle: 'none',
    backgroundColor: 'transparent',
    color: '#68BBE3',
    padding: '0px',
    fontSize: '18px'
  };

  let abbreviatedText = text.slice(0, limit ? limit : DEFAULT_LIMIT) + "...";
  let displayText = isCollapsed ? abbreviatedText : text;
  let buttonText = isCollapsed ? "Show more" : "Hide text";
  
  function handleClick() {
    let nextState = !isCollapsed;
    setIsCollapsed(nextState);
  }

  return (
    <>
      <p style={paragraphStyle ? paragraphStyle : {}}>
        {displayText}
      </p>
      <button onClick={handleClick} style={buttonStyle}>
        {buttonText}
      </button>
    </>
  );
}