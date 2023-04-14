import React from "react";
import AllLearningTracksScreenViewModel from './AllLearningTracksScreenViewModel';

import SideNavigationMenu from "../components/SideNavigationMenu";
import HamburgerNavbar from "../components/HamburgerNavbar";
import LearningTrackSummaryCard from '../components/LearningTrackSummaryCard';

export default function AllLearningTracksScreen() {

/*
IDEAS:

  0. incorporate a loading state

  1. move initial viewmodel call into useEffect:
    - remove states from inside the viewmodel
    - putting returned data from viewmodel in a state(s) in the view
      so that they will be there when the component is reloaded from cache
    - function in the viewmodel follow functional programming principles

  2. remove states from view
    - NAH. state has to be in view to provide data 
      when the component is reloaded from cache

*/

  // TODO
  // 1. convert everything that can be to layouts, instead of components
  // 2. replace <p>Loading</p> with spinner


  const NAVBAR_TEXT = "ASMCamp";
  const NEXT_PAGE_URL_STEM = "/track";

  const [ loading, setLoading ] = React.useState(true);
  const [ summaries, setSummaries ] = React.useState([]);
  // const [ vmCallbacks, setVMCallbacks ] = React.useState({});

  // const { learningTrackSummaries, getLearningTrackSummaries } = AllLearningTracksScreenViewModel();

  // useEffect's 1st argument is supposed to be a function that returns either nothing (undefined) or another function
  // since an async function returns a promise, it cannot be used as that 1st argument
  // pass empty dependency array to make useEffect run only once after initial component render

  React.useEffect(() => { 
    console.log('AllLearningTracksScreen: inside first useEffect');
    // getLearningTrackSummaries();
    const getLearningTrackSummaries = AllLearningTracksScreenViewModel();
    getLearningTrackSummaries()
      .then((summaries) => {
        setSummaries(summaries);
        setLoading(false);
      })
      .catch((error) => { 
        console.log(error);
        setLoading(true);
      });
  }, []);

  // React.useEffect(() => {
  //   console.log('AllLearningTracksScreen: inside second useEffect');
  //   learningTrackSummaries && learningTrackSummaries.length != 0
  //     ? setSummaries(learningTrackSummaries) 
  //     : setSummaries([]);
  // }, [learningTrackSummaries]);

  return (
    <>
      <SideNavigationMenu/>
      <HamburgerNavbar title={NAVBAR_TEXT}/>
      {loading
        ? <code>Loading</code>
        : summaries.map(summary => 
            <LearningTrackSummaryCard 
              key={summary.title}
              to={`${NEXT_PAGE_URL_STEM}/${summary.id}`}
              userIsEnrolled={summary.progress ? true : false}
              trackDetails={{ 
                trackId: summary.id, 
                title: summary.title, 
                shortDescription: summary.shortDescription,
                longDescription: summary.longDescription }} 
              /* wrapping in ternary operator handles case when progress is null */
              progressBar={
                summary.progress
                  ? {
                      percentage: summary.progress.percentage,
                      hasLabel: true,
                      labelOnRightSide: false
                    }
                  : null
              }/>
            )}
    </>
  );
}

 /*
      https://reactjs.org/docs/hooks-effect.html

      In React.js, the effects are performed after React has updated the DOM.
      That is, useEffect() is called after the JSX code is rendered.

      React Router uses a technique called "component caching" to preserve 
      components in memory when navigating back to a previously visited route, 
      so that it doesn't have to unmount and re-mount the component again. 
      This means that lifecycle methods like componentDidMount and 
      componentWillUnmount are not called again.

      However, only certain data about the component is preserved in memory.
      This includes: props, state, context, and refs.

      So when you come back to /tracks from /track, for example, 
      AllLearningTracksScreen gets loaded in from memory but the data you need
      to render the learning summaries does not get loaded back and the useEffect()
      also doesn't get called either.

      If the component state is large or if it references other objects in 
      memory, preserving it in memory can lead to memory leaks and 
      performance issues. In these cases, it's better to unmount the 
      component and create a new instance of it when navigating back to the route.
      This can be achieved by using the unmountOnExit prop on the <Route> 
      component in React Router.

      SOLUTION:
      One way to handle this is to wrap the data (that isn't props, state, 
      content or refs) that you want to reload in a state and then use useEffect to
      update that state.
  */

  /*
      const shortDescription = "Learning Track Short Description. Lorem ipsum sit dolor amet consectetur adipsicing. Lorem ipsum sit dolor amet consectetur adipsicing. Lorem ipsum sit dolor am";  // 160 characters
      const learningTracksSummaryData = [
        {
          title: "Learning Track Alpha",
          shortDescription: shortDescription,
          userIsEnrolled: true,
          percentage: 32,
          hasLabel: true,
          percentageOnRightSide: false
        },
        {
          title: "Learning Track Obsidian",
          shortDescription: shortDescription,
          userIsEnrolled: true,
          percentage: 68,
          hasLabel: true,
          percentageOnRightSide: false
        },
        {
          title: "Learning Track Ruby",
          shortDescription: shortDescription,
          userIsEnrolled: false,
          percentage: 0,
          hasLabel: true,
          percentageOnRightSide: false
        }
      ];
  */