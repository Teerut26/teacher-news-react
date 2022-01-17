import React from "react";

export default function Form() {
  return (
    <>
      <form className="w-full">
        <div className="flex flex-col w-full gap-4">
          <div className="w-full ">
            <label
              className="block  tracking-wide  text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Email Address
            </label>
            <input
              className=" block w-full dark:bg-slate-800 dark:text-white border-2 rounded py-2 px-4  leading-tigh"
              id="grid-first-name"
              type="text"
            />
          </div>
          <div className="w-full">
            <label
              className="block  tracking-wide  text-xs font-bold mb-2"
              htmlFor="grid-last-name"
            >
              Password
            </label>
            <input
              className=" block w-full dark:bg-slate-800 dark:text-white border-2 rounded py-2 px-4 leading-tigh "
              type="text"
            />
          </div>
          <div className="w-full">
            <label
              className="block  tracking-wide  text-xs font-bold mb-2"
              htmlFor="grid-last-name"
            >
              Re-Password
            </label>
            <input
              className=" block w-full dark:bg-slate-800 dark:text-white border-2 rounded py-2 px-4 leading-tigh "
              type="text"
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="w-full">
              <button
                className=" bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full text-white font-bold py-2 px-4 rounded"
                type="button"
              >
                Sign Up
              </button>
            </div>
            <div className="flex flex-col md:flex-row mb-3 justify-between gap-2">
              <button
                className="facebook-bg w-full text-white font-bold py-2 px-4 rounded flex justify-center items-center gap-2"
                type="button"
              >
                <div>
                  <i className="fab text-lg fa-facebook-f "></i>
                </div>
                <div>Facebook Login</div>
              </button>
              <button
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
        </div>
      </form>
    </>
  );
}
