import { navigate } from "astro/virtual-modules/transitions-router.js";

const AdminPanel = () => {
  return (
    <>
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-orange-600 text-white p-4">
          <h1 className="text-3xl font-bold mb-8 cursor-pointer" onClick={() => navigate("/admin")}>
            Admin Panel
          </h1>
          <ul className="space-y-4">
            
            <li className="cursor-pointer hover:text-gray-300" onClick={() => navigate("/admin/ProjectExplore")}>
            ProjectExplore
            </li>
            <li className="cursor-pointer hover:text-gray-300" onClick={() => navigate("/admin/Postproject")}>
              PostProperty
            </li>
             <li className="cursor-pointer hover:text-gray-300" onClick={() => navigate("/admin/Postproject")}>
              PostProperty
            </li>
           
            
            
          </ul>
        </div>

        {/* Main Dashboard */}
        <div className="min-h-screen p-6 bg-gray-100">
          {/* Header */}
          <h1 className="mb-6 text-5xl font-bold text-center text-[#ec9322]">Admin Dashboard</h1>

          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Total Projects */}
            <div className="flex items-center justify-between p-6 transition duration-300 bg-white rounded-lg shadow-lg hover:shadow-2xl">
              <h2 className="text-xl font-semibold text-gray-800">Total our project</h2>
            </div>

            {/* Total Services */}
            <div className="flex items-center justify-between p-6 transition duration-300 bg-white rounded-lg shadow-lg hover:shadow-2xl">
              <h2 className="text-xl font-semibold text-gray-800">Our service</h2>
            </div>

            {/* Total PostProperty */}
            <div className="flex items-center justify-between p-6 transition duration-300 bg-white rounded-lg shadow-lg hover:shadow-2xl">
              <h2 className="text-xl font-semibold text-gray-800">Total PostProperty</h2>
            </div>

            {/* Total Contacts */}
            <div className="flex items-center justify-between p-6 transition duration-300 bg-white rounded-lg shadow-lg hover:shadow-2xl">
              <h2 className="text-xl font-semibold text-gray-800">Total Contacts</h2>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-2 lg:grid-cols-2">
            {/* Bar Chart */}
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="mb-4 text-xl font-semibold text-gray-800">Data Overview (Bar Chart)</h3>
            </div>

            {/* Pie Chart */}
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="mb-4 text-xl font-semibold text-gray-800">Data Breakdown (Pie Chart)</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;