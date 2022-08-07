import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

//COMPONENTS
import MyHeader from "./components/MyHeader";
import MyButton from "./components/MyButton";

function App() {
  const env = process.env;
  env.PUBLC_URL = env.PUBLC_URL || "";
  return (
    <BrowserRouter>
      <div className="App">
        <MyHeader
          headText={"App"}
          leftChild={
            <MyButton text={"left btn"} onClick={() => alert("click left")} />
          }
          rightChild={
            <MyButton text={"right btn"} onClick={() => alert("click right")} />
          }
        />
        <h2>App.js</h2>

        <MyButton
          text={"button"}
          onClick={() => alert("click the button")}
          type={"positive"}
        />
        <MyButton
          text={"button"}
          onClick={() => alert("click the button")}
          type={"negative"}
        />
        <MyButton
          text={"button"}
          onClick={() => alert("click the button")}
          type={"default"}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/diary/:id" element={<Diary />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
