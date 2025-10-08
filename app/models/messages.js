import { client } from "../.server/mongo";

const db = client.db("Maryanne");
const collection = db.collection("messages");

// --- Get all messages ---
export async function getMessages() {
  return await collection.find().sort({ _id: -1 }).toArray();
}

// --- Add new message ---
export async function addMessage(user) {
  return await collection.insertOne({
    ...user,
    read: false,
    createdAt: new Date(),
  });
}

// --- Get message by email ---
export async function getMessageByEmail(email) {
  return await collection.findOne({ email });
}

// --- Delete message by ID ---
export async function deleteMessageById(id) {
  const { ObjectId } = await import("mongodb");
  return await collection.deleteOne({ _id: new ObjectId(id) });
}

// --- Toggle read/unread status ---
export async function toggleMessageReadStatus(id) {
  const { ObjectId } = await import("mongodb");
  const message = await collection.findOne({ _id: new ObjectId(id) });

  if (!message) return null;

  const updated = !message.read;
  await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { read: updated } }
  );

  return { ...message, read: updated };
}
