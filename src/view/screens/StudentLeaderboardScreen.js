
import BackButtonNavbar from "../components/BackButtonNavbar";

import '../components/styles/card.css';
import '../components/styles/icon.css';

export default function StudentLeaderboardScreen() {

    const NAVBAR_TEXT = "Leaderboards";
    const PREVIOUS_PAGE = "/students";
    const PROGRESS_LEADERBOARD_LABEL = "Progress Leaderboard";
    const REWARDS_LEADERBOARD_LABEL = "Rewards Leaderboard";
    const tracks = [
        "Select",
        "Learning Track 1",
        "Learning Track 2",
        "All Tracks"
    ];
    const groups = [
        "Select",
        "Group 1", 
        "Group 2",
        "All Groups"
    ];
    const rewards = [
        "Select",
        "XP",
        "Badges",
        "All Rewards"
    ];

    return (
        <>
            <BackButtonNavbar title={NAVBAR_TEXT} to={PREVIOUS_PAGE}/>

            <details className="card">

                <summary style={{ textAlign: 'center' }}>{PROGRESS_LEADERBOARD_LABEL}</summary>
                <hr />

                <div>
                    <label htmlFor="track-to-view">Select Learning Track:</label><br />
                    <select name="track-to-view" style={{ width: '90%' }}>
                        {tracks.map(track => 
                            <option key={track} value={track}>{track}</option>)}
                    </select>

                    <label htmlFor="group-to-view">Select Group:</label><br />
                    <select name="group-to-view" style={{ width: '90%' }}>
                        {groups.map(group => 
                            <option key={group} value={group}>{group}</option>)}
                    </select>
                </div>

                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                </ul>
            </details>

            <details className="card">

                <summary style={{ textAlign: 'center' }}>{REWARDS_LEADERBOARD_LABEL}</summary>
                <hr />

                <div>
                    <label htmlFor="track-to-view">Select Learning Track:</label><br />
                    <select name="track-to-view" style={{ width: '90%' }}>
                        {tracks.map(track => 
                            <option key={track} value={track}>{track}</option>)}
                    </select>

                    <label htmlFor="group-to-view">Select Group:</label><br />
                    <select name="group-to-view" style={{ width: '90%' }}>
                        {groups.map(group => 
                            <option key={group} value={group}>{group}</option>)}
                    </select>

                    <label htmlFor="reward-to-view">Select Reward:</label><br />
                    <select name="reward-to-view" style={{ width: '90%' }}>
                        {rewards.map(reward => 
                            <option key={reward} value={reward}>{reward}</option>)}
                    </select>
                </div>

                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                </ul>
            </details>
        </>
    );
}