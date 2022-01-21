import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import uuid from "react-uuid";
import { app } from "../../Handle/firebase";
import ReactQuill from "react-quill";
import DropFile from "./DropFile";
import { connect } from "react-redux";
import axios from "axios";
import FormData from "form-data";

function Form({
  discription,
  link_image,
  title,
  id,
  dispatch,
}) {
  const [Title, setTitle] = useState(title);
  const [Discription, setDiscription] = useState(discription);
  const [File, setFile] = useState(null);
  const [LinkImage, setLinkImage] = useState(link_image);
  const storage = getStorage(app);

  const Submit = (e) => {
    e.preventDefault();
    dispatch({
      type: "teacher_edit_post",
      playload: {
        id,
        data: {
          title: Title,
          discription: Discription,
          link_image: LinkImage,
        },
      },
    });
  };

  const upload_file = async () => {
    if (File === null) return;

    let form_data = new FormData();
    form_data.append("attachments", File);

    let { data } = await axios({
      method: "post",
      url: process.env.REACT_APP_DISCORD_WEBHOOK_URL,
      data: form_data,
    });

    setLinkImage(data.attachments[0].url);
  };

  return (
    <div className="flex container justify-center h-screen">
      <form onSubmit={Submit} className="w-full md:w-[50rem] mt-5">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            หัวข้อข่าว
          </label>
          <input
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
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
            ></ReactQuill>
          </div>
        </div>

        <div className="mb-3 flex flex-col">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Image URL
          </label>
          <input
            value={LinkImage}
            onChange={(e) => setLinkImage(e.target.value)}
            type="text"
            className="bg-gray-200 dark:bg-slate-700 appearance-none border-0 w-full py-2 px-2 rounded-[0.2rem] text-gray-700 dark:text-white leading-tight focus:outline-none"
          />
          <div className="mt-2 flex gap-2">
            <div className="w-full">
              <DropFile onDropFile={(file) => setFile(file)} />
            </div>
            <button
              onClick={() => upload_file()}
              type="button"
              className="btn btn-primary rounded-[0.2rem] "
            >
              Upload
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary rounded-[0.2rem] w-full"
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default connect((item) => {
  return item;
})(Form);
