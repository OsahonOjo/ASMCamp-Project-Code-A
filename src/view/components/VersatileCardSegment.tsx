import React from 'react';
import { Link } from 'react-router-dom';

import ProgressBar from './ProgressBar';
import CollapsibleParagraph from './CollapsibleParagraph';

import './styles/card.css';
import './styles/icon.css';
import { commonDisplayStyles } from "./styles/commonDisplayStyles";

interface VersatileCardSegmentProps {
    mainIcon: {
        icon: JSX.Element, 
        style: object
    },
    heading: { 
        text: string, 
        style: object
    }, 
    progress?: { 
        percentage: number,
        hasLabel: boolean,
        labelOnRightSide: boolean
    },
    paragraphOne: { 
        text: string, 
        style: object
    }, 
    paragraphTwo?: { 
        text: string,  
        style: object
    }, 
    linkIcon?: { 
        icon: JSX.Element, 
        style: object,
        to: string
    },
    extraComponent?: JSX.Element
    payload?: object
};

export default function VersatileCardSegment({ mainIcon, heading, progress, paragraphOne, paragraphTwo, extraComponent, linkIcon }: VersatileCardSegmentProps): JSX.Element {

    const headingElement: JSX.Element = <p style={heading.style}>{heading.text}</p>;

    return (
        <>
            <hr />

            <div className="card-display--flex">
                
                <div style={{height: '100%'}}>{mainIcon.icon}</div>

                <div style={{ flexGrow: 9 }}>
                    {linkIcon ? <Link to={linkIcon.to}>{headingElement}</Link> : headingElement}

                    {progress 
                        ? <ProgressBar 
                            percentage={progress.percentage}
                            hasLabel={progress.hasLabel}
                            labelOnRightSide={progress.labelOnRightSide} />
                        : null}

                    {paragraphOne 
                        ? <CollapsibleParagraph 
                            text={paragraphOne.text}
                            paragraphStyle={paragraphOne.style} />
                        : null}

                    {paragraphTwo 
                        ? <CollapsibleParagraph 
                            text={paragraphTwo.text}
                            paragraphStyle={paragraphTwo.style} />
                        : null}  

                    {extraComponent ? extraComponent : null}                  
                </div>

                <div>
                    {linkIcon 
                        ? <div style={{height: '100%'}}>
                            <Link to={linkIcon.to}>
                                {linkIcon.icon}
                            </Link>
                          </div>
                        : null}
                </div>

            </div>
        </>
    );
}