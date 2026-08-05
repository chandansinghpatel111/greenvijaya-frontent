import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  query,
  limit,
  startAfter,
  endBefore,
  orderBy
} from "firebase/firestore";
import { db } from "../firebase";

const Buys = () => {
  const [contacts, setContacts] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [firstDoc, setFirstDoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageStack, setPageStack] = useState([]); // for previous pages

  const pageSize = 5; // 👈 You can adjust this for page size

  const fetchContacts = async (direction = "none") => {
    setLoading(true);
    try {
      let q;

      if (direction === "next" && lastDoc) {
        q = query(
          collection(db, "contactsunique"),
          orderBy("timestamp", "desc"), // Make sure your data has a 'timestamp' field
          startAfter(lastDoc),
          limit(pageSize)
        );
        setPageStack((prev) => [...prev, firstDoc]);
      } else if (direction === "prev" && pageStack.length > 0) {
        const prevDoc = pageStack[pageStack.length - 1];
        q = query(
          collection(db, "contactsunique"),
          orderBy("timestamp", "desc"),
          startAfter(prevDoc),
          limit(pageSize)
        );
        setPageStack((prev) => prev.slice(0, -1));
      } else {
        q = query(
          collection(db, "contactsunique"),
          orderBy("timestamp", "desc"),
          limit(pageSize)
        );
      }

      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs;

      setContacts(docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setFirstDoc(docs[0]);
      setLastDoc(docs[docs.length - 1]);
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

      {/* 🔽 Pagination Controls */}
      <div className="flex justify-between">
        <button
          onClick={() => fetchContacts("prev")}
          className="px-4 py-2 bg-gray-300 rounded"
          disabled={pageStack.length === 0}
        >
          Previous
        </button>
        <button
          onClick={() => fetchContacts("next")}
          className="px-4 py-2 bg-gray-300 rounded"
          disabled={contacts.length < pageSize}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Buys;
