import React, { useEffect, useRef, useState } from "react";
import { Building2, DoorOpen, Mail, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, getDocs, deleteDoc, doc, query, where } from "firebase/firestore";
import { db } from "../../utils/firebase";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [emails, setEmails] = useState<{ id: string; email: string }[]>([]);
  

  const currentOrganization = JSON.parse(localStorage.getItem("currentOrganization")) || { name: "Organization", email: "" };

  // Fetch existing emails from Firestore
  useEffect(() => {
    const fetchEmails = async () => {
      setLoading(true);
      try {
        const emailsCollection = collection(db, "organizationEmails");
        const snapshot = await getDocs(emailsCollection);
        const emailsList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as { id: string; email: string }[];
        setEmails(emailsList);

        // Check if currentOrganization.email is already in Firestore
        if (currentOrganization.email && !emailsList.some((e) => e.email === currentOrganization.email)) {
          await addEmail(currentOrganization.email);
        }
      } catch (error) {
        console.error("Error fetching emails:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, []);

  // Function to add email to Firestore
  const addEmail = async (newEmail: string) => {
    if (newEmail.trim() === "") return;
    setLoading(true);
    try {
      const emailQuery = query(collection(db, "organizationEmails"), where("email", "==", newEmail));
      const existingEmails = await getDocs(emailQuery);

      if (existingEmails.empty) {
        const docRef = await addDoc(collection(db, "organizationEmails"), { email: newEmail });
        setEmails((prevEmails) => [...prevEmails, { id: docRef.id, email: newEmail }]);
      }
      setEmail("");

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error adding email:", error);
    }
  };

  // Function to delete an email
  const handleDeleteEmail = async (id: string) => {
    try {
      await deleteDoc(doc(db, "organizationEmails", id));
      setEmails((prevEmails) => prevEmails.filter((emailObj) => emailObj.id !== id));
    } catch (error) {
      console.error("Error deleting email:", error);
    }
  };

  // Handle outside click to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white border-gray-200">
      <div className="flex justify-end px-3">
        <div className="fixed z-20">
          <div className="flex justify-between items-center h-10">
            <div className="flex items-center space-x-4">
              <div className="relative mt-4" ref={dropdownRef}>
                <button
                  onClick={() => setOpen(!open)}
                  className="flex items-center space-x-2 bg-indigo-500 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-600 transition"
                >
                  <Building2 className="h-5 w-5" />
                  <span className="text-sm font-medium">{currentOrganization.name}</span>
                </button>
                {open && (
                  <div className="absolute top-12 left-0 w-64 bg-white shadow-lg rounded-lg p-2">
                    <p className="text-gray-700 text-lg font-bold px-2 py-1">Manage Email Alerts</p>
                    <input
                      type="email"
                      placeholder="Enter email for alerts"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1 text-sm block w-full rounded-md bg-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 px-3 border outline-none"
                    />
                    <button
                      onClick={() => addEmail(email)}
                      className={`mt-2 flex items-center justify-center gap-3 space-x-2 px-4 font-semibold text-sm w-full bg-indigo-500 text-white py-1 rounded 
                        ${loading ? "opacity-50 cursor-not-allowed" : ""}
                         hover:bg-indigo-600`}
                    >
                      <Mail className="h-4 w-4" />
                      Enter New Email
                    </button>
                    <div className="mt-2">
                      <p className="text-gray-700 text-sm px-2 py-1 font-semibold">Emails Present:</p>
                      {false ? (
                        <p className="text-gray-500 text-sm px-2 py-1">Loading...</p>
                      ) : (
                        <ul className="max-h-32 overflow-y-auto">
                          {emails.map(({ id, email }) => (
                            <li key={id} className="flex justify-between items-center px-2 py-1 text-sm border-b">
                              <span>{email}</span>
                              <button onClick={() => handleDeleteEmail(id)} className="text-red-500 hover:text-red-700">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <button
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "/";
                }}
                className="flex mt-3 items-center space-x-2 px-4 py-2 bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-600 transition-transform transform hover:scale-105"
              >
                <DoorOpen className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
