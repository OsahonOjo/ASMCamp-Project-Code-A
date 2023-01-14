import TopicItemContentCard from "./TopicItemContentCard";
import CollapsibleHeadingAndListCard from "./CollapsibleHeadingAndListCard";
import SAQResponseCard from "./SAQResponseCard";

import './styles/card.css';

function SAQView({ title, nXP, content, instructions, hints }) {

  const INSTRUCTIONS_HEADING = "Instructions";
  const HINTS_HEADING = "Hints";
  const RESPONSE_HEADING = "Response";
  const SUBMIT_BUTTON_TEXT = "Submit";
  const HINT_BUTTON_TEXT = "Hint";

  return (
    <div>
      <TopicItemContentCard 
        title={title}
        content={content}
        nXP={nXP}/>
      
      <CollapsibleHeadingAndListCard heading={INSTRUCTIONS_HEADING} list={instructions}/>

      <SAQResponseCard />

      <CollapsibleHeadingAndListCard heading={HINTS_HEADING} list={hints} closedByDefault={true}/>
    </div>
  );
}

export default SAQView;