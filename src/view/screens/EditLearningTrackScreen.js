import AddInstructorsCard from "../components/AddInstructorsCard";
import AddRewardsCard from "../components/AddRewardsCard";
import BackButtonNavbar from "../components/BackButtonNavbar";
import TextFieldsCard from "../components/TextFieldsCard";

import '../components/styles/card.css';

function EditLearningTrackScreen() {

  const NAVBAR_TEXT = "Edit Learning Track";
  const PREVIOUS_PAGE_URL = "/managetracks";
  const EDIT_CORUSE_URL= "/editcourse";
  const enableTextFields = {
    title: true, 
    shortDescription: true,
    longDescription: true
  };

  return (
    <>
      <BackButtonNavbar title={NAVBAR_TEXT} to={PREVIOUS_PAGE_URL} />
      <TextFieldsCard fields={enableTextFields}/>
      <AddInstructorsCard />
      <AddRewardsCard />
    </>
  );
}

export default EditLearningTrackScreen;