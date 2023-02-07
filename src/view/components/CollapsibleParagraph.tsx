import React from "react";

interface CollapsibleParagraphProps {
  text: string,
  limit?: number,
  paragraphStyle?: any
};

export default function CollapsibleParagraph({ text, limit, paragraphStyle }: CollapsibleParagraphProps): JSX.Element {

  const DEFAULT_LIMIT = 80;
  const [isCollapsed, setIsCollapsed] = React.useState(true);
  const buttonStyle = {
    borderStyle: 'none',
    backgroundColor: 'transparent',
    color: '#68BBE3',
    padding: '0px',
    fontSize: '18px'
  };

  let characterLimit = limit ? limit : DEFAULT_LIMIT;

  // throws TypeError if text prop is empty
  // also throws TypeError if order of ? text.slice(0, characterLimit) + "..." : text is reversed
  let abbreviatedText = (text && text.length > characterLimit) ? text.slice(0, characterLimit) + "..." : text; 
  let displayText = isCollapsed ? abbreviatedText : text;
  
  let displayButton = text && text.length > characterLimit;
  let buttonText = isCollapsed ? "Show more" : "Hide text";
  const buttonElement = 
    <button onClick={handleClick} style={buttonStyle}>
      {buttonText}
    </button>;
    
  function handleClick() {
    let nextState = !isCollapsed;
    setIsCollapsed(nextState);
  }

  return (
    <>
      <p style={paragraphStyle ? paragraphStyle : {}}>
        {displayText}
      </p>
      {displayButton ? buttonElement : null}
    </>
  );
}