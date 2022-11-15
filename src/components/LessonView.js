/* libraries */
import React from "react";

function LessonView({ type, title, xp, content }) {

  return (
    <>
      <p>Type: {type}</p>

      <div>
        <p>{title}</p>
        <p><span>{xp}</span> XP</p>
      </div>

      <p>{content}</p>

      <button type="button">Continue</button>
      <br />
    </>
  );
}

export default LessonView;