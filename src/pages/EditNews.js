import { child, get, getDatabase, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import Form from "../components/EditNews/Form";

import Layouts from "../components/Layouts";
import LayoutsWithSessionCheck from "../components/LayoutsWithSessionCheck";
import LayoutTeacher from "../components/LayoutTeacher";
import { app } from "../Handle/firebase";

function EditNews() {
  const [Detail, setDetail] = useState(null);
  let { id } = useParams();
  const database = getDatabase(app);

  useEffect(() => {
    const starCountRef = ref(database);
    get(child(starCountRef, `news/${id}`)).then((snapshot) => {
      if (snapshot.exists()) {
        setDetail({ ...snapshot.val(), id });
      }
    });
  }, [id]);

  return (
    <div className="h-full">
      <LayoutsWithSessionCheck>
        <LayoutTeacher>
          <Layouts>{Detail !== null ? <Form {...Detail} /> : ""}</Layouts>
        </LayoutTeacher>
      </LayoutsWithSessionCheck>
    </div>
  );
}

export default connect((state) => {
  return state;
})(EditNews);
