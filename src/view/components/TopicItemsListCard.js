import React from "react";

import IconAndTextListItem from "./IconAndTextListItem";
import VersatileCardSegment from "./VersatileCardSegment";

import headingIcon from '../assets/hexagons_Prosymbols_Premium.png';

import './styles/card.css';
import './styles/icon.css';
import { commonDisplayStyles } from "./styles/commonDisplayStyles";
import { Link } from "react-router-dom";

// interface TopicsListCardNoTopicItemsProps {
//     topicItemsData: [{
//         id: string
//         learningTrackId: string,
//         courseId: string,
//         topicId: string,
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

export default function TopicItemsListCard({ topicItemsData, mainIcon, linkIcon, linkStem }) {

    const CARD_HEADING = "Topic Items";
    const CREATE_NEW_TOPIC_TEXT = "Create New Topic Item";
    const ICON_SIZE = '20px';

    return (
        <div className="card">
            <p>{CARD_HEADING}</p>

            {topicItemsData.map(topicItem => 
                <VersatileCardSegment 
                    key={topicItem.title}
                    mainIcon={mainIcon}
                    linkIcon={linkIcon}
                    heading={{
                        text: topicItem.title,
                        style: {}
                    }}
                    paragraphOne={{
                        text: topicItem.description,
                        style: {}
                    }}
                    to={`${linkStem}/${topicItem.id}`}/>
            )}

            <hr />

            <Link to={linkIcon.to}>
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
    payload={{
        topicId: topic.id,
        learningTrackId: topic.learningTrackId,
        courseId: topic.courseId
    }}
*/