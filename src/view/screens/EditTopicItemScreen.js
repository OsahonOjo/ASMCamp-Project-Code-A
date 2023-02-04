import React from "react";
import { Link } from "react-router-dom";

import BackButtonNavbar from "../components/BackButtonNavbar";

import { topicItemTypes } from "../../model/enums";

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
        content: "",
        instructions: [],
        hints: [],
        mcqOptions: [],
        mcqAnswer: -1,
        cqAnswer: "",
        saqAnswer: [],
        tfqAnswer: false
    });

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
        nextInputs.type = event.target.value;
        setInputs(nextInputs);
    }

    function handleContentInputChange(event) {
        let nextInputs = Object.assign({}, inputs);
        nextInputs.content = event.target.value;
        setInputs(nextInputs);
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log('form data: ', inputs);
    }

    return (
        <>
            <BackButtonNavbar title={NAVBAR_TEXT} to={PREVIOUS_PAGE_URL} />
            <p>Edit Topic Item Screen</p>
            <form onSubmit={handleSubmit}>

                {/**
                 *  seqNumber: -1,
                    type: "",
                    title: "", 
                    xp: "",
                    content: "",
                    instructions: [],
                    hints: [],
                    mcqOptions: [],
                    mcqAnswer: -1,
                    cqAnswer: "",
                    saqAnswer: [],
                    tfqAnswer: false
                 */}

                <div>
                    <label>Title</label><br />
                    <input required type="text" value={inputs.title} onChange={handleTitleInputChange}/>
                </div>

                <div>
                    <label>Sequence Number</label><br />
                    <input type="number" min="1" value={inputs.seqNumber} onChange={handleSeqNumberInputChange}/>
                </div>

                <div>
                    <label>XP</label><br />
                    <input required type="number" min="1" value={inputs.xp} onChange={handleXPInputChange}/>
                </div>

                <label htmlFor="select-topic-item-type">Type</label><br />
                <select name="select-topic-item-type" value={inputs.type} onChange={handleTopicItemTypeSelectChange} style={{ width: '90%' }}>
                    {topicItemTypesArray.map(type => 
                        <option key={type} value={type}>{type}</option>)}
                </select>

                <div>
                    <label>Content</label><br />
                    <textarea value={inputs.content} onChange={handleContentInputChange}></textarea>
                </div>

                <button type="submit">Save Topic Item</button>

            </form>
            <hr />
            <button type="button">Delete Topic Item</button>

            <div>

            </div>
        </>
    );
}