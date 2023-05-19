import {cookies} from 'next/headers'
import {NextResponse} from "next/server";
import {SentenceType} from "@/services/AppInterface";
import {sampleSize} from "lodash";
import logger from "@/services/Logger.service";
import {saveDataToFile} from "@/shared/utils";

export async function GET(request: Request) {
  const sentences = require("data/sentences.json");
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  const language = cookieStore.get('language');
  const response = NextResponse.next();
  response.cookies.set('language', `${language}`);
  const responseData = {
    data: sentences
  }
  return new Response(JSON.stringify(responseData))
}

export async function HEAD(request: Request) {
}

export async function POST(request: Request) {
  const body = await request.json();

  const sentencesData = require("data/sentences.json");
  //@ts-ignore
  const sortData = sentencesData.sort((a: SentenceType, b: SentenceType) => a?.score - b?.score)

  const random: SentenceType[] = sampleSize(sortData, body?.num || 10)
  logger.info("List of sentences: %o", random.map(s => s.en))
  return new Response(JSON.stringify(random))

}

export async function PUT(request: Request) {
  const body = await request.json();

  const sentencesData = require("data/sentences.json");
  //@ts-ignore
  let itemUpdate = sentencesData.find(s => s.id === body.id)
  if(!itemUpdate) return new Response(JSON.stringify({message: "Not found your sentences!", code: 404}))
  itemUpdate.score = itemUpdate?.score ? itemUpdate.score + 1 : 1

  logger.info("Sentences updated: %o", itemUpdate)
  saveDataToFile("/sentences.json", sentencesData)
  return new Response(JSON.stringify(itemUpdate))
}

export async function DELETE(request: Request) {
}

export async function PATCH(request: Request) {
}

// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
export async function OPTIONS(request: Request) {
}
