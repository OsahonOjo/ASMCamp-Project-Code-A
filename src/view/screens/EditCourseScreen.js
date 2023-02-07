import React from "react";
import { Link } from "react-router-dom";

import BackButtonNavbar from "../components/BackButtonNavbar";
import GenericEditEntityView from "../components/GenericEditEntityView";
import TopicsListCardNoTopicItems from "../components/TopicsListCardNoTopicItems";

export default function EditCourseScreen() {

    const NAVBAR_TEXT = "Edit Course";
    const PREVIOUS_PAGE_URL = "/instructors/edit/track";
    const NEXT_PAGE_URL = "/instructors/edit/topic";
    const editViewIds = {
        id: "ltrack49w5304023",
        learningTrackId: "lanoavrnavlakf",
        courseId: "6852587461arrha"
    };
    const editViewFields = {
        title: true, 
        shortDescription: true, 
        longDescription: true, 
        seqNumber: true, 
        description: true
    };
    const topicsData = [
        {
            id: "kanfiuear647839",
            learningTrackId: "kanfiuear6478aabbafvara",
            courseId: "758493kavkrnfiuear647839",
            title: "Topic 1",
            description: "Lorem ipsum sit dolor amet consectetur adipsicing. Lorem ipsum sit dolor amet consectetur adipsicing. Lorem ipsum sit dolor amet consectetur adipsicing. Lorem ipsum sit dolor amet consectetur adipsicing."
        },
        {
            id: "ear647839kanfiu",
            learningTrackId: "r6478aabiuear6478bafvara",
            courseId: "758493kanfiueakavkrnfiuear647839",
            title: "Topic 2",
            description: "Lorem ipsum sit dolor amet consectetur adipsicing. Lorem ipsum sit dolor amet consectetur adipsicing. Lorem ipsum sit dolor amet consectetur adipsicing. Lorem ipsum sit dolor amet consectetur adipsicing."
        }
    ];
    const topicsListMainIcon = {
        icon: <span className="material-symbols-outlined">topic</span>,
        style: {}
    };
    const topicListLinkIcon = {
        icon: <span className="material-symbols-outlined">edit</span>,
        style: {},
        to: NEXT_PAGE_URL
    };
    const newTopicLinkIcon = <span className="material-symbols-outlined">navigate_next</span>;

    return (
        <>
            <BackButtonNavbar title={NAVBAR_TEXT} to={PREVIOUS_PAGE_URL} />
            
            <GenericEditEntityView 
                ids={editViewIds}
                fields={editViewFields}/>

            <TopicsListCardNoTopicItems 
                topicData={topicsData}
                mainIcon={topicsListMainIcon}
                linkIcon={topicListLinkIcon}/>
                
            <hr />
            <button>Delete Course</button>
        </>
    );
}