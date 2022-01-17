import React, { useState } from "react";
import { Transition } from "@headlessui/react";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <nav className="bg-white border-b-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-[10rem] lg:px-[20rem]">
          <div className="flex items-center justify-between md:justify-center h-16 w-full">
            <div className="flex items-center justify-between w-full ">
              <div className="flex">Teacher News</div>
              <div className="hidden md:block">
              <div className="flex flex-row gap-10 ">
                <div className="flex">เข้าสูระบบ</div>
                <div className="flex">สมัครสมาชิก</div>
              </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
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
                <div className=" hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex flex-row items-center gap-1">
                  <i className="fas fa-shopping-basket text-gray-300"></i>
                  <div className="text-gray-300">หมวดหมู่สินค้า</div>
                </div>

                <div className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex flex-row items-center gap-1">
                  <i className="fas fa-shopping-cart text-gray-300"></i>
                  <div className="text-gray-300">ซื้อ Robux</div>
                </div>

                <div className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex flex-row items-center gap-1">
                  <i className="fas fa-sign-in-alt text-gray-300"></i>
                  <div className="text-gray-300">เข้าสู่ระบบ</div>
                </div>

                <div className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex flex-row items-center gap-1">
                  <i className="fas fa-user-plus text-gray-300"></i>
                  <div className="text-gray-300">สมัครสมาชิก</div>
                </div>
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </div>
  );
}

export default Nav;
