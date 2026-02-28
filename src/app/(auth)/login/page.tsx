"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/apiClient/auth";
import { storeToken, getStoredToken } from "@/lib/auth";
import loginResources from "@/lib/resources/loginResources";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Redirect to dashboard if already logged in
  useEffect(() => {
    const token = getStoredToken();
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await login({ username, password });

      if (response.success && response.token) {
        // Store token in localStorage
        storeToken(response.token);
        
        // Redirect to dashboard
        router.push("/dashboard");
      } else {
        setError(response.message || loginResources.invalidCredentials);
      }
    } catch (err) {
      setError(loginResources.genericError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-8">
      <div className="mb-8 text-center">
        <h1 className="font-sf-compact font-bold text-3xl text-gray-900 mb-2">
          {loginResources.welcomeBack}
        </h1>
        <p className="font-sf-compact text-gray-600">
          {loginResources.signInToAccessDashboard}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="username"
            className="block font-sf-compact font-medium text-gray-700 mb-2"
          >
            {loginResources.username}
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-neutral-800 focus:border-transparent font-sf-compact"
            placeholder={loginResources.usernamePlaceholder}
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block font-sf-compact font-medium text-gray-700 mb-2"
          >
            {loginResources.password}
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-neutral-800 focus:border-transparent font-sf-compact"
            placeholder={loginResources.passwordPlaceholder}
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg font-sf-compact text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-neutral-800 text-white font-sf-compact font-medium py-3 rounded-lg hover:bg-neutral-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? loginResources.signingIn : loginResources.signIn}
        </button>
      </form>

      <div className="mt-6 text-center">
        <a
          href="/"
          className="font-sf-compact text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          {loginResources.backToWebsite}
        </a>
      </div>
    </div>
  );
}
