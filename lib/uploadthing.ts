import { useMemo } from "react";
import { genUploader } from "uploadthing/client";
import type { OurFileRouter } from "../app/api/uploadthing/core";

const uploader = genUploader<OurFileRouter>();

export function useUploadThing(endpoint: keyof OurFileRouter) {
  if (typeof window === "undefined") {
    throw new Error("useUploadThing can only be used on the client");
  }

  return useMemo(
    () => ({
      startUpload: async (files: File[]) => {
        if (!files?.length) return [];
        return uploader.uploadFiles(endpoint, { files });
      },
    }),
    [endpoint],
  );
}
