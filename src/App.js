import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";

import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App({is_dark}) {
  return (
    <div className={is_dark ? "dark" : ""}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default connect((state) => {
  return state;
})(App);
