/* libraries */
import React from "react";
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

/* components */
import BackButtonNavbar from '../components/BackButtonNavbar.js';

/* data */
import Model from "../data/model.js";

function TopicDetailsScreen() {

  const location = useLocation();
  const model = new Model();
  const topic = model.getTopic(location.state.topicId);

  return (
    <>
      <BackButtonNavbar text={topic.title} to="/topic/all"/>
      <div>
        <p>{topic.title}</p>
        <Link to="/topic/item" state={{ topicId: topic.id, topicItemId: topic.material[0].id }}>
          <button type="button">
            Start
          </button>
        </Link>
      </div>

      <div>
        <p>{topic.longDescription}</p>
        <p><span>{topic.hours}</span> Hours</p>
        <p><span>{topic.xp}</span> XP</p>
        <p><span>{"x"}</span> Lessons</p>
        <p><span>{"x"}</span> Questions</p>
      </div>

      <div>
        <p>Learning Objectives</p>
        <p><i>Learning objective items here</i></p>
      </div>

      <div>
        <p>Badges</p>
        <p><i>Badge cards here</i></p>
      </div>
    </>
  );
}

export default TopicDetailsScreen;
