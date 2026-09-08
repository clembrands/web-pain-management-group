import "server-only";
import { createClient } from "next-sanity";
import { projectId, dataset, apiVersion } from "../env";
export function getSubmissionsClient() {
  const submissionsDataset =
    process.env.NEXT_PUBLIC_SANITY_SUBMISSIONS_DATASET || "submissions";
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!projectId || !token || submissionsDataset === dataset) return null;
  return createClient({
    projectId,
    dataset: submissionsDataset,
    apiVersion,
    token,
    useCdn: false,
  });
}
export async function submissionsReady() {
  const client = getSubmissionsClient();
  if (!client) return false;
  // Fail closed if a misconfigured deployment points inquiries at public content.
  const datasets = await client.datasets.list();
  return datasets.some(
    (entry) =>
      entry.name === client.config().dataset && entry.aclMode === "private",
  );
}
