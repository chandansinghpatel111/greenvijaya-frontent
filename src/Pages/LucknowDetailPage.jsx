import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function LucknowDetailPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { projectId } = useParams();
    const project = location.state?.project;

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-600 text-xl">Loading Lucknow project details...</p>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <button
                onClick={() => navigate("/")}
                className="mb-6 text-blue-600 hover:underline"
            >
                &larr; Back to Listings
            </button>

            <div className="max-w-5xl mx-auto bg-gray-100 rounded-lg shadow-lg p-6 sm:p-8">
                <h1 className="text-3xl font-bold mb-4">{project.ProjectBuildingName || "Untitled Project"}</h1>
                <p className="text-lg mb-2"><strong>Locality:</strong> {project.Locality || "N/A"}</p>
                <p className="text-lg mb-2"><strong>City:</strong> Lucknow</p>
                <p className="text-lg mb-2"><strong>Price:</strong> ₹ {project.Price || "N/A"}</p>
                <p className="text-lg mb-2"><strong>Area:</strong> {project.PlotArea || "N/A"} sqft</p>
                <p className="text-lg mb-2"><strong>Property Type:</strong> {project.propertyType || "N/A"}</p>
                <p className="text-lg mb-2"><strong>Amenities:</strong> 
                    {Array.isArray(project.amenities) && project.amenities.length > 0 ? (
                        <ul className="list-disc ml-5">
                            {project.amenities.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                    ) : " N/A"}
                </p>

                {/* Optional Image Gallery */}
                {Array.isArray(project.images) && project.images.length > 0 && (
                    <div className="mt-6">
                        <h3 className="text-xl font-semibold mb-2">Gallery</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {project.images.map((url, index) => (
                                <img
                                    key={index}
                                    src={url}
                                    alt={`Project image ${index + 1}`}
                                    className="w-full h-48 object-cover rounded"
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
