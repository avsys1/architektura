import logo from "./logo.svg";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./Components/Homepage/Homepage";
import Journal from "./Components/Journal/Journal";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Homepage />} />
        <Route path="/journal/:username/:id" element={<Journal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
