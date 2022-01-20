import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

function NavbarStudent({ is_dark, dispatch }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const dark = () => {
    dispatch({
      type: "set_is_dark",
      playload: !is_dark,
    });
  };

  const signOut = () => {
    dispatch({
      type: "sign_out",
      playload: null,
    });
    dispatch({
      type: "set_user_data",
      playload: null,
    });
  };

  return (
    <div className="sticky top-0 z-40 backdrop-blur-md bg-white/50 dark:bg-slate-900/40">
      <nav className="border-b-2 ">
        <div className="navbar-warpper">
          <div className="flex items-center justify-between md:justify-center h-16 w-full">
            <div className="flex items-center justify-between w-full ">
              <div onClick={() => navigate("/")} className="flex text-xl">
                Teacher News
              </div>
              <div className="hidden md:block">
                <div className="flex flex-row gap-2">
                  {is_dark ? (
                    <div
                      onClick={() => dark()}
                      className=" cursor-pointer hover:bg-gray-400/20 px-3 py-2 rounded-md text-sm font-medium flex flex-row items-center gap-2"
                    >
                      <i className="fas fa-sun"></i>
                    </div>
                  ) : (
                    <div
                      onClick={() => dark()}
                      className=" cursor-pointer hover:bg-gray-400/20 px-3 py-2 rounded-md text-sm font-medium flex flex-row items-center gap-2"
                    >
                      <i className="fas fa-moon"></i>
                    </div>
                  )}
                  <div
                    onClick={() => navigate("/news-lists")}
                    className=" cursor-pointer hover:bg-gray-400/20 px-3 py-2 rounded-md text-sm font-medium flex flex-row items-center gap-2"
                  >
                    <i className="bx bxs-news text-lg"></i>
                    ข่าว
                  </div>
                  <div
                    onClick={() => signOut()}
                    className="bg-red-500 cursor-pointer text-white hover:bg-red-500/80 px-3 py-2 rounded-md text-sm font-medium flex flex-row items-center gap-2"
                  >
                    <i className="fas fa-sign-out-alt"></i>
                    Sign Out
                  </div>
                </div>
              </div>
            </div>
            <div className="flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className=" inline-flex items-center justify-center p-2 rounded-md text-gray-400  focus:outline-none  focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div className="md:hidden" id="mobile-menu">
              <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {is_dark ? (
                  <div
                    onClick={() => dark()}
                    className=" cursor-pointer hover:bg-gray-400/20 px-3 py-2 rounded-md text-sm font-medium flex flex-row items-center gap-2"
                  >
                    <i className="fas fa-sun"></i>
                    <div>Dark</div>
                  </div>
                ) : (
                  <div
                    onClick={() => dark()}
                    className=" cursor-pointer hover:bg-gray-400/20 px-3 py-2 rounded-md text-sm font-medium flex flex-row items-center gap-2"
                  >
                    <i className="fas fa-moon"></i>
                    <div>White</div>
                  </div>
                )}
                <div
                  onClick={() => navigate("/news-lists")}
                  className=" cursor-pointer hover:bg-gray-400/20 px-3 py-2 rounded-md text-sm font-medium flex flex-row items-center gap-2"
                >
                  <i className="bx bxs-news text-lg"></i>
                  ข่าว
                </div>
                <div
                  onClick={() => signOut()}
                  className="bg-red-500 cursor-pointer text-white hover:bg-red-500/80 px-3 py-2 rounded-md text-sm font-medium flex flex-row items-center gap-2"
                >
                  <i className="fas fa-sign-out-alt"></i>
                  Sign Out
                </div>
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </div>
  );
}

export default connect((state) => {
  return state;
})(NavbarStudent);
