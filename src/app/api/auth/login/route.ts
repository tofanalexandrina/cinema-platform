import { NextRequest, NextResponse } from "next/server";
import { authenticateUser } from "@/services/userService";
import { generateToken } from "@/lib/auth";
import { LoginCredentials, AuthResponse } from "@/types/user";

export async function POST(request: NextRequest) {
  try {
    const body: LoginCredentials = await request.json();
    const { username, password } = body;

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Username and password are required",
        } as AuthResponse,
        { status: 400 }
      );
    }

    // Authenticate user
    const user = await authenticateUser(username, password);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid username or password",
        } as AuthResponse,
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = generateToken(user);

    // Remove password from user object
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      {
        success: true,
        token,
        user: userWithoutPassword,
        message: "Login successful",
      } as AuthResponse,
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred during login",
      } as AuthResponse,
      { status: 500 }
    );
  }
}
