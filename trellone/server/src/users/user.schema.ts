import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  email: String,
  username: String,
  firstName: String,
  lastName: String,
  password: String,
});
