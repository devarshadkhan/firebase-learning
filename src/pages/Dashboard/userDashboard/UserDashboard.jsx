// import React, { useEffect, useState } from 'react'
// import { addDoc, collection, doc, getDoc, getDocs, getFirestore } from "firebase/firestore";
// import { app } from '../../../utils/Firebase';
// const db_fireStore = getFirestore(app);
// const UserDashboard = () => {
//   const [data,setData] = useState([])
//   const [disabled,setDisabled] = useState(true)
//   console.log(data);
//   const res = async ()=>{
//     // yeh firestore se data get karne ke liye hai
//     const productsCollection = collection(db_fireStore, 'products');
//     await getDocs(productsCollection).then((res)=>{
//       const productsData = [];
//         res.forEach((doc) => {
//           productsData.push({ id: doc.id, ...doc.data() });
//         });
//         setData(productsData);
//     })
//   }
//   const handleClicked = async (item)=>{
//     try {
//       const cred = await addDoc(collection(db_fireStore, "buy-products"), item);
//       console.log("Document written with ID: ", cred);
//     } catch (error) {
//       console.error("Error during signup: ", error.message);
//     }

//   }


//   useEffect(() => {
//    res()
//   }, []);
//   return (
//     <>
//         <h1>Welcome to our User Dashboard</h1>
        
//           <ul>
//             {data?.map((item)=>{
//               return (
//                 <>
//                   <li>{item.name}</li>
//                   <button onClick={()=>handleClicked({...item})} >buy products</button>
//                 </>
//               )
//             })}
//           </ul>
        
//     </>
//   )
// }

// export default UserDashboard

/*NEXT===*/ 
// import React, { useEffect, useState } from 'react';
// import { addDoc, collection, doc, getDoc, getDocs, getFirestore, serverTimestamp } from 'firebase/firestore';
// import { app } from '../../../utils/Firebase';

// const db_fireStore = getFirestore(app);

// const UserDashboard = () => {
//   const [data, setData] = useState([]);
//   const [disabledButtons, setDisabledButtons] = useState({});
//   console.log(data);

//   // const res = async () => {
//   //   try {
//   //     const productsCollection = collection(db_fireStore, 'products');
//   //     const querySnapshot = await getDocs(productsCollection);

//   //     const productsData = [];
//   //     querySnapshot.forEach((doc) => {
//   //       productsData[doc.id] = { id: doc.id, ...doc.data() };
//   //     });

//   //     setData(productsData);
//   //   } catch (error) {
//   //     console.error('Error fetching data from Firestore:', error);
//   //   }
//   // };
//   const res = async ()=>{
//     // yeh firestore se data get karne ke liye hai
//     const productsCollection = collection(db_fireStore, 'products');
//     await getDocs(productsCollection).then((res)=>{
//       const productsData = [];
//         res.forEach((doc) => {
//           productsData.push({ id: doc.id, ...doc.data() });
//         });
//         setData(productsData);
//     })
//   }
//   const handleClicked = async (item) => {
//     try {
//       // Add the entire product item to the 'buy-products' collection
//       const docRef = await addDoc(collection(db_fireStore, 'buy-products'), item);
  
//       // Check if the document already exists in the 'buy-products' collection
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         console.log('Order already placed for this product.');
//         // You can display a message to the user here
//         setDisabledButtons((prev) => {
//           return { ...prev, [item.id]: true }; // Assuming item.id is the product ID
//         });
//         return;
//       }
  
//       // If the document doesn't exist, update the state to disable the button
//       setDisabledButtons((prev) => {
//         return { ...prev, [item.id]: true }; // Assuming item.id is the product ID
//       });
  
//       console.log('Order placed successfully.');
//     } catch (error) {
//       console.error('Error during order placement: ', error.message);
//     }
//   };

//   useEffect(() => {
//     res();
//   }, []);

//   return (
//     <>
//       <h1>Welcome to our User Dashboard</h1>

//       <ul>
//   {data?.map((item) => (
//     <div key={item.id}>
//       <li>{item.name}</li>
//       <button onClick={() => handleClicked({ ...item })} disabled={disabledButtons[item.id]}>
//         Buy Product
//       </button>
//       {disabledButtons[item.id] && (
//         <span>Order Placed. Confirmation available for 24 hours.</span>
//       )}
//     </div>
//   ))}
// </ul>
//     </>
//   );
// };

// export default UserDashboard;


















// // localStorage se kara tha yeh

// import React, { useEffect, useState } from 'react';
// import { addDoc, collection, doc, getDoc, getDocs, getFirestore, serverTimestamp } from 'firebase/firestore';
// import { app } from '../../../utils/Firebase';

