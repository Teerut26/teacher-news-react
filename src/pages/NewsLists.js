import React, { useEffect, useState } from "react";
import Layouts from "../components/Layouts";
import "boxicons/css/boxicons.min.css";
import { connect } from "react-redux";
import LayoutsWithSessionCheck from "../components/LayoutsWithSessionCheck";
import { getDatabase, onValue, ref } from "firebase/database";
import { app } from "../Handle/firebase";
import * as timeago from "timeago.js";
import _ from "lodash";
import { useNavigate } from "react-router-dom";

let locale = function (number, index, totalSec) {
  // number: the time ago / time in number;
  // index: the index of array below;
  // totalSec: total seconds between date to be formatted and today's date;
  return [
    ["ตอนนี้", "right now"],
    ["%s วินาทีที่แล้ว", "in %s seconds"],
    ["1 นาทีที่แล้ว", "in 1 minute"],
    ["%s นาทีที่แล้ว", "in %s minutes"],
    ["1 ชั่วโมงที่แล้ว", "in 1 hour"],
    ["%s ชั่วโมงที่แล้ว", "in %s hours"],
    ["1 วันที่ผ่านมา", "in 1 day"],
    ["%s วันที่ผ่านมา", "in %s days"],
    ["1 อาทิตย์ที่แล้ว", "in 1 week"],
    ["%s อาทิตย์ที่แล้ว", "in %s weeks"],
    ["1 เดือนที่แล้ว", "in 1 month"],
    ["%s เดือนที่แล้ว", "in %s months"],
    ["1 ปีที่แล้ว", "in 1 year"],
    ["%s ปีที่แล้ว", "in %s years"],
  ][index];
};

timeago.register("th_TH", locale);

const News = ({ title, display_name, timestamp, link_image, prop }) => {
  const navigate = useNavigate();
  const [, setTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      onClick={() => navigate(`/detail/${prop}`)}
      className="w-full sm:w-96 h-96 flex flex-col example-enter cursor-pointer border-b-2 border-gray-500"
    >
      <div className="w-full">
        <img
          className="object-cover h-[16rem] w-full rounded-lg "
          src={link_image}
          alt=""
        />
      </div>
      <div className="flex flex-col py-3 ">
        <div className="text-xl font-bold">{title}</div>
        <div className="text-md">{timeago.format(timestamp, "th_TH")}</div>
      </div>
    </div>
  );
};

function NewsLists({}) {
  const [NewsList, setNewsList] = useState([]);
  const [NewsListSearch, setNewsListSearch] = useState([]);
  const [Word, setWord] = useState("");

  const database = getDatabase(app);
  useEffect(() => {
    const starCountRef = ref(database, "news/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const result = _.map(data, (value, prop) => ({ prop, ...value }));
      setNewsList(result);
    });
  }, []);

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
                NewsList.length === 1 || NewsList.length === 0 ? "h-screen" : ""
              }`}
            >
              {NewsList.length !== 0
                ? NewsListSearch.map((item, index) => (
                    <News {...item} key={index} />
                  ))
                : ""}
            </div>
          </div>
        </Layouts>
      </LayoutsWithSessionCheck>
    </>
  );
}

export default connect((state) => {
  return state;
})(NewsLists);
