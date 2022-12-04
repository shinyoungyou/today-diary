import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { DiaryStateContext } from "../App";

import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";

import { emotionList } from "../util/emotion";

const Diary = () => {
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);
  const navigate = useNavigate();
  const [data, setData] = useState();

  const getStringDate = (date) => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1; // getMonth() returns from 0 -> need to add +1
    let day = date.getDate() + 1; // getMonth() returns from 1 but there is an unexpected error somewhere -> need to add +1

    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }

    // Custom date format: e.g. 2022-01-01
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `Diary ${id}`;
  }, []);

  useEffect(() => {
    if (diaryList.length >= 1) {
      // Return the first diary item in diaryList array
      // whose id is the same with Path Variable
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );
      if (targetDiary) {
        // Diary exists
        setData(targetDiary);
      } else {
        // No diary
        alert("the diary doesn't exist.");
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  if (!data) {
    return <div className="DiaryPage">loading...</div>;
  } else {
    // Return the first emotion item in emotionList array
    // whose id is the same with current emotion of the diary item
    const curEmotionData = emotionList.find(
      (it) => parseInt(it.emotion_id) === parseInt(data.emotion)
    );

    return (
      <div className="DiaryPage">
        <MyHeader
          headText={`on ${getStringDate(new Date(data.date))}`}
          leftChild={
            <MyButton text={"< Go Back"} onClick={() => navigate(-1)} />
          }
          rightChild={
            <MyButton
              text={"Edit"}
              onClick={() => navigate(`/edit/${data.id}`)}
            />
          }
        />
        <article>
          <section>
            <h2>How did you feel today?</h2>
            <div
              className={[
                "diary_img_wrapper",
                `diary_img_wrapper_${data.emotion}`,
                // create and return a new string by concatenating
                // all of the elements in this array,
                // separated by space(" ")
              ].join(" ")}
            >
              <img
                src={curEmotionData.emotion_img}
                alt={`Emotion${curEmotionData.emotion_id}`}
              />
              <div className="emotion_descript">
                {curEmotionData.emotion_descript}
              </div>
            </div>
          </section>
          <section>
            <h2>How was it today?</h2>
            <div className="diary_content_wrapper">
              <p>{data.content}</p>
            </div>
          </section>
        </article>
      </div>
    );
  }
};

export default Diary;
