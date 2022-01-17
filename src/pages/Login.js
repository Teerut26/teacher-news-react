import React from "react";
import Layouts from "../components/Layouts";
import Form from "../components/Login/Form";

export default function Login() {
  return (
    <>
      <Layouts>
        <div style={{ height: "100vh" }}>
          <div className="w-login-register mt-3 ">
            <div className="flex flex-col  justify-center items-center gap-4 md:gap-3">
              <div>
                <img className="w-[20.5rem]" src="/images/02.svg" alt="" />
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
