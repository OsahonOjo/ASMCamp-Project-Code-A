import { Link } from "react-router-dom";

import AddInstructorsCard from "../components/AddInstructorsCard";
import AddRewardsCard from "../components/AddRewardsCard";
import BackButtonNavbar from "../components/BackButtonNavbar";
import GenericEditEntityView from "../components/GenericEditEntityView";
import CourseListCard from "../components/CourseListCard";

import '../components/styles/card.css';

export default function EditLearningTrackScreen() {

  const NAVBAR_TEXT = "Edit Learning Track";
  const PREVIOUS_PAGE_URL = "/instructors/tracks";
  const EDIT_COURSE_URL= "/instructors/edit/course";
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
  const courseData = [
    {
      id: "kjavian65874194ajhvba",
      learningTrackId: "kjanvkjaeeqwqw12345678",
      title: "Course Title 1", 
      learningTrackTitle: "Learning Track Title", 
      longDescription: "Course Long Description. Lorem ipsum sit dolor amet consectetur adipsicing. Lorem ipsum sit dolor amet consectetur adipsicing. \nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",  // 367 characters
      shortDescription: "Course Short Description. Lorem ipsum sit dolor amet consectetur adipsicing. Lorem ipsum sit dolor amet consectetur adipsicing. \nLorem ipsum dolor sit amet.",
      nHours: 4, 
      nXP: 2700, 
      nLessons: 7, 
      nQuestions: 7, 
      userIsEnrolled: false
    },
    {
      id: "3847829840jkvfbnafjkanavf",
      learningTrackId: "kjanvkjaeeqwqw12345678",
      title: "Course Title 2", 
      learningTrackTitle: "Learning Track Title", 
      longDescription: "Course Long Description. Lorem ipsum sit dolor amet consectetur adipsicing. Lorem ipsum sit dolor amet consectetur adipsicing. \nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",  // 367 characters
      shortDescription: "Course Short Description. Lorem ipsum sit dolor amet consectetur adipsicing. Lorem ipsum sit dolor amet consectetur adipsicing. \nLorem ipsum dolor sit amet.",
      nHours: 4, 
      nXP: 2700, 
      nLessons: 7, 
      nQuestions: 7, 
      userIsEnrolled: false
    }
  ];

  return (
    <>
      <BackButtonNavbar title={NAVBAR_TEXT} to={PREVIOUS_PAGE_URL} />
      
      <button>
        <Link to={EDIT_COURSE_URL}>To Edit Course</Link>
      </button>
      
      <GenericEditEntityView 
        ids={editViewIds}
        fields={editViewFields}/>
      <AddInstructorsCard />

      <CourseListCard 
        courses={courseData}
        editMode={true}/>

      <AddRewardsCard />
      <button>Publish Changes</button>
      <hr />
      <button>Delete Learning Track</button>
    </>
  );
}