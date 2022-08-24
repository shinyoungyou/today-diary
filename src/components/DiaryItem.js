import React, { useContext } from "react";
import { DiaryDispatchContext } from "../App";
import { useNavigate } from "react-router-dom";

import MyButton from "./MyButton";
const DiaryItem = ({ id, date, time, emotion, content }) => {
  const navigate = useNavigate();

  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";

  const strDate = new Date(parseInt(date));

  let month = strDate.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }
  let day = strDate.getDate() + 1;
  if (day < 10) {
    day = `0${day}`;
  }

  const dateText = `${strDate.getFullYear()}/${month}/${day}`;

  const goDetail = () => {
    navigate(`/diary/${id}`);
  };

  const goEdit = () => {
    navigate(`/edit/${id}`);
  };

  const { onRemove, onCreate } = useContext(DiaryDispatchContext);

  const handleRemove = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      onRemove(id);
    }
    onCreate();
  };

  return (
    <div className="DiaryItem">
      <div
        onClick={goDetail}
        className={[
          "emotion_img_wrapper",
          `emotion_img_wrapper_${emotion}`,
        ].join(" ")}
      >
        <img
          src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`}
          alt=""
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

export default React.memo(DiaryItem);
