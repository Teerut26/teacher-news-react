import React from "react";
import Layouts from "../components/Layouts";
import Form from "../components/Register/Form";

export default function Register() {
  return (
    <>
      <Layouts>
        <div style={{ height: "100vh" }}>
          <div className="w-login-register mt-3">
            <div className="flex flex-col  justify-center items-center gap-4 md:gap-3">
              <div>
                <img className="w-[12rem]" src="/images/03.svg" alt="" />
              </div>
              <div className="w-full">
                <Form />
              </div>
            </div>
          </div>
        </div>
      </Layouts>
    </>
  );
}
