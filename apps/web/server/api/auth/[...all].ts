import { auth } from "@marmus-flowers/auth";

export default defineEventHandler((event) => {
  return auth.handler(toWebRequest(event));
});
