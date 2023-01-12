import React from "react";

import SideNavigationMenu from "../components/SideNavigationMenu";
import HamburgerNavbar from "../components/HamburgerNavbar";
import LearningTrackSummaryCard from '../components/LearningTrackSummaryCard';


function AllLearningTracksScreen() {

  const NAVBAR_TEXT = "ASMCamp";
  const shortDescription = "Learning Track Short Description. Lorem ipsum sit dolor amet consectetur adipsicing. Lorem ipsum sit dolor amet consectetur adipsicing. Lorem ipsum sit dolor am";  // 160 characters
  const learningTracksSummaryData = [
    {
      title: "Learning Track Alpha",
      shortDescription: shortDescription,
      userIsEnrolled: true,
      percentage: 32,
      hasLabel: true,
      percentageOnRightSide: false
    },
    {
      title: "Learning Track Obsidian",
      shortDescription: shortDescription,
      userIsEnrolled: true,
      percentage: 68,
      hasLabel: true,
      percentageOnRightSide: false
    },
    {
      title: "Learning Track Ruby",
      shortDescription: shortDescription,
      userIsEnrolled: false,
      percentage: 0,
      hasLabel: true,
      percentageOnRightSide: false
    }
  ];

  return (
    <>
      <SideNavigationMenu />
      <HamburgerNavbar title={NAVBAR_TEXT}/>
      {learningTracksSummaryData.map(datum => 
        <LearningTrackSummaryCard 
          key={datum.title}
          title={datum.title}
          shortDescription={datum.shortDescription}
          userIsEnrolled={datum.userIsEnrolled}
          percentage={datum.percentage}
          hasLabel={datum.hasLabel}
          percentageOnRightSide={datum.percentageOnRightSide} />)}
    </>
  );
}

export default AllLearningTracksScreen;
