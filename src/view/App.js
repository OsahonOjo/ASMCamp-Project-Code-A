import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import AllLearningTracksScreen from './screens/AllLearningTracksScreen';
import LearningTrackScreen from './screens/LearningTrackScreen';
import TopicItemScreen from './screens/TopicItemScreen';
import CourseScreen from './screens/CourseScreen';
import StudentDashboardScreen from './screens/StudentDashboardScreen';

/* /tracks/trackName/courseName/topicName?item=1 */
/* let { id } = useParams(); */

function App() {
  
  return (
    <>
      <Routes>
        <Route path="/tracks" element={<AllLearningTracksScreen />} />
        <Route path="/track" element={<LearningTrackScreen />} />
        {/* /track must come before /tracks */}
        <Route path="/course" element={<CourseScreen />} />
        <Route path="/topicitem" element={<TopicItemScreen />}/>
        <Route path="/dashboard" element={<StudentDashboardScreen />} />
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