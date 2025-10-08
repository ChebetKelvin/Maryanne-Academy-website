import { client } from "../.server/mongo";

let db = client.db("Maryanne");
let collection = db.collection("user");

export async function getUser() {
  return collection.find().toArray();
}

export async function addUser(user) {
  return collection.insertOne(user);
}

export async function getUserByEmail(email) {
  return collection.findOne({ email });
}
