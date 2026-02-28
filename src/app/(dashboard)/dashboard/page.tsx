"use client";

import { useEffect, useState } from "react";
import dashboardResources from "@/lib/resources/dashboardResources";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalMovies: 0,
    upcomingShows: 0,
    pastShows: 0,
  });

  useEffect(() => {
    // TODO: Fetch actual dashboard statistics
    const fetchStats = async () => {
      try {
        // Placeholder - replace with actual API calls
        setStats({
          totalMovies: 12,
          upcomingShows: 5,
          pastShows: 2,
        });
      } catch (error) {
        console.error(dashboardResources.failedToFetchStats, error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <div className="mb-8">
      
        <p className="font-sf-compact text-gray-600">
          {dashboardResources.manageContent}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-sf-compact text-gray-600 text-sm mb-1">
                {dashboardResources.totalMovies}
              </p>
              <p className="font-sf-compact font-bold text-3xl text-gray-900">
                {stats.totalMovies}
              </p>
            </div>
            <div className="bg-blue-100 rounded-full p-3">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-sf-compact text-gray-600 text-sm mb-1">
                {dashboardResources.pastShows}
              </p>
              <p className="font-sf-compact font-bold text-3xl text-gray-900">
                {stats.pastShows}
              </p>
            </div>
            <div className="bg-green-100 rounded-full p-3">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-sf-compact text-gray-600 text-sm mb-1">
                {dashboardResources.upcomingShows}
              </p>
              <p className="font-sf-compact font-bold text-3xl text-gray-900">
                {stats.upcomingShows}
              </p>
            </div>
            <div className="bg-purple-100 rounded-full p-3">
              <svg
                className="w-8 h-8 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="font-sf-compact font-semibold text-xl text-gray-900 mb-4">
          {dashboardResources.quickActions}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <div className="bg-neutral-800 text-white rounded-lg p-3">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <div>
              <p className="font-sf-compact font-medium text-gray-900">
                {dashboardResources.addNewMovie}
              </p>
              <p className="font-sf-compact text-sm text-gray-600">
                {dashboardResources.addNewMovieDescription}
              </p>
            </div>
          </button>

          <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <div className="bg-neutral-800 text-white rounded-lg p-3">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <p className="font-sf-compact font-medium text-gray-900">
                {dashboardResources.scheduleShowing}
              </p>
              <p className="font-sf-compact text-sm text-gray-600">
                {dashboardResources.scheduleShowingDescription}
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
