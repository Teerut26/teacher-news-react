import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import ReactQuill from "react-quill";

function Form({ dispatch, teacher_add_post }) {
  const title = useRef(null);
  const [Discription, setDiscription] = useState("");
  const link_image = useRef(null);

  const submit = (e) => {
    e.preventDefault();
    if (title.current.value.length === 0 || title.current.value === null)
      return;
    // if (discription.current.value.length === 0 || discription.current.value === null) return;
    if (
      link_image.current.value.length === 0 ||
      link_image.current.value === null
    )
      return;

    dispatch({
      type: "teacher_add_post",
      playload: {
        title: title.current.value,
        discription: Discription,
        link_image: link_image.current.value,
      },
    });

    title.current.value = "";
    setDiscription("");
    link_image.current.value = "";
  };

  return (
    <div className="flex container justify-center h-screen">
      <form onSubmit={submit} className="w-full md:w-[50rem] mt-5">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            หัวข้อข่าว
          </label>
          <input
            ref={title}
            type="text"
            className="bg-gray-200 dark:bg-slate-700 appearance-none border-0 w-full py-2 px-2 rounded-[0.2rem] text-gray-700 dark:text-white leading-tight focus:outline-none"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            รายละเอียด
          </label>
          <div className="">
            <ReactQuill
              theme="snow"
              value={Discription}
              onChange={(e) => setDiscription(e)}
            >
            </ReactQuill>
          </div>

          {/* <textarea
            ref={discription}
            type="text"
            className="bg-gray-200 dark:bg-slate-700 appearance-none border-0 w-full py-2 px-2 h-[10rem] rounded-[0.2rem] text-gray-700 dark:text-white leading-tight focus:outline-none"
            id="exampleInputPassword1"
          /> */}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Image URL
          </label>
          <input
            ref={link_image}
            type="url"
            className="bg-gray-200 dark:bg-slate-700 appearance-none border-0 w-full py-2 px-2 rounded-[0.2rem] text-gray-700 dark:text-white leading-tight focus:outline-none"
            id="exampleInputPassword1"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary rounded-[0.2rem] w-full"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default connect((state) => {
  return state;
})(Form);
