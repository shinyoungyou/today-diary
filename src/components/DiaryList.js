import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";
import DiaryItem from "./DiaryItem";

const sortOptionList = [
  { value: "latest", name: "Order of latest" },
  { value: "oldest", name: "Order of oldest" },
];

const filterOptionList = [
  { value: "all", name: "All of feelings" },
  { value: "good", name: "Good feelings only" },
  { value: "bad", name: "Bad feelings only" },
];

// Optimization: Avoid ControlMenu re-rendering
// React.memo(HOC, higher-order component): Reusing component logic
const ControlMenu = React.memo(({ value, onChange, optionList }) => {
  return (
    <select
      className="ControlMenu"
      value={value}
      // Don't need to use the useCallback function
      // Because onChange = State Change function
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
});

const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState("latest");
  const [filter, setFilter] = useState("all");

  const getProcessedDiaryList = () => {
    const compare = (a, b) => {
      if (sortType === "latest") {
        // Sort elements in Descending Order
        return parseInt(b.id) - parseInt(a.id);
      } else {
        // Sort elements in Ascending Order
        return parseInt(a.id) - parseInt(b.id);
      }
    };

    const filterCallBack = (item) => {
      if (filter === "good") {
        // Return array of Only Good feelings
        return parseInt(item.emotion) <= 3;
      } else {
        // Return array of Only Bad feelings
        return parseInt(item.emotion) > 3;
      }
    };

    // copyList: a Deep Copy of diaryList whose properties do not share the same references
    // copyList do not reflect in the original object.
    const copyList = JSON.parse(JSON.stringify(diaryList));
    const filteredList =
      filter === "all" ? copyList : copyList.filter((it) => filterCallBack(it));
    const sortedList = filteredList.sort(compare);
    return sortedList;
  };
  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            value={sortType}
            // onChange = State Change function
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={filter}
            // onChange = State Change function
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className="bottom_col">
          <MyButton
            type={"positive"}
            text={"New Diary"}
            onClick={() => navigate("/new")}
          />
        </div>
      </div>
      <div className="ItemWrapper">
        {getProcessedDiaryList().map((it) => (
          <DiaryItem key={it.id} {...it} />
        ))}
      </div>
    </div>
  );
};

// If user visits first or didn't create any diary at all,
// empty array is passed.
DiaryList.defaultProps = {
  diaryList: [],
};
export default DiaryList;
