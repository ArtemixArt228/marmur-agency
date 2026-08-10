import { auth } from "@marmus-flowers/auth";
import { createAuthMiddleware, type BetterAuthInstance } from "evlog/better-auth";

const identify = createAuthMiddleware(auth as BetterAuthInstance, {
  exclude: ["/api/auth/**"],
  maskEmail: true,
});

export default defineEventHandler(async (event) => {
  if (!event.context.log) return;
  await identify(event.context.log, event.headers, event.path);
});
