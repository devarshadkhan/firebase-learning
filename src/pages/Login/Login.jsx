// import React, { useState } from "react";
// import "./Login.css";
// import { Firestore } from "firebase/firestore";
// // import {auth, firestore} from "../../utils/Firebase"
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import { app } from "../../utils/Firebase";
// const auth = getAuth(app);
// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const handleSignup = async () => {
//     try {
//       await createUserWithEmailAndPassword(auth, email, password);

//       // Save user data to Firestore
//       await Firestore.collection("users").add({
//         email: email,
//       });

//       console.log("User signed up successfully!");
//     } catch (error) {
//       console.error("Error signing up:", error.message);
//     }
//   };
//   return (
//     <>
//       <form onSubmit={handleSignup} method="post">
//         <div class="container">
//           <label for="uname">
//             <b>Username</b>
//           </label>
//           <input
//             type="text"
//             placeholder="Enter Username"
//             name="uname"
//             required
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           ></input>

//           <label for="psw">
//             <b>Password</b>
//           </label>
//           <input
//             type="password"
//             placeholder="Enter Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           <button type="submit">Login</button>
//         </div>
//       </form>
//     </>
//   );
// };

// export default Login;



import React, { useState } from "react";
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";

import { app } from "../../utils/Firebase";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
const db_fireStore = getFirestore(app);
const auth = getAuth(app);
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("")

//   const handleSignup = async () => {
//     try {
//      await signInWithEmailAndPassword(auth, email, password,_admn_ve)
//      .then(async(cred)=>{
//         const readDoc = doc(db_fireStore, "users")
//         const docSnap =  await getDoc(readDoc);
//           console.log("CRED",cred);
//           console.log("READDOC",docSnap);
//      })

//     //   console.log("Document written with ID: ", userDocRef);
//     } catch (error) {
//       console.error("Error during signup: ", error.message);
//     }
//   };
/*const handleLogin = async () => {
    try {
      // Use signInWithEmailAndPassword for login
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
        // console.log("wertyuio",user);
      // Use the UID to get the user's document from Firestore
      const userDocRef = doc(db_fireStore, "users", user.email);
      const userDocSnap = await getDoc(userDocRef);
        console.log("userDocSnap",userDocSnap);
        console.log("userDocRef",userDocRef);
      if (userDocSnap.exists()) {
        console.log("User document data:", userDocSnap.data());
      } else {
        console.log("User not found");
      }
    } catch (error) {
      console.error("Error during login: ", error.message);
    }
  };*/
  
//   const handleLogin = async () => {
//     try {
//     //   const userCredential = await signInWithEmailAndPassword(auth, email, password);
//     //   const user = userCredential.user;
//     //     console.log("USER",user);
//       // Use the UID to get the user's document from Firestore
//       const userDocRef = doc(db_fireStore, "users"); // Use uid here instead of email
//       const userDocSnap = await getDoc(userDocRef);
  
//       if (userDocSnap.exists()) {
//         console.log("User document data:", userDocSnap.data());
//       } else {
//         console.log("User not found");
//       }
//     } catch (error) {
//       console.error("Error during login: ", error.message);
//     }
//   };


const handleLogin = async () => {
    try {
      // Create a query to find the user with the entered email
      const q = query(collection(db_fireStore, "users"), where("email", "==", email));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        // If a user with the entered email is found
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
  
          // Now, check if the entered password matches the stored password
          if (userData.password === password && userData.role === role && userData.email === email) {
            console.log("Login successful!");
            console.log("User document data:", userData);
          }
          
           else {
            if(userData.password !== password){
                console.log("Password not match");
              }
              if(userData.role !== role){
                console.log("role not match");
              }
            if(userData.email !== email){
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
      <select onChange={(e)=> setRole(e.target.value)} value={role}>
        <option value="">chooese--</option>
        <option value="admin">admin</option>
        <option value="vendor">vendor</option>
      </select>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
