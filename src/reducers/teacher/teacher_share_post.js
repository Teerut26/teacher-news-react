import { getAuth, onAuthStateChanged } from "firebase/auth";
import { get, getDatabase, push, ref } from "firebase/database";
import { toast } from "react-toastify";
import { app } from "../../Handle/firebase";

const database = getDatabase(app);
const auth = getAuth(app);

const createExpiryUnix = (hours = 24) => (new Date(Date.now() + 1000 * 60 * 60 * hours)).getTime();

const teacher_share_post = (state = null, action) => {
  switch (action.type) {
    case "teacher_share_post":
      onAuthStateChanged(auth, (user) => {
        if (user) {
          get(ref(database, `users/${user.uid}`)).then((snapshot) => {
            if (snapshot.exists()) {
              if (snapshot.val().level === "a") {
                push(ref(database, `news-temp`), {
                  ...action.playload,
                  timestamp: new Date().toISOString(),
                  exprie:createExpiryUnix(),
                  display_name: user.displayName,
                  owner_uid: user.uid,
                });

                toast.success(`share post success.`, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
                return null
              }
            }
          });
        }
      });

      return null
    default:
      return state;
  }
};

export { teacher_share_post };
