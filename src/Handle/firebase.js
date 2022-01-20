import { initializeApp } from "firebase/app";
const app = initializeApp(JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG));
export { app };
