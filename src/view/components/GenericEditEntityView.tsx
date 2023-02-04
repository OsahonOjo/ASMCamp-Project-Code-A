import React, { ChangeEvent, FormEvent } from 'react';

import './styles/card.css';
import './styles/icon.css';

interface GenericEditEntityViewProps {
    ids: {
        id: string,
        learningTrackId?: string, 
        courseId?: string
    }, 
    fields: {
        title: boolean, 
        shortDescription?: boolean, 
        longDescription?: boolean, 
        seqNumber?: boolean, 
        description?: boolean
    }
};

/**
 * @description A customizable form that can submit data for Learning Track, Course, and Topic entities only.
 * @interface GenericEditEntityViewProps
 */
export default function GenericEditEntityView({ ids, fields }: GenericEditEntityViewProps): JSX.Element {

    const BUTTON_TEXT = "Save";
    const [inputs, setInputs] = React.useState({
        id: ids.id,
        learningTrackId: ids.learningTrackId,
        courseId: ids.courseId,
        title: "", 
        shortDescription: "", 
        longDescription: "", 
        seqNumber: "", 
        description: ""
    });

    const titleField = 
        <div>
            <label>Title</label><br />
            <input type="text" value={inputs.title} onChange={handleTitleInputChange}/>
        </div>;

    const shortDescriptionField = 
        <div>
            <label>Short Description</label><br />
            <textarea value={inputs.shortDescription} onChange={handleShortDescInputChange}></textarea>
        </div>;

    const longDescriptionField = 
        <div>
            <label>Long Description</label><br />
            <textarea value={inputs.longDescription} onChange={handleLongDescInputChange}></textarea>
        </div>;

    const descriptionField = 
        <div>
            <label>Description</label><br />
            <textarea value={inputs.description} onChange={handleDescInputChange}></textarea>
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

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log('form data: ', inputs);
    }

    return (
        <form className="card" onSubmit={handleSubmit}>
            {fields.title ? titleField : null}
            {fields.seqNumber ? seqNumberField : null}
            {fields.shortDescription ? shortDescriptionField : null}
            {fields.description ? descriptionField : null}
            {fields.longDescription ? longDescriptionField : null}
            <button type="submit">{BUTTON_TEXT}</button>
        </form>
    );
}