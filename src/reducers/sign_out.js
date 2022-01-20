import { getAuth, signOut } from "firebase/auth";
import { app } from "../Handle/firebase";

const sign_out = (state = null, action) => {
  const auth = getAuth(app);

  switch (action.type) {
    case "sign_out":
      signOut(auth);
      localStorage.removeItem("user_data");
      localStorage.removeItem("Token");
      window.location.reload()
      return (state = action.playload);
    default:
      return state;
  }
};

export { sign_out };
