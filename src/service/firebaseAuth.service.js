import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

// Register a user with Firebase Auth and save details in Firestore
export async function signupUserWithAuth(name, email, phone, password, course = "") {
  try {
    // 1. Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // 2. Save custom fields to users collection in Firestore, with uid as doc ID
    await setDoc(doc(db, "users", user.uid), {
      name,
      email: email.toLowerCase(),
      phone,
      course,
      role: "user",
      createdAt: new Date(),
    });
    
    return { id: user.uid, name, email, role: "user" };
  } catch (error) {
    console.error("Error signing up user with Firebase Auth:", error);
    throw error;
  }
}

// Authenticate a user with Firebase Auth and retrieve details from Firestore
export async function loginUserWithAuth(email, password) {
  try {
    // 1. Authenticate with Firebase Auth
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // 2. Retrieve custom fields from Firestore doc
    const userDocRef = doc(db, "users", user.uid);
    const userDocSnap = await getDoc(userDocRef);
    
    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      return { id: user.uid, name: userData.name, email: userData.email, role: userData.role };
    } else {
      // Fallback if document doesn't exist in Firestore
      const role = email.toLowerCase() === "admin@iifn.com" ? "admin" : "user";
      return { id: user.uid, name: user.displayName || "IIFN Student", email: user.email, role };
    }
  } catch (error) {
    console.error("Error logging in user with Firebase Auth:", error);
    throw error;
  }
}

// Logout user
export async function logoutUserWithAuth() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
}
