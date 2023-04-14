import React, { ChangeEvent, FormEvent, FormEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';

import './styles/card.css';
import './styles/icon.css';
import { styles } from '../components/styles/commonDisplayStyles';

import { constants } from '../../modelsAndData/constants';

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

    const { PRIMARY_TEXT_COLOR_DARK, SECONDARY_BACKGROUND_COLOR_DARK } = constants;
    const TEXT_COLOR = PRIMARY_TEXT_COLOR_DARK;
    const DEFAULT_MARGIN = '10px';
    const DEFAULT_MARGIN_X2 = '20px';
    const FONT_ICON_AND_TEXT_SEPARATION = '10px';
    const LABEL_FONT_SIZE = '20px';
    const TEXT_INPUT_FONT_SIZE = '18px';

    const buttonStyle = { 
        width: '100px', 
        height: '2em', 
        margin: DEFAULT_MARGIN,
        fontSize: '18px', 
        fontWeight: 'bold',
        color: styles.vDarkModeTextColor3,
        backgroundColor: styles.vDarkModeBackground1,
        // textAlign: 'left',
        borderWidth: '1px',
        borderColor: TEXT_COLOR
    };

    const navigate = useNavigate();

    // props are read-only so store fieldValues in a state
    const [inputs, setInputs] = React.useState(fieldValues);

    // fieldValues is empty strings initially, initialized to working value afterwards
    React.useEffect(() => {
        setInputs(fieldValues);
    }, [fieldValues]);

    const idField = 
        <div style={{ marginBottom: DEFAULT_MARGIN_X2 }}>
            <label>ID</label><br />
            <input 
                required 
                readOnly={true}
                type="text" 
                value={inputs.id} 
                style={{
                    width: FORM_ELEMENT_WIDTH,
                    fontSize: TEXT_INPUT_FONT_SIZE, 
                    backgroundColor: SECONDARY_BACKGROUND_COLOR_DARK, 
                    borderWidth: '0px'
                }}/>
        </div>;

    const learningTrackIdField = 
        <div style={{ marginBottom: DEFAULT_MARGIN_X2 }}>
            <label>Learning Track ID</label><br />
            <input 
                required 
                readOnly={true}
                type="text" 
                value={inputs.learningTrackId} 
                style={{
                    width: FORM_ELEMENT_WIDTH,
                    fontSize: TEXT_INPUT_FONT_SIZE, 
                    backgroundColor: SECONDARY_BACKGROUND_COLOR_DARK, 
                    borderWidth: '0px'
                }}/>
        </div>;

    const courseIdField = 
        <div style={{ marginBottom: DEFAULT_MARGIN_X2 }}>
            <label>Course ID</label><br />
            <input 
                required 
                readOnly={true}
                type="text" 
                value={inputs.courseId} 
                style={{
                    width: FORM_ELEMENT_WIDTH,
                    fontSize: TEXT_INPUT_FONT_SIZE, 
                    backgroundColor: SECONDARY_BACKGROUND_COLOR_DARK, 
                    borderWidth: '0px'
                }}/>
        </div>;

    const titleField = 
        <div style={{ marginBottom: DEFAULT_MARGIN_X2 }}>
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
                    borderWidth: '0px',
                    borderBottomWidth: '2px'}}/>
        </div>;

    const shortDescriptionField = 
        <div style={{ marginBottom: DEFAULT_MARGIN_X2 }}>
            <label style={{ ...styles.h4SizeAndWeight }}>Short Description</label><br />
            <textarea 
                required 
                value={inputs.shortDescription} 
                onChange={handleShortDescInputChange}
                rows={N_ROWS_SHORT_DESC}
                style={{ 
                    width: FORM_ELEMENT_WIDTH, 
                    fontSize: TEXT_INPUT_FONT_SIZE, 
                    backgroundColor: SECONDARY_BACKGROUND_COLOR_DARK, 
                    borderColor: TEXT_COLOR,
                    color: TEXT_COLOR,
                    borderWidth: '0px',
                    borderLeftWidth: '2px',
                    padding: '10px'}}>
            </textarea>
        </div>;

    const longDescriptionField = 
        <div style={{ marginBottom: DEFAULT_MARGIN_X2 }}>
            <label style={{ ...styles.h4SizeAndWeight }}>Long Description</label><br />
            <textarea 
                required 
                value={inputs.longDescription} 
                onChange={handleLongDescInputChange}
                rows={N_ROWS_LONG_DESC}
                style={{ 
                    width: FORM_ELEMENT_WIDTH, 
                    fontSize: TEXT_INPUT_FONT_SIZE, 
                    backgroundColor: SECONDARY_BACKGROUND_COLOR_DARK, 
                    borderColor: TEXT_COLOR,
                    color: TEXT_COLOR,
                    borderWidth: '0px',
                    borderLeftWidth: '2px',
                    padding: '10px'}}>
            </textarea>
        </div>;

    const descriptionField = 
        <div style={{ marginBottom: DEFAULT_MARGIN_X2 }}>
            <label style={{ ...styles.h4SizeAndWeight }}>Description</label><br />
            <textarea 
                required 
                value={inputs.description} 
                onChange={handleDescInputChange}
                rows={N_ROWS_SHORT_DESC}
                style={{width: FORM_ELEMENT_WIDTH, 
                    fontSize: TEXT_INPUT_FONT_SIZE, 
                    backgroundColor: SECONDARY_BACKGROUND_COLOR_DARK, 
                    borderColor: TEXT_COLOR,
                    color: TEXT_COLOR,
                    borderWidth: '0px',
                    borderLeftWidth: '2px',
                    padding: '10px'}}>
            </textarea>
        </div>;

    const seqNumberField = 
        <div style={{ marginBottom: DEFAULT_MARGIN_X2 }}>
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
                    borderWidth: '0px',
                    borderBottomWidth: '2px'}}/>
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
        <form 
            className="card" 
            style={{ color: TEXT_COLOR, fontSize: '20px' }}
            onSubmit={(event) => { handleSubmit(event, inputs) }}>
            {relevantFields.id ? idField : null}
            {relevantFields.learningTrackId ? learningTrackIdField : null}
            {relevantFields.courseId ? courseIdField : null}
            {relevantFields.title ? titleField : null}
            {relevantFields.seqNumber ? seqNumberField : null}
            {relevantFields.shortDescription ? shortDescriptionField : null}
            {relevantFields.description ? descriptionField : null}
            {relevantFields.longDescription ? longDescriptionField : null}
            <div style={{ textAlign: 'right' }}>
                <button style={buttonStyle} type="submit">{BUTTON_TEXT}</button>
            </div>
        </form>
    );
}