import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import "react-toastify/dist/ReactToastify.css";
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.core.css';

import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import NewsLists from "./pages/NewsLists";
import MyNews from "./pages/MyNews";
import CreateNews from "./pages/CreateNews"
import Detail from "./pages/Detail";

function App({ is_dark, user_data }) {
  return (
    <div className={is_dark ? "dark" : ""}>
      <div className="dark:bg-slate-900 dark:text-gray-50 h-full">
        <ToastContainer />
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/news-lists" element={<NewsLists />} />
            <Route exact path="/detail/:id" element={<Detail />} />
            <Route exact path="/my-news" element={<MyNews />} />
            <Route exact path="/create-news" element={<CreateNews />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default connect((state) => {
  return state;
})(App);
