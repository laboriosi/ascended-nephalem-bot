import { initializeApp } from "firebase-admin/app";
import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccountKey from "~constants/serviceAccountKey.js";

initializeApp({
  credential: admin.credential.cert(serviceAccountKey as any),
});

export default getFirestore();
