import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  doc,
  onSnapshot,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Profilepage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [approvedProperties, setApprovedProperties] = useState([]);
  const [pendingProperties, setPendingProperties] = useState([]);
  const [adminPendingProperties, setAdminPendingProperties] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const useruid = user.uid;

        const userDocRef = doc(db, "usersunique", useruid);



        const unsubscribeUser = onSnapshot(userDocRef, async (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserData(data);

            // For Owner, Client, and Agent
            if (["Owner", "Client", "Agent"].includes(data.role)) {
              const propertiesQuery = query(

                collection(db, "propertiesunique"),

                collection(db, "properties"),

                where("userId", "==", useruid)
              );
              const propertiesSnapshot = await getDocs(propertiesQuery);
              const propertiesList = propertiesSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));
              setApprovedProperties(propertiesList.filter((p) => p.isApproved === true));
              setPendingProperties(propertiesList.filter((p) => p.isApproved === false));
            }

            // For Admin
            if (data.role === "Admin") {
              const allPendingQuery = query(

                collection(db, "propertiesunique"),

                collection(db, "properties"),

                where("isApproved", "==", false)
              );
              const pendingSnap = await getDocs(allPendingQuery);
              const list = pendingSnap.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));
              setAdminPendingProperties(list);
            }
          }
          setLoading(false);
        });

        return () => unsubscribeUser();
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const handleLogout = () => {
    auth.signOut();
    navigate("/login");
  };

  const handleApprove = async (id) => {
    await updateDoc(doc(db, "properties", id), { isApproved: true });
    setAdminPendingProperties((prev) => prev.filter((p) => p.id !== id));
  };

  const handleReject = async (id) => {
    await deleteDoc(doc(db, "properties", id));
    setAdminPendingProperties((prev) => prev.filter((p) => p.id !== id));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-16 h-16 border-4 border-blue-600 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 py-8">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-orange-600 mb-8">Profile Page</h1>

        {/* User Info */}
        <div className="mb-6 flex flex-col items-center">
          <div className="w-32 h-32 bg-gray-200 p-2 rounded-full shadow-md mb-4 flex justify-center items-center">
            {userData?.photoURL ? (
              <img
                src={userData.photoURL}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <div className="w-full h-full bg-orange-500 rounded-full flex justify-center items-center text-white text-xl">
                {userData?.name?.[0]}
              </div>
            )}
          </div>
          <h2 className="text-xl font-semibold text-orange-500">{userData?.name}</h2>
          <p className="text-lg text-gray-700">{userData?.email}</p>
          <p className="text-lg text-gray-700">{userData?.mobileNumber}</p>
          <p className="text-md text-blue-600 mt-2">Role: {userData?.role}</p>
        </div>

        {/* Owner, Client, Agent Listings */}
        {["Owner", "Client", "Agent"].includes(userData?.role) && (
          <>
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-green-700 mb-4">Approved Listings</h2>
              {approvedProperties.length > 0 ? (
                <ul>
                  {approvedProperties.map((property) => (
                    <li key={property.id} className="p-4 bg-gray-100 rounded-md shadow mb-4">
                      {property.imageURL && (
                        <img
                          src={property.imageURL}
                          alt="Property"
                          className="w-full h-48 object-cover rounded mb-3"
                        />
                      )}
                      <h3 className="font-semibold">Project: {property.ProjectBuildingName}</h3>
                      <p>City: {property.City}</p>
                      <p>Price: ₹{property.Price}</p>
                      <p>Category: {property.propertyCategory}</p>
                      <p>Type: {property.propertyType}</p>
                      <p>Address: {property.Address}</p>
                      <button
                        onClick={() => navigate(`/property/${property.id}`)}
                        className="mt-2 text-blue-600 underline"
                      >
                        View Details
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No approved listings.</p>
              )}
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-yellow-700 mb-4">Pending Listings</h2>
              {pendingProperties.length > 0 ? (
                <ul>
                  {pendingProperties.map((property) => (
                    <li key={property.id} className="p-4 bg-gray-100 rounded-md shadow mb-4">
                      {property.imageURL && (
                        <img
                          src={property.imageURL}
                          alt="Property"
                          className="w-full h-48 object-cover rounded mb-3"
                        />
                      )}
                      <h3 className="font-semibold">Project: {property.ProjectBuildingName}</h3>
                      <p>City: {property.City}</p>
                      <p>Price: ₹{property.Price}</p>
                      <p>Category: {property.propertyCategory}</p>
                      <p>Type: {property.propertyType}</p>
                      <p>Address: {property.Address}</p>
                      <button
                        onClick={() => navigate(`/property/${property.id}`)}
                        className="mt-2 text-blue-600 underline"
                      >
                        View Details
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No pending listings.</p>
              )}
            </div>
          </>
        )}

        {/* Admin */}
        {userData?.role === "Admin" && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-red-700 mb-4">Admin Dashboard</h2>
            {adminPendingProperties.length > 0 ? (
              <ul>
                {adminPendingProperties.map((property) => (
                  <li key={property.id} className="p-4 bg-gray-100 rounded-md shadow mb-4">
                    {property.imageURL && (
                      <img
                        src={property.imageURL}
                        alt="Property"
                        className="w-full h-48 object-cover rounded mb-3"
                      />
                    )}
                    <h3 className="font-semibold text-lg mb-2">{property.ProjectBuildingName}</h3>
                    <p>City: {property.City}</p>
                    <p>Price: ₹{property.Price}</p>
                    <p>Category: {property.propertyCategory}</p>
                    <p>Type: {property.propertyType}</p>
                    <p>Address: {property.Address}</p>
                    <div className="mt-3 flex gap-4">
                      <button
                        onClick={() => handleApprove(property.id)}
                        className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(property.id)}
                        className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No pending properties to approve.</p>
            )}
          </div>
        )}

        {/* Logout */}
        <div className="flex justify-center mt-10">
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-md shadow-md transition-all duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profilepage;
