import React, { useState } from "react";
import { addDoc, collection, getDocs, getFirestore, query, where } from "firebase/firestore";
// import { hash } from "bcryptjs"; 
import { app } from "../../utils/Firebase";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
const db_fireStore = getFirestore(app);
const auth = getAuth(app);
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState();

  const handleSignup = async () => {
    try {
      const q = await getDocs(query(collection(db_fireStore, "users"), where("email", "==", email)))
      if (!q.empty) {
        // Email already exists, show an error message or take appropriate action
        console.error("Email already exists. Please use a different email.");
        return;
      }
      // const cred = await createUserWithEmailAndPassword(auth, email, password);
      const hashedPassword = await hash(password, 30);
     const cred=   await addDoc(collection(db_fireStore, "users"), {
        uid: Date.now(),
        email: email,
        password: hashedPassword,
        role: role,
      });
      console.log("Document written with ID: ", cred);
    } catch (error) {
      console.error("Error during signup: ", error.message);
    }
  };
  return (
    <div>
      <h2>Signup</h2>
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
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
};

export default Signup;
