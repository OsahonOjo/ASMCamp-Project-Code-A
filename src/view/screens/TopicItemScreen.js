/* libraries */
import React from "react";
import { Link, useLocation } from "react-router-dom";

/* assets */
import backIcon from "../assets/back.png";
import forwardIcon from "../assets/next.png";

/* components */
import TopicItemScreenNavbar from "../components/TopicItemScreenNavbar";
import LessonView from "../components/LessonView";
import ProgressBar from "../components/ProgressBar";
import MCQResponseCard from "../components/MCQResponseCard";
import TFQResponseCard from "../components/TFQResponseCard";
import SAQResponseCard from "../components/SAQResponseCard";

/* data */
import Model from "../../model/model.js";

import { commonDisplayStyles } from "../components/styles/commonDisplayStyles";
import MCQView from "../components/MCQView";
import SAQView from "../components/SAQView";
import CQView from "../components/CQView";
import { GeneratedIdentifierFlags } from "typescript";
import GenericQView from "../components/GenericQView";

// const ids = useLocation().state; /* state: {topicId, topicItemId} */

function TopicItemScreen() {
  
  const NAVBAR_TEXT = "Topic Item";
  const NAVBAR_TYPE = "MCQ";
  const COURSE_OUTLINE_TEXT = "Course Outline";
  const PREVIOUS_PAGE_URL = "/course";
  let content = "Topic Item Content. Lorem ipsum sit dolor amet consectetur adipsicing. Lorem ipsum sit dolor amet consectetur adipsicing. \nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  content += content;
  const topicItems = {
    lesson1: {
      type: "LSN",
      title: "Lesson 1",
      xp: 200,
      content: content + content,
      seqNumber: 1, 
      instructions: [], 
      hints: [], 
      mcqOptions: [], 
      mcqAnswer: -1,
      cqAnswer: null, 
      saqAnswers: [], 
      tfqAnswer: null
    },
    mcq: {
      type: "MCQ",
      title: "MCQ Question",
      xp: 200,
      content: content,
      seqNumber: 2, 
      instructions: ["1 Lorem ipsum sit dolor amet consectetur adipsicing.", "2 Lorem ipsum sit dolor amet consectetur adipsicing.", "3 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."], 
      hints: ["Lorem ipsum sit dolor amet consectetur adipsicing.", "Lorem ipsum sit dolor amet consectetur."], 
      mcqOptions: ["Option A", "Option B", "Option C", "Option D"], 
      mcqAnswer: 1, 
      cqAnswer: null, 
      saqAnswers: [], 
      tfqAnswer: null
    },
    tfq: {
      type: "TFQ",
      title: "TFQ Question",
      xp: 200,
      content: content,
      seqNumber: 3, 
      instructions: ["1 Lorem ipsum sit dolor amet consectetur adipsicing.", "2 Lorem ipsum sit dolor amet consectetur adipsicing.", "3 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."], 
      hints: ["Lorem ipsum sit dolor amet consectetur adipsicing.", "Lorem ipsum sit dolor amet consectetur."], 
      mcqOptions: [], 
      mcqAnswer: -1,
      cqAnswer: null, 
      saqAnswers: [], 
      tfqAnswer: true
    },
    lesson2: {
      type: "LSN",
      title: "Lesson 2",
      xp: 200,
      content: content + content,
      seqNumber: 4, 
      instructions: [], 
      hints: [], 
      mcqOptions: [], 
      mcqAnswer: -1,
      cqAnswer: null, 
      saqAnswers: [], 
      tfqAnswer: null
    },
    saq: {
      type: "SAQ",
      title: "SAQ Question",
      xp: 200,
      content: content,
      seqNumber: 5, 
      instructions: ["1 Lorem ipsum sit dolor amet consectetur adipsicing.", "2 Lorem ipsum sit dolor amet consectetur adipsicing.", "3 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."], 
      hints: ["Lorem ipsum sit dolor amet consectetur adipsicing.", "Lorem ipsum sit dolor amet consectetur."], 
      mcqOptions: [], 
      mcqAnswer: -1,
      cqAnswer: null, 
      saqAnswers: ["answer", "response", "reply", "retort"],
      tfqAnswer: null
    },
    cq: {
      type: "CQ",
      title: "CQ Question",
      xp: 200,
      content: content,
      seqNumber: 6, 
      instructions: ["1 Lorem ipsum sit dolor amet consectetur adipsicing.", "2 Lorem ipsum sit dolor amet consectetur adipsicing.", "3 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."], 
      hints: ["Lorem ipsum sit dolor amet consectetur adipsicing.", "Lorem ipsum sit dolor amet consectetur."], 
      mcqOptions: [], 
      mcqAnswer: -1,
      cqAnswer: "asm", 
      saqAnswers: [], 
      tfqAnswer: null
    }
  };

  return (
    <>
      <TopicItemScreenNavbar 
        title={NAVBAR_TEXT} 
        to={PREVIOUS_PAGE_URL} 
        itemType={NAVBAR_TYPE}/>

      <div style={commonDisplayStyles.displayFlexCenter}>
        <button type="button">
          <img src={backIcon} alt="go to previous topic item" className="icon--20px"/>
        </button>
        <button type="button">{COURSE_OUTLINE_TEXT}</button>
        <button type="button">
          <img src={forwardIcon} alt="go to next topic item" className="icon--20px"/>
        </button>
      </div>

      <LessonView 
        title={topicItems.lesson1.title} 
        nXP={topicItems.lesson1.xp} 
        content={topicItems.lesson1.content}/>

      <hr />

      <GenericQView 
        title={topicItems.mcq.title} 
        nXP={topicItems.mcq.xp} 
        content={topicItems.mcq.content}
        instructions={topicItems.mcq.instructions}
        hints={topicItems.mcq.hints}
        ResponseCard={<MCQResponseCard options={topicItems.mcq.mcqOptions}/>}/>

      <hr />

      <GenericQView 
        title={topicItems.tfq.title} 
        nXP={topicItems.tfq.xp} 
        content={topicItems.tfq.content}
        instructions={topicItems.tfq.instructions}
        hints={topicItems.tfq.hints}
        ResponseCard={<TFQResponseCard/>}/>

      <hr />

      <LessonView 
        title={topicItems.lesson2.title} 
        nXP={topicItems.lesson2.xp} 
        content={topicItems.lesson2.content}/>
      
      <hr />

      <GenericQView 
        title={topicItems.saq.title} 
        nXP={topicItems.saq.xp} 
        content={topicItems.saq.content}
        instructions={topicItems.saq.instructions}
        hints={topicItems.saq.hints}
        ResponseCard={<SAQResponseCard />}/>

      <hr />

      <CQView
        title={topicItems.cq.title} 
        nXP={topicItems.cq.xp} 
        content={topicItems.cq.content}
        instructions={topicItems.cq.instructions}
        hints={topicItems.cq.hints}/>

      <div style={{background: 'blue', height: '40px', width: '100%'}}><p></p></div>
      
      <div style={{...commonDisplayStyles.stickToBottom, ...commonDisplayStyles.displayFlexCenter, background: '#ACC8F1', height: '40px'}}>
        <ProgressBar percentage={null} hasLabel={true} labelOnRightSide={false}/>
      </div>
    </>
  );
}

export default TopicItemScreen;

/*

<MCQView 
  isTFQ={false}
  title={topicItems.mcq.title} 
  nXP={topicItems.mcq.xp} 
  content={topicItems.mcq.content}
  instructions={topicItems.mcq.instructions}
  hints={topicItems.mcq.hints}
  options={topicItems.mcq.mcqOptions}/>

<hr />

<MCQView 
  isTFQ={true}
  title={topicItems.tfq.title} 
  nXP={topicItems.tfq.xp} 
  content={topicItems.tfq.content}
  instructions={topicItems.tfq.instructions}
  hints={topicItems.tfq.hints}/>

<hr />

<SAQView
  title={topicItems.saq.title} 
  nXP={topicItems.saq.xp} 
  content={topicItems.saq.content}
  instructions={topicItems.saq.instructions}
  hints={topicItems.saq.hints}/>

*/