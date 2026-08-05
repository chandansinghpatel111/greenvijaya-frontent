import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // adjust this path as needed

const Buys = () => {
  const [formData, setFormData] = useState({
    propertyType: "",
    location: "",
    price: "",
    area: "",
    description: "",
    contactName: "",
    contactNumber: "",
    images: [],
  });

  const [contacts, setContacts] = useState([]);

  // 🔽 Fetch contacts from Firestore
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "contactsunique"));
        const contactList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setContacts(contactList);
      } catch (err) {
        console.error("Error fetching contacts:", err);
      }
    };

    fetchContacts();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Property Submitted Successfully!");
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-3xl font-bold text-center text-[#ec9322] mb-6">
        Buys
      </h2>

      {/* 🔽 Contacts from Firestore */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Contact Submissions</h3>
        {contacts.length === 0 ? (
          <p>No contacts available.</p>
        ) : (
          <div className="space-y-4">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="p-4 border rounded bg-gray-50 shadow-sm"
              >
                <p>
                  <strong>Name:</strong> {contact.contactName || "N/A"}
                </p>
                <p>
                  <strong>Number:</strong> {contact.contactNumber || "N/A"}
                </p>
                <p>
                  <strong>Message:</strong> {contact.message || "No message"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🔽 Form Section */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Property Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
         
         
        </div>

       
       

        

       
      </form>
    </div>
  );
};

export default Buys;
