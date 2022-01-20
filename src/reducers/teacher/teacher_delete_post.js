import { getAuth, onAuthStateChanged } from "firebase/auth";
import { get, getDatabase, push, ref, remove } from "firebase/database";
import { toast } from "react-toastify";
import { app } from "../../Handle/firebase";

const database = getDatabase(app);
const auth = getAuth(app);

const teacher_delete_post = (state = null, action) => {
  switch (action.type) {
    case "teacher_delete_post":
      onAuthStateChanged(auth, (user) => {
        if (user) {
          get(ref(database, `users/${user.uid}`)).then((snapshot) => {
            if (snapshot.exists()) {
              if (snapshot.val().level === "a") {
                remove(ref(database, `news/${action.playload}`));
                toast.success(`Delete post success.`, {
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

export { teacher_delete_post };
