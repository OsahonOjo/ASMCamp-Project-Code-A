import React from "react";
import { useLocation } from "react-router-dom";

import IconAndTextListItem from "./IconAndTextListItem";
import FontIconAndTextListItem from "./FontIconAndTextListItem";
import VersatileCardSegment from "./VersatileCardSegment";


import headingIcon from '../assets/hexagons_Prosymbols_Premium.png';

import './styles/card.css';
import './styles/icon.css';
import { styles } from "./styles/commonDisplayStyles";
import { Link } from "react-router-dom";

import { constants } from "../../modelsAndData/constants";

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

export default function TopicItemsListCard({ topicItemsData, mainIcon, linkIcon, linkStem, learningTrackId, courseId, topicId }) {

    const CARD_HEADING = "Topic Items";
    const CREATE_NEW_TOPIC_TEXT = "Create New Topic Item";
    const ICON_SIZE = '20px';

    const { PRIMARY_TEXT_COLOR_DARK, SECONDARY_BACKGROUND_COLOR_DARK } = constants;
    const TEXT_COLOR = PRIMARY_TEXT_COLOR_DARK;
    const DEFAULT_MARGIN = '10px';
    const FONT_ICON_AND_TEXT_SEPARATION = '10px';

    const location = useLocation();

    const viewModeLinkIconMargins = {
        // marginTop: '0px',
        marginLeft: '40px',
        // paddingTop: '10px'
    };

    return (
        <div className="card">
            <p style={{ color: TEXT_COLOR, ...styles.h3SizeAndWeight }}>{CARD_HEADING}</p>

            {topicItemsData.map(topicItem => 
                <VersatileCardSegment 
                    key={topicItem.title}
                    mainIcon={mainIcon}
                    linkIcon={linkIcon}
                    heading={{
                        text: topicItem.title,
                        style: {
                            color: TEXT_COLOR,
                        }
                    }}
                    paragraphOne={{
                        text: topicItem.description,
                        style: {}
                    }}
                    to={`${linkStem}/${topicItem.id}`}/>
            )}

            <hr />

            <Link 
                to={`${linkStem}/0`}
                state={{ from: location.pathname, learningTrackId, courseId, topicId }}>
                {/* <div className="card-display--flex">
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
                </div> */}
                <div style={{ display: 'flex' }}>
                    <FontIconAndTextListItem 
                        spanFontIcon={{
                            className: "material-symbols-outlined",
                            content: "category",
                            style: {
                            ...styles.mainIcon24pxFont,
                            marginRight: FONT_ICON_AND_TEXT_SEPARATION,
                            color: '#444'
                            }
                        }}
                        text={{
                            content: CREATE_NEW_TOPIC_TEXT,
                            style: {
                            color: TEXT_COLOR,
                            ...styles.h4SizeAndWeight
                            }
                        }}
                        containerStyle={{
                            // padding: DEFAULT_PADDING,
                            display: 'inline'
                        }}/>
                    <div>
                        <span className="material-symbols-outlined" style={{ ...styles.icon40pxFont, ...viewModeLinkIconMargins, color: TEXT_COLOR }}>
                        navigate_next
                        </span>
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