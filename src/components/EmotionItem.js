import React from "react";

const EmotionItem = ({
  emotion_id,
  emotion_img,
  emotion_descript,
  onClick,
  isSelected,
}) => {
  return (
    <div
      onClick={() => onClick(emotion_id)}
      className={[
        "EmotionItem",
        isSelected ? `EmotionItem_on_${emotion_id}` : `EmotionItem_off`,
        // create and return a new string by concatenating
        // all of the elements in this array,
        // separated by space(" ")
      ].join(" ")}
    >
      <img src={emotion_img} alt={`Emotion${emotion_id}`} />
      <span>{emotion_descript}</span>
    </div>
  );
};

export default React.memo(EmotionItem);
