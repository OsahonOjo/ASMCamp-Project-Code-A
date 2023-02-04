
import BackButtonNavbar from "../components/BackButtonNavbar";

import '../components/styles/card.css';
import '../components/styles/icon.css';

export default function InstructorLeaderboardScreen() {

    const NAVBAR_TEXT = "Leaderboards";
    const PREVIOUS_PAGE = "/instructors";
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
                    <label htmlFor="view-progress-by-track">Select Learning Track:</label><br />
                    <select name="view-progress-by-track" style={{ width: '90%' }}>
                        {tracks.map(track => 
                            <option key={track} value={track}>{track}</option>)}
                    </select>

                    <label htmlFor="view-progress-by-group">Select Group:</label><br />
                    <select name="view-progress-by-group" style={{ width: '90%' }}>
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
                    <label htmlFor="view-rewards-by-track">Select Learning Track:</label><br />
                    <select name="view-rewards-by-track" style={{ width: '90%' }}>
                        {tracks.map((track, index) => 
                            <option key={track} value={index}>{track}</option>)}
                    </select>

                    <label htmlFor="view-rewards-by-group">Select Group:</label><br />
                    <select name="view-rewards-by-group" style={{ width: '90%' }}>
                        {groups.map((group, index) => 
                            <option key={group} value={index}>{group}</option>)}
                    </select>

                    <label htmlFor="view-rewards-by-reward">Select Reward:</label><br />
                    <select name="view-rewards-by-reward" style={{ width: '90%' }}>
                        {rewards.map((reward, index) => 
                            <option key={reward} value={index}>{reward}</option>)}
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