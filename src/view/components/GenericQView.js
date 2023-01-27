import TopicItemContentCard from "./TopicItemContentCard";
import CollapsibleHeadingAndListCard from "./CollapsibleHeadingAndListCard";
import MCQResponseCard from "./MCQResponseCard";

function GenericQView({ title, nXP, content, instructions, hints, ResponseCard }) {

  const INSTRUCTIONS_HEADING = "Instructions";
  const HINTS_HEADING = "Hints";

  return (
    <div>
      <TopicItemContentCard 
        title={title}
        content={content}
        nXP={nXP}/>
      
      <CollapsibleHeadingAndListCard heading={INSTRUCTIONS_HEADING} list={instructions}/>

      {ResponseCard}

      <CollapsibleHeadingAndListCard heading={HINTS_HEADING} list={hints} closedByDefault={true}/>
    </div>
  );
}

export default GenericQView;