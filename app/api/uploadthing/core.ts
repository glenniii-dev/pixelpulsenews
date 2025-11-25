import { createUploadthing, type FileRouter } from "uploadthing/server";

// Debug helper: log whether expected env vars exist
console.log("[uploadthing] UPLOADTHING_APP_ID:", process.env.UPLOADTHING_APP_ID ? "present" : "MISSING");
console.log("[uploadthing] UPLOADTHING_SECRET:", process.env.UPLOADTHING_SECRET ? "present" : "MISSING");

const f = createUploadthing();

export const ourFileRouter = {
  editorImages: f({ image: { maxFileSize: "4MB" } })
    .onUploadComplete(({ file }) => {
      // Log the file object for debugging in server logs
      try {
        console.log("[uploadthing] onUploadComplete file:", JSON.stringify(file));
      } catch (e) {
        console.log("[uploadthing] onUploadComplete file (raw):", file);
      }
      return { url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
