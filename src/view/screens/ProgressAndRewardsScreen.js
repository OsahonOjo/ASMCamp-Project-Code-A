
import BackButtonNavbar from "../components/BackButtonNavbar";
import BadgeCard from "../components/BadgeCard";

import badgeIcon from '../assets/hexagons_Prosymbols_Premium.png';

import '../components/styles/card.css';
import '../components/styles/icon.css';

export default function ProgressAndRewardsScreen() {

    const NAVBAR_TEXT = "Progress and Rewards";
    const PREVIOUS_PAGE = "/students";
    const MY_PROGRESS_LABEL = "My Progress";
    const MY_REWARDS_LABEL = "My Rewards";
    const BADGE_ICON_SIZE = '20px';
    const tracksOptions = [
        "Select",
        "Learning Track 1",
        "Learning Track 2",
        "All Tracks"
    ];
    const rewardsOptions = [
        "Select",
        "XP",
        "Badges",
        "All Rewards"
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
    // BadgeCard({ icon, iconSize, name, criteria, isComplete, displayInline })

    return (
        <>
            <BackButtonNavbar title={NAVBAR_TEXT} to={PREVIOUS_PAGE}/>
            <details className="card">
                <summary style={{ textAlign: 'center' }}>{MY_PROGRESS_LABEL}</summary>
                <hr />

                <div>
                    <label htmlFor="view-progress-by-track">Select Learning Track:</label><br />
                    <select name="view-progress-by-track" style={{ width: '90%' }}>
                        {tracksOptions.map(track => 
                            <option key={track} value={track}>{track}</option>)}
                    </select>
                </div>

                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                </ul>
            </details>
            <details className="card">
                <summary style={{ textAlign: 'center' }}>{MY_REWARDS_LABEL}</summary>
                <hr />

                <div>
                    <label htmlFor="view-rewards-by-track">Select Learning Track:</label><br />
                    <select name="view-rewards-by-track" style={{ width: '90%' }}>
                        {tracksOptions.map(track => 
                            <option key={track} value={track}>{track}</option>)}
                    </select>

                    <label htmlFor="view-rewards-by-reward">Select Reward:</label><br />
                    <select name="view-rewards-by-reward" style={{ width: '90%' }}>
                        {rewardsOptions.map(reward => 
                            <option key={reward} value={reward}>{reward}</option>)}
                    </select>
                </div>

                {rewardsData.map(reward => 
                    <BadgeCard 
                        key={reward.name}
                        icon={badgeIcon}
                        iconSize={BADGE_ICON_SIZE}
                        name={reward.name}
                        criteria={reward.criteria}
                        isComplete={reward.isComplete} />)}
            </details>
        </>
    );
}