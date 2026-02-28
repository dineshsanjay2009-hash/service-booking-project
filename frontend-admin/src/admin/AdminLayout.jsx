import { Outlet } from "react-router-dom";
import AdminHeader from "./components/AdminHeader";
import AdminSidebar from "./components/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      
      {/* SIDEBAR */}
      <AdminSidebar />

      {/* CONTENT AREA */}
      <div className="flex-1 flex flex-col">
        
        <AdminHeader />

        <main className="flex-1 p-4 sm:p-6 overflow-x-hidden">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;