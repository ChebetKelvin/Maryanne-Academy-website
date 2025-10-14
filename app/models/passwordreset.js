import { client } from "../.server/mongo";
import crypto from "node:crypto";

let db = client.db("Maryanne");
let collection = db.collection("password_resets");

// Generate + save reset token
export async function createPasswordResetToken(email) {
  const token = crypto.randomBytes(32).toString("hex");

  await collection.insertOne({
    email,
    token,
    createdAt: new Date(),
  });

  return token;
}

// Verify token validity (optional expiration)
export async function findToken(token) {
  return await collection.findOne({ token });
}

// Delete token after use
export async function deleteToken(token) {
  return await collection.deleteOne({ token });
}
