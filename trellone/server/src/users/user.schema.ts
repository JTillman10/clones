import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  username: String,
  firstName: String,
  lastName: String,
  password: String,
});
