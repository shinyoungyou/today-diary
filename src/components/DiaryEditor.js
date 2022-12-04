import { useState, useEffect, useRef, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryDispatchContext } from "../App";

import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";

import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";

const DiaryEditor = ({ isEdit, originData }) => {
  // time calculator
  let Hour = new Date().getHours();
  const nowMt = new Date().getMinutes();
  const ampm = Hour >= 12 ? "PM" : "AM";
  const nowHour = Hour >= 12 ? (Hour -= 12) : Hour;
  const [time, setTime] = useState(
    // Pads the current string with string "0" until the resulting string reaches length = 2.
    `${nowHour}:${String(nowMt).padStart(2, "0")} ${ampm}`
  ); // h:m (am/pm)

  const contentRef = useRef();
  const [content, setContent] = useState("");
  const [emotion, setEmotion] = useState(3);
  const [date, setDate] = useState(getStringDate(new Date()));
  const navigate = useNavigate();

  const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);

  const handleClickEmote = useCallback((emotion) => {
    setEmotion(emotion);
  }, []);

  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    if (
      window.confirm(
        isEdit
          ? "Are you sure to edit the diary?"
          : "Are you sure to create a new diary?"
      )
    ) {
      if (!isEdit) {
        onCreate(date, time, content, emotion);
      } else {
        onEdit(originData.id, date, time, content, emotion);
      }
    }
    navigate("/", { replace: true });
  };

  const handleRemove = () => {
    if (window.confirm("Are you sure to remove the diary?")) {
      onRemove(originData.id);
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setTime(`${nowHour}:${nowMt} ${ampm}`);
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={isEdit ? "Edit diary" : "Create a new diary"}
        leftChild={<MyButton text={"< Go Back"} onClick={() => navigate(-1)} />}
        rightChild={
          isEdit && (
            <MyButton
              text={"Delete"}
              type={"negative"}
              onClick={handleRemove}
            />
          )
        }
      />
      <div className="main">
        <section>
          <h2>What day is it?</h2>
          <div className="input_box">
            <input
              className="input_date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            />
          </div>
        </section>
        <section>
          <h2>How did you feel today?</h2>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((it) => (
              <EmotionItem
                key={it.emotion_id}
                {...it}
                onClick={handleClickEmote}
                isSelected={it.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
        <section>
          <h2>How was it today?</h2>
          <div className="input_box text_wrapper">
            <textarea
              placeholder="How was it today?"
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </section>
        <section>
          <div className="control_box">
            <MyButton text={"Cancel"} onClick={() => navigate(-1)} />
            <MyButton
              text={"Complete"}
              type={"positive"}
              onClick={handleSubmit}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
