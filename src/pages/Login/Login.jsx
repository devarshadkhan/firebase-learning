import React, { useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

import { app } from "../../utils/Firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
const db_fireStore = getFirestore(app);
const auth = getAuth(app);
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleLogin = async () => {
    try {
      // Create a query to find the user with the entered email
      const q = query(
        collection(db_fireStore, "users"),
        where("email", "==", email)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // If a user with the entered email is found
        querySnapshot.forEach((doc) => {
          const userData = doc.data();

          // Now, check if the entered password matches the stored password
          if (
            userData.password === password &&
            userData.role === role &&
            userData.email === email
          ) {
            console.log("Login successful!");
            console.log("User document data:", userData);
          } else {
            if (userData.password !== password) {
              console.log("Password not match");
            }
            if (userData.role !== role) {
              console.log("role not match");
            }
            if (userData.email !== email) {
              console.log("email not match");
            }
            // console.log("Invalid email, password, or role. ");
          }
        });
      } else {
        console.log("All Feilds are required");
      }
    } catch (error) {
      console.error("Error during login: ", error.message);
    }
  };
  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <select onChange={(e) => setRole(e.target.value)} value={role}>
        <option value="">chooese--</option>
        <option value="admin">admin</option>
        <option value="vendor">vendor</option>
      </select>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
