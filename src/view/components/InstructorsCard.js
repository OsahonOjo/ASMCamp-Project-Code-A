import React from "react";
import PropTypes from 'prop-types';

import IconAndTextListItem from "./IconAndTextListItem";

import headingIcon from '../assets/hexagons_Prosymbols_Premium.png';

import './styles/card.css';
import { commonDisplayStyles } from "./styles/commonDisplayStyles";

function InstructorsCard({ mainIconSize, itemIconSize, instructors }) {

  const HEADING = "Instructors";

  return (
    <details open className="card">

      <summary>
        <IconAndTextListItem 
          icon={headingIcon}
          iconSize={mainIconSize}
          text={HEADING}/>
      </summary>

      <div style={commonDisplayStyles.indented}>
        {instructors.map(instructor => 
          <IconAndTextListItem 
            key={instructor.name}
            icon={instructor.icon}
            iconSize={itemIconSize}
            text={instructor.name}/>)}
      </div>

    </details>
  );
}

InstructorsCard.propTypes = { 
  mainIconSize: PropTypes.string, 
  itemIconSize: PropTypes.string, 
  instructors: PropTypes.array 
};

export default InstructorsCard;