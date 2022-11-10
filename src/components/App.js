/* libraries */
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

/* components */
import SideNavigationMenu from './SideNavigationMenu';
import HamburgerNavbar from './HamburgerNavbar';
import TopicsScreen from './TopicsScreen.js';
import TopicDetailsScreen from './TopicDetailsScreen.js';
import TopicItemScreen from './TopicItemScreen';

/* style */
import '../styles/App.css';

function App() {

  const [currentIds, setCurrentIds] = React.useState({
    currentTopicId: "",
    currentTopicItemId: ""
  });

  return (
    <>
      <Routes>
        
        <Route path="/topic/item" element={<TopicItemScreen />}/>
        <Route path="/topic/details" element={<TopicDetailsScreen />}/>
        <Route path="/topic/all" element={<TopicsScreen />} />

        <Route path="/dashboard" element={
          <>
            <SideNavigationMenu />
            <HamburgerNavbar />
            <p>Dashboard</p>
          </>
        } />

        <Route path="/" element={<Navigate replace to="/dashboard" />} />
        {/* Without the 'replace' prop, the browser will keep track of the history, including the redirect. */}

        {/* <Route path="*" element={<NotFound/>}/> */}

      </Routes>
    </>
  );
}

export default App;