// const db_fireStore = getFirestore(app);

// const UserDashboard = () => {
//   const [data, setData] = useState([]);
//   const [disabledButtons, setDisabledButtons] = useState(
//     JSON.parse(localStorage.getItem('disabledButtons')) || {}
//   );

//   const saveDisabledButtonsToLocalStorage = (buttons) => {
//     localStorage.setItem('disabledButtons', JSON.stringify(buttons));
//   };

//   const res = async () => {
//     try {
//       const productsCollection = collection(db_fireStore, 'products');
//       const querySnapshot = await getDocs(productsCollection);

//       const productsData = [];
//       querySnapshot.forEach((doc) => {
//         productsData.push({ id: doc.id, ...doc.data() });
//       });

//       setData(productsData);
//     } catch (error) {
//       console.error('Error fetching data from Firestore:', error);
//     }
//   };

//   const handleClicked = async (item) => {
//     try {
//       const docRef = await addDoc(collection(db_fireStore, 'buy-products'), item);

//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         console.log('Order already placed for this product.');
//         setDisabledButtons((prev) => {
//           return { ...prev, [item.id]: true };
//         });
//         saveDisabledButtonsToLocalStorage({ ...disabledButtons, [item.id]: true });
//         return;
//       }

//       setDisabledButtons((prev) => {
//         return { ...prev, [item.id]: true };
//       });
//       saveDisabledButtonsToLocalStorage({ ...disabledButtons, [item.id]: true });

//       console.log('Order placed successfully.');
//     } catch (error) {
//       console.error('Error during order placement: ', error.message);
//     }
//   };

//   useEffect(() => {
//     res();
//   }, []);

//   return (
//     <>
//       <h1>Welcome to our User Dashboard</h1>

//       <ul>
//         {data?.map((item) => (
//           <div key={item.id}>
//             <li>{item.name}</li>
//             <button onClick={() => handleClicked({ ...item })} disabled={disabledButtons[item.id]}>
//               Buy Product
//             </button>
//             {disabledButtons[item.id] && (
//               <span>Order Placed. Confirmation available for 24 hours.</span>
//             )}
//           </div>
//         ))}
//       </ul>
//     </>
//   );
// };

// export default UserDashboard;








// import React, { useEffect, useState } from 'react';
// import { addDoc, collection, doc, getDoc, getDocs, getFirestore, serverTimestamp, updateDoc } from 'firebase/firestore';
// import { app } from '../../../utils/Firebase';

// const db_fireStore = getFirestore(app);

// const UserDashboard = () => {
//   const [data, setData] = useState([]);
//   const [disabledButtons, setDisabledButtons] = useState({});

//   const res = async () => {
//     try {
//       const productsCollection = collection(db_fireStore, 'products');
//       const querySnapshot = await getDocs(productsCollection);

//       const productsData = [];
//       querySnapshot.forEach((doc) => {
//         productsData.push({ id: doc.id, ...doc.data() });
//       });

//       setData(productsData);
//     } catch (error) {
//       console.error('Error fetching data from Firestore:', error);
//     }
//   };

//   const checkDisabledStatus = async (productId) => {
//     try {
//       const docRef = doc(db_fireStore, 'user-disabled-buttons', productId);
//       const docSnap = await getDoc(docRef);
  
//       if (docSnap.exists()) {
//         const data = docSnap.data();
//         return data && data.disabled; // Ensure data is not null or undefined before accessing the disabled property
//       }
  
//       return false;
//     } catch (error) {
//       console.error('Error checking disabled status:', error);
//       return false;
//     }
//   };
  

//   const handleClicked = async (item) => {
//     try {
//       const isDisabled = await checkDisabledStatus(item.id);

//       if (isDisabled) {
//         console.log('Order already placed for this product.');
//         setDisabledButtons((prev) => {
//           return { ...prev, [item.id]: true };
//         });
//         return;
//       }

//       await addDoc(collection(db_fireStore, 'buy-products'), item);

//       await updateDoc(doc(db_fireStore, 'user-disabled-buttons', item.id), {
//         disabled: true,
//       });

//       setDisabledButtons((prev) => {
//         return { ...prev, [item.id]: true };
//       });

//       console.log('Order placed successfully.');
//     } catch (error) {
//       console.error('Error during order placement: ', error.message);
//     }
//   };

//   useEffect(() => {
//     res();
//   }, []);

//   return (
//     <>
//       <h1>Welcome to our User Dashboard</h1>

