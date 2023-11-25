import { addDoc, collection, doc, getDoc, getDocs, getFirestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { app } from '../../utils/Firebase';

const db = getFirestore(app);

const Crud = () => {
    const [addEmp, setAddEmp] = useState("")
    const [email, setEmail] = useState("")
    const [employees, setEmployees] = useState([]);

    const _handleAddemp = async (e)=>{
        e.preventDefault()
        try {
            const docRef = await addDoc(collection(db, "todo"), {
              name:addEmp,
              email:email
            });
            // isse foran update ho raha hai
            // res()
            // Update the state with the new data
      setEmployees([...employees, { id: docRef.id, name: addEmp, email }]);
            console.log("Document written with ID: ", docRef);
          } catch (error) {
            console.error("Error adding document: ", error);
          }
    }
    const res = async () => {
        try {
            const productsCollection = collection(db, 'todo');
            const querySnapshot = await getDocs(productsCollection);
            const productsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setEmployees(productsData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
        
      }
    useEffect(() => {
        // console.log("useeffect is runnuh");
        res()
    }, []);
  return (
    <>
        <form onSubmit={_handleAddemp}>
            <input type="text" required value={addEmp} onChange={(e) => setAddEmp(e.target.value)} />
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <button type='submit'>add employee name</button>
        </form>
        {employees.map((tem)=>{
            return(
                <>
                    <p>{tem.name} ==== {tem.email}</p>
                 
                </>
            )
        })}
{/* <button onClick={res}>xdcfghk</button> */}
    </>
  )
}

export default Crud