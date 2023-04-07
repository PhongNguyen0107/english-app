import * as FirebaseAdmin from "firebase-admin";

const credentialAuth = require("./english-app-notes-firebase-adminsdk-bm35u-970ce4cd1b.json");

try {
  FirebaseAdmin.initializeApp({
    credential: FirebaseAdmin.credential.cert(credentialAuth)
  });
  console.log("Firebase admin initialized")
} catch (err: any){
  console.error("Firebase admin initialization error: ")
}

const firestoreAdmin = FirebaseAdmin.firestore();

export {FirebaseAdmin, firestoreAdmin}