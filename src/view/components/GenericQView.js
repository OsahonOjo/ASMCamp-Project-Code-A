import TopicItemContentCard from "./TopicItemContentCard";
import CollapsibleHeadingAndListCard from "./CollapsibleHeadingAndListCard";
import MCQResponseCard from "./MCQResponseCard";

import { styles } from "./styles/commonDisplayStyles";

import { constants } from "../../modelsAndData/constants";

function GenericQView({ title, nXP, content, instructions, hints, ResponseCard }) {

  const INSTRUCTIONS_HEADING = "Instructions";
  const HINTS_HEADING = "Hints";

  const { PRIMARY_TEXT_COLOR_DARK } = constants;
  const TEXT_COLOR = PRIMARY_TEXT_COLOR_DARK;

  return (
    <div>
      <TopicItemContentCard 
        title={title}
        content={content}
        nXP={nXP}/>
      
      <div style={{ color: TEXT_COLOR }}>
        <CollapsibleHeadingAndListCard heading={INSTRUCTIONS_HEADING} list={instructions}/>
      </div>

      <div style={{ color: TEXT_COLOR }}>
        {ResponseCard}
      </div>

      <div style={{ color: TEXT_COLOR }}>
      <CollapsibleHeadingAndListCard heading={HINTS_HEADING} list={hints} closedByDefault={true}/>
      </div>
    </div>
  );
}

export default GenericQView;