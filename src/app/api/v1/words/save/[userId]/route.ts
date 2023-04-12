import {get} from "lodash";
import {firestorePostSaveAWordForUser, getWordsSavedByUID} from "@/services/FirestoreAdmin.service";
import logger from "@/services/Logger.service";

export async function POST(request: Request, {params}: any) {
  const {userId} = params;
  const body = await request.json();
  const word = get(body, "word", null)
  if(!word) return new Response(JSON.stringify({message: "Not found this word!"}))

  logger.info("Save word: %o for email: %s", word, userId)
  const resp = await firestorePostSaveAWordForUser(userId, word)
  return new Response(JSON.stringify(resp))
}

export async function GET(req: Request, {params}: any) {
  const {userId} = params
  const resp = await getWordsSavedByUID(userId)
  return new Response(JSON.stringify(resp))
}