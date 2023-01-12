import React from "react";
import PropTypes from 'prop-types';

import { commonDisplayStyles } from "./styles/commonDisplayStyles";

function IconAndTextListItem({ icon, iconSize, text }) {

  const style = {
    height: iconSize,
    width: iconSize
  };

  return (
    <div>
      <img src={icon} style={style} alt="list item icon"/>
      <p style={commonDisplayStyles.inline}>{text}</p>
    </div>
  );
}

IconAndTextListItem.propTypes = {
  icon: PropTypes.string,
  iconSize: PropTypes.string,
  text: PropTypes.string
};

export default IconAndTextListItem;