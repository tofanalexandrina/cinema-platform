import { LoginCredentials, AuthResponse } from "@/types/user";

/**
 * Login user and get JWT token
 */
export async function login(
  credentials: LoginCredentials
): Promise<AuthResponse> {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data: AuthResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Login API call failed:", error);
    return {
      success: false,
      message: "Network error. Please try again.",
    };
  }
}
