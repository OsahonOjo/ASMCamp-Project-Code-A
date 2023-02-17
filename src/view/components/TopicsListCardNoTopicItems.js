import React from "react";
import { useLocation } from "react-router-dom";

import IconAndTextListItem from "./IconAndTextListItem";
import VersatileCardSegment from "./VersatileCardSegment";

import headingIcon from '../assets/hexagons_Prosymbols_Premium.png';

import './styles/card.css';
import './styles/icon.css';
import { commonDisplayStyles } from "./styles/commonDisplayStyles";
import { Link } from "react-router-dom";

// interface TopicsListCardNoTopicItemsProps {
//     topicData: [{
//         id: string
//         learningTrackId: string,
//         courseId: string,
//         title: string,
//         description: string
//     }],
//     mainIcon: {
//         icon: JSX.Element, 
//         style: object
//     },
//     linkIcon?: { 
//         icon: JSX.Element, 
//         style: object,
//         to: string
//     }
// };

export default function TopicsListCardNoTopicItems({ topicData, mainIcon, linkIcon, linkStem, learningTrackId, courseId }) {

    const CARD_HEADING = "Topics";
    const CREATE_NEW_TOPIC_TEXT = "Create New Topic";
    const ICON_SIZE = '20px';
    const location = useLocation();

    return (
        <div className="card">
            <p>{CARD_HEADING}</p>

            {topicData.map(topic => 
                <VersatileCardSegment 
                    key={topic.title}
                    mainIcon={mainIcon}
                    linkIcon={linkIcon}
                    heading={{
                        text: topic.title,
                        style: {}
                    }}
                    paragraphOne={{
                        text: topic.description,
                        style: {}
                    }}
                    to={`${linkStem}/${topic.id}`}/> )}

            <hr />

            <Link 
                to={`${linkStem}/0`}
                state={{ from: location.pathname, learningTrackId, courseId }}>
                    <div className="card-display--flex">
                        <div style={{ flexGrow: 9 }}>
                            <IconAndTextListItem 
                                icon={headingIcon}
                                text={CREATE_NEW_TOPIC_TEXT}
                                style={{
                                    iconSize: {
                                        height: ICON_SIZE,
                                        width: ICON_SIZE
                                    },
                                    displayInline: true
                                }} />
                        </div>
                        <div>
                            <span className="material-symbols-outlined">navigate_next</span>
                        </div>
                    </div>
            </Link>
            
        </div>
    );
}

/*
    progress, paragraphTwo, extraComponent
    payload={{
        id: topic.id,
        learningTrackId: topic.learningTrackId,
        courseId: topic.courseId
    }}
*/