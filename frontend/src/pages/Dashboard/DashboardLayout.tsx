import { Outlet, NavLink } from "react-router-dom";

const DashboardLayout = () => (
  <div className="flex h-screen">
    <aside className="w-64 bg-gray-800 text-white flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <nav className="flex flex-col gap-2">
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `p-2 rounded ${isActive ? "bg-gray-700" : "hover:bg-gray-700"}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/dashboard/rented"
          className={({ isActive }) =>
            `p-2 rounded ${isActive ? "bg-gray-700" : "hover:bg-gray-700"}`
          }
        >
          Rented Items
        </NavLink>
        <NavLink
          to="/dashboard/listed"
          className={({ isActive }) =>
            `p-2 rounded ${isActive ? "bg-gray-700" : "hover:bg-gray-700"}`
          }
        >
          Items Listed
        </NavLink>
        <NavLink
          to="/dashboard/earnings"
          className={({ isActive }) =>
            `p-2 rounded ${isActive ? "bg-gray-700" : "hover:bg-gray-700"}`
          }
        >
          Earnings
        </NavLink>
      </nav>
    </aside>
    <main className="flex-1 p-6 bg-gray-100 overflow-auto">
      <Outlet />
    </main>
  </div>
);

export default DashboardLayout;
