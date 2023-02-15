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
export default function GenericEditEntityView({ relevantFields, fieldValues, handleSubmit }: GenericEditEntityViewProps): JSX.Element {

    const BUTTON_TEXT = "Save";
    const N_ROWS_SHORT_DESC = 5;
    const N_ROWS_LONG_DESC = 7;

    const navigate = useNavigate();

    const [inputs, setInputs] = React.useState(fieldValues);

    React.useEffect(() => {
        setInputs(fieldValues);
    }, [fieldValues]);

    const titleField = 
        <div>
            <label>Title</label><br />
            <input 
                required 
                type="text" 
                value={inputs.title} 
                onChange={handleTitleInputChange}
                style={{width: '80%'}}/>
        </div>;

    const shortDescriptionField = 
        <div>
            <label>Short Description</label><br />
            <textarea 
                required 
                value={inputs.shortDescription} 
                onChange={handleShortDescInputChange}
                rows={N_ROWS_SHORT_DESC}
                style={{width: '80%'}}></textarea>
        </div>;

    const longDescriptionField = 
        <div>
            <label>Long Description</label><br />
            <textarea 
                required 
                value={inputs.longDescription} 
                onChange={handleLongDescInputChange}
                rows={N_ROWS_LONG_DESC}
                style={{width: '80%'}}></textarea>
        </div>;

    const descriptionField = 
        <div>
            <label>Description</label><br />
            <textarea 
                required 
                value={inputs.description} 
                onChange={handleDescInputChange}
                rows={N_ROWS_SHORT_DESC}
                style={{width: '80%'}}></textarea>
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
            {relevantFields.title ? titleField : null}
            {relevantFields.seqNumber ? seqNumberField : null}
            {relevantFields.shortDescription ? shortDescriptionField : null}
            {relevantFields.description ? descriptionField : null}
            {relevantFields.longDescription ? longDescriptionField : null}
            <button type="submit">{BUTTON_TEXT}</button>
        </form>
    );
}