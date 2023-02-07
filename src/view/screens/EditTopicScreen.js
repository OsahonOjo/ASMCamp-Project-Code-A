import { Link } from "react-router-dom";

import BackButtonNavbar from "../components/BackButtonNavbar";
import GenericEditEntityView from "../components/GenericEditEntityView";
import TopicItemsListCard from "../components/TopicItemsListCard";

export default function EditTopicScreen() {

    const NAVBAR_TEXT = "Edit Topic";
    const PREVIOUS_PAGE_URL = "/instructors/edit/course";
    const NEXT_PAGE_URL = "/instructors/edit/item";
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
    const topicitemsData = [
        {
            id: "kanfiuear647839",
            learningTrackId: "kanfiuear6478aabbafvara",
            courseId: "758493kavkrnfiuear647839",
            topicId: "758493kavkrnfiea",
            title: "Topic Item 1",
            description: "Lesson"
        },
        {
            id: "ear647839kanfiu",
            learningTrackId: "r6478aabiuear6478bafvara",
            courseId: "758493kanfiueakavkrnfiuear647839",
            topicId: "758493kavkrnfieakavkrnfiu",
            title: "Topic Item 2",
            description: "Multiple-Choice Question"
        },
        {
            id: "ear64783ear647839k9kanfiu",
            learningTrackId: "r6478aabiafvara",
            courseId: "r6478aabiuear6478b",
            topicId: "krnfi758493kavnfiu",
            title: "Topic Item 3",
            description: "Short Answer Question"
        }
    ];
    const topicItemsListMainIcon = {
        icon: <span className="material-symbols-outlined">category</span>,
        style: {}
    };
    const topicItemsListLinkIcon = {
        icon: <span className="material-symbols-outlined">edit</span>,
        style: {},
        to: NEXT_PAGE_URL
    };

    return (
        <>
            <BackButtonNavbar title={NAVBAR_TEXT} to={PREVIOUS_PAGE_URL} />
            <p>Edit Topic Screen</p>
            <button>
                <Link to={NEXT_PAGE_URL}>To Edit Topic Item</Link>
            </button>
            <GenericEditEntityView 
                ids={editViewIds}
                fields={editViewFields}/>

            <TopicItemsListCard 
                topicItemsData={topicitemsData}
                mainIcon={topicItemsListMainIcon}
                linkIcon={topicItemsListLinkIcon}/>

            <hr />
            <button>Delete Topic</button>
        </>
    );
}