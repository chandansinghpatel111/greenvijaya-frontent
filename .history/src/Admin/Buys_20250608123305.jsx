import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  startAfter,
  limit
} from "firebase/firestore";
import { db } from "../firebase";

const Buys = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastDoc, setLastDoc] = useState(null);
  const [pageStack, setPageStack] = useState([]);

  const pageSize = 5;

  // Fetch contacts from Firestore with pagination
  const fetchContacts = async (direction = "none") => {
    setLoading(true);
    try {
      let q;

      if (direction === "next" && lastDoc) {
        q = query(
          collection(db, "contactsunique"),
          orderBy("timestamp", "desc"),
          startAfter(lastDoc),
          limit(pageSize)
        );
      } else if (direction === "prev" && pageStack.length > 1) {
        const newStack = [...pageStack];
        newStack.pop(); // remove current page start
        const prevDoc = newStack[newStack.length - 1];

        q = query(
          collection(db, "contactsunique"),
          orderBy("timestamp", "desc"),
          startAfter(prevDoc),
          limit(pageSize)
        );
        setPageStack(newStack);
      } else {
        // Initial fetch
        q = query(
          collection(db, "contactsunique"),
          orderBy("timestamp", "desc"),
          limit(pageSize)
        );
        setPageStack([]);
      }

      const snapshot = await getDocs(q);
      const docs = snapshot.docs;

      if (docs.length > 0) {
        const firstVisible = docs[0];
        const lastVisible = docs[docs.length - 1];

        if (direction === "next" || direction === "none") {
          setPageStack((prev) => [...prev, firstVisible]);
        }

        setContacts(docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        setLastDoc(lastVisible);
      } else {
        setContacts([]);
      }
    } catch (err) {
      console.error("Error fetching contacts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-3xl font-bold text-center text-[#ec9322] mb-6">
        Contact Messages
      </h2>

      {/* Contact List */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Contact Submissions</h3>

        {loading ? (
          <p>Loading...</p>
        ) : contacts.length === 0 ? (
          <p>No contacts available.</p>
        ) : (
          <div className="space-y-4">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="p-4 border rounded bg-gray-50 shadow-sm"
              >
                <p>
                  <strong>Name:</strong> {contact.name || "N/A"}
                </p>
                <p>
                  <strong>Number:</strong> {contact.mobileNumber || "N/A"}
                </p>
                <p>
                  <strong>Message:</strong> {contact.message || "No message"}
                </p>
                <p>
                  <strong>Email:</strong> {contact.email || "N/A"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => fetchContacts("prev")}
          className="px-4 py-2 bg-gray-300 text-black font-medium rounded disabled:opacity-50"
          disabled={pageStack.length <= 1}
        >
          Previous
        </button>
        <button
          onClick={() => fetchContacts("next")}
          className="px-4 py-2 bg-gray-300 text-black font-medium rounded disabled:opacity-50"
          disabled={contacts.length < pageSize}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Buys;
