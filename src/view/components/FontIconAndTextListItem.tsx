import React from "react";

import { styles } from "./styles/commonDisplayStyles";

/**
 * A React.js component comprised of a font icon and some text displayed inline
 * @param {{icon: string, text: string, style: object}} props props passed to the component
 * @param {string} props.icon the relative path of the list item's icon
 * @param {object} props.style the style rules for the component
 * @param {{height: string, width: string}} props.style.iconSize the height and width of the icon
 * @param {boolean} [props.style.displayInline] whether the component is displayed inline or block; optional
 * @returns JSX code
 */

interface FontIconAndTextListItemProps {
  iFontIcon?: {
    className: string;
    style: object;
  };
  spanFontIcon?: {
    className: string;
    content: string;
    style: object;
  };
  text: {
    content: string;
    style: object;
  };
  containerStyle: object;
};

export default function FontIconAndTextListItem({ iFontIcon, spanFontIcon, text, containerStyle }: FontIconAndTextListItemProps): JSX.Element {
 
  return (
    <div style={containerStyle}>
      {
        iFontIcon 
          ? <i className={iFontIcon.className} style={iFontIcon.style}></i> 
          : null
      }
      {
        spanFontIcon 
          ? <span className={spanFontIcon.className} style={spanFontIcon.style}>{spanFontIcon.content}</span> 
          : null
      }
      <span style={{ ...text.style }}>{text.content}</span>
    </div>
  );
}