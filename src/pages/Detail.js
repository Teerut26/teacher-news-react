import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layouts from "../components/Layouts";
import LayoutsWithSessionCheck from "../components/LayoutsWithSessionCheck";
import { app } from "../Handle/firebase";
import * as timeago from "timeago.js";
import _ from "lodash";
export default function Detail() {
  const [Detail, setDetail] = useState(null);

  let { id } = useParams();
  const database = getDatabase(app);
  useEffect(() => {
    const starCountRef = ref(database, `news/${id}`);
    onValue(starCountRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setDetail(data);
      }
    });
  }, []);

  const TimeCover = (timestamp) => {
    const date = new Date(timestamp);

    const result = date.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
      hour:"numeric",
      minute:"numeric",
      second:"numeric"
    });

    return result;
  };

  return (
    <>
      <LayoutsWithSessionCheck>
        <Layouts>
          {Detail !== null ? (
            <div className="container py-3 flex flex-col gap-3">
              <div className="text-3xl">{Detail.title}</div>
              <div className="text-sm">{TimeCover(Detail.timestamp)} ({timeago.format(new Date(Detail.timestamp))})</div>
              <hr></hr>
              <div className="text-lg">{Detail.discription}</div>
            </div>
          ) : (
            ""
          )}
        </Layouts>
      </LayoutsWithSessionCheck>
    </>
  );
}
