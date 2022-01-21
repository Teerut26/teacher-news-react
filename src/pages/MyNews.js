import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Layouts from "../components/Layouts";
import LayoutsWithSessionCheck from "../components/LayoutsWithSessionCheck";
import LayoutTeacher from "../components/LayoutTeacher";
import { app } from "../Handle/firebase";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import * as timeago from "timeago.js";

const News = ({
  title,
  display_name,
  timestamp,
  link_image,
  prop,
  dispatch,
}) => {
  const navigate = useNavigate();

  const [, setTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const delete_post = () => {
    dispatch({
      type: "teacher_delete_post",
      playload: prop,
    });
  };

  return (
    <div className="w-full sm:w-96 h-96 flex flex-col border-2 example-enter cursor-pointer relative">
      <div
        onClick={() => navigate("/edit/" + prop)}
        className="absolute flex justify-center rounded-bl-lg text-white end-0 top-0 bg-gray-500 w-[1.5rem] h-[1.5rem]"
      >
        <p>
          <i class="bx bxs-pencil"></i>
        </p>
      </div>
      <div
        onClick={() => delete_post()}
        className="absolute flex justify-center rounded-br-lg text-white start-0 top-0 bg-red-500 w-[1.5rem] h-[1.5rem]"
      >
        <p>X</p>
      </div>
      <div onClick={() => navigate(`/detail/${prop}`)} className="w-full">
        <img
          className="object-cover h-[16rem] w-full"
          src={link_image}
          alt=""
        />
      </div>
      <div className="flex flex-col h-100 ">
        <div className="flex justify-between mx-2 mt-2 ">
          <div>By {display_name}</div>
          <div>{timeago.format(timestamp, "th_TH")}</div>
        </div>
        <div className="flex items-center m-2 h-100">{title}</div>
      </div>
    </div>
  );
};

function MyNews({ user_data, dispatch }) {
  const [NewsList, setNewsList] = useState([]);
  const [NewsListSearch, setNewsListSearch] = useState([]);
  const [Word, setWord] = useState("");
  const database = getDatabase(app);

  useEffect(() => {
    if (user_data === null) return;
    const starCountRef = ref(database, "news/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const result = _.map(data, (value, prop) => ({ prop, ...value })).filter(
        (item) => item.owner_uid === user_data.uid
      );
      setNewsList(result);
    });
  }, [user_data]);

  useEffect(() => {
    setNewsListSearch(NewsList);
    SearchFnc();
  }, [NewsList]);

  const SearchFnc = () => {
    if (Word.length === 0) setNewsListSearch(NewsList);

    let result = NewsList.filter((item) =>
      item.title.toLocaleLowerCase().match(Word.toLocaleLowerCase())
    );
    setNewsListSearch(result);
  };

  useEffect(() => {
    SearchFnc();
  }, [Word]);

  return (
    <>
      <LayoutsWithSessionCheck>
        <LayoutTeacher>
          <Layouts>
            <div className="pb-3">
              <div className="flex w-full justify-center sticky top-[4.1rem] z-40">
                <div className="my-3">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-2 flex flex-col justify-center">
                      <i className="bx bx-sm bx-search dark:text-gray-300 text-slate-800"></i>
                    </div>
                    <input
                      className="bg-gray-200 text-center dark:bg-slate-800 appearance-none border-0 rounded-[0.5rem] w-full py-2 px-4 text-gray-700 dark:text-white leading-tight focus:outline-none  focus:border-purple-500"
                      type="text"
                      placeholder="ค้นหาข่าว"
                      onChange={(e) => setWord(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div
                className={`flex flex-col w-full items-center gap-4 px-2 ${
                  NewsList.length === 1 || NewsList.length === 0
                    ? ""
                    : "flex-col-reverse"
                } ${
                  NewsList.length === 1 || NewsList.length === 0
                    ? "h-screen"
                    : ""
                }`}
              >
                {NewsList.length !== 0
                  ? NewsListSearch.map((item, index) => (
                      <News {...item} dispatch={dispatch} key={index} />
                    ))
                  : ""}
              </div>
            </div>
          </Layouts>
        </LayoutTeacher>
      </LayoutsWithSessionCheck>
    </>
  );
}

export default connect((state) => {
  return state;
})(MyNews);
