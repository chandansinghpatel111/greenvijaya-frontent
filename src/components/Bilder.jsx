/* eslint-disable react/prop-types */
import React from 'react';

// Import Images
import signatureGlobal from '../assets/signature-global.jpg';
import rishitaLogo from '../assets/r.jpg';

const builders = [
  {
    id: 1,
    name: 'Signature Global',
    logo: signatureGlobal,
    description: 'Specializes in residential and commercial projects. Trusted by thousands of families.',
    propertiesCount: 50,
  },
  {
    id: 2,
    name: 'Rishita',
    logo: rishitaLogo,
    description: 'Expert in luxury apartments and premium homes, delivering quality with elegance.',
    propertiesCount: 30,
  },
];

const BuilderCard = ({ builder }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden p-6 text-center border hover:border-gray-400 transition-all">
      <img
        src={builder.logo}
        alt={`${builder.name} logo`}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h3 className="text-xl font-semibold mb-2">{builder.name}</h3>
      <p className="text-gray-600 text-sm mb-4">{builder.description}</p>
      <p className="text-brand-gold text-sm mb-4 font-semibold">{builder.propertiesCount} Properties Available</p>
      <button className=" pl-4 pr-4 border-2  text-black px-3 py-2   ">
      View Properties →
      </button>
    </div>
  );
};

const PopularBuildersPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-5 py-12 text-center">
      <h2 className="text-3xl font-bold text-center mb-8 text-[#cb2b39]">
        Popular <span className="text-brand-burgundy">Builders</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 justify-center">
        {builders.map((builder) => (
          <BuilderCard key={builder.id} builder={builder} />
        ))}
      </div>
    </div>
  );
};

export default PopularBuildersPage;
