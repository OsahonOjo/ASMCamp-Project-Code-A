
import BackButtonNavbar from "../components/BackButtonNavbar";

import '../components/styles/card.css';
import '../components/styles/icon.css';

export default function ManageGroupsScreen() {

    const NAVBAR_TEXT = "Groups";
    const PREVIOUS_PAGE = "/instructors";

    return (
        <>
            <BackButtonNavbar title={NAVBAR_TEXT} to={PREVIOUS_PAGE}/>
            <p>Manage Groups</p>
        </>
    );
}