// src/layouts/AdminLayout.tsx
import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import Topbar from "../components/admin/Topbar";
import { AdminProfileProvider } from "../context/AdminProfileContext";
import { BranchProvider } from "../context/BranchContext";

export default function AdminLayout() {
  return (
    <BranchProvider>
    <AdminProfileProvider>
      <div className="flex min-h-screen bg-[#FAF8F4]">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <Topbar />
          <main className="flex-1 px-6 py-8 lg:px-8">
            <Outlet />
          </main>
        </div>
      </div>
    </AdminProfileProvider>
    </BranchProvider>
  );
}