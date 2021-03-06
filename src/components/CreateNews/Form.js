import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import DropFile from "./DropFile";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "../../Handle/firebase";
import uuid from "react-uuid";
import axios from "axios";
import FormData from "form-data";

function Form({ dispatch, teacher_add_post }) {
  const title = useRef(null);
  const [Discription, setDiscription] = useState("");
  const [File, setFile] = useState(null);
  const [LinkImage, setLinkImage] = useState("");
  const storage = getStorage(app);

  const submit = (e) => {
    e.preventDefault();
    if (title.current.value.length === 0 || title.current.value === null)
      return;
    if (LinkImage.length === 0 || LinkImage === null) return;

    dispatch({
      type: "teacher_add_post",
      playload: {
        title: title.current.value,
        discription: Discription,
        link_image: LinkImage,
      },
    });

    title.current.value = "";
    setDiscription("");
    setLinkImage("");
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
    // const storageRef = ref(storage, `images/${uuid()}`);

    // uploadBytes(storageRef, File).then((snapshot) => {
    //   getDownloadURL(ref(storage, snapshot.metadata.fullPath)).then((url) => {
    //     setLinkImage(url);
    //   });
    // });
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
          Submit
        </button>
      </form>
    </div>
  );
}

export default connect((state) => {
  return state;
})(Form);
