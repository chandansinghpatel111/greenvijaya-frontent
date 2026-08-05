import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const PostPropertyListing = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);

  const [cityInput, setCityInput] = useState("");
  const [listingTypeInput, setListingTypeInput] = useState("");
  const [searchQueryInput, setSearchQueryInput] = useState("");

  const [city, setCity] = useState("");
  const [listingType, setListingType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [cityOptions, setCityOptions] = useState([]);

  const navigate = useNavigate();

  const validCities = ["Lucknow", "Noida", "Gurugram", "Kanpur", "Varanasi"];
  const listingTypeOptions = ["Buy", "Rent", "PG", "Commercial", "Plot"];

  const handleSearch = () => {
    setCity(cityInput);
    setListingType(listingTypeInput);
    setSearchQuery(searchQueryInput);
  };

  const handleReset = () => {
    setCityInput("");
    setListingTypeInput("");
    setSearchQueryInput("");
    setCity("");
    setListingType("");
    setSearchQuery("");
  };

  useEffect(() => {
    const fetchProjectExplore = async () => {
      try {

        const querySnapshot = await getDocs(collection(db, "NewlyProject"));
        const projectsList = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((project) => validCities.includes(project.city?.trim()));

        setProperties(projectsList);
        setFilteredProperties(projectsList);

        const cities = [
          ...new Set(
            projectsList
              .map((p) => p.city?.trim())
              .filter((city) => validCities.includes(city))
          ),
        ];
        setCityOptions(cities);
      } catch (error) {
        console.error("Error fetching ProjectExplore: ", error);
      }
    };

    fetchProjectExplore();
  }, []);

  useEffect(() => {

    const filtered = properties.filter((project) => {
      const cityMatch = city ? project.city?.toLowerCase() === city.toLowerCase() : true;
      const nameMatch = project.projectBuildingName
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
      const listingMatch = listingType
        ? project.listingType?.toLowerCase() === listingType.toLowerCase()
        : true;
      return cityMatch && nameMatch && listingMatch;
    });

    setFilteredProperties(filtered);
  }, [city, listingType, searchQuery]);


  const { ref, inView } = useInView({ threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      className="w-full mt-8 px-4 py-8"
      initial={{ opacity: 0, y: 100 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <motion.h2
        className="text-3xl font-bold text-center mb-8 text-[#cb2b38]"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
      >
        New <span className="text-[#134763]">Projects</span>
      </motion.h2>


      {/* Filters */}
      <div className="mb-6 flex flex-col md:flex-row justify-center items-center gap-4 flex-wrap">
        <select
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          className="w-full sm:w-auto border rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring focus:ring-[#cb2b38]"

        >
          <option value="">All Cities</option>
          {cityOptions.map((c, idx) => (
            <option key={idx} value={c}>
              {c}
            </option>
          ))}
        </select>


        <select
          value={listingTypeInput}
          onChange={(e) => setListingTypeInput(e.target.value)}
          className="w-full sm:w-auto border rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring focus:ring-[#cb2b38]"
        >
          <option value="">All Listings</option>
          {listingTypeOptions.map((type, idx) => (
            <option key={idx} value={type}>
              {type}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search by project name"
          value={searchQueryInput}
          onChange={(e) => setSearchQueryInput(e.target.value)}
          className="w-full sm:w-64 border rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring focus:ring-[#cb2b38]"
        />

        <button
          onClick={handleSearch}
          className="w-full sm:w-auto bg-[#134763] text-white px-4 py-2 rounded-md hover:bg-[#0e3b57] transition-all"
        >
          Search
        </button>

        <button
          onClick={handleReset}
          className="w-full sm:w-auto bg-[#cb2b38] text-white px-4 py-2 rounded-md hover:bg-[#a21b28] transition-all"
        >
          Reset
        </button>
      </div>

      {/* Scrollable Card Section */}
      <div className="flex gap-4 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory px-2">
        {filteredProperties.map((project, index) => (
          <motion.div
            key={project.id || index}
            className="snap-start flex-none w-[85vw] sm:w-[300px] bg-white shadow-xl rounded-2xl overflow-hidden hover:scale-[1.02] hover:shadow-2xl transition-all"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="h-48 w-full relative">
              {Array.isArray(project.imageUrls) && project.imageUrls.length > 0 ? (
                <img
                  src={project.imageUrls[0]}
                  alt={`${project.projectBuildingName || "Project"} in ${project.city || "City"}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                  No Image Available
                </div>
              )}
            </div>
            <div className="p-4 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-lg font-semibold text-[#134763] mb-1">
                  {project.projectBuildingName || "Untitled Project"}
                </h3>
                <p className="text-sm text-gray-500">{project.city || "City"}</p>
                <p className="text-sm text-gray-500 truncate">{project.locality || "Locality"}</p>
                <p className="text-sm text-gray-500">{project.propertyCategory || "Category"}</p>
                <p className="text-sm text-gray-500 mb-3 capitalize">{project.listingType || "Listing Type"}</p>
             
              <button
                onClick={() => navigate("/NewProjectD", { state: { project } })}
                className="border-[1.2px] border-red-400 text-black py-1 px-2 rounded-md hover:bg-[#f4394c] hover:text-white transition-all"
              >
                Learn More
              </button>
              </div> 
            </div>
          </motion.div>
        ))}

      </div>
    </motion.div>
  );
};


export default PostPropertyListing;
