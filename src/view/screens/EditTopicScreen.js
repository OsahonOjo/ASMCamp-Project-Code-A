import { Link } from "react-router-dom";

import BackButtonNavbar from "../components/BackButtonNavbar";
import GenericEditEntityView from "../components/GenericEditEntityView";

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
            <hr />
            <button>Delete Topic</button>
        </>
    );
}