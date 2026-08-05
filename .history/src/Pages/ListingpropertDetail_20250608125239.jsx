import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function ProjectsDetailPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { projectId } = useParams();
    const [project, setProject] = useState(location.state?.project || null);
    const [listingOwner, setListingOwner] = useState(null);
    const [mobileNumber, setMobileNumber] = useState("Not provided");
    const [userRole, setUserRole] = useState("Not provided");

    // Fetch project from Firestore if not coming from location.state
    useEffect(() => {
        if (!project && projectId) {
            const fetchProject = async () => {
                try {

                    const projectRef = doc(db, "propertiesunique", projectId);

                    const projectSnap = await getDoc(projectRef);
                    if (projectSnap.exists()) {
                        setProject({ id: projectSnap.id, ...projectSnap.data() });
                    } else {
                        console.log("No such project!");
                    }
                } catch (error) {
                    console.error("Error fetching project:", error);
                }
            };
            fetchProject();
        }
    }, [projectId, project]);

    // Fetch Listing Owner
    useEffect(() => {
        if (project?.userId) {
            const fetchListingOwner = async () => {
                try {

                    const userDocRef = doc(db, "usersunique", project.userId);

                    const userDoc = await getDoc(userDocRef);
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setListingOwner(userData);
                        setMobileNumber(userData.mobileNumber || "Not provided");

                        setUserRole(userData.role || "Not provided");

                    }
                } catch (error) {
                    console.error("Error fetching listing owner details:", error);
                }
            };
            fetchListingOwner();
        }
    }, [project?.userId]);

    if (!project) {
        return <div className="text-center py-12">Loading project details...</div>;
    }

    return (
        <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <button
                onClick={() => navigate("/")}
                className="mb-6 text-blue-600 hover:underline"
            >
                &larr; Back to Listings
            </button>

            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
                {/* Main Content */}
                <div className="flex-1 bg-gray-200 rounded-lg shadow-lg p-6 sm:p-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Project Image */}
                        <div className="relative h-48">

                            {Array.isArray(project.imageUrls) && project.imageUrls.length > 0 ? (
                                <img
                                    src={project.imageUrls[0]}
                                    alt={project.ProjectBuildingName || "Project Image"}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                                    No Image Available
                                </div>
                            )}
                        </div>

                        {/* Project Details */}
                        <div className="w-full lg:w-1/2 flex flex-col justify-between">
                            <h1 className="text-3xl font-semibold text-gray-900 mb-4">
                                {project?.ProjectBuildingName || "Untitled Project"}
                            </h1>
                            <p className="text-lg font-medium text-gray-800 mb-2">
                                {project?.Locality || "Location not available"}
                            </p>
                            <p className="text-lg font-medium text-gray-800 mb-2">
                                {project?.City || "City not available"}
                            </p>
                            <p className="text-xl text-gray-900 font-bold mb-4">
                                {`₹ ${project?.Price || "Not available"}`}
                            </p>
                            <p className="text-lg font-medium text-gray-800 mb-2">
                                {project?.PlotArea || "Area not available"}
                            </p>

                            {/* Additional Info */}
                            <div className="space-y-2 mt-4">
                                <div>
                                    <strong>Listing Type: </strong>
                                    <span>{project?.listingType || "Not available"}</span>
                                </div>
                                <div>
                                    <strong>Category: </strong>
                                    <span>{project?.propertyCategory || "Not available"}</span>
                                </div>
                                <div>
                                    <strong>Property Type: </strong>
                                    <span>{project?.propertyType || "Not available"}</span>
                                </div>
                                <div>
                                    <strong>Facing Type: </strong>
                                    <span>{project?.facingType || "Not available"}</span>
                                </div>
                                 <div>
                                    <strong>Facing Type: </strong>
                                    <span>{project?.contactNumber || "Not available"}</span>
                                </div>

                                <div>
                                    <strong>Amenities: </strong>
                                    {Array.isArray(project?.amenities) && project.amenities.length > 0 ? (
                                        <ul className="list-disc ml-4 text-gray-700">
                                            {project.amenities.map((amenity, index) => (
                                                <li key={index}>{amenity}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <span>Not available</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <aside className="w-full lg:w-1/4 bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Listing Owner</h2>
                    {listingOwner ? (
                        <div>
                            <p className="text-lg"><strong>Name:</strong> {listingOwner.name || "Not provided"}</p>
                            <p className="text-lg"><strong>Email:</strong> {listingOwner.email || "Not provided"}</p>
                            <p className="text-lg"><strong>Mobile:</strong> {mobileNumber}</p>

                            <p className="text-lg"><strong>Role:</strong> {userRole}</p>

                        </div>
                    ) : (
                        <p className="text-lg text-gray-700">Owner details not available.</p>
                    )}
                </aside>
            </div>
        </div>
    );
}
