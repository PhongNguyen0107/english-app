import {DB_NAME} from "@/configuration/firebase.constant";
import {FirebaseAdmin, firestoreAdmin} from "@/configuration/firebase-admin.config";

const FieldValue = FirebaseAdmin.firestore.FieldValue

export const firestorePostSaveAWordForUser = async (userId: string, words: string[]) => {
  const customPayload = {
    userId: userId,
    words: words,
    created_at: FieldValue.serverTimestamp(),
  }

  return firestoreAdmin.collection(DB_NAME.WORD_SAVE).add(customPayload);
}