import React from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import DOMPurify from "isomorphic-dompurify";
import EditTopicItemScreenViewModel from "./EditTopicItemScreenViewModel";

import BackButtonNavbar from "../components/BackButtonNavbar";

import { topicItemTypes } from "../../modelsAndData/enums";

import '../components/styles/card.css';
import { styles } from "../components/styles/commonDisplayStyles";

import { constants } from "../../modelsAndData/constants";

export default function EditTopicItemScreen() {

    const NAVBAR_TEXT = "Edit Topic Item";
    const PREVIOUS_PAGE_URL = "/instructors/edit/topic";
    const PREVIOUS_PAGE_URL_STEM = "/instructors/edit/topic";
    const CURRENT_PAGE_URL_STEM = "/instructors/edit/item";
    const EMPTY_STRING = ""; 
    const DEFAULT_FORM_ELEMENT_WIDTH = "80%";
    const EDITOR_WIDTH = "100%";

    const N_TEXTAREA_ROWS = 2;

    const { PRIMARY_TEXT_COLOR_DARK, SECONDARY_BACKGROUND_COLOR_DARK } = constants;
    const TEXT_COLOR = PRIMARY_TEXT_COLOR_DARK;
    const DEFAULT_MARGIN = '10px';
    const DEFAULT_MARGIN_X2 = '20px';
    const DEFAULT_MARGIN_X3 = '30px';
    const DEFAULT_PADDING = '10px';
    const FONT_ICON_AND_TEXT_SEPARATION = '10px';
    const LABEL_FONT_SIZE = '20px';
    const TEXT_INPUT_FONT_SIZE = '20px';
    const FORM_ELEMENT_WIDTH = '100%';

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
            // also account for if topicItem is {}
            topicItem && Object.keys(topicItem).length != 0
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
        //console.log('editor event: ', event);
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

    const buttonStyle = { 
        width: '95%', 
        height: '2em', 
        margin: DEFAULT_MARGIN,
        marginBottom: DEFAULT_MARGIN_X3,
        fontSize: '18px', 
        fontWeight: 'bold',
        color: styles.vDarkModeTextColor3,
        backgroundColor: styles.vDarkModeBackground1,
        // textAlign: 'left',
        borderWidth: '1px',
        borderColor: TEXT_COLOR
    };

    const saveButtonStyle = { 
        width: '50%', 
        height: '2em', 
        margin: DEFAULT_MARGIN,
        marginBottom: DEFAULT_MARGIN,
        fontSize: '18px', 
        fontWeight: 'bold',
        color: styles.vDarkModeTextColor3,
        backgroundColor: styles.vDarkModeBackground1,
        // textAlign: 'left',
        borderWidth: '1px',
        borderColor: TEXT_COLOR
    };

    return (
        <>
            {/* in SCREEN_MODE.CREATE_NEW_ENTITY, you can't go beyond this screen so you can trust the value of location.state.from */}
            <BackButtonNavbar title={NAVBAR_TEXT} to={location.state.from} />
            
            {/* <button type="button" onClick={() => { console.log('screenMode: ', screenMode) }}>Click for Screen Mode</button> */}

            <form onSubmit={handleSubmit} style={{ color: TEXT_COLOR }}>

                <div className="card">
                    <div>
                        <label>ID</label><br />
                        <input required readOnly={true} type="text" value={inputs.id} style={{ width: DEFAULT_FORM_ELEMENT_WIDTH, fontSize: TEXT_INPUT_FONT_SIZE, backgroundColor: SECONDARY_BACKGROUND_COLOR_DARK, borderWidth: '0px' }}/>
                    </div>

                    <div>
                        <label>Learning Track ID</label><br />
                        <input required readOnly={true} type="text" value={inputs.learningTrackId} style={{ width: DEFAULT_FORM_ELEMENT_WIDTH, fontSize: TEXT_INPUT_FONT_SIZE, backgroundColor: SECONDARY_BACKGROUND_COLOR_DARK, borderWidth: '0px' }}/>
                    </div>

                    <div>
                        <label>Course ID</label><br />
                        <input required readOnly={true} type="text" value={inputs.courseId} style={{ width: DEFAULT_FORM_ELEMENT_WIDTH, fontSize: TEXT_INPUT_FONT_SIZE, backgroundColor: SECONDARY_BACKGROUND_COLOR_DARK, borderWidth: '0px' }}/>
                    </div>

                    <div>
                        <label>Topic ID</label><br />
                        <input required readOnly={true} type="text" value={inputs.topicId} style={{ width: DEFAULT_FORM_ELEMENT_WIDTH, fontSize: TEXT_INPUT_FONT_SIZE, backgroundColor: SECONDARY_BACKGROUND_COLOR_DARK, borderWidth: '0px' }}/>
                    </div>
                </div>

                <div className="card">
                    <label style={{ ...styles.h4SizeAndWeight }}>Title</label><br />
                    <input 
                        required 
                        type="text" 
                        value={inputs.title} 
                        onChange={handleTitleInputChange} 
                        style={{ 
                            width: FORM_ELEMENT_WIDTH, 
                            fontSize: TEXT_INPUT_FONT_SIZE, 
                            backgroundColor: SECONDARY_BACKGROUND_COLOR_DARK, 
                            borderColor: TEXT_COLOR,
                            color: TEXT_COLOR,
                            marginBottom: DEFAULT_MARGIN,
                            borderWidth: '0px',
                            borderBottomWidth: '2px'}}/>
                </div>

                <div className="card">
                    <label style={{ ...styles.h4SizeAndWeight }}>Sequence Number</label><br />
                    <input 
                        type="number" 
                        min="1" 
                        value={inputs.seqNumber} 
                        onChange={handleSeqNumberInputChange} 
                        style={{ 
                            width: FORM_ELEMENT_WIDTH, 
                            fontSize: TEXT_INPUT_FONT_SIZE, 
                            backgroundColor: SECONDARY_BACKGROUND_COLOR_DARK, 
                            borderColor: TEXT_COLOR,
                            color: TEXT_COLOR,
                            marginBottom: DEFAULT_MARGIN,
                            borderWidth: '0px',
                            borderBottomWidth: '2px'}}/>
                </div>

                <div className="card">
                    <label style={{ ...styles.h4SizeAndWeight }}>XP</label><br />
                    <input 
                        required 
                        type="number" 
                        min="1" 
                        value={inputs.xp} 
                        onChange={handleXPInputChange} 
                        style={{ 
                            width: FORM_ELEMENT_WIDTH, 
                            fontSize: TEXT_INPUT_FONT_SIZE, 
                            backgroundColor: SECONDARY_BACKGROUND_COLOR_DARK, 
                            borderColor: TEXT_COLOR,
                            color: TEXT_COLOR,
                            marginBottom: DEFAULT_MARGIN,
                            borderWidth: '0px',
                            borderBottomWidth: '2px'}}/>
                </div>

                {/* type selection here */}
                <div className="card">
                    <label style={{ ...styles.h4SizeAndWeight }} htmlFor="select-topic-item-type"><p>Type</p></label><br />
                    <select 
                        name="select-topic-item-type" 
                        value={inputs.type} 
                        onChange={handleTopicItemTypeSelectChange} 
                        style={{ 
                            width: FORM_ELEMENT_WIDTH, 
                            fontSize: TEXT_INPUT_FONT_SIZE, 
                            backgroundColor: SECONDARY_BACKGROUND_COLOR_DARK, 
                            borderColor: TEXT_COLOR,
                            color: TEXT_COLOR,
                            marginBottom: DEFAULT_MARGIN,
                            borderWidth: '0px',
                            borderBottomWidth: '2px'}}>
                                {topicItemTypesArray.map(type => 
                                    <option key={type} value={type}>{type}</option>)}
                    </select>
                </div>

                <div className="card">
                    <label style={{ ...styles.h4SizeAndWeight }}>{(inputs.type == "LSN" || inputs.type == "Select") ? "Content" : "Question"}</label><br />
                    <p>The content of the lesson or question goes here. Please use Markdown notation.</p>
                    <br/>
                    <Editor 
                        required
                        height='30vh'
                        theme='vs-dark'
                        width={EDITOR_WIDTH}
                        language='markdown'
                        value={inputs.content}
                        onChange={handleContentInputChange}/>
                </div>

                {/* Instructions card */}
                {(inputs.type != "LSN" && inputs.type != "Select")
                    ?   <div className="card">
                            <p style={{ ...styles.h4SizeAndWeight }}>Instructions</p>
                            <ul>
                                {inputs.instructions.map((instruction, index) => 
                                    <li key={`${instruction}${index}`} style={{ marginBottom: DEFAULT_MARGIN_X2 }} >
                                        <div style={{ display: 'flex' }}>
                                            <span>{instruction}</span>
                                            <button 
                                                type="button" 
                                                style={{ color: TEXT_COLOR, backgroundColor: SECONDARY_BACKGROUND_COLOR_DARK, borderWidth: '0px' }}
                                                onClick={() => { handleDeleteInstruction(index) }}>
                                                    <span className="material-symbols-outlined">do_not_disturb_on</span>
                                            </button>
                                        </div>
                                    </li>)}
                            </ul>

                            <textarea
                                type="text" 
                                placeholder="Enter instruction here"
                                value={instructionState} 
                                onChange={handleInstructionInputChange}
                                style={{
                                    width: '100%', 
                                    fontSize: TEXT_INPUT_FONT_SIZE, 
                                    backgroundColor: SECONDARY_BACKGROUND_COLOR_DARK, 
                                    borderColor: TEXT_COLOR,
                                    color: TEXT_COLOR,
                                    borderWidth: '0px',
                                    borderLeftWidth: '2px',
                                    padding: DEFAULT_PADDING
                                }}>
                            </textarea>
                            <div style={{ textAlign: 'right' }}>
                                <button 
                                    type="button" 
                                    style={saveButtonStyle}
                                    onClick={handleAddInstruction}>
                                        Add Instruction
                                        {/* <span className="material-symbols-outlined">add_circle</span> */}
                                </button> 
                            </div>
                        </div>
                    : null}

                {inputs.type == "MCQ" 
                    ?   <div className="card">
                            <p style={{ ...styles.h4SizeAndWeight }}>Options</p>
                            <p>Select the radio button for the correct option.</p>
                            <ul style={{ listStyleType: 'none', marginLeft: '-20px' }}>
                                {inputs.mcqOptions.map((option, index) => 
                                    <li key={`${option}${index}`} style={{ marginBottom: DEFAULT_MARGIN_X2, fontWeight:'normal', fontSize: LABEL_FONT_SIZE }}>
                                        <div style={{ display: 'flex' }}>
                                            <label>
                                                <input 
                                                    type="radio" 
                                                    value={index}
                                                    checked={inputs.mcqAnswerIndex == index}
                                                    style={{ marginRight: DEFAULT_MARGIN_X2 }}
                                                    onChange={selectMCQOptionAsAnswer} />
                                                {option}
                                            </label>
                                            <button 
                                                type="button" 
                                                style={{ color: TEXT_COLOR, backgroundColor: SECONDARY_BACKGROUND_COLOR_DARK, borderWidth: '0px' }}
                                                onClick={() => { handleDeleteMCQOption(index) }}>
                                                    <span className="material-symbols-outlined">do_not_disturb_on</span>
                                            </button>
                                        </div>
                                    </li>)}
                            </ul>
                            <textarea 
                                rows={N_TEXTAREA_ROWS}
                                placeholder="Enter option here" 
                                value={mcqOptionState} 
                                onChange={handleMCQInputChange}
                                style={{
                                    width: '100%', 
                                    fontSize: TEXT_INPUT_FONT_SIZE, 
                                    backgroundColor: SECONDARY_BACKGROUND_COLOR_DARK, 
                                    borderColor: TEXT_COLOR,
                                    color: TEXT_COLOR,
                                    borderWidth: '0px',
                                    borderLeftWidth: '2px',
                                    padding: DEFAULT_PADDING
                                }}>
                            </textarea>
                            <div style={{ textAlign: 'right' }}>
                                <button 
                                    type="button" 
                                    style={saveButtonStyle}
                                    onClick={handleAddMCQOption}>
                                        Add Option
                                        {/* <span className="material-symbols-outlined">add_circle</span> */}
                                </button> 
                            </div>             
                        </div> 
                    : null}

                {inputs.type == "TFQ" 
                    ?   <div className="card">
                            <p style={{ ...styles.h4SizeAndWeight }}>Answer</p>
                            <p>Select either True or False.</p>
                            <select 
                                value={inputs.tfqAnswer}
                                onChange={handleTFQSelectChange} 
                                style={{
                                    width: '100%', 
                                    fontSize: TEXT_INPUT_FONT_SIZE, 
                                    backgroundColor: SECONDARY_BACKGROUND_COLOR_DARK, 
                                    borderColor: TEXT_COLOR,
                                    color: TEXT_COLOR,
                                    borderWidth: '0px',
                                    borderBottomWidth: '2px'
                                }}>
                                    <option value={false}>False</option>
                                    <option value={true}>True</option>
                            </select>
                        </div>
                    : null}

                {inputs.type == "SAQ" 
                    ?   <div className="card">
                            <p style={{ ...styles.h4SizeAndWeight }}>Answers</p>
                            {/* <p>Enter possible answers here.</p> */}
                            <ul>
                                {inputs.saqAnswer.map((answer, index) => 
                                    <li key={`${answer}${index}`} style={{ marginBottom: DEFAULT_MARGIN_X2 }}>
                                        <span>{answer}</span>
                                        <button 
                                            type="button"
                                            style={{ color: TEXT_COLOR, backgroundColor: SECONDARY_BACKGROUND_COLOR_DARK, borderWidth: '0px' }}
                                            onClick={() => { handleDeleteSAQAnswer(index) }}>
                                                <span className="material-symbols-outlined">do_not_disturb_on</span>
                                        </button>
                                    </li>)}
                            </ul>
                            <input 
                                type="text" 
                                placeholder="Enter possible answer here" 
                                value={saqAnswerState} 
                                onChange={handleSAQInputChange}
                                style={{
                                    width: '100%', 
                                    fontSize: TEXT_INPUT_FONT_SIZE, 
                                    backgroundColor: SECONDARY_BACKGROUND_COLOR_DARK, 
                                    borderColor: TEXT_COLOR,
                                    color: TEXT_COLOR,
                                    borderWidth: '0px',
                                    borderBottomWidth: '2px',
                                    marginBottom: DEFAULT_MARGIN
                                }} />
                            <div style={{ textAlign: 'right' }}>
                                <button 
                                    type="button" 
                                    style={saveButtonStyle}
                                    onClick={handleAddSAQAnswer}>
                                        Add Answer
                                        {/* <span className="material-symbols-outlined">add_circle</span> */}
                                </button> 
                            </div>
                        </div>
                    : null}

                {inputs.type == "CQ" ? <p className="card">CQ</p> : null}

                {/* Hints card */}
                {(inputs.type != "LSN" && inputs.type != "Select")
                    ?   <div className="card">
                            <p style={{ ...styles.h4SizeAndWeight }}>Hints</p>
                            <ul>
                                {inputs.hints.map((hint, index) => 
                                    <li key={`${hint}${index}`} style={{ marginBottom: DEFAULT_MARGIN_X2 }}>
                                        <div style={{ display: 'flex' }}>
                                            <span>{hint}</span>
                                            <button 
                                                type="button" 
                                                style={{ color: TEXT_COLOR, backgroundColor: SECONDARY_BACKGROUND_COLOR_DARK, borderWidth: '0px' }}
                                                onClick={() => { handleDeleteHint(index) }}>
                                                    <span className="material-symbols-outlined">do_not_disturb_on</span>
                                            </button>
                                        </div>
                                    </li>)}
                            </ul>

                            <textarea 
                                rows={N_TEXTAREA_ROWS}
                                placeholder="Enter hint here"
                                value={hintState} 
                                onChange={handleHintInputChange}
                                style={{
                                    width: '100%', 
                                    fontSize: TEXT_INPUT_FONT_SIZE, 
                                    backgroundColor: SECONDARY_BACKGROUND_COLOR_DARK, 
                                    borderColor: TEXT_COLOR,
                                    color: TEXT_COLOR,
                                    borderWidth: '0px',
                                    borderLeftWidth: '2px',
                                    padding: DEFAULT_PADDING
                                }} >
                            </textarea>
                            <div style={{ textAlign: 'right' }}>
                                <button 
                                    type="button" 
                                    style={saveButtonStyle}
                                    onClick={handleAddHint}>
                                        Add Hint
                                        {/* <span className="material-symbols-outlined">add_circle</span> */}
                                </button> 
                            </div>
                        </div>
                    : null}

                <button style={buttonStyle} type="submit">Save Topic Item</button>

            </form>
            {/* <hr />
            <button type="button">Delete Topic Item</button> */}

            <div>

            </div>
        </>
    );
}