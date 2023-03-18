import React from "react";
import PropTypes from 'prop-types';

/** JS object containing common display styles such as 'display: inline' */
import { styles } from "./styles/commonDisplayStyles";

/**
 * A React.js component comprised of an icon and some text displayed inline
 * @param {{icon: string, text: string, style: object}} props props passed to the component
 * @param {string} props.icon the relative path of the list item's icon
 * @param {object} props.style the style rules for the component
 * @param {{height: string, width: string}} props.style.iconSize the height and width of the icon
 * @param {boolean} [props.style.displayInline] whether the component is displayed inline or block; optional
 * @returns JSX code
 */

interface IconAndTextListItemProps {
  icon: string;
  text: string;
  style: {
    iconSize: {
      height: string,
      width: string
    },
    separation: string,
    displayInline?: boolean
  };
};

function IconAndTextListItem({ icon, text, style }: IconAndTextListItemProps): JSX.Element {
 
  return (
    <div style={style.displayInline ? styles.inline : styles.block}>
      <img src={icon} style={{ ...style.iconSize, marginRight: style.separation }} alt="list item icon"/>
      <p style={styles.inline}>{text}</p>
    </div>
  );
}

IconAndTextListItem.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string,
  style: PropTypes.object
};

export default IconAndTextListItem;