import { Schema, Document, models, model } from "mongoose";

export interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
  bio?: string;
  skills?: string[];
  interests?: string[];
  github?: string;
  linkedin?: string;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String },
  skills: { type: [String], default: [] },
  interests: { type: [String], default: [] },
  github: { type: String },
  linkedin: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default models.User || model<IUser>("User", UserSchema); 