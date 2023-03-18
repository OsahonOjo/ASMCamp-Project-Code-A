import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import AllLearningTracksScreen from './screens/AllLearningTracksScreen';
import LearningTrackScreen from './screens/LearningTrackScreen';
import TopicItemScreen from './screens/TopicItemScreen';
import CourseScreen from './screens/CourseScreen';
import StudentDashboardScreen from './screens/StudentDashboardScreen';
import InstructorsAreaScreen from './screens/InstructorsAreaScreen';
import ManageLearningTracksScreen from './screens/ManageLearningTracksScreen';
import EditLearningTrackScreen from './screens/EditLearningTrackScreen';
import EditCourseScreen from './screens/EditCourseScreen';
import EditTopicScreen from './screens/EditTopicScreen';
import EditTopicItemScreen from './screens/EditTopicItemScreen';
import ProgressAndRewardsScreen from './screens/ProgressAndRewardsScreen';
import StudentLeaderboardScreen from './screens/StudentLeaderboardScreen';
import InstructorLeaderboardScreen from './screens/InstructorLeaderboardScreen';
import ManageGroupsScreen from './screens/ManageGroupsScreen';
import ReactExecutionTextComponent from './screens/Temp';

// testing link: https://www.facebook.com/embed/instantgames/599022965028716/player?game_url=https://localhost:3000/
// remember: font awesome and bootstrap have been <link>'d in index.html so make use of them
// font awesome icons https://www.w3schools.com/icons/icons_reference.asp

export default function App() {
  
  return (
    <>      
      {console.log('window.FBInstant: ', window.FBInstant)}
      
      {/* routes can be placed in any order because React Router is smart now */}
      <Routes>

        <Route path="/tracks" element={<AllLearningTracksScreen />} />
        <Route path="/track/:trackId" element={<LearningTrackScreen />} />
        <Route path="/course/:courseId" element={<CourseScreen />} />
        <Route path="/topic/:topicId/item/:seqNumber" element={<TopicItemScreen />}/>

        <Route path="/students" element={<StudentDashboardScreen />} />
        <Route path="/students/progress" element={<ProgressAndRewardsScreen />} />
        <Route path="/students/leaderboards" element={<StudentLeaderboardScreen />} />
        
        <Route path="/instructors" element={<InstructorsAreaScreen />} />
        {/* <Route path="/instructors/temp" element={<ReactExecutionTextComponent />} /> */}
        <Route path="/instructors/tracks" element={<ManageLearningTracksScreen />} />
        <Route path="/instructors/edit/track/:trackId" element={<EditLearningTrackScreen />} />
        <Route path="/instructors/edit/course/:courseId" element={<EditCourseScreen />} />
        <Route path="/instructors/edit/topic/:topicId" element={<EditTopicScreen />} />
        <Route path="/instructors/edit/item/:itemId" element={<EditTopicItemScreen />} />

        <Route path="/instructors/leaderboards" element={<InstructorLeaderboardScreen />} />
        <Route path="/instructors/groups" element={<ManageGroupsScreen />} />

        <Route path="/" element={<Navigate replace to="/tracks" />} />
        <Route path="*" element={<Navigate replace to="/tracks" />} />
        {/* Without the 'replace' prop, the browser will keep track of the history, including the redirect. */}

      </Routes>
    </>
  );
}