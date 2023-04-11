import {DB_NAME} from "@/configuration/firebase.constant";
import {FirebaseAdmin, firestoreAdmin} from "@/configuration/firebase-admin.config";
import {WordReviewPropType} from "@/services/AppInterface";

const FieldValue = FirebaseAdmin.firestore.FieldValue

type WordSavePayload = {
  userId: string;
  created_at: FirebaseAdmin.firestore.FieldValue;
  word: WordReviewPropType
}

export const firestorePostSaveAWordForUser = async (userId: string, word: WordReviewPropType | null) => {
  const customPayload = {
    userId: userId,
    word,
    created_at: FieldValue.serverTimestamp(),
  }

  return firestoreAdmin.collection(DB_NAME.WORD_SAVE).add(customPayload);
}

export const getWordsSavedByUID = async (uId: string) => {
  const words: WordSavePayload[] = [];
  // refs: https://firebase.google.com/docs/firestore/query-data/get-data
  const querySnapshot = await firestoreAdmin.collection(DB_NAME.WORD_SAVE).where("userId" , "==", uId).get()
  querySnapshot.forEach((doc: any) => {
    words.push({
      id: doc.id,
      ...doc.data()
    })
  })
  return words;
}

export const firestoreUpdateChannelById = async (channelId: string, payload: any) => {
  return firestoreAdmin
    .collection(DB_NAME.WORD_SAVE)
    .doc(channelId)
    .update({
      ...payload
    })
}

export const firestoreDeleteWordByUId = async (uId :string, wordId: string) => {
  return firestoreAdmin.collection(DB_NAME.WORD_SAVE).doc(wordId).delete();
}