// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function handler(_req: any, res: any): void {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ status: "ok" }));
}
