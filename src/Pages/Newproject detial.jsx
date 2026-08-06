import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import apiClient from "../api/apiClient";

export default function ProjectsDetailPage() {
    const navigate = useNavigate();
    const { projectId } = useParams();

    const validCities = ["Lucknow", "Noida", "Gurugram", "Kanpur", "Varanasi"];

    useEffect(() => {
        const fetchAndRedirect = async () => {
            try {
                const res = await apiClient.get(`/projects/${projectId}`);
                if (res.data) {
                    const projectData = res.data;
                    let cityValue = projectData.city || projectData.locality || "Unknown City";

                    // Validate city
                    if (!validCities.includes(cityValue)) {
                        cityValue = projectData.locality || "Unknown City";
                    }

                    const citySlug = cityValue.toLowerCase();
                    if (validCities.map(c => c.toLowerCase()).includes(citySlug)) {
                        navigate(`/${citySlug}/${projectId}`, { state: { project: projectData } });
                    } else {
                        navigate(`/unknown/${projectId}`, { state: { project: projectData } });
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
