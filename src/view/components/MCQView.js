import TopicItemContentCard from "./TopicItemContentCard";
import CollapsibleHeadingAndListCard from "./CollapsibleHeadingAndListCard";
import MCQResponseCard from "./MCQResponseCard";
import TFQResponseCard from "./TFQResponseCard";

function MCQView({ isTFQ, title, nXP, content, instructions, options, hints }) {

  const INSTRUCTIONS_HEADING = "Instructions";
  const HINTS_HEADING = "Hints";

  return (
    <div>
      <TopicItemContentCard 
        title={title}
        content={content}
        nXP={nXP}/>
      
      <CollapsibleHeadingAndListCard heading={INSTRUCTIONS_HEADING} list={instructions}/>

      {isTFQ ?
        <TFQResponseCard /> :
        <MCQResponseCard options={options}/>}

      <CollapsibleHeadingAndListCard heading={HINTS_HEADING} list={hints} closedByDefault={true}/>
    </div>
  );
}

export default MCQView;