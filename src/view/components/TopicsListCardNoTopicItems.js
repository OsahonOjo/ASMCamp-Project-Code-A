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

import { constants } from '../../modelsAndData/constants';

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

    const { PRIMARY_TEXT_COLOR_DARK, SECONDARY_BACKGROUND_COLOR_DARK } = constants;
    const TEXT_COLOR = PRIMARY_TEXT_COLOR_DARK;
    const DEFAULT_MARGIN = '10px';
    const DEFAULT_MARGIN_X2 = '20px';
    const FONT_ICON_AND_TEXT_SEPARATION = '10px';
    const LABEL_FONT_SIZE = '20px';
    const TEXT_INPUT_FONT_SIZE = '18px';

    const viewModeLinkIconMargins = {
        // marginTop: '0px',
        marginLeft: '100px',
        // paddingTop: '10px'
      };

    return (
        <div className="card">
            <p style={{ color: TEXT_COLOR, ...styles.h3SizeAndWeight }}>{CARD_HEADING}</p>

            {topicData.map(topic => 
                <VersatileCardSegment 
                    key={topic.title}
                    mainIcon={mainIcon}
                    linkIcon={linkIcon}
                    heading={{
                        text: topic.title,
                        style: { 
                            color: TEXT_COLOR, 
                            ...styles.h3SizeAndWeight
                        }
                    }}
                    paragraphOne={{
                        text: topic.description,
                        style: {
                            color: TEXT_COLOR
                        }
                    }}
                    to={`${linkStem}/${topic.id}`}/> )}

            <hr />

            <Link 
                to={`${linkStem}/0`}
                state={{ from: location.pathname, learningTrackId, courseId }}>
                    
                    <div style={{ display: 'flex' }}>
                        <FontIconAndTextListItem 
                            spanFontIcon={{
                                className: "material-symbols-outlined",
                                content: "topic",
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
    progress, paragraphTwo, extraComponent
    payload={{
        id: topic.id,
        learningTrackId: topic.learningTrackId,
        courseId: topic.courseId
    }}

    const mainIconElement = 
        <span className="material-symbols-outlined" style={{ ...styles.mainIcon24pxFont, marginRight: DEFAULT_MARGIN, color: '#444' }}>
            topic
        </span>;

    const linkIconElement = 
        <span className="material-symbols-outlined" style={{ ...styles.mainIcon24pxFont, marginRight: DEFAULT_MARGIN, color: '#444' }}>
            topic
        </span>;
*/