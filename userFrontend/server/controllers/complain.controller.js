import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../utils/firebaseConfig";

const testFetchEmails = async () => {
    try {
        const emailUsersRef = collection(db, "EmailSignedInUsers");
        const querySnapshot = await getDocs(emailUsersRef);
        querySnapshot.forEach(doc => {
            console.log("Document ID:", doc.id);
            console.log("Document Data:", doc.data());
        });
    } catch (error) {
        console.error("Error fetching emails:", error);
    }
};

const createComplain = async (req, res) => {
    try {
        const complain = req.body;
        console.log(complain);

        const docRef = await addDoc(collection(db, "complaints"), complain);
        complain.id = docRef.id; // Get the generated ID
        console.log("Complain ID:", complain.id);

        testFetchEmails();


        res.status(201).send("Complain created successfully");
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error creating complain");
    }
};

export {createComplain};
