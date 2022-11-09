/* libraries */
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

/* components */
import SideNavigationMenu from './SideNavigationMenu';
import HamburgerNavbar from './HamburgerNavbar';
import BackButtonNavbar from './BackButtonNavbar.js';

/* style */
import '../styles/App.css';

function App() {

  /* TODO: redirect path "/" to "/dashboard" */
  /* TODO: specify element={} as prop to <Route> */

  /* 
    <Route path="/topic/details">
          <BackButtonNavbar />
          <p>Topics Screen</p>
        </Route>
        <Route path="/topic/item">
          <BackButtonNavbar />
          <p>Topics Screen</p>
        </Route>
        
   */

  return (
    <>
      <Routes>
        <Route path="/topic/all" element={
          <>
            <SideNavigationMenu />
            <HamburgerNavbar />
            <p>Topics Screen</p>
          </>
        } />

        <Route path="/" element={
          <>
            <SideNavigationMenu />
            <HamburgerNavbar />
            <p>Dashboard</p>
          </>
        } />

        {/*<Route path="/" element={<Navigate replace to="/dashboard" />} />
         /* Without the 'replace' prop, the browser will keep track of the history, including the redirect. */
         /* <Route path="*" element={<NotFound/>}/> 
         /* <Route path="/home" element={<Home/>} /> */}

      </Routes>
    </>
  );
}

export default App;
