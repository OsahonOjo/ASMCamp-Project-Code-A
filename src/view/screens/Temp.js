import React from "react";
import { Link } from "react-router-dom";

export default function ReactExecutionTextComponent() {

    const [ state1, setState1 ] = React.useState(0);
    const [ state2, setState2 ] = React.useState(0);
    const [ state3, setState3 ] = React.useState(0);

    // // React.useEffect(() => {}, []);

    if (state1 != 0)
        setState1(12)

    // React.useEffect(() => {
    //     setState1(12);
    // }, []);

    // React.useEffect(() => {
    //     setState2(17);
    // }, [state1]);

    // React.useEffect(() => {
    //     setState3(37);
    // }, [state1]);

    console.log('inside Temp component function body');

    return (
        <>
            <Link to={"/instructors"}>Click to go back</Link>
            <p>Hello, World!</p>
        </>
    );
}