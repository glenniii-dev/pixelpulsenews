import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

// Log when the upload route module is imported (helps confirm route is active)
try {
  // eslint-disable-next-line no-console
  console.log('[uploadthing.route] initialized');
} catch (e) {}

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});