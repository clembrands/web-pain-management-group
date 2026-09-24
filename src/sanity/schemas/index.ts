import { defineField, defineType, type SchemaTypeDefinition } from "sanity";
import { contentTypes } from "./content";

const text = (name: string, title?: string) =>
  defineField({ name, title, type: "string", validation: (r) => r.required() });
const paragraph = (name: string) =>
  defineField({ name, type: "text", rows: 3, validation: (r) => r.required() });
const url = (name: string) =>
  defineField({
    name,
    type: "url",
    validation: (r) => r.uri({ scheme: ["https"] }),
  });
const cards = (name: string) =>
  defineField({
    name,
    type: "array",
    of: [{ type: "object", fields: [text("title"), paragraph("body")] }],
  });

export const schemaTypes: SchemaTypeDefinition[] = [
  defineType({
    name: "siteSettings",
    title: "Site settings",
    type: "document",
    fields: [
      text("title"),
      paragraph("description"),
      defineField({
        name: "email",
        type: "string",
        validation: (r) => r.email(),
      }),
      defineField({ name: "phone", type: "string" }),
      url("schedulingUrl"),
    ],
  }),
  defineType({
    name: "page",
    title: "Pages",
    type: "document",
    fields: [
      defineField({
        name: "slug",
        type: "string",
        options: {
          list: ["contact"],
        },
        validation: (r) => r.required(),
      }),
      text("eyebrow"),
      text("title"),
      paragraph("description"),
      cards("cards"),
      defineField({ name: "seoTitle", type: "string" }),
      defineField({ name: "seoDescription", type: "text", rows: 3 }),
    ],
  }),
  ...contentTypes,
];

export const submissionSchemaTypes = [
  defineType({
    name: "inquiry",
    title: "Inquiries",
    type: "document",
    readOnly: true,
    fields: [
      text("name"),
      text("email"),
      text("organization"),
      text("interest"),
      paragraph("message"),
      defineField({ name: "createdAt", type: "datetime" }),
    ],
    preview: { select: { title: "name", subtitle: "organization" } },
  }),
];
