

const OurTeams = () => {
    const images = [
      {
        src: "../assets/md1.png",
        title: "MD",
        description: "Deepak Rai"
      },
      {
        src: "../assets/hr2.png",
        title: "MD",
        description: "Seema Devi"
      },
      {
        src: "../assets/hr2.png",
        title: "HR",
        description: "Amrita Patel "
      },
    ];
  
    return (
      <div className="bg-gray-100 py-8">
        <h1 className="text-4xl font-bold mb-6 text-red-400 text-center">OUR TEAMS</h1>
        <div className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto p-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="flex-1 group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 bg-white"
            >
              <div className="relative">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-xl font-bold">{image.title}</h3>
                    <p className="mt-2">{image.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default OurTeams;