//       <ul>
//         {data?.map((item) => (
//           <div key={item.id}>
//             <li>{item.name}</li>
//             <button onClick={() => handleClicked({ ...item })} disabled={disabledButtons[item.id]}>
//               Buy Product
//             </button>
//             {disabledButtons[item.id] && (
//               <span>Order Placed. Confirmation available for 24 hours.</span>
//             )}
//           </div>
//         ))}
//       </ul>
//     </>
//   );
// };

// export default UserDashboard;











import React, { useEffect, useState } from 'react';
import { addDoc, collection, doc, getDocs, getFirestore, updateDoc } from "firebase/firestore";
import { app } from '../../../utils/Firebase';

const db_fireStore = getFirestore(app);

const UserDashboard = () => {
  const [data, setData] = useState([]);
  console.log(data);
  const [disabledButtons, setDisabledButtons] = useState([]);
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const res = async () => {
    const productsCollection = collection(db_fireStore, 'products');
    await getDocs(productsCollection).then((res) => {
      const productsData = [];
      res.forEach((doc) => {
        productsData.push({ id: doc.id, ...doc.data() });
      });
      setData(productsData);
    });
  }

  const handleClicked = async (item, id) => {
    console.log(id, item);
    try {
      setDisabledButtons([...disabledButtons, id]);
      const cred = await addDoc(collection(db_fireStore, "buy-products"), item);
      // console.log("Document written with ID: ", cred);
      if(cred){
        await addDoc(collection(db_fireStore, 'buy-products', id), { approvalStatus: 'pending' });
      }
      setConfirmationMessage('Order Placed. Confirmation available for 24 hours.',);
    } catch (error) {
      console.error("Error during signup: ", error.message);
    }
  }
  useEffect(() => {
    res();
  }, []);

  return (
    <>
      <h1>Welcome to our User Dashboard</h1>

      <ul>
        {data?.map((item) => (
          <React.Fragment key={item.id}>
            <li>{item.name}</li>
            <button disabled={disabledButtons.includes(item.id)} onClick={() => handleClicked({ ...item }, item.id)}>
              {/* {confirmationMessage ? "Order Placed" : "Buy Products"} */}
              Buy Products
            </button>
          </React.Fragment>
        ))}
      </ul>

      {confirmationMessage && <p>{confirmationMessage}</p>}
    </>
  );
}

export default UserDashboard;



/*
yeh code futute ke liye hai jab order reject ho jai 
import React, { useEffect, useState } from 'react';
import { addDoc, collection, doc, getDoc, getDocs, getFirestore } from "firebase/firestore";
import { app } from '../../../utils/Firebase';

const db_fireStore = getFirestore(app);

const UserDashboard = () => {
  const [data, setData] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderStatus, setOrderStatus] = useState(null);

  const res = async () => {
    const productsCollection = collection(db_fireStore, 'products');
    await getDocs(productsCollection).then((res) => {
      const productsData = [];
      res.forEach((doc) => {
        productsData.push({ id: doc.id, ...doc.data() });
      });
      setData(productsData);
    })
  }

  const handleClicked = async (item) => {
    try {
      setDisabled(true);
      const cred = await addDoc(collection(db_fireStore, "buy-products"), item);
      console.log("Document written with ID: ", cred);

      // Assuming you have an 'orderStatus' field in your 'buy-products' collection
      const orderDocRef = doc(db_fireStore, "buy-products", cred.id);
      const orderDoc = await getDoc(orderDocRef);
      const status = orderDoc.data().orderStatus;

      setOrderStatus(status);
      setConfirmationMessage('Order Placed. Confirmation available for 24 hours.');
      setOrderPlaced(true);
    } catch (error) {
      console.error("Error during signup: ", error.message);
    } finally {
      setDisabled(true);
    }
  }

  // Assuming you have a function to check the order status
  const checkOrderStatus = async () => {
    // Implement logic to get the order status from Firestore
    // and set the 'orderStatus' state accordingly
    // For example:
    // const orderStatus = await getOrderStatus();
    // setOrderStatus(orderStatus);
  }

  useEffect(() => {
    res();
    checkOrderStatus(); // Call the function to check the order status
  }, []);

  return (
    <>
      <h1>Welcome to our User Dashboard</h1>

      <ul>
        {data?.map((item) => (
          <React.Fragment key={item.id}>
            <li>{item.name}</li>
            <button disabled={disabled || orderPlaced || (orderStatus === 'rejected')} onClick={() => handleClicked({ ...item })}>
              {orderPlaced ? "Order Placed" : "Buy Products"}
            </button>
          </React.Fragment>
        ))}
      </ul>

      {confirmationMessage && <p>{confirmationMessage}</p>}
    </>
  );
}

export default UserDashboard;

*/