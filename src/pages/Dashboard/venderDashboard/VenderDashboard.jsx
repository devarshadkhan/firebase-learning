
// import React, { useEffect, useState } from 'react';
// import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
// import { app } from '../../../utils/Firebase';

// const db_fireStore = getFirestore(app);

// const VendorDashboard = () => {
//   const [data, setData] = useState([]);

//   const res = async () => {
//     const productsCollection = collection(db_fireStore, 'buy-products');
//     await getDocs(productsCollection).then((res) => {
//       const productsData = [];
//       res.forEach((doc) => {
//         productsData.push({ id: doc.id, ...doc.data() });
//       });
//       setData(productsData);
//     });
//   }



//   useEffect(() => {
//     res();
//   }, []);

//   return (
//     <>
//       <h1>Welcome to our vendor Dashboard</h1>

//       <ul>
//         {data?.map((item) => (
//           <React.Fragment key={item.id}>
//             <li>{item.name}</li>
//           </React.Fragment>
//         ))}
//       </ul>
//     </>
//   );
// }

// export default VendorDashboard;



import React, { useEffect, useState } from 'react';
import { addDoc, collection, getDocs, getFirestore, updateDoc, doc } from "firebase/firestore";
import { app } from '../../../utils/Firebase';

const db_fireStore = getFirestore(app);

const VendorDashboard = () => {
  const [data, setData] = useState([]);

  const fetchProducts = async () => {
    const productsCollection = collection(db_fireStore, 'buy-products');
    const querySnapshot = await getDocs(productsCollection);
    const productsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setData(productsData);
  };

  const handleReview = async (productId, status) => {
    try {
      const productRef = doc(db_fireStore, 'buy-products', productId);
      await updateDoc(productRef, { approvalStatus: status });

      // Optionally, you can perform additional actions after approval/rejection

      // Refresh the UI or remove the product from the list
      fetchProducts();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <h1>Welcome to our vendor Dashboard</h1>

      <ul>
        {data?.map((item) => (
          <React.Fragment key={item.id}>
            <li>
              {item.name} 
            </li>
          </React.Fragment>
        ))}
      </ul>
    </>
  );
};

export default VendorDashboard;
