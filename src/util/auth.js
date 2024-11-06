import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { firebaseApp } from "../firebase";

export async function login(email, password) {
  const auth = getAuth(firebaseApp);

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("Signed in as:", user.email);
    return { success: true, errorMsg: null };
  } catch (error) {
    const loginError = error.code + ": " + error.message;
    console.error(loginError);
    return { success: false, errorMsg: loginError };
  }
}

export async function logout() {
  const auth = getAuth(firebaseApp);

  try {
    await signOut(auth);
    console.log("Logged out");
    return { success: true, errorMsg: null };
  } catch (error) {
    const logoutError = error.code + ": " + error.message;
    console.error(logoutError);
    return { success: false, errorMsg: logoutError };
  }

 }
