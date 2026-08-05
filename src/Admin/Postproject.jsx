import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

export default function AdminPanel() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {

      const querySnapshot = await getDocs(collection(db, "propertiesunique"));

      

      const propertiesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProperties(propertiesList);
    } catch (error) {
      console.error("Error fetching properties: ", error);
    }
  };

  const approveProperty = async (id) => {
    try {

      const propertyRef = doc(db, "propertiesunique", id);

     
      await updateDoc(propertyRef, { isApproved: true });

      // Update state locally instead of re-fetching all properties
      setProperties((prevProperties) =>
        prevProperties.map((property) =>
          property.id === id ? { ...property, isApproved: true } : property
        )
      );
    } catch (error) {
      console.error("Error approving property: ", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Admin Panel - Approve Properties</h2>
      <ul className="mt-4">
        {properties.map((property) => (
          <li key={property.id} className="p-2 border-b flex justify-between items-center">
            <div>
              <p className="font-semibold">{property.projectBuildingName}</p>
              <p className="text-gray-600">{property.locality}</p>
              <p>Status: {property.isApproved ? "✅ Approved" : "⏳ Pending"}</p>
            </div>
            {!property.isApproved && (
              <button 
                onClick={() => approveProperty(property.id)} 
                className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600 transition"
              >
                Approve
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
