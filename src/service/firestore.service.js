import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, query, where, serverTimestamp } from "firebase/firestore";

// Add new enquiry to Firestore (collection: enquary)
export async function addEnquiry(data) {
  try {
    const docRef = await addDoc(collection(db, "enquary"), {
      ...data,
      role: "user",
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding enquiry: ", error);
    throw error;
  }
}

// Add new enrollment to Firestore (collection: enrollment)
export async function addEnrollment(data) {
  try {
    const docRef = await addDoc(collection(db, "enrollment"), {
      ...data,
      role: "user",
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding enrollment: ", error);
    throw error;
  }
}

// Register a new user in Firestore (collection: users)
export async function signupUser(name, email, phone, password, course = "") {
  try {
    // Check if email already exists
    const q = query(collection(db, "users"), where("email", "==", email.toLowerCase()));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      throw new Error("Email already registered.");
    }

    const docRef = await addDoc(collection(db, "users"), {
      name,
      email: email.toLowerCase(),
      phone,
      password,
      course,
      role: "user",
      createdAt: serverTimestamp(),
    });
    return { id: docRef.id, name, email, role: "user" };
  } catch (error) {
    console.error("Error signing up user: ", error);
    throw error;
  }
}

// Authenticate a user from Firestore (collection: users)
export async function loginUser(email, password) {
  try {
    // Temporary bypass for admin login
    // if (email.toLowerCase() === "admin@iifn.com" && password === "admin123") {
    //   return { id: "admin-bypass", name: "IIFN Admin", email: "admin@iifn.com", role: "admin" };
    // }
    const q = query(
      collection(db, "users"),
      where("email", "==", email.toLowerCase()),
      where("password", "==", password)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      throw new Error("Invalid email or password.");
    }
    
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
    return { id: userDoc.id, name: userData.name, email: userData.email, role: userData.role };
  } catch (error) {
    console.error("Error logging in user: ", error);
    throw error;
  }
}

// Fetch all enquiries from Firestore (collection: enquary)
export async function getEnquiries() {
  try {
    const querySnapshot = await getDocs(collection(db, "enquary"));
    const list = [];
    querySnapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() });
    });
    return list;
  } catch (error) {
    console.error("Error fetching enquiries: ", error);
    throw error;
  }
}

// Fetch all enrollments from Firestore (collection: enrollment)
export async function getEnrollments() {
  try {
    const querySnapshot = await getDocs(collection(db, "enrollment"));
    const list = [];
    querySnapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() });
    });
    return list;
  } catch (error) {
    console.error("Error fetching enrollments: ", error);
    throw error;
  }
}

// Fetch all registered users from Firestore (collection: users)
// Returns only name and email for safety as requested
export async function getUsers() {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    const list = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      list.push({ id: doc.id, name: data.name, email: data.email });
    });
    return list;
  } catch (error) {
    console.error("Error fetching users: ", error);
    throw error;
  }
}
