import * as FirebaseAdmin from "firebase-admin";
const credentialAuth = {
  "type": "service_account",
  "project_id": "english-app-notes",
  "private_key_id": process.env.NEXT_PUBLIC_FIREBASE_AD_PRIVATE_KEY_ID,
  "private_key": process.env.NEXT_PUBLIC_FIREBASE_AD_PRIVATE_KEY,
  "client_email": process.env.NEXT_PUBLIC_FIREBAE_AD_CLIENT_EMAIL,
  "client_id": process.env.NEXT_PUBLIC_FIREBASE_AD_CLIENT_ID,
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-bm35u%40english-app-notes.iam.gserviceaccount.com"
}

try {
  FirebaseAdmin.initializeApp({
    // @ts-ignore
    credential: FirebaseAdmin.credential.cert(credentialAuth)
  });
  console.log("Firebase admin initialized")
} catch (err: any){
  console.error("Firebase admin initialization error: ")
}

const firestoreAdmin = FirebaseAdmin.firestore();

export {FirebaseAdmin, firestoreAdmin}