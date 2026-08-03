import { projects as initialProjects } from "../data/projects";
import CustomInput from "../components/CustomInput";
import { useState } from "react";

function OurProject() {
  const [projects, setProjects] = useState(initialProjects);

  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    url: "",
    images: [],
    about: "",
    details: {
      location: "",
      projectType: "",
      amenities: "",
      priceRange: "",
    },
  });

  // Handle Form Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Check for nested object fields in `details`
    if (name.startsWith("details.")) {
      const key = name.split(".")[1];
      setNewProject((prev) => ({
        ...prev,
        details: {
          ...prev.details,
          [key]: value,
        },
      }));
    } else {
      setNewProject({ ...newProject, [name]: value });
    }
  };

  // Add New Project
  const addProject = (e) => {
    e.preventDefault();
    const newId = projects.length ? projects[projects.length - 1].id + 1 : 1;
    setProjects([...projects, { ...newProject, id: newId }]);
    setNewProject({
      title: "",
      description: "",
      url: "",
      images: [],
      about: "",
      details: {
        location: "",
        projectType: "",
        amenities: "",
        priceRange: "",
      },
    });
  };

  // Delete Project
  const deleteProject = (id) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  return (
    <div>
      <div className="flex-1 p-8">
        <h2 className="text-2xl font-semibold mb-4">Add New Project</h2>
        <form onSubmit={addProject} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CustomInput
            type="text"
            name="title"
            value={newProject.title}
            onChange={handleInputChange}
            placeholder="Project Title"
          />
          <CustomInput
            type="text"
            name="description"
            value={newProject.description}
            onChange={handleInputChange}
            placeholder="Project Description"
          />
          <CustomInput
            type="text"
            name="url"
            value={newProject.url}
            onChange={handleInputChange}
            placeholder="Project URL"
          />
          <CustomInput
            type="text"
            name="about"
            value={newProject.about}
            onChange={handleInputChange}
            placeholder="About Project"
          />
          <CustomInput
            type="text"
            name="details.location"
            value={newProject.details.location}
            onChange={handleInputChange}
            placeholder="Location"
          />
          <CustomInput
            type="text"
            name="details.projectType"
            value={newProject.details.projectType}
            onChange={handleInputChange}
            placeholder="Project Type (e.g., Residential, Commercial)"
          />
          <CustomInput
            type="text"
            name="details.amenities"
            value={newProject.details.amenities}
            onChange={handleInputChange}
            placeholder="Amenities"
          />
          <CustomInput
            type="text"
            name="details.priceRange"
            value={newProject.details.priceRange}
            onChange={handleInputChange}
            placeholder="Price Range"
          />

          <button
            type="submit"
            className="col-span-2 bg-orange-600 text-white py-2 rounded hover:bg-orange-500"
          >
            Add Project
          </button>
        </form>

        {/* Project List */}
        <h2 className="text-2xl font-semibold mt-8 mb-4">Project List</h2>
        <ul className="space-y-4">
          {projects.map((project) => (
            <li key={project.id} className="border p-4 rounded flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <p>{project.description}</p>
              </div>
              <button
                onClick={() => deleteProject(project.id)}
                className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default OurProject;
