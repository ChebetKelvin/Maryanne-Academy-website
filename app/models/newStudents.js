import { client, ObjectId } from "../.server/mongo";

let db = client.db("Maryanne");
let collection = db.collection("newStudents");

/* 🧾 Get all students */
export async function getStudent() {
  return await collection.find().toArray();
}

/* 🧩 Add a new student */
export async function addStudent(user) {
  return await collection.insertOne(user);
}

/* 🔄 Update student application status */
export async function updateStudentStatus(id, status) {
  return await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { "newApplication.status": status } }
  );
}

/* 🔍 Get a single student by ID */
export async function getStudentById(id) {
  return await collection.findOne({ _id: new ObjectId(id) });
}

/* 🗑️ Delete a student application by ID */
export async function deleteStudentById(id) {
  return await collection.deleteOne({ _id: new ObjectId(id) });
}
