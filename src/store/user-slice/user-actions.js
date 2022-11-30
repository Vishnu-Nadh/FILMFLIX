import { async } from "@firebase/util";
import {
  collection,
  setDoc,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import db from "../../firebase-config";

export const createNewUserData = async (userId, email) => {
  const userData = {
    email: email,
    watchlist: [],
  };
  try {
    await setDoc(doc(db, "users", `${userId}`), userData);
  } catch (error) {
    console.error(error);
  }
};









