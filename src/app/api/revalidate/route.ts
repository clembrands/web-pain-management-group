import { revalidateTag } from "next/cache";
import { type NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";
export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret)
    return Response.json(
      { message: "Revalidation is not configured." },
      { status: 503 },
    );
  try {
    const { isValidSignature } = await parseBody(request, secret);
    if (!isValidSignature)
      return Response.json({ message: "Invalid signature." }, { status: 401 });
    revalidateTag("site-content", { expire: 0 });
    return Response.json({ revalidated: true });
  } catch {
    return Response.json(
      { message: "Invalid webhook payload." },
      { status: 400 },
    );
  }
}
