import React from "react";
import ProgressAndRewardsScreenViewModel from "./ProgressAndRewardsScreenViewModel";

import BackButtonNavbar from "../components/BackButtonNavbar";
import BadgeCard from "../components/BadgeCard";
import ProgressBar from "../components/ProgressBar";

import badgeIcon from '../assets/hexagons_Prosymbols_Premium.png';

import '../components/styles/card.css';
import '../components/styles/icon.css';
import { styles } from "../components/styles/commonDisplayStyles";

import { constants } from "../../modelsAndData/constants";

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

    const { PRIMARY_TEXT_COLOR_DARK } = constants;
    const TEXT_COLOR = PRIMARY_TEXT_COLOR_DARK;

    // TODO: change to allLearningTracksGameData
    const { allLearningTracksProgressData, getAllLearningTracksProgressData } = ProgressAndRewardsScreenViewModel();
    const [ allLearningTracksProgressState, setAllLearningTracksProgressState ] = React.useState([]);
    const [ progressSelectTagValue, setProgressSelectTagValue ] = React.useState(-1);

    React.useEffect(() => {
        getAllLearningTracksProgressData();
    }, []);

    React.useEffect(() => {
        allLearningTracksProgressData && allLearningTracksProgressData.length != 0
            ? setAllLearningTracksProgressState(allLearningTracksProgressData)
            : setAllLearningTracksProgressState([]);
        console.log('in view: allLearningTracksProgressData: ', allLearningTracksProgressData);
        // WHY IS THIS AN  OBJECT ?
    }, [allLearningTracksProgressData]);

    console.log('in view: allLearningTracksProgressState: ', allLearningTracksProgressState);

    function handleViewProgressChange(event) {
        event.preventDefault();
        setProgressSelectTagValue(event.target.value);
    }

    return (
        <>
            <BackButtonNavbar title={NAVBAR_TEXT} to={PREVIOUS_PAGE}/>
            <details open className="card" style={{ color: TEXT_COLOR }}>
                <summary style={{ textAlign: 'center' }}>{MY_PROGRESS_LABEL}</summary>
                <hr />

                <div>
                    <label htmlFor="view-progress-by-track">Select Learning Track:</label><br />
                    <select 
                        name="view-progress-by-track" 
                        onChange={handleViewProgressChange}
                        value={progressSelectTagValue}
                        style={{ width: '90%' }}>
                            <option value={-1}>All Tracks</option>
                            {allLearningTracksProgressState.map((record, index) => 
                                <option key={index} value={index}>{record.title}</option>)}
                    </select>
                    <input type="text" readOnly={true} value={progressSelectTagValue} style={{ width: '20%' }}/>
                </div>
                <br/>
                <ul style={{ listStyleType: 'none' }}>
                    {progressSelectTagValue == -1
                        ? allLearningTracksProgressState.map((record, index) => 
                                <li key={index}>
                                    <p>{record.title}</p>
                                    <ProgressBar 
                                        percentage={record.percentage} 
                                        hasLabel={true} 
                                        labelOnRightSide={false}/>
                                </li>
                            )
                        : <li>
                            <p>{allLearningTracksProgressState[progressSelectTagValue].title}   </p>
                            <ProgressBar 
                                percentage={allLearningTracksProgressState[progressSelectTagValue].percentage} 
                                hasLabel={true} 
                                labelOnRightSide={false}/>
                        </li>}
                </ul>
            </details>

            <details open className="card">
                <summary style={{ textAlign: 'center', color: TEXT_COLOR }}>{MY_REWARDS_LABEL}</summary>
                <hr />

                <div>
                    <label style={{ color: TEXT_COLOR }} htmlFor="view-rewards-by-track" >Select Learning Track:</label><br />
                    <select name="view-rewards-by-track" style={{ width: '90%' }}>
                        {tracksOptions.map(track => 
                            <option key={track} value={track}>{track}</option>)}
                    </select>

                    <label style={{ color: TEXT_COLOR }} htmlFor="view-rewards-by-reward">Select Reward:</label><br />
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