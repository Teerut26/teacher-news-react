import React from "react";
import { connect } from "react-redux";
import Form from "../components/CreateNews/Form";
import Layouts from "../components/Layouts";
import LayoutsWithSessionCheck from "../components/LayoutsWithSessionCheck";
import LayoutTeacher from "../components/LayoutTeacher";

function CreateNews() {
  return (
    <div className="h-full">
      <LayoutsWithSessionCheck>
        <LayoutTeacher>
          <Layouts>
            <Form />
          </Layouts>
        </LayoutTeacher>
      </LayoutsWithSessionCheck>
    </div>
  );
}

export default connect((state) => {
  return state;
})(CreateNews);
