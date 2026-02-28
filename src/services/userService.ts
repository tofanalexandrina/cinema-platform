import { getDatabase } from "@/db/mongodb";
import { User } from "@/types/user";
import { hashPassword, comparePassword } from "@/lib/auth";
import { ObjectId } from "mongodb";

/**
 * Find a user by username
 */
export async function getUserByUsername(
  username: string
): Promise<User | null> {
  try {
    const db = await getDatabase();
    const usersCollection = db.collection<User>("users");
    const user = await usersCollection.findOne({ username });
    return user;
  } catch (error) {
    console.error("Error finding user by username:", error);
    throw new Error("Failed to find user");
  }
}

/**
 * Find a user by ID
 */
export async function getUserById(id: string): Promise<User | null> {
  try {
    const db = await getDatabase();
    const usersCollection = db.collection<User>("users");
    const user = await usersCollection.findOne(
      { _id: new ObjectId(id) },
      { projection: { password: 0 } }
    );
    return user;
  } catch (error) {
    console.error("Error finding user by ID:", error);
    throw new Error("Failed to find user");
  }
}

/**
 * Create a new user
 */
export async function createUser(
  userData: Omit<User, "_id" | "createdAt" | "updatedAt">
): Promise<User> {
  try {
    const db = await getDatabase();
    const usersCollection = db.collection<User>("users");

    // Check if user already exists
    const existingUser = await getUserByUsername(userData.username);
    if (existingUser) {
      throw new Error("Username already exists");
    }

    // Hash password before saving
    const hashedPassword = await hashPassword(userData.password);

    const newUser: Omit<User, "_id"> = {
      ...userData,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await usersCollection.insertOne(newUser as any);
    
    return {
      ...newUser,
      _id: result.insertedId.toString(),
    } as User;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

/**
 * Authenticate user with username and password
 */
export async function authenticateUser(
  username: string,
  password: string
): Promise<User | null> {
  try {
    const user = await getUserByUsername(username);
    if (!user) {
      return null;
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    return user;
  } catch (error) {
    console.error("Error authenticating user:", error);
    throw new Error("Authentication failed");
  }
}

/**
 * Get all users (without passwords)
 */
export async function getAllUsers(): Promise<Omit<User, "password">[]> {
  try {
    const db = await getDatabase();
    const usersCollection = db.collection<User>("users");
    const users = await usersCollection
      .find({}, { projection: { password: 0 } })
      .toArray();
    return users as Omit<User, "password">[];
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
}

/**
 * Delete a user by ID
 */
export async function deleteUser(id: string): Promise<boolean> {
  try {
    const db = await getDatabase();
    const usersCollection = db.collection<User>("users");
    const result = await usersCollection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Failed to delete user");
  }
}
