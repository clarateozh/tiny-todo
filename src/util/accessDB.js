// This file contains functions that access Firestore for Todos

import {
  collection,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const cltn = "todos";

export async function fetchTodos() {
  console.log('in fetchTodos')
  return (await getDocs(query(collection(db, cltn), orderBy("id")))).docs.map(
    (doc) => ({ ...doc.data() })
  );
}

export async function addTodo(id, newTodo) {
  console.log('in addTodo')
  await setDoc(doc(db, cltn, id.toString()), newTodo);
}

export async function deleteTodo(id) {
  console.log('in deleteTodo')
  await deleteDoc(doc(db, cltn, id.toString()));
}

export async function updateTodo(id, newTodo) {
  console.log('in updateTodo')
  await setDoc(doc(db, cltn, id.toString()), newTodo);
}
