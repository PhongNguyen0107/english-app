import {cookies} from 'next/headers'
import {NextResponse} from "next/server";

export async function GET(request: Request) {
  const wordData = require("data/words.en.json");
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  const language = cookieStore.get('language');
  const response = NextResponse.next();
  response.cookies.set('language', `${language}`);
  const responseData = {
    data: wordData
  }
  return new Response(JSON.stringify(responseData))
}

export async function HEAD(request: Request) {
}

export async function POST(request: Request) {
}

export async function PUT(request: Request) {
}

export async function DELETE(request: Request) {
}

export async function PATCH(request: Request) {
}

// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
export async function OPTIONS(request: Request) {
}
