import { getAuth, onAuthStateChanged } from "firebase/auth";
import { get, getDatabase, ref } from "firebase/database";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { app } from "../Handle/firebase";

function LayoutsWithSessionCheck({ children,dispatch }) {
  const navigate = useNavigate();
  const database = getDatabase(app);

  useEffect(() => {
    if (localStorage.getItem("user_data") === null) {
      navigate("/login");
    }

    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        get(ref(database, `users/${user.uid}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              dispatch({
                type: "set_user_data",
                playload: {
                  uid: user.uid,
                  email: user.email,
                  level: snapshot.val().level,
                },
              });
            } else {
              navigate("/login");
            }
          })
          .catch((error) => {
            toast.error(error.code, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          });
      } else {
        navigate("/login");
      }
    });
  }, []);

  if (!localStorage.getItem("user_data")) {
    return <></>;
  }

  return <>{children}</>;
}

export default connect((state) => {
  return state;
})(LayoutsWithSessionCheck);
