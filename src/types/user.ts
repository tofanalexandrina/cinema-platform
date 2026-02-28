export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

export interface User {
  _id?: string;
  username: string;
  password: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: Omit<User, "password">;
  message?: string;
}
