import React from "react";

import BadgeCard from "./BadgeCard";

import mainIcon from '../assets/hexagons_Prosymbols_Premium.png';
import minusIcon from '../assets/minus_Pixel_perfect.png';

import { styles } from './styles/commonDisplayStyles';
import './styles/card.css';
import './styles/icon.css';

import { constants } from '../../modelsAndData/constants';

import { rewardTypes, badgeTypes } from "../../modelsAndData/enums";

export default function AddRewardsCard({ learningTrack, courses, topics, topicItems, badges, createBadge, deleteBadge }) {

  const HEADING = "Badges";
  const CREATE_BADGE_TEXT = "Create Badge";
  const FORM_ELEMENT_WIDTH = '100%';
  const ICON_SIZE = '80px';
  const DELETE_TEXT = "DELETE BADGE";

  const { PRIMARY_TEXT_COLOR_DARK, SECONDARY_BACKGROUND_COLOR_DARK } = constants;
  const TEXT_COLOR = PRIMARY_TEXT_COLOR_DARK;
  const DEFAULT_MARGIN = '10px';
  const DEFAULT_MARGIN_X2 = '20px';
  const FONT_ICON_AND_TEXT_SEPARATION = '10px';
  const LABEL_FONT_SIZE = '20px';
  const TEXT_INPUT_FONT_SIZE = '18px';
  const SELECT_TAG_HEIGHT = '2em';
  const BADGE_CARD_MARGIN = '40px';

  const rewards = [
    {
      type: rewardTypes.BADGE,
      name: "Expertise",
      criteria: "Complete 'Learning Track Alpha'",
      isComplete: true
    },
    {
      type: rewardTypes.BADGE,
      name: "First Steps",
      criteria: "Complete one topic item in 'Learning Track Alpha'",
      isComplete: true
    },
    {
      type: rewardTypes.BADGE,
      name: "Made it Halfway",
      criteria: "Halfway through 'Learning Track Alpha'",
      isComplete: false
    }
  ];

  const DEFAULT_BADGE_DATA = {
    learningTrackId: learningTrack.id,
    title: "",
    type: "",
    contentId: "",
    contentTitle: ""
  };

  const [ badgeData, setBadgeData ] = React.useState(DEFAULT_BADGE_DATA);

  function handleInputChange(event) {
    const nextFormData = Object.assign({}, badgeData);
    nextFormData.title = event.target.value;
    setBadgeData(nextFormData);
  }

  function handleBadgeTypeSelect(event) {
    const nextFormData = Object.assign({}, badgeData);
    nextFormData.type = event.target.value;
    nextFormData.contentId = "";
    nextFormData.contentTitle = "";
    setBadgeData(nextFormData);
  }

  function handleContentSelect(event) {
    const nextFormData = Object.assign({}, badgeData);
    nextFormData.contentId = event.target.value;
    nextFormData.contentTitle = "";
    setBadgeData(nextFormData);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log("badge creation attempt; badgeData:", badgeData);
    
    if (badgeData.learningTrackId == '-1' || badgeData.learningTrackId == '') {
      console.log('No learning track ID found.');
      return;
    }
    if (badgeData.type == '-1' || badgeData.type == '') {
      console.log('Select a badge type.');
      return;
    }
    if (badgeData.contentId == '-1' || badgeData.contentId == '') {
      console.log('Select a an item.');
      return;
    }
    const submissionData = Object.assign({}, badgeData);
    switch(badgeData.type) {
      case badgeTypes.TRACK.typeId:
        submissionData.contentTitle = learningTrack.title;
        break;
      case badgeTypes.COURS.typeId:
        submissionData.contentTitle = courses.find(course => course.id == submissionData.contentId).title;
        break;
      case badgeTypes.TOPIC.typeId:
        submissionData.contentTitle = topics.find(topic => topic.id == submissionData.contentId).title;
        break;
      case badgeTypes.TPITM.typeId:
        submissionData.contentTitle = topicItems.find(topicItem => topicItem.id == submissionData.contentId).title;
        break;
    }
    let success = await createBadge(submissionData);  // returns true or null
    if (success) {
      console.log('Form submitted: ', submissionData);
      setBadgeData(DEFAULT_BADGE_DATA);  // clear badge creation form
    }
    else
      console.log('Form submission failed');
  }

  console.log('formData: ', badgeData);

  const selectOption = <option value={-1}>Select</option>;

  const topicItemSelect = 
    <>
      <label htmlFor="select-topic-item">Topic Item</label><br />
      <select 
        required 
        name="select-topic-item" 
        style={{ height: SELECT_TAG_HEIGHT, width: FORM_ELEMENT_WIDTH, backgroundColor: SECONDARY_BACKGROUND_COLOR_DARK, borderWidth: '0px', borderBottomWidth: '2px', borderColor: TEXT_COLOR, color: TEXT_COLOR }}
        value={badgeData.contentId}
        onChange={handleContentSelect}>
          {selectOption}
          {topicItems.map(topicItem => 
            <option key={topicItem.id} value={topicItem.id}>{topicItem.title}</option>)}
      </select>
    </>;

  const topicSelect = 
    <>
      <label htmlFor="select-topic">Topic</label><br />
      <select 
        required 
        name="select-topic" 
        style={{ height: SELECT_TAG_HEIGHT, width: FORM_ELEMENT_WIDTH, backgroundColor: SECONDARY_BACKGROUND_COLOR_DARK, borderWidth: '0px', borderBottomWidth: '2px', borderColor: TEXT_COLOR, color: TEXT_COLOR }} 
        value={badgeData.contentId}
        onChange={handleContentSelect}>
          {selectOption}
          {topics.map(topic => 
            <option key={topic.id} value={topic.id}>{topic.title}</option>)}
      </select>
    </>;

  const courseSelect = 
    <>
      <label htmlFor="select-course">Course</label><br />
      <select 
        required 
        name="select-course" 
        style={{ height: SELECT_TAG_HEIGHT, width: FORM_ELEMENT_WIDTH, backgroundColor: SECONDARY_BACKGROUND_COLOR_DARK, borderWidth: '0px', borderBottomWidth: '2px', borderColor: TEXT_COLOR, color: TEXT_COLOR }}
        value={badgeData.contentId}
        onChange={handleContentSelect}>
          {selectOption}
          {courses.map(course => 
            <option key={course.id} value={course.id}>{course.title}</option>)}
      </select>
    </>;

  const learningTrackSelect = 
    <>
      <label htmlFor="select-learning-track">Learning Track</label><br />
      <select 
        required
        name="select-learning-track" 
        style={{ height: SELECT_TAG_HEIGHT, width: FORM_ELEMENT_WIDTH, backgroundColor: SECONDARY_BACKGROUND_COLOR_DARK, borderWidth: '0px', borderBottomWidth: '2px', borderColor: TEXT_COLOR, color: TEXT_COLOR }}
        value={badgeData.contentId}
        onChange={handleContentSelect}>
          {selectOption}
          <option value={learningTrack.id}>{learningTrack.title}</option>
      </select>
    </>;

  const buttonStyle = { 
    width: '200px', 
    height: '2em', 
    margin: DEFAULT_MARGIN,
    fontSize: '18px', 
    fontWeight: 'bold',
    color: styles.vDarkModeTextColor3,
    backgroundColor: styles.vDarkModeBackground1,
    // textAlign: 'left',
    borderWidth: '1px',
    borderColor: TEXT_COLOR, 
    color: TEXT_COLOR
  };

  const deleteButtonStyle = { 
    width: '95%', 
    height: '2em', 
    margin: DEFAULT_MARGIN,
    fontSize: '18px', 
    fontWeight: 'bold',
    color: styles.vDarkModeTextColor3,
    backgroundColor: styles.vDarkModeBackground1,
    // textAlign: 'left',
    borderWidth: '1px',
    borderColor: TEXT_COLOR, 
    color: TEXT_COLOR
  };

  return (
    <>
      <div className='card'>
        <h4 style={{ color: TEXT_COLOR, ...styles.h3SizeAndWeight }}>{HEADING}</h4>

        <hr/>

        <p style={{ color: TEXT_COLOR }}>A player can get a badge after completing a topic item, topic, course or learning track.</p>
        <br/>

        <div>
          {badges.map(badge => 
            <div key={badge.id} className="card" style={{ marginBottom: BADGE_CARD_MARGIN }}>
                <BadgeCard 
                    icon={mainIcon}
                    iconSize={ICON_SIZE}
                    name={badge.title}
                    type={badge.type}
                    criteria={badge.contentTitle}
                    isComplete={false} /> 
                  <button style={deleteButtonStyle}>{DELETE_TEXT}</button>
            </div>
          )}
        </div>
      </div>

      {/* Create Badge section */}
      <details style={{ color: TEXT_COLOR }} className="card">
        <summary style={{ textAlign: 'center', ...styles.h4SizeAndWeight }}>{CREATE_BADGE_TEXT}</summary>

        <hr />

        <form onSubmit={handleSubmit} style={{ fontSize: '20px' }}>
          <fieldset style={{ marginBottom: DEFAULT_MARGIN_X2 }}>
            <label style={{ fontSize: LABEL_FONT_SIZE }}>Title</label><br />
            <input required type="text" value={badgeData.title} onChange={handleInputChange} style={{ width: FORM_ELEMENT_WIDTH, backgroundColor: SECONDARY_BACKGROUND_COLOR_DARK, borderWidth: '0px', borderBottomWidth: '2px', borderColor: TEXT_COLOR, color: TEXT_COLOR }}/>
          </fieldset>

          <fieldset style={{ marginBottom: DEFAULT_MARGIN_X2 }}>
            <label style={{ fontSize: TEXT_INPUT_FONT_SIZE }} htmlFor="select-badge-type">Badge Type</label><br />
            <select 
              required
              name="select-badge-type" 
              style={{ height: '2em', width: FORM_ELEMENT_WIDTH, backgroundColor: SECONDARY_BACKGROUND_COLOR_DARK, borderWidth: '0px', borderBottomWidth: '2px', borderColor: TEXT_COLOR, color: TEXT_COLOR }}
              value={badgeData.type}
              onChange={handleBadgeTypeSelect}>
                {selectOption}
                {Object.keys(badgeTypes).map((key) => 
                  <option key={key} value={key}>{badgeTypes[key].name}</option>)}
            </select>
            <input type="text" readOnly={true} value={badgeData.type} style={{ width: '20%', backgroundColor: SECONDARY_BACKGROUND_COLOR_DARK, borderWidth: '0px', borderColor: 'transparent', color: TEXT_COLOR }}/>
          </fieldset>
          
          <fieldset>
            {badgeData.type == badgeTypes.TRACK.typeId ? learningTrackSelect : null}
            {badgeData.type == badgeTypes.COURS.typeId ? courseSelect : null}
            {badgeData.type == badgeTypes.TOPIC.typeId ? topicSelect : null}
            {badgeData.type == badgeTypes.TPITM.typeId ? topicItemSelect : null}
          </fieldset>
          <br/>

          <div style={{ textAlign: 'right' }}>
            <button style={buttonStyle} type="submit">Save Reward</button>
          </div>
        </form>

      </details>
    </>
  );
}

/*
    <div key={badge.id} className="card card-display--flex">
        <div style={{ flexGrow: 9 }}>
          <BadgeCard 
            icon={mainIcon}
            iconSize={ICON_SIZE}
            name={badge.title}
            type={badge.type}
            criteria={badge.contentTitle}
            isComplete={false} /> 
        </div>
        <img src={minusIcon} alt="minus icon" className='icon--20px'/>
    </div>
*/