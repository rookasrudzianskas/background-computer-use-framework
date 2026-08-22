import { readFile } from "node:fs/promises";
import path from "node:path";

export async function GET() {
  const report = await readFile(path.join(process.cwd(), "public", "assets", "cua", "cua-bench-v1.pdf"));
  return new Response(report, {
    headers: {
      "Content-Disposition": 'attachment; filename="cua-bench-v1.pdf"',
      "Content-Type": "application/pdf",
    },
  });
}
