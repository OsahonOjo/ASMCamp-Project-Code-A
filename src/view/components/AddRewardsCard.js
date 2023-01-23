import BadgeCard from "./BadgeCard";

import mainIcon from '../assets/hexagons_Prosymbols_Premium.png';
import minusIcon from '../assets/minus_Pixel_perfect.png';

import { commonDisplayStyles } from './styles/commonDisplayStyles';
import './styles/card.css';
import './styles/icon.css';

import { rewardTypes } from "../../model/enums";

function AddRewardsCard() {

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

  return (
    <div className='card'>
      <h4>{HEADING}</h4>

      <div>
        {rewards.map(reward => 
          <BadgeCard 
            icon={mainIcon}
            iconSize={ICON_SIZE}
            name={reward.name}
            criteria={reward.criteria}
            isComplete={reward.isComplete}
            displayInline={false} /> 
        
        )}
      </div>
    </div>
  );
}

export default AddRewardsCard;