import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, "dist");
const publicDir = join(dist, "public");
const serverDir = join(dist, "server");

await rm(dist, { force: true, recursive: true });
await mkdir(publicDir, { recursive: true });
await mkdir(serverDir, { recursive: true });
await mkdir(join(dist, ".openai"), { recursive: true });

for (const item of [
  "index.html",
  "styles.css",
  "script.js",
  "robots.txt",
  "sitemap.xml",
  "assets",
]) {
  await cp(join(root, item), join(publicDir, item), { recursive: true });
}

await cp(join(root, ".openai", "hosting.json"), join(dist, ".openai", "hosting.json"));

await writeFile(
  join(serverDir, "index.js"),
  `export default {
  async fetch(request, env) {
    if (env && env.ASSETS && typeof env.ASSETS.fetch === "function") {
      return env.ASSETS.fetch(request);
    }

    return new Response("ZenTech site assets are not available in this runtime.", {
      status: 503,
      headers: { "content-type": "text/plain; charset=utf-8" }
    });
  }
};
`
);
