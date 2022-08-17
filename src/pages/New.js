import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";

const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};

const New = () => {
  console.log(getStringDate(new Date()));
  const [date, setDate] = useState();
  const navigate = useNavigate();
  return (
    <div>
      <MyHeader
        headText={"Write a New Diary"}
        leftChild={<MyButton text={"< Go Back"} onClick={() => navigate(-1)} />}
      />
      <div>
        <section>
          <h4>What day is it?</h4>
          <div className="input-box">
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default New;
