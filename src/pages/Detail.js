import { getAuth, onAuthStateChanged } from "firebase/auth";
import { get, getDatabase, onValue, push, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Layouts from "../components/Layouts";
import LayoutsWithSessionCheck from "../components/LayoutsWithSessionCheck";
import { app } from "../Handle/firebase";

export default function Detail() {
  const [Detail, setDetail] = useState(null);

  let { id } = useParams();
  const database = getDatabase(app);
  const auth = getAuth(app);

  useEffect(() => {
    const starCountRef = ref(database, `news/${id}`);
    onValue(starCountRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setDetail(data);
      }
    });
  }, []);

  const open_tap = (url) => {
    window.open(url);
  };

  const createExpiryUnix = (hours = 24) =>
    new Date(Date.now() + 1000 * 60 * 60 * hours).getTime();

  const share = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        get(ref(database, `users/${user.uid}`)).then((snapshot) => {
          if (snapshot.exists()) {
            push(ref(database, `news-temp`), {
              ...Detail,
              timestamp: new Date().toISOString(),
              exprie: createExpiryUnix(),
            }).then((snap) => {
              navigator.clipboard.writeText(
                `${process.env.REACT_APP_NEWS_TEMP_PATH}${snap.key}`
              );
              toast.success(`coppy to clipboard success.`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            });
          }
        });
      }
    });
  };

  return (
    <>
      <LayoutsWithSessionCheck>
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
                <div
                  onClick={() => share()}
                  className="flex gap-1 cursor-pointer"
                >
                  <div>
                    <i class="fas fa-share-square"></i>
                  </div>
                  <div>แชร์</div>
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
          ) : (
            ""
          )}
        </Layouts>
      </LayoutsWithSessionCheck>
    </>
  );
}
