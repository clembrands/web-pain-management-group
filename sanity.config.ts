"use client";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { projectId, dataset, apiVersion } from "./src/sanity/env";
import { schemaTypes, submissionSchemaTypes } from "./src/sanity/schemas";

// Imported only after the route has checked that a project is configured.
const config = defineConfig([
  {
    name: "content",
    title: "PMG — Content",
    basePath: "/studio/content",
    projectId,
    dataset,
    plugins: [
      structureTool(),
      ...(process.env.NODE_ENV === "development"
        ? [visionTool({ defaultApiVersion: apiVersion })]
        : []),
    ],
    schema: { types: schemaTypes },
  },
  {
    name: "submissions",
    title: "PMG — Inquiries",
    basePath: "/studio/submissions",
    projectId,
    dataset:
      process.env.NEXT_PUBLIC_SANITY_SUBMISSIONS_DATASET || "submissions",
    plugins: [structureTool()],
    schema: { types: submissionSchemaTypes },
    document: { newDocumentOptions: () => [] },
  },
]);
export default config;
