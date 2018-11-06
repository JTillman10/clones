import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  email: String,
  username: String,
  name: String,
  password: String,
});
