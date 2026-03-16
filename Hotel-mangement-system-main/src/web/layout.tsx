import { Link, useLocation } from "react-router-dom";
import {
  LayoutGrid,
  Utensils,
  ClipboardList,
  Menu,
  IndianRupee,
  Settings,
  Bike,
} from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
  tablesCount: number;
  parcelsCount: number;
}

export function Layout({ children, tablesCount, parcelsCount }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="w-64 border-r bg-white/70 backdrop-blur-xl shadow-2xl">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Utensils className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">Samrudhi</h1>
              <p className="text-xs text-muted-foreground">Restaurant Manager</p>
            </div>
          </div>
        </div>
        <nav className="space-y-1 p-3">
          <Link
            to="/"
            className={`flex items-center space-x-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
              location.pathname === "/"
                ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/30"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            <LayoutGrid className="h-5 w-5" />
            <span>Dashboard / डॅशबोर्ड</span>
          </Link>
          <Link
            to="/tables"
            className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
              location.pathname === "/tables"
                ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/30"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            <div className="flex items-center space-x-3">
              <Utensils className="h-5 w-5" />
              <span>Tables / टेबल</span>
            </div>
            {tablesCount > 0 && (
              <span className="text-xs bg-red-500 text-white font-bold rounded-full px-2.5 py-1 shadow-md animate-pulse">
                {tablesCount}
              </span>
            )}
          </Link>
          <Link
            to="/parcels"
            className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
              location.pathname === "/parcels"
                ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/30"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            <div className="flex items-center space-x-3">
              <Bike className="h-5 w-5" />
              <span>Parcels / पार्सल्स</span>
            </div>
            {parcelsCount > 0 && (
              <span className="text-xs bg-red-500 text-white font-bold rounded-full px-2.5 py-1 shadow-md animate-pulse">
                {parcelsCount}
              </span>
            )}
          </Link>
          <Link
            to="/orders"
            className={`flex items-center space-x-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
              location.pathname === "/orders"
                ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/30"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            <ClipboardList className="h-5 w-5" />
            <span>Orders / ऑर्डर</span>
          </Link>
          <Link
            to="/menu"
            className={`flex items-center space-x-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
              location.pathname === "/menu"
                ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/30"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            <Menu className="h-5 w-5" />
            <span>Menu / मेनू</span>
          </Link>
          <Link
            to="/expenses"
            className={`flex items-center space-x-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
              location.pathname === "/expenses"
                ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/30"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            <IndianRupee className="h-5 w-5" />
            <span>Expenses / खर्च</span>
          </Link>
          <Link
            to="/settings"
            className={`flex items-center space-x-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
              location.pathname === "/settings"
                ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/30"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            <Settings className="h-5 w-5" />
            <span>Settings / सेटिंग्स</span>
          </Link>
        </nav>
      </div>
      <div className="flex-1 overflow-auto">
        <div className="h-full p-8 animate-in">{children}</div>
      </div>
    </div>
  );
}
