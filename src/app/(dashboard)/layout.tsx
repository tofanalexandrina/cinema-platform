"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getStoredToken, removeToken } from "@/lib/auth";
import dashboardResources from "@/lib/resources/dashboardResources";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const token = getStoredToken();
    
    if (!token) {
      // Redirect to login if no token
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
    
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    removeToken();
    router.push("/login");
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-neutral-800 border-r-transparent"></div>
          <p className="mt-4 font-sf-compact text-gray-600">{dashboardResources.loading}</p>
        </div>
      </div>
    );
  }

  // Don't render dashboard if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-neutral-800 text-white flex flex-col">
        <div className="p-6 border-b border-neutral-700">
          <h1 className="font-sf-compact font-bold text-xl">{dashboardResources.sidebarTitle}</h1>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <a
                href="/dashboard"
                className="block px-4 py-3 rounded-lg hover:bg-neutral-700 transition-colors font-sf-compact"
              >
                {dashboardResources.navDashboard}
              </a>
            </li>
            <li>
              <a
                href="/dashboard/movies"
                className="block px-4 py-3 rounded-lg hover:bg-neutral-700 transition-colors font-sf-compact"
              >
                {dashboardResources.navMovies}
              </a>
            </li>
            <li>
              <a
                href="/dashboard/schedule"
                className="block px-4 py-3 rounded-lg hover:bg-neutral-700 transition-colors font-sf-compact"
              >
                {dashboardResources.navSchedule}
              </a>
            </li>
            <li>
              <a
                href="/dashboard/statistics"
                className="block px-4 py-3 rounded-lg hover:bg-neutral-700 transition-colors font-sf-compact"
              >
                {dashboardResources.navStatistics}
              </a>
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t border-neutral-700">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 bg-neutral-700 rounded-lg hover:bg-neutral-600 transition-colors font-sf-compact"
          >
            {dashboardResources.logout}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm p-6">
          <div className="flex justify-between items-center">
            <h2 className="font-sf-compact font-semibold text-2xl text-gray-900">
              {dashboardResources.headerTitle}
            </h2>
            <a
              href="/"
              className="font-sf-compact text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              {dashboardResources.viewWebsite}
            </a>
          </div>
        </header>

        <main className="flex-1 p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
