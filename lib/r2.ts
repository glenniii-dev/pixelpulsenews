import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const accessKeyId = process.env.CF_R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.CF_R2_SECRET_ACCESS_KEY;
const endpoint = process.env.CF_R2_ENDPOINT; // e.g. https://<account>.r2.cloudflarestorage.com
const customDomain = process.env.CF_R2_CUSTOM_DOMAIN; // e.g. https://www.pixelpulsenews.org for custom domain routing
const bucket = process.env.CF_R2_BUCKET;

if (!accessKeyId || !secretAccessKey || !endpoint || !bucket) {
  // Do not throw at module import time in production builds; allow server code to check.
}

export function createS3Client() {
  return new S3Client({
    region: process.env.CF_R2_REGION ?? "auto",
    endpoint,
    credentials: {
      accessKeyId: accessKeyId ?? "",
      secretAccessKey: secretAccessKey ?? "",
    },
  });
}

export async function uploadToR2(key: string, body: Buffer | Uint8Array, contentType = "application/octet-stream") {
  const client = createS3Client();

  const cmd = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: body,
    ContentType: contentType,
    // Make objects public — Cloudflare R2 ACLs differ; ensure bucket policy allows public read.
  });

  await client.send(cmd);

  // Build public URL using custom domain if available
  if (customDomain) {
    const baseUrl = customDomain.replace(/\/$/, "");
    return `${baseUrl}/${key}`;
  }

  // Fallback to direct endpoint URL if custom domain not configured
  const urlBase = endpoint?.replace(/\/$/, "");
  // If the endpoint already contains the bucket path, avoid duplicating it
  const finalUrl = urlBase?.includes(`/${bucket}`)
    ? `${urlBase}/${key}`
    : `${urlBase}/${bucket}/${key}`;
  return finalUrl;
}

export default { createS3Client, uploadToR2 };
