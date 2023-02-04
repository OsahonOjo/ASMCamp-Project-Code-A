import BadgeCard from "./BadgeCard";

import mainIcon from '../assets/hexagons_Prosymbols_Premium.png';
import minusIcon from '../assets/minus_Pixel_perfect.png';

import { commonDisplayStyles } from './styles/commonDisplayStyles';
import './styles/card.css';
import './styles/icon.css';

import { rewardTypes } from "../../model/enums";

export default function AddRewardsCard() {

  const HEADING = "Rewards";
  const ICON_SIZE = '20px';
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
  const badgeTypes = [
    "Select",
    "Completed Learning Track",
    "Completed Course",
    "Completed Topic",
    "Completed Topic Item"
  ];
  const tracks = [
    "Select",
    "Learning Track 1",
    "Learning Track 2"
  ];
  const courses = [
    "Select",
    "Course 1",
    "Course 2"
  ];
  const topics = [
    "Select",
    "Topic 1",
    "Topic 2"
  ];
  const topicItems = [
    "Select",
    "Topic Item 1",
    "Topic Item 2"
  ];
  const rewardsData = [
    {
      type: "BADGE",
      name: "Expertise",
      criteria: "Complete 'Learning Track Alpha'",
      isComplete: true
    },
    {
      type: "BADGE",
      name: "First Steps",
      criteria: "Complete one topic item in 'Learning Track Alpha'",
      isComplete: true
    },
    {
      type: "BADGE",
      name: "Made it Halfway",
      criteria: "Halfway through 'Learning Track Alpha'",
      isComplete: false
    }
  ];

  return (
    <div className='card'>
      <h4>{HEADING}</h4>

      <div>
        {rewards.map(reward => 
          <div 
            key={reward.name}
            className="card">
            <BadgeCard 
              icon={mainIcon}
              iconSize={ICON_SIZE}
              name={reward.name}
              criteria={reward.criteria}
              isComplete={reward.isComplete}
              displayInline={false} /> 
            <img src={minusIcon} alt="minus icon" className='icon--20px'/>
          </div>
        )}
      </div>

      <br /><br />

      <details className="card">
        <summary style={{textAlign: 'center'}}>Create Reward</summary>

        <hr />

        <form>
          <fieldset>
            <label>Title</label><br />
            <input type="text" />
          </fieldset>

          <label htmlFor="select-badge-type">Badge Type</label><br />
          <select name="select-badge-type" style={{ width: '90%' }}>
            {badgeTypes.map((type, index) => 
              <option key={type} value={index}>{type}</option>)}
          </select>

          <label htmlFor="select-learning-track">Learning Track</label><br />
          <select name="select-learning-track" style={{ width: '90%' }}>
            {tracks.map((track, index) => 
              <option key={track} value={index}>{track}</option>)}
          </select>

          <label htmlFor="select-course">Course</label><br />
          <select name="select-course" style={{ width: '90%' }}>
            {courses.map(course => 
              <option key={course} value={course}>{course}</option>)}
          </select>

          <label htmlFor="select-topic">Topic</label><br />
          <select name="select-topic" style={{ width: '90%' }}>
            {topics.map(topic => 
              <option key={topic} value={topic}>{topic}</option>)}
          </select>

          <label htmlFor="select-topic-item">Topic Item</label><br />
          <select name="select-topic-item" style={{ width: '90%' }}>
            {topicItems.map(topicItem => 
              <option key={topicItem} value={topicItem}>{topicItem}</option>)}
          </select>

          <div>
            <label>Percent Complete</label><br />
            <input type="number" min="1" max="100"/>
          </div>

          <button>Save Reward</button>
        </form>

      </details>
    </div>
  );
}