import logo from "./logo.svg";
import "./App.css";
import Login from "./Components/Login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  </BrowserRouter>;
}

export default App;
