// // Signup.js file
// import React, { useState } from "react";
// import { addDoc, collection, getFirestore } from "firebase/firestore";

// import { app } from "../../utils/Firebase";
// import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
// const db_fireStore = getFirestore(app);
// const auth = getAuth(app);
// const Signup = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [_admn_ve, set_Admn_ve] = useState()

//   const handleSignup = async () => {
//     try {
//       // Step 1: Create user in Firebase Authentication
//     const er =  await createUserWithEmailAndPassword(auth, email, password,_admn_ve);
//     console.log("----",er);
//     console.log("====",email, password,_admn_ve);
//     //   const user = userCredential.user;

//       // Step 2: Add user details to Firestore
//       const userDocRef = await addDoc(collection(db_fireStore, "users"), {
//         uid: Date.now(),
//         email:email,
//         password:password,
//         asign:_admn_ve
//         // Add other non-sensitive user data
//       });

//       console.log("Document written with ID: ", userDocRef);
//     } catch (error) {
//       console.error("Error during signup: ", error.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Signup</h2>
//       <input
//         type="email"
//         placeholder="Email"
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <select onChange={(e)=> set_Admn_ve(e.target.value)} value={_admn_ve}>
//         <option value="">chooese--</option>
//         <option value="admin">admin</option>
//         <option value="vendor">vendor</option>
//       </select>
//       <button onClick={handleSignup}>Sign Up</button>
//     </div>
//   );
// };

// export default Signup;


// Signup.js file

import React, { useState } from "react";
import { addDoc, collection, getFirestore } from "firebase/firestore";

import { app } from "../../utils/Firebase";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
const db_fireStore = getFirestore(app);
const auth = getAuth(app);
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState()

//   const handleSignup = async () => {
//     try {
       
// await createUserWithEmailAndPassword(auth, email, password,role)
//     .then(async(cred)=>{
//          await addDoc(collection(db_fireStore, "users"), {
//             uid: Date.now(),
//             email:email,
//             password:password,
//             role:role
//           });
//           console.log("Document written with ID: ",cred);
//      })
//     } catch (error) {
//       console.error("Error during signup: ", error.message);
//     }
//   };


const handleSignup = async () => {
    try {
       
       const cred =   await addDoc(collection(db_fireStore, "users"), {
            uid: Date.now(),
            email:email,
            password:password,
            role:role
          });
          console.log("Document written with ID: ",cred);
     }
 catch (error) {
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
      <select onChange={(e)=> setRole(e.target.value)} value={role}>
        <option value="">chooese--</option>
        <option value="admin">admin</option>
        <option value="vendor">vendor</option>
      </select>
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
};

export default Signup;
