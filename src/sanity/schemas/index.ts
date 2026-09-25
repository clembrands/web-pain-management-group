import { defineField, defineType, type SchemaTypeDefinition } from "sanity";
import { contentTypes } from "./content";

// Sanity holds Pain Education articles, news, case studies, and partner hospitals.
// Every other page is code.
export const schemaTypes: SchemaTypeDefinition[] = [...contentTypes];

const required = (name: string, title?: string) =>
  defineField({ name, title, type: "string", validation: (r) => r.required() });

// Hospital Inquiry Form submissions, stored in the private "submissions" dataset.
export const submissionSchemaTypes = [
  defineType({
    name: "inquiry",
    title: "Inquiries",
    type: "document",
    readOnly: true,
    fields: [
      required("name"),
      required("title"),
      required("organization", "Hospital or health system"),
      required("email"),
      defineField({ name: "phone", type: "string" }),
      required("state"),
      defineField({ name: "message", type: "text", rows: 5 }),
      defineField({ name: "createdAt", type: "datetime" }),
    ],
    orderings: [
      {
        title: "Newest",
        name: "newest",
        by: [{ field: "createdAt", direction: "desc" }],
      },
    ],
    preview: { select: { title: "organization", subtitle: "name" } },
  }),
];
