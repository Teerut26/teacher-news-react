import React from "react";
import { connect } from "react-redux";
import Layouts from "./Layouts";

const Profile = ({ image_url, name, position, facebook_url }) => {
  const open_tap = () => {
    window.open(facebook_url);
  };

  return (
    <>
      <div className="flex justify-between items-center w-full profile-shadow dark:bg-sky-400/10">
        <div className="flex gap-3 items-center  w-full p-3 ">
          <div className="flex">
            <img
              className="w-[4rem] h-[4rem] rounded-full"
              src={image_url}
              alt="developer"
            />
          </div>
          <div className="flex flex-col">
            <div>{name}</div>
            <div>{position}</div>
          </div>
        </div>
        <div onClick={() => open_tap()} className="px-3 cursor-pointer">
          <i className="fab  text-4xl fa-facebook facebook-btn hover:blur-sm"></i>
        </div>
      </div>
    </>
  );
};

function Home() {
  return (
    <>
      <Layouts>
        <div className="container-sm">
          {/* <div className="container-sm home-padding "> */}
          <div
            style={{ height: "90vh" }}
            className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-3 relative "
          >
            <div className="absolute bottom-[1rem] hidden md:block animate__animated animate__bounce">
              <i className="fas text-2xl fa-chevron-down"></i>
            </div>
            <div>
              <img className="w-[20rem]" src="/images/01.svg" alt="" />
            </div>
            <div className="flex flex-col items-start gap-2 md:w-[29rem]">
              <div className="text-3xl  md:text-4xl lg:text-6xl">
                Teacher News
              </div>
              {/* <div>เว็บที่สามารถให้ครูแจ้งข่าวสารแก่นักเรียนได้ทันและรวดเร็ว</div> */}
              <div>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem
                voluptatum tenetur nemo impedit dignissimos odio voluptas a vero
                saepe, possimus quasi officiis sit amet, cumque accusamus in
                doloremque maxime deserunt.
              </div>
            </div>
          </div>
          <div className="pb-3 animate__animated animate__fadeIn">
            <div className="py-[1rem]">
              <hr />
            </div>

            <div className="flex flex-col w-full gap-2">
              <div className="self-center text-3xl">ผู้จัดทำ</div>
              <div className="flex flex-col lg:flex-row justify-between p-2 gap-3 ">
                <Profile
                  {...{
                    name: "Teerut Srithong",
                    position: "Developer",
                    image_url: "images/teerut.jpg",
                    facebook_url:
                      "https://www.facebook.com/profile.php?id=100008786231232",
                  }}
                />
                <Profile
                  {...{
                    name: "Thanawat Mato",
                    position: "Report",
                    image_url: "images/thanawat.jpg",
                    facebook_url: "https://www.facebook.com/tor.alker.9",
                  }}
                />
                <Profile
                  {...{
                    name: "Achita Intajorn",
                    position: "Report",
                    image_url: "images/achita.jpg",
                    facebook_url: "https://www.facebook.com/achita.intajorn",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Layouts>
    </>
  );
}

export default connect((state) => {
  return state;
})(Home);
