/* libraries */
import React from "react";

/* data */
import Model from "../data/model";

/* components */
import TopicCard from "../components/TopicCard";
import SideNavigationMenu from "../components/SideNavigationMenu";
import HamburgerNavbar from "../components/HamburgerNavbar";

function TopicsScreen() {
  const model = new Model(true);
  const topics = model.getAllTopicData();

  return (
    <>
      <SideNavigationMenu />
      <HamburgerNavbar text={"Topics"}/>
      {topics.map(topic => <TopicCard key={topic.id} topic={topic} />)}
    </>
  );
}

export default TopicsScreen;