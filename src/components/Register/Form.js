import React, { useRef } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../../Handle/firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { get, getDatabase, push, ref, set } from "firebase/database";
import { connect } from "react-redux";

function Form({ dispatch }) {
  const email = useRef(null);
  const password = useRef(null);
  const re_password = useRef(null);
  const navigate = useNavigate();
  const database = getDatabase(app);

  const submit = () => {
    if (email.current.value.length === 0 || email.current.value === null)
      return;
    if (password.current.value.length === 0 || password.current.value === null)
      return;
    if (
      re_password.current.value.length === 0 ||
      re_password.current.value === null
    )
      return;
    if (password.current.value !== re_password.current.value) return;

    const auth = getAuth(app);
    createUserWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then((result) => {
        const { user } = result;
        set(ref(database, "users/" + user.uid), {
          uid: user.uid,
          email: user.email,
          level: "m",
        }).then(() => {
          navigate("/news-lists");
        });
      })
      .catch((error) => {
        toast.error(error.code, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const google = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    auth.languageCode = "th";
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        localStorage.setItem("Token", token);

        get(ref(database, `users/${user.uid}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              dispatch({
                type: "set_user_data",
                playload: {
                  uid: user.uid,
                  email: user.email,
                  level: snapshot.val().level,
                },
              });
              navigate("/news-lists");
            } else {
              set(ref(database, "users/" + user.uid), {
                uid: user.uid,
                email: user.email,
                level: "m",
              });
              dispatch({
                type: "set_user_data",
                playload: {
                  uid: user.uid,
                  email: user.email,
                  level: "m",
                },
              });
              navigate("/news-lists");
            }
          })
          .catch((error) => {
            toast.error(error.code, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          });
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.code, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <>
      <div className="w-full">
        <form className="flex flex-col w-full gap-4 ">
          <div className="w-full ">
            <label
              className="block  tracking-wide   text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Email Address
            </label>
            <input
              ref={email}
              className="bg-gray-200 dark:bg-slate-700 appearance-none border-0 w-full py-2 px-2 rounded-[0.2rem] text-gray-700 dark:text-white leading-tight focus:outline-none"
              id="grid-first-name"
              type="email"
            />
          </div>
          <div className="w-full">
            <label
              className="block  tracking-wide   text-xs font-bold mb-2"
              htmlFor="grid-last-name"
            >
              Password
            </label>
            <input
              ref={password}
              className="bg-gray-200 dark:bg-slate-700 appearance-none border-0 w-full py-2 px-2 rounded-[0.2rem] text-gray-700 dark:text-white leading-tight focus:outline-none"
              type="password"
            />
          </div>
          <div className="w-full">
            <label
              className="block  tracking-wide   text-xs font-bold mb-2"
              htmlFor="grid-last-name"
            >
              Password
            </label>
            <input
              ref={re_password}
              className="bg-gray-200 dark:bg-slate-700 appearance-none border-0 w-full py-2 px-2 rounded-[0.2rem] text-gray-700 dark:text-white leading-tight focus:outline-none"
              type="password"
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="w-full">
              <button
                onClick={() => submit()}
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full text-white font-bold py-2 px-4 rounded"
                type="button"
              >
                Sign Up
              </button>
            </div>
            <div className="flex flex-col md:flex-row mb-3 justify-between gap-2">
              <button
                onClick={() => google()}
                className="google-bg w-full text-white font-bold py-2 px-4 rounded flex justify-center items-center gap-2"
                type="button"
              >
                <div>
                  <i className="fab text-lg fa-google "></i>
                </div>
                <div>Google Login</div>
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default connect((state) => {
  return state;
})(Form);
