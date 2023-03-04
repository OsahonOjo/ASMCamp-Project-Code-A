import React, { ChangeEvent, FormEvent, FormEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';

import './styles/card.css';
import './styles/icon.css';

interface GenericEditEntityViewProps {
    relevantFields: {
        id: boolean,
        learningTrackId: boolean, 
        courseId: boolean
        title: boolean, 
        shortDescription: boolean, 
        longDescription: boolean, 
        seqNumber: boolean, 
        description: boolean
    },
    fieldValues: {
        id: string,
        learningTrackId: string, 
        courseId: string,
        title: string, 
        shortDescription: string, 
        longDescription: string, 
        seqNumber: number | string, 
        description: string
    },
    handleSubmit: Function
};

/**
 * @description A customizable form that can submit data for Learning Track, Course, and Topic entities only.
 * @interface GenericEditEntityViewProps
 */
export default function GenericEntityForm({ relevantFields, fieldValues, handleSubmit }: GenericEditEntityViewProps): JSX.Element {

    const BUTTON_TEXT = "Save";
    const N_ROWS_SHORT_DESC = 4;
    const N_ROWS_LONG_DESC = 5;
    const FORM_ELEMENT_WIDTH = '100%';

    const navigate = useNavigate();

    // props are read-only so store fieldValues in a state
    const [inputs, setInputs] = React.useState(fieldValues);

    // fieldValues is empty strings initially, initialized to working value afterwards
    React.useEffect(() => {
        setInputs(fieldValues);
    }, [fieldValues]);

    const idField = 
        <div>
            <label>ID</label><br />
            <input 
                required 
                readOnly={true}
                type="text" 
                value={inputs.id} 
                style={{width: FORM_ELEMENT_WIDTH}}/>
        </div>;

    const learningTrackIdField = 
        <div>
            <label>Learning Track ID</label><br />
            <input 
                required 
                readOnly={true}
                type="text" 
                value={inputs.learningTrackId} 
                style={{width: FORM_ELEMENT_WIDTH}}/>
        </div>;

    const courseIdField = 
        <div>
            <label>Course ID</label><br />
            <input 
                required 
                readOnly={true}
                type="text" 
                value={inputs.courseId} 
                style={{width: FORM_ELEMENT_WIDTH}}/>
        </div>;

    const titleField = 
        <div>
            <label>Title</label><br />
            <input 
                required 
                type="text" 
                value={inputs.title} 
                onChange={handleTitleInputChange}
                style={{width: FORM_ELEMENT_WIDTH}}/>
        </div>;

    const shortDescriptionField = 
        <div>
            <label>Short Description</label><br />
            <textarea 
                required 
                value={inputs.shortDescription} 
                onChange={handleShortDescInputChange}
                rows={N_ROWS_SHORT_DESC}
                style={{width: FORM_ELEMENT_WIDTH}}></textarea>
        </div>;

    const longDescriptionField = 
        <div>
            <label>Long Description</label><br />
            <textarea 
                required 
                value={inputs.longDescription} 
                onChange={handleLongDescInputChange}
                rows={N_ROWS_LONG_DESC}
                style={{width: FORM_ELEMENT_WIDTH}}></textarea>
        </div>;

    const descriptionField = 
        <div>
            <label>Description</label><br />
            <textarea 
                required 
                value={inputs.description} 
                onChange={handleDescInputChange}
                rows={N_ROWS_SHORT_DESC}
                style={{width: FORM_ELEMENT_WIDTH}}></textarea>
        </div>;

    const seqNumberField = 
        <div>
            <label>Sequence Number</label><br />
            <input type="number" min="1" value={inputs.seqNumber} onChange={handleSeqNumberInputChange}/>
        </div>;

    function handleTitleInputChange(event: ChangeEvent<HTMLInputElement>) {
        let nextInputs = Object.assign({}, inputs);
        nextInputs.title = event.target.value;
        setInputs(nextInputs);
    }

    function handleShortDescInputChange(event: ChangeEvent<HTMLTextAreaElement>) {
        let nextInputs = Object.assign({}, inputs);
        nextInputs.shortDescription = event.target.value;
        setInputs(nextInputs);
    }

    function handleLongDescInputChange(event: ChangeEvent<HTMLTextAreaElement>) {
        let nextInputs = Object.assign({}, inputs);
        nextInputs.longDescription = event.target.value;
        setInputs(nextInputs);
    }

    function handleDescInputChange(event: ChangeEvent<HTMLTextAreaElement>) {
        let nextInputs = Object.assign({}, inputs);
        nextInputs.description = event.target.value;
        setInputs(nextInputs);
    }

    function handleSeqNumberInputChange(event: ChangeEvent<HTMLInputElement>) {
        let nextInputs = Object.assign({}, inputs);
        nextInputs.seqNumber = event.target.value;
        setInputs(nextInputs);
    }

    return (
        <form className="card" onSubmit={(event) => { handleSubmit(event, inputs) }}>
            {relevantFields.id ? idField : null}
            {relevantFields.learningTrackId ? learningTrackIdField : null}
            {relevantFields.courseId ? courseIdField : null}
            {relevantFields.title ? titleField : null}
            {relevantFields.seqNumber ? seqNumberField : null}
            {relevantFields.shortDescription ? shortDescriptionField : null}
            {relevantFields.description ? descriptionField : null}
            {relevantFields.longDescription ? longDescriptionField : null}
            <button type="submit">{BUTTON_TEXT}</button>
        </form>
    );
}