import { child, get, getDatabase, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layouts from "../components/Layouts";
import { app } from "../Handle/firebase";

export default function NewsTemp() {
  const [Detail, setDetail] = useState(null);
  const [HasNotNews, setHasNotNews] = useState(false);

  const { id } = useParams();
  const database = getDatabase(app);

  const checkExpired = (unix) => unix < Date.now();

  const open_tap = (url) => {
    window.open(url);
  };

  useEffect(() => {
    const starCountRef = ref(database);
    get(child(starCountRef, `news-temp/${id}`)).then((snapshot) => {
      if (snapshot.exists()) {
        if (!checkExpired(snapshot.val().exprie)) {
          setDetail(snapshot.val());
        } else {
          setHasNotNews(true);
        }
      } else {
        setHasNotNews(true);
      }
    });
  }, [id]);

  return (
    <>
      <Layouts>
        {Detail !== null ? (
          <div className="container py-3 flex flex-col gap-3">
            <div className=" md:h-[35rem] overflow-y-auto ">
              <img
                className="object-cover w-full rounded-lg"
                src={Detail.link_image}
                alt=""
              />
            </div>
            <div className="text-5xl mt-0 md:mt-5 self-center">
              {Detail.title}
            </div>
            <div className="flex gap-3  self-center">
              <div className="flex gap-1">
                <div>
                  <i class="bx bxs-user"></i>
                </div>
                <div>{Detail.display_name}</div>
              </div>
              <div className="flex gap-1 ">
                <div>
                  <i class="bx bx-calendar"></i>
                </div>
                <div>
                  {new Date(Detail.timestamp).toLocaleDateString("th-TH")}
                </div>
              </div>
            </div>
            <hr></hr>
            <div className="text-lg">
              <div dangerouslySetInnerHTML={{ __html: Detail.discription }} />
            </div>

            <hr></hr>

            <div className="w-full flex flex-col sm:flex-row justify-center items-center sm:justify-between text-center">
              <div>Copyright {new Date().getFullYear()} Teacher News</div>
              <div className="flex gap-2 ">
                <i
                  onClick={() =>
                    open_tap(
                      "https://www.facebook.com/profile.php?id=100008786231232"
                    )
                  }
                  class="fab text-2xl fa-facebook-square"
                ></i>
                <i
                  onClick={() =>
                    open_tap("https://www.instagram.com/teerut_1t/")
                  }
                  class="fab text-2xl fa-instagram-square"
                ></i>
              </div>
            </div>
          </div>
        ) : HasNotNews ? (
          <div className="my-5 flex justify-center text-3xl">
            <div>ไม่พบข่าว</div>
          </div>
        ) : (
          ""
        )}
      </Layouts>
    </>
  );
}
