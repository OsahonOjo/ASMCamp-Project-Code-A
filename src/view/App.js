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
import ProgressAndRewardsScreen from './screens/ProgressAndRewardsScreen';
import StudentLeaderboardScreen from './screens/StudentLeaderboardScreen';

/* /tracks/trackName/courseName/topicName?item=1 */
/* let { id } = useParams(); */
/* <div class="btn-block">
      <i class="fa fa-apple" style="font-size:24px;"></i>
      JavaScript
    </div>

    <button class="btn btn-block btn-info">
      <i class="fa fa-bandcamp" style="font-size:24px;"></i>
         Info
   </button>

    <button class="btn btn-block btn-info">
      <i class="fa fa-info-circle" style="font-size:24px;"></i>
         Info
   </button>
*/

// testing link: https://www.facebook.com/embed/instantgames/599022965028716/player?game_url=https://localhost:3000/

// remember: font awesome and bootstrap have been <link>'d in index.html so make use of them
// font awesome icons https://www.w3schools.com/icons/icons_reference.asp


function App() {
  
  return (
    <>      
      {console.log('window.FBInstant: ', window.FBInstant)}
      
      <Routes>
        
        {/* routes can be placed in any order because React Router is smart now */}
        
        <Route path="/topic/:topicId/item/:seqNumber" element={<TopicItemScreen />}/>
        <Route path="/course/:courseId" element={<CourseScreen />} />
        <Route path="/track/:trackId" element={<LearningTrackScreen />}  />
        <Route path="/tracks" element={<AllLearningTracksScreen />} />

        <Route path="/students/progress" element={<ProgressAndRewardsScreen />} />
        <Route path="/students/leaderboards" element={<StudentLeaderboardScreen />} />
        <Route path="/students" element={<StudentDashboardScreen />} />

        <Route path="/instructors" element={<InstructorsAreaScreen />} />
        <Route path="/managetracks" element={<ManageLearningTracksScreen />} />
        <Route path="/edittrack" element={<EditLearningTrackScreen />} />
        <Route path="/" element={<Navigate replace to="/tracks" />} />
        {/* Without the 'replace' prop, the browser will keep track of the history, including the redirect. */}

        {/* 
          <Route path="/tracks/:trackName" element={<LearningTrackScreen />} /> 
          <Route path="/topic/item" element={<TopicItemScreen />}/>
          <Route path="/topic/details" element={<TopicDetailsScreen />}/>
          <Route path="/topic/all" element={<TopicsScreen />} /> 
          <Route path="*" element={<NotFound/>}/>
        */}
      </Routes>
    </>
  );
}

export default App;