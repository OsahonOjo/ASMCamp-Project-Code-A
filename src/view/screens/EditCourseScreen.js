import { Link } from "react-router-dom";

import BackButtonNavbar from "../components/BackButtonNavbar";
import GenericEditEntityView from "../components/GenericEditEntityView";

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

    return (
        <>
            <BackButtonNavbar title={NAVBAR_TEXT} to={PREVIOUS_PAGE_URL} />
            <p>Edit Course Screen</p>
            <button>
                <Link to={NEXT_PAGE_URL}>To Edit Topic</Link>
            </button>
            <GenericEditEntityView 
                ids={editViewIds}
                fields={editViewFields}/>
            <hr />
            <button>Delete Course</button>
        </>
    );
}