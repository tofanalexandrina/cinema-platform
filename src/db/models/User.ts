import mongoose, { Schema, Model } from "mongoose";
import { User, UserRole } from "@/types/user";

const UserSchema = new Schema<User>(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      minlength: [3, "Username must be at least 3 characters long"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel: Model<User> =
  mongoose.models.User || mongoose.model<User>("User", UserSchema);

export default UserModel;
