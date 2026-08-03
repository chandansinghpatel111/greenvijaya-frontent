const newLocal = "lucknow-faizabad-road";

// src/data/services.js
export const services = [
  {
    title: " Agni Residential Apartment",
    description: "100+ Properties",
    url: newLocal,
    image: "../assets/our7.jpeg",  // If in 'public/' folder, use '/our7.jpeg'
    video: "../assets/usd.mp4", // Add the video property for Lucknow Faizabad Road
    _images: ["/our7.jpeg", "../assets/lucknow.jpeg", "../assets/lucknow.jpeg"],

    get images() {
      return this._images;
    },
    set images(value) {
      this._images = value;
    },

    about: " Agni patel gedhs Lucknow Faizabad Road offers a perfect blend of modern living and natural serenity. The area is ideal for residential and commercial investments.",
    location: "Lucknow, Uttar Pradesh",
    projectType: "Residential and Commercial",
    amenities: ["24/7 Security", "Road Connectivity", "Green Spaces"],
    priceRange: "₹20 Lakh - ₹50 Lakh",
  },
  {
    title: "Residential Plot/Land",
    description: "200+ Properties",
    url: "gurugram",
    image: "../assets/our1.jpeg",  // Check if the path is correct
    video: "../assets/usd.mp4", // Example YouTube video link
    about: "Gurugram is a modern city known for its urban lifestyle and thriving commercial hubs.",
    location: "Gurugram, Haryana",
    projectType: "Residential and Commercial",
    amenities: ["Metro Connectivity", "Luxury Living", "Corporate Hubs"],
    priceRange: "₹50 Lakh - ₹1 Crore",
  },
  {
    title: "Independent House/Villa",
    description: "100+ Properties",
    url: "noida",
    image: "../assets/our2.webp",
    video: "../assets/usd.mp4", // Example Vimeo link
    about: "Noida offers a futuristic lifestyle with state-of-the-art infrastructure and modern amenities.",
    location: "Noida, Uttar Pradesh",
    projectType: "Residential and Commercial",
    amenities: ["Smart City Features", "IT Parks", "Educational Institutions"],
    priceRange: "₹30 Lakh - ₹80 Lakh",
  },
  {
    title: "Farm House",
    description: "50+ Properties",
    url: "kanpur",
    image: "../assets/our9.jpeg",
    video: "../assets/usd.mp4", // Local video
    about: "Kanpur, an industrial hub, provides affordable property options in a developing landscape.",
    location: "Kanpur, Uttar Pradesh",
    projectType: "Residential and Commercial",
    amenities: ["Affordable Housing", "Road Connectivity", "Industrial Growth"],
    priceRange: "₹15 Lakh - ₹40 Lakh",
  },
  
];
