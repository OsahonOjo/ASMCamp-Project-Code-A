import React from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import DOMPurify from "isomorphic-dompurify";
import EditTopicItemScreenViewModel from "./EditTopicItemScreenViewModel";

import BackButtonNavbar from "../components/BackButtonNavbar";

import { topicItemTypes } from "../../model/enums";

import '../components/styles/card.css';

export default function EditTopicItemScreen() {

    const NAVBAR_TEXT = "Edit Topic Item";
    const PREVIOUS_PAGE_URL = "/instructors/edit/topic";
    const PREVIOUS_PAGE_URL_STEM = "/instructors/edit/topic";
    const CURRENT_PAGE_URL_STEM = "/instructors/edit/item";
    const EMPTY_STRING = ""; 
    const DEFAULT_FORM_ELEMENT_WIDTH = "80%";
    const EDITOR_WIDTH = "90%";

    const topicItemTypesArray = ["Select"];
    Object.keys(topicItemTypes).forEach(key => {
        topicItemTypesArray.push(topicItemTypes[key]);
    });

    const SCREEN_MODE = {
        CREATE_NEW_ENTITY: "CREATE_NEW_ENTITY",
        EDIT_EXISTING_ENTITY: "EDIT_EXISTING_ENTITY"
    };  

    const location = useLocation();
    const navigate = useNavigate();

    /**
     * itemId = 0: CREATE_NEW_ENTITY; only learningTrackId, courseId, topicId shown in form; no item created yet
     * itemId != 0: EDIT_EXISTING_ENTITY; leave form empty, it'll be filled out later
     */

    const { itemId } = useParams();
    const initialInputs = {
        id: EMPTY_STRING,
        learningTrackId: itemId != 0 ? EMPTY_STRING : location.state.learningTrackId,
        courseId: itemId != 0 ? EMPTY_STRING : location.state.courseId,
        topicId: itemId != 0 ? EMPTY_STRING : location.state.topicId,
        seqNumber: "",
        type: "",
        title: "", 
        xp: "",
        content: "# Marked in the browser\nRendered by **Marked**",
        instructions: [],
        hints: [],
        mcqOptions: [],
        mcqAnswerIndex: -1,
        cqAnswer: "",
        saqAnswer: [],
        tfqAnswer: false
    };
    const [screenMode, setScreenMode] = React.useState(itemId != 0 ? SCREEN_MODE.EDIT_EXISTING_ENTITY : SCREEN_MODE.CREATE_NEW_ENTITY);
    const [inputs, setInputs] = React.useState(initialInputs);

    // ViewModel interface
    const { topicItem, getTopicItemData, createTopicItem, updateTopicItem } = EditTopicItemScreenViewModel();
    
    // change in itemId triggers change in screen mode
    React.useEffect(() => {
        setScreenMode(itemId != 0 ? SCREEN_MODE.EDIT_EXISTING_ENTITY : SCREEN_MODE.CREATE_NEW_ENTITY);
    }, [itemId]);

    // change in screen mode conditionally triggers fetching data for existing topic item entity
    React.useEffect(() => {
        if (screenMode == SCREEN_MODE.EDIT_EXISTING_ENTITY) {
            getTopicItemData(itemId);
        }
    }, [screenMode]);

    // successful data fetching conditionally changes content displayed on screen for existing topic item entity
    React.useEffect(() => {
        if (screenMode == SCREEN_MODE.EDIT_EXISTING_ENTITY) {
            topicItem
                ? setInputs(topicItem) 
                : setInputs(initialInputs);
        }
    }, [topicItem]);

    const [instructionState, setInstructionState] = React.useState("");
    const [hintState, setHintState] = React.useState("");
    const [mcqOptionState, setMCQOptionState] = React.useState("");
    const [saqAnswerState, setSAQAnswerState] = React.useState("");

    function handleTitleInputChange(event) {
        let nextInputs = Object.assign({}, inputs);
        nextInputs.title = event.target.value;
        setInputs(nextInputs);
    }

    function handleSeqNumberInputChange(event) {
        let nextInputs = Object.assign({}, inputs);
        nextInputs.seqNumber = event.target.value;
        setInputs(nextInputs);
    }

    function handleXPInputChange(event) {
        let nextInputs = Object.assign({}, inputs);
        nextInputs.xp = event.target.value;
        setInputs(nextInputs);
    }

    function handleTopicItemTypeSelectChange(event) {
        let nextInputs = Object.assign({}, inputs);
        let newType = event.target.value;
        nextInputs.type = newType;
        switch(newType) {
            case "LSN":
                nextInputs.instructions = [];
                nextInputs.hints = [];
                nextInputs.mcqOptions = [];
                nextInputs.mcqAnswerIndex = -1;
                nextInputs.cqAnswer = "";
                nextInputs.saqAnswer = [];
                nextInputs.tfqAnswer = false;
                break;
            
            case "MCQ":
            case "TFQ":
            case "SAQ":
            case "CQ":
            default:
                nextInputs.mcqOptions = [];
                nextInputs.mcqAnswerIndex = -1;
                nextInputs.cqAnswer = "";
                nextInputs.saqAnswer = [];
                nextInputs.tfqAnswer = false;
                break;
        }
        setInputs(nextInputs);
    }

    function handleContentInputChange(value, event) {
        console.log('editor event: ', event);
        let nextInputs = Object.assign({}, inputs);
        nextInputs.content = value;
        setInputs(nextInputs);
    }

    // for instruction field text entry field
    function handleDeleteInstruction(index) {
        let newInstructions = inputs.instructions.slice(0, index).concat(inputs.instructions.slice(index+1));
        let nextInputs = Object.assign({}, inputs);
        nextInputs.instructions = newInstructions;
        setInputs(nextInputs);
    }

    function handleAddInstruction() {
        let newInstruction = instructionState;
        if (newInstruction.length == 0)
            return;
        let nextInputs = Object.assign({}, inputs);
        nextInputs.instructions.push(newInstruction);
        setInputs(nextInputs);
        setInstructionState("");
    }

    function handleInstructionInputChange(event) {
        setInstructionState(event.target.value.slice());
    }

    // for hints text entry field
    function handleDeleteHint(index) {
        let newHints = inputs.hints.slice(0, index).concat(inputs.hints.slice(index+1));
        let nextInputs = Object.assign({}, inputs);
        nextInputs.hints = newHints;
        setInputs(nextInputs);
    }

    function handleAddHint() {
        let newHint = hintState;
        if (newHint.length == 0)
            return;
        let nextInputs = Object.assign({}, inputs);
        nextInputs.hints.push(newHint);
        setInputs(nextInputs);
        setHintState("");
    }

    function handleHintInputChange(event) {
        setHintState(event.target.value.slice());
    }

    // MCQ
    function handleDeleteMCQOption(index) {
        let newMCQOptions = inputs.mcqOptions.slice(0, index).concat(inputs.mcqOptions.slice(index+1));
        let nextInputs = Object.assign({}, inputs);
        nextInputs.mcqOptions = newMCQOptions;
        nextInputs.mcqAnswerIndex = -1;
        setInputs(nextInputs);
    }

    function handleAddMCQOption() {
        if (mcqOptionState.length == 0)
            return;
        if (inputs.mcqOptions.length >= 6)
            return;
        let newOption = mcqOptionState;
        let nextInputs = Object.assign({}, inputs);
        nextInputs.mcqOptions.push(newOption);
        setInputs(nextInputs);
        setMCQOptionState("");
    }

    function selectMCQOptionAsAnswer(event) {
        let nextInputs = Object.assign({}, inputs);
        nextInputs.mcqAnswerIndex = event.target.value;
        setInputs(nextInputs);
        console.log('chosen option: ', nextInputs.mcqAnswerIndex);
    }

    function handleMCQInputChange(event) {
        setMCQOptionState(event.target.value.slice());
    }

    // TFQ
    function handleTFQSelectChange(event) {
        let nextInputs = Object.assign({}, inputs);
        let newTFQAnswer = event.target.value;
        nextInputs.tfqAnswer = newTFQAnswer;
        setInputs(nextInputs);
        console.log('chosen tfq answer: ', nextInputs.tfqAnswer);
    }

    // for SAQ acceptable answer entry field
    function handleDeleteSAQAnswer(index) {
        let newSAQAnswer = inputs.saqAnswer.slice(0, index).concat(inputs.saqAnswer.slice(index+1));
        let nextInputs = Object.assign({}, inputs);
        nextInputs.saqAnswer = newSAQAnswer;
        setInputs(nextInputs);
    }

    function handleAddSAQAnswer() {
        let newSAQAnswer = saqAnswerState;
        if (newSAQAnswer.length == 0)
            return;
        let nextInputs = Object.assign({}, inputs);
        nextInputs.saqAnswer.push(newSAQAnswer);
        setInputs(nextInputs);
        setSAQAnswerState("");
    }

    function handleSAQInputChange(event) {
        let nextInputs = event.target.value.slice();
        setSAQAnswerState(nextInputs);
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log('form data: ', inputs);

        // sanitize content field
        let nextInputs = Object.assign({}, inputs);
        nextInputs.content = DOMPurify.sanitize(nextInputs.content);
        setInputs(nextInputs);
        console.log('form data: sanitized content: ', nextInputs);

        // TODO: check valid id, not just non-empty id
        if (screenMode == SCREEN_MODE.EDIT_EXISTING_ENTITY) {
            console.log('topic item entity already exists');
            updateTopicItem(inputs)
                .then(updatedEntity => {
                    console.log('EDIT_EXISTING_ENTITY updated Topic Item Entity: ', updatedEntity);
                    setInputs(updatedEntity);
                })
                .catch(error => {
                    console.log('error: ', error);
                });
        }
        // in SCREEN_MODE.CREATE_NEW_ENTITY, you can't go beyond this screen so you can trust location.state
        else if (screenMode == SCREEN_MODE.CREATE_NEW_ENTITY) {
            console.log('creating a new topic item entity');
            createTopicItem(inputs)
                .then(newEntity => {
                    console.log('success: new topic item entity: ', newEntity);
                    navigate(`${CURRENT_PAGE_URL_STEM}/${newEntity.id}`, { state: { from: location.state.from } });  // topic item's id becomes URL param
                })
                .catch(err => {
                    console.log('error: ', err);
                });
        }
    }

    return (
        <>
            {/* in SCREEN_MODE.CREATE_NEW_ENTITY, you can't go beyond this screen so you can trust the value of location.state.from */}
            <BackButtonNavbar title={NAVBAR_TEXT} to={location.state.from} />
            
            <button type="button" onClick={() => { console.log('screenMode: ', screenMode) }}>Click for Screen Mode</button>

            <form onSubmit={handleSubmit}>

                <div className="card">
                    <div>
                        <label>ID</label><br />
                        <input required readOnly={true} type="text" value={inputs.id} style={{width: DEFAULT_FORM_ELEMENT_WIDTH}}/>
                    </div>

                    <div>
                        <label>Learning Track ID</label><br />
                        <input required readOnly={true} type="text" value={inputs.learningTrackId} style={{width: DEFAULT_FORM_ELEMENT_WIDTH}}/>
                    </div>

                    <div>
                        <label>Course ID</label><br />
                        <input required readOnly={true} type="text" value={inputs.courseId} style={{width: DEFAULT_FORM_ELEMENT_WIDTH}}/>
                    </div>

                    <div>
                        <label>Topic ID</label><br />
                        <input required readOnly={true} type="text" value={inputs.topicId} style={{width: DEFAULT_FORM_ELEMENT_WIDTH}}/>
                    </div>
                </div>

                <div className="card">
                    <label>Title</label><br />
                    <input required type="text" value={inputs.title} onChange={handleTitleInputChange} style={{width: DEFAULT_FORM_ELEMENT_WIDTH}}/>
                </div>

                <div className="card">
                    <label>Sequence Number</label><br />
                    <input type="number" min="1" value={inputs.seqNumber} onChange={handleSeqNumberInputChange} style={{width: DEFAULT_FORM_ELEMENT_WIDTH}}/>
                </div>

                <div className="card">
                    <label>XP</label><br />
                    <input required type="number" min="1" value={inputs.xp} onChange={handleXPInputChange} style={{width: DEFAULT_FORM_ELEMENT_WIDTH}}/>
                </div>

                {/* type selection here */}
                <div className="card">
                    <label htmlFor="select-topic-item-type"><p>Type</p></label><br />
                    <select name="select-topic-item-type" value={inputs.type} onChange={handleTopicItemTypeSelectChange} style={{width: DEFAULT_FORM_ELEMENT_WIDTH}}>
                        {topicItemTypesArray.map(type => 
                            <option key={type} value={type}>{type}</option>)}
                    </select>
                </div>

                <div className="card">
                    <label>{(inputs.type == "LSN" || inputs.type == "Select") ? "Content" : "Question"}</label><br />
                    <p>The content of the lesson or question goes here. Please use Markdown notation.</p>
                    <Editor 
                        required
                        height='30vh'
                        width={EDITOR_WIDTH}
                        language='markdown'
                        value={inputs.content}
                        onChange={handleContentInputChange}/>
                </div>

                {/* Instructions card */}
                {(inputs.type != "LSN" && inputs.type != "Select")
                    ?   <div className="card">
                            <p>Instructions</p>
                            <ul>
                                {inputs.instructions.map((instruction, index) => 
                                    <li key={`${instruction}${index}`}>
                                        <span>{instruction}</span>
                                        <button 
                                            type="button" 
                                            onClick={() => { handleDeleteInstruction(index) }}>
                                                <span className="material-symbols-outlined">do_not_disturb_on</span>
                                        </button>
                                    </li>)}
                            </ul>

                            <input 
                                type="text" 
                                placeholder="Enter instructions for user here" 
                                value={instructionState} 
                                onChange={handleInstructionInputChange}
                                style={{width: DEFAULT_FORM_ELEMENT_WIDTH}} />
                            <button 
                                type="button" 
                                onClick={handleAddInstruction}>
                                    <span className="material-symbols-outlined">add_circle</span>
                            </button> 
                        </div>
                    : null}

                {inputs.type == "MCQ" 
                    ?   <div className="card">
                            <p>Options</p>
                            <p>Select the radio button for the correct answer.</p>
                            <ul>
                                {inputs.mcqOptions.map((option, index) => 
                                    <li key={`${option}${index}`}>
                                        <label>
                                            <input 
                                                type="radio" 
                                                value={index}
                                                checked={inputs.mcqAnswerIndex == index}
                                                onChange={selectMCQOptionAsAnswer} />
                                            {option}
                                        </label>
                                        <button 
                                            type="button" 
                                            onClick={() => { handleDeleteMCQOption(index) }}>
                                                <span className="material-symbols-outlined">do_not_disturb_on</span>
                                        </button>
                                    </li>)}
                            </ul>
                            <input 
                                type="text" 
                                placeholder="Enter option here" 
                                value={mcqOptionState} 
                                onChange={handleMCQInputChange}
                                style={{width: DEFAULT_FORM_ELEMENT_WIDTH}} />
                            <button 
                                type="button" 
                                onClick={handleAddMCQOption}>
                                    <span className="material-symbols-outlined">add_circle</span>
                            </button>                     
                        </div> 
                    : null}

                {inputs.type == "TFQ" 
                    ?   <div className="card">
                            <p>Answer</p>
                            <p>Select either True or False.</p>
                            <select value={inputs.tfqAnswer} onChange={handleTFQSelectChange} style={{width: DEFAULT_FORM_ELEMENT_WIDTH}}>
                                <option value={false}>False</option>
                                <option value={true}>True</option>
                            </select>
                        </div>
                    : null}

                {inputs.type == "SAQ" 
                    ?   <div className="card">
                            <p>Answers</p>
                            <p>Enter possible answers for question here.</p>
                            <ul>
                                {inputs.saqAnswer.map((answer, index) => 
                                    <li key={`${answer}${index}`}>
                                        <span>{answer}</span>
                                        <button 
                                            type="button" 
                                            onClick={() => { handleDeleteSAQAnswer(index) }}>
                                                <span className="material-symbols-outlined">do_not_disturb_on</span>
                                        </button>
                                    </li>)}
                            </ul>
                            <input 
                                type="text" 
                                placeholder="Enter possible answers for question here" 
                                value={saqAnswerState} 
                                onChange={handleSAQInputChange}
                                style={{width: DEFAULT_FORM_ELEMENT_WIDTH}} />
                            <button 
                                type="button" 
                                onClick={handleAddSAQAnswer}>
                                    <span className="material-symbols-outlined">add_circle</span>
                            </button> 
                        </div>
                    : null}

                {inputs.type == "CQ" ? <p className="card">CQ</p> : null}

                {/* Hints card */}
                {(inputs.type != "LSN" && inputs.type != "Select")
                    ?   <div className="card">
                            <p>Hints</p>
                            <ul>
                                {inputs.hints.map((hint, index) => 
                                    <li key={`${hint}${index}`}>
                                        <span>{hint}</span>
                                        <button 
                                            type="button" 
                                            onClick={() => { handleDeleteHint(index) }}>
                                                <span className="material-symbols-outlined">do_not_disturb_on</span>
                                        </button>
                                    </li>)}
                            </ul>

                            <input 
                                type="text" 
                                placeholder="Enter hints for user here" 
                                value={hintState} 
                                onChange={handleHintInputChange}
                                style={{width: DEFAULT_FORM_ELEMENT_WIDTH}} />
                            <button 
                                type="button" 
                                onClick={handleAddHint}>
                                    <span className="material-symbols-outlined">add_circle</span>
                            </button> 
                        </div>
                    : null}

                <button type="submit">Save Current Topic Item</button>

            </form>
            <hr />
            <button type="button">Delete Topic Item</button>

            <div>

            </div>
        </>
    );
}