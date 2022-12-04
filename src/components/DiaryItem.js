import React from "react";
import { useNavigate } from "react-router-dom";

import MyButton from "./MyButton";
// Optimized for the last command line
const DiaryItem = ({ id, date, time, emotion, content }) => {
  const navigate = useNavigate();

  // In case of process.env.PUBLIC_URL not working
  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";

  const strDate = new Date(parseInt(date));

  let month = strDate.getMonth() + 1; // getMonth() returns from 0 -> need to add +1
  if (month < 10) {
    month = `0${month}`;
  }

  // getMonth() returns from 1 but there is an unexpected error somewhere -> need to add +1
  let day = strDate.getDate() + 1;
  if (day < 10) {
    day = `0${day}`;
  }

  // Custom date format: e.g. 2022/01/01
  const dateText = `${strDate.getFullYear()}/${month}/${day}`;

  const goDetail = () => {
    navigate(`/diary/${id}`);
  };

  const goEdit = () => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="DiaryItem">
      <div
        onClick={goDetail}
        className={[
          "emotion_img_wrapper",
          `emotion_img_wrapper_${emotion}`,
          // create and return a new string by concatenating
          // all of the elements in this array,
          // separated by space(" ")
        ].join(" ")}
      >
        <img
          src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`}
          alt="Emotion_Img"
        />
      </div>
      <div onClick={goDetail} className="info_wrapper">
        <div className="diary_date">{dateText}</div>
        <div className="diary_time">at {time}</div>
        <span></span>
        <div className="diary_content_preview">
          {content.toString().slice(0, 45)}
        </div>
      </div>
      <div onClick={goEdit} className="btn_wrapper">
        <MyButton text={"Edit"} />
      </div>
    </div>
  );
};

// Optimization: because DiaryItem can render Image Files
export default React.memo(DiaryItem);
