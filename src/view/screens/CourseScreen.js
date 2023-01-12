import React from "react";

import BackButtonNavbar from "../components/BackButtonNavbar";

import headerIcon from '../assets/hexagons_Prosymbols_Premium.png';
import forwardIcon from '../assets/next.png';
import infoIcon from '../assets/polygon_riajulislam.png';

function CourseScreen() {

  return (
    <>
      <BackButtonNavbar text="Course" to="/tracks"/>

      <div className="card" style={{ display: 'flex' }}>

        <div>
        <img src={headerIcon} alt="card header icon" className="header-icon"/>
        </div>

        <div>
          <h4>Course Title</h4>

          <details>
            <summary>Description</summary>
            <hr />  
            <div>
              <p>Course description. Lorem ipsum sit amet dolor adipiscing. Lorem ipsum sit amet dolor adipiscing. Lorem ipsum sit amet dolor adipiscing. Lorem ipsum sit amet dolor adipiscing.Lorem ipsum sit amet dolor adipiscing. Lorem ipsum sit amet dolor adipiscing.</p>
            </div>
          </details>

          <div>
            <img src={infoIcon} alt="info icon" className="info-icon"/>
            <span>16 Hours</span>
          </div>

          <div>
            <img src={infoIcon} alt="info icon" className="info-icon"/>
            <span>4 Topics</span>
          </div>

          <button type="button">
            Start
          </button>

        </div>

      </div>
    </>
  );
}

export default CourseScreen;
