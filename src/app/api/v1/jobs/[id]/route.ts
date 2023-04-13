import {getJobById, syncWordJob} from "@/app/api/v1/jobs/[id]/Jobs.service";

export async function GET(request: Request, {params}: any) {
  const jobId = params.id
  const job = getJobById(jobId);
  return new Response(JSON.stringify(job))
}

export async function POST(request: Request, {params}: any) {
  const jobId = params.id
  const job = getJobById(jobId);
  switch (jobId) {
    case "sync-word":
      syncWordJob()
      break;
    default:
      break;
  }
  return new Response(JSON.stringify(job))
}