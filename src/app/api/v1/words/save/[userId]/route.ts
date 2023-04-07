import {get} from "lodash";

import {firestorePostSaveAWordForUser} from "@/services/FirestoreAdmin.service";

export async function POST(request: Request, {params}: any) {
  const {userId} = params
  const words = get(request, "body.words", [])
  const resp = await firestorePostSaveAWordForUser(userId, words)
  return new Response(JSON.stringify(resp))
}