import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function ProjectsDetailPage() {
    const navigate = useNavigate();
    const { projectId } = useParams();

    const validCities = ["Lucknow", "Noida", "Gurugram", "Kanpur", "Varanasi"];

    useEffect(() => {
        const fetchAndRedirect = async () => {
            try {
                const projectRef = doc(db, "ProjectExplore", projectId);
                const projectSnap = await getDoc(projectRef);
                if (projectSnap.exists()) {
                    const projectData = projectSnap.data();
                    let cityValue = projectData.City || projectData.Locality || "Unknown City";

                    // Validate city
                    if (!validCities.includes(cityValue)) {
                        cityValue = projectData.Locality || "Unknown City";
                        await updateDoc(projectRef, { City: cityValue });
                    }

                    const citySlug = cityValue.toLowerCase();
                    if (validCities.map(c => c.toLowerCase()).includes(citySlug)) {
                        navigate(`/${citySlug}/${projectId}`, { state: { project: { id: projectSnap.id, ...projectData } } });
                    } else {
                        navigate(`/unknown/${projectId}`, { state: { project: { id: projectSnap.id, ...projectData } } });
                    }
                } else {
                    console.log("No such project!");
                }
            } catch (error) {
                console.error("Error fetching project:", error);
            }
        };

        fetchAndRedirect();
    }, [projectId, navigate]);

    return (
        <div className="text-center py-12">Redirecting based on city...</div>
    );
}
