/* libraries */
import React from "react";
import { Link, useParams } from "react-router-dom";

/* assets */
import backIcon from "../assets/back.png";
import forwardIcon from "../assets/next.png";

/* components */
import TopicItemScreenNavbar from "../components/TopicItemScreenNavbar";
import TopicItemSuccessModal from "../components/TopicItemSuccessModal";
import LessonView from "../components/LessonView";
import ProgressBar from "../components/ProgressBar";
import MCQResponseCard from "../components/MCQResponseCard";
import TFQResponseCard from "../components/TFQResponseCard";
import SAQResponseCard from "../components/SAQResponseCard";

/* data */
import Model from "../../modelsAndData/model.js";
import { topicItemTypes } from "../../modelsAndData/enums";
import { constants } from "../../modelsAndData/constants";

import { styles } from "../components/styles/commonDisplayStyles";
import MCQView from "../components/MCQView";
import SAQView from "../components/SAQView";
import CQView from "../components/CQView";
import { GeneratedIdentifierFlags } from "typescript";
import GenericQView from "../components/GenericQView";
import TopicItemScreenViewModel from "./TopicItemScreenViewModel";

// const ids = useLocation().state; /* state: {topicId, topicItemId} */

export default function TopicItemScreen() {
  
  const NAVBAR_TEXT = "Topic Item";
  const COURSE_OUTLINE_TEXT = "Course Outline";

  const DEFAULT_MARGIN = '10px';
  const { 
    PRIMARY_TEXT_COLOR_DARK, 
    PRIMARY_BACKGROUND_COLOR_DARK,
    SECONDARY_BACKGROUND_COLOR_DARK
  } = constants;
  const TEXT_COLOR = PRIMARY_TEXT_COLOR_DARK;

  const { topicId, seqNumber } = useParams();

  const { topicItem, getTopicItemData, handleLessonSubmit, handleMCQSubmit, handleTFQSubmit, handleSAQSubmit, handleCQSubmit } = TopicItemScreenViewModel();
  
  const [loading, setLoading] = React.useState(true);
  const [topicItemState, setTopicItemState] = React.useState({});

  const PREVIOUS_PAGE = `/course/${topicItemState.courseId}`;

  React.useEffect(() => {
    getTopicItemData(topicId, seqNumber);
    setLoading(true);
  }, []);

  React.useEffect(() => {
    if (topicItem)
      setTopicItemState(topicItem);
    if (topicItem)
      setLoading(false);
  }, [topicItem]);
  
  // /topic/:topicId/item/:seqNumber

  const modelRef = React.useRef(null);
  const MODAL_SUCCESS_TEXT = "SUCCESS!";
  const MODAL_FAILURE_TEXT = "INCORRECT.";
  const [modalState, setModalOpen]  = React.useState({ open: false, text: "" });
  const modalStyle = { 
    display: modalState.open ? "block" : "none", 
    borderStyle: 'solid', 
    borderWidth: '1px', 
    borderColor: '#ccc', 
    // margin: '10px', 
    textAlign: 'center',
    color: '#fff',
    background: 'gray',
    position: 'fixed',
    width: '80%',
    height: '35%',
    left: '10%',
    right: '90%',
    top: '20%'
  };

  function closeModal() {
    const nextState = Object.assign({}, modalState);
    nextState.open = false;
    setModalOpen(nextState);
  }

  function openModal(success) {
    const nextState = Object.assign({}, modalState);
    nextState.open = true;
    nextState.text = success ? MODAL_SUCCESS_TEXT : MODAL_FAILURE_TEXT;
    setModalOpen(nextState);
  }

  const buttonBaseStyle = { 
    fontSize: '16px', 
    color: styles.vDarkModeTextColor3,
    backgroundColor: styles.vDarkModeBackground1,
    borderStyle: 'solid',
    borderColor: styles.vDarkModeTextColor3,
    borderWidth: '1px' 
  };

  const buttonStyle = { 
    width: '150px', 
    height: '2em', 
    margin: DEFAULT_MARGIN,
    fontSize: '16px', 
    color: styles.vDarkModeTextColor3,
    backgroundColor: styles.vDarkModeBackground1,
    borderStyle: 'solid',
    borderColor: styles.vDarkModeTextColor3,
    borderWidth: '1px' 
  };

  const arrowButtonStyle = { 
    // width: '150px', 
    height: '2em', 
    margin: DEFAULT_MARGIN,
    fontSize: '16px', 
    color: styles.vDarkModeTextColor3,
    backgroundColor: styles.vDarkModeBackground1,
    borderStyle: 'solid',
    borderColor: styles.vDarkModeTextColor3,
    borderWidth: '1px' 
  };

  return (
    <>
      <TopicItemScreenNavbar 
        title={NAVBAR_TEXT} 
        to={PREVIOUS_PAGE} 
        itemType={topicItemTypes.LSN }
        disabled={loading ? true : false}/>

      {/* buttons for navigation between topic items */}
      <div style={{ ...styles.displayFlexRowCenter, marginTop: DEFAULT_MARGIN, marginBottom: '-15px' }}>

        <button type="button" style={arrowButtonStyle}>
          <span 
            className="material-symbols-outlined" 
            style={{ ...styles.icon20pxFont, color: TEXT_COLOR, verticalAlign: 'middle' }}>
              arrow_back_ios_new
          </span>
          {/* <img src={backIcon} alt="go to previous topic item" className="icon--20px"/> */}
        </button>

        <button type="button" style={buttonStyle}>{COURSE_OUTLINE_TEXT}</button>
        
        <button type="button" style={arrowButtonStyle}>
          {/* <img src={forwardIcon} alt="go to next topic item" className="icon--20px"/> */}
          <span 
            className="material-symbols-outlined" 
            style={{ ...styles.icon20pxFont, color: TEXT_COLOR, verticalAlign: 'middle' }}>
              arrow_forward_ios
          </span>
        </button>
      
      </div>

      { topicItemState.type == topicItemTypes.LSN 
        ? <LessonView 
            trackId={topicItemState.learningTrackId}
            courseId={topicItemState.courseId}
            topicId={topicItemState.topicId}
            topicItemId={topicItemState.id}
            title={topicItemState.title} 
            nXP={topicItemState.xp} 
            content={topicItemState.content}
            handleSubmit={handleLessonSubmit}
            showModal={openModal}/> 
        : null }

      { topicItemState.type == topicItemTypes.MCQ 
        ? <GenericQView 
            title={topicItemState.title} 
            nXP={topicItemState.xp} 
            content={topicItemState.content}
            instructions={topicItemState.instructions}
            hints={topicItemState.hints}
            ResponseCard={
              <MCQResponseCard 
                trackId={topicItemState.learningTrackId}
                courseId={topicItemState.courseId}
                topicId={topicItemState.topicId}
                topicItemId={topicItemState.id}
                options={topicItemState.mcqOptions}
                handleSubmit={handleMCQSubmit}
                showModal={openModal} />} />
        : null }
      
      { topicItemState.type == topicItemTypes.TFQ 
        ? <GenericQView 
            title={topicItemState.title} 
            nXP={topicItemState.xp} 
            content={topicItemState.content}
            instructions={topicItemState.instructions}
            hints={topicItemState.hints}
            ResponseCard={
              <TFQResponseCard 
                trackId={topicItemState.learningTrackId}
                courseId={topicItemState.courseId}
                topicId={topicItemState.topicId}
                topicItemId={topicItemState.id}
                handleSubmit={handleTFQSubmit}
                showModal={openModal}/>} />
        : null }

      { topicItemState.type == topicItemTypes.SAQ 
        ? <GenericQView 
            title={topicItemState.title} 
            nXP={topicItemState.xp} 
            content={topicItemState.content}
            instructions={topicItemState.instructions}
            hints={topicItemState.hints}
            ResponseCard={
              <SAQResponseCard 
                trackId={topicItemState.learningTrackId}
                courseId={topicItemState.courseId}
                topicId={topicItemState.topicId}
                topicItemId={topicItemState.id}
                handleSubmit={handleSAQSubmit}
                showModal={openModal}/>}/>
        : null }

      { topicItemState.type == topicItemTypes.CQ 
        ? <CQView
            trackId={topicItemState.learningTrackId}
            courseId={topicItemState.courseId}
            topicId={topicItemState.topicId}
            topicItemId={topicItemState.id}
            title={topicItemState.title} 
            nXP={topicItemState.xp} 
            content={topicItemState.content}
            instructions={topicItemState.instructions}
            hints={topicItemState.hints}/>
        : null }

      {/* modal */}
      <div id="modal" ref={modelRef} style={modalStyle}>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '35px', marginRight: '17px' }} onClick={closeModal}>&times;</span>
        </div>
        <hr  style={{ borderColor: '#fff' }}/>
        <div style={{ height: '55%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <h1 style={{ height: 'fit-content' }}>{modalState.text}</h1>
        </div>
      </div>

      <div style={{background: 'white', height: '20px', width: '100%'}}><p></p></div>
      
      <div style={{...styles.stickToBottom, ...styles.displayFlexRowCenter, background: PRIMARY_BACKGROUND_COLOR_DARK, height: '20px'}}>
        <ProgressBar 
          percentage={topicItemState.learningTrackProgress} 
          hasLabel={true} 
          labelOnRightSide={false}/>
      </div>
    </>
  );
}

/*

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