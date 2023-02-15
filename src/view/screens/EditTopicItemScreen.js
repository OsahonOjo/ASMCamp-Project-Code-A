import React from "react";
import { Link } from "react-router-dom";
import Editor from "@monaco-editor/react";
import DOMPurify from "isomorphic-dompurify";

import BackButtonNavbar from "../components/BackButtonNavbar";

import { topicItemTypes } from "../../model/enums";

import '../components/styles/card.css';

export default function EditTopicItemScreen() {

    // https://reactjs.org/docs/forms.html

    const NAVBAR_TEXT = "Edit Topic Item";
    const PREVIOUS_PAGE_URL = "/instructors/edit/topic";
    const editViewIds = {
        id: "ltrack49w5304023",
        learningTrackId: "lanoavrnavlakf",
        courseId: "6852587461arrha"
    };
    const editViewFields = {
        title: true, 
        shortDescription: true, 
        longDescription: true, 
        seqNumber: true, 
        description: true
    };
    const topicItemTypesArray = ["Select"];
    Object.keys(topicItemTypes).forEach(key => {
        topicItemTypesArray.push(topicItemTypes[key]);
    });

    const [inputs, setInputs] = React.useState({
        id: "LT1-C1-T1-TI2-LT1-C1-T1-TI2",
        learningTrackId: "63c81af43074896247a739ea",
        courseId: "63c97f224370423bc6305cf8",
        topicId: "63c985e730e8bf226256a771",
        seqNumber: "",
        type: "",
        title: "", 
        xp: "",
        content: "# Marked in the browser\n\nRendered by **marked**",
        instructions: [],
        hints: [],
        mcqOptions: [],
        mcqAnswer: -1,
        cqAnswer: "",
        saqAnswer: [],
        tfqAnswer: false
    });
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
                nextInputs.mcqAnswer = -1;
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
                nextInputs.mcqAnswer = -1;
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

    function handleSubmit(event) {
        event.preventDefault();
        // console.log('form data: ', inputs);
        let nextInputs = Object.assign({}, inputs);
        nextInputs.content = DOMPurify.sanitize(nextInputs.content);
        setInputs(nextInputs);
        // console.log('form data: sanitized content: ', nextInputs);
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
        nextInputs.mcqAnswer = -1;
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
        nextInputs.mcqAnswer = event.target.value;
        setInputs(nextInputs);
        console.log('chosen option: ', nextInputs.mcqAnswer);
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

    return (
        <>
            <BackButtonNavbar title={NAVBAR_TEXT} to={PREVIOUS_PAGE_URL} />
            
            <form onSubmit={handleSubmit}>

                <div className="card">
                    <label>Title</label><br />
                    <input required type="text" value={inputs.title} onChange={handleTitleInputChange}/>
                </div>

                <div className="card">
                    <label>Sequence Number</label><br />
                    <input type="number" min="1" value={inputs.seqNumber} onChange={handleSeqNumberInputChange}/>
                </div>

                <div className="card">
                    <label>XP</label><br />
                    <input required type="number" min="1" value={inputs.xp} onChange={handleXPInputChange}/>
                </div>

                {/* type selection here */}
                <div className="card">
                    <label htmlFor="select-topic-item-type"><p>Type</p></label><br />
                    <select name="select-topic-item-type" value={inputs.type} onChange={handleTopicItemTypeSelectChange} style={{ width: '90%' }}>
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
                        width='90%'
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
                                onChange={handleInstructionInputChange} />
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
                                                checked={inputs.mcqAnswer == index}
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
                                onChange={handleMCQInputChange}/>
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
                            <select value={inputs.tfqAnswer} onChange={handleTFQSelectChange} style={{ width: '90%' }}>
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
                                onChange={handleSAQInputChange} />
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
                                onChange={handleHintInputChange} />
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