import { defineField, defineType, type SchemaTypeDefinition } from "sanity";

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
const media = (name: string) =>
  defineField({
    name,
    type: "image",
    options: { hotspot: true },
    fields: [text("alt", "Alternative text")],
    validation: (r) => r.required(),
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
    name: "homePage",
    title: "Homepage",
    type: "document",
    fields: [
      text("heroTitle"),
      text("heroAccent"),
      paragraph("heroDescription"),
      media("heroImage"),
      text("statsTitle"),
      paragraph("statsDescription"),
      defineField({
        name: "stats",
        type: "array",
        of: [{ type: "object", fields: [text("value"), text("label")] }],
        validation: (r) => r.required().length(4),
      }),
      cards("differentiators"),
      cards("steps"),
      text("storyTitle"),
      paragraph("storyDescription"),
      media("storyImage"),
      url("storyUrl"),
      defineField({
        name: "faqs",
        title: "Frequently asked questions",
        type: "array",
        of: [
          { type: "object", fields: [text("question"), paragraph("answer")] },
        ],
      }),
      text("locationsTitle"),
      paragraph("locationsDescription"),
      media("mapImage"),
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
          list: [
            "partnership",
            "our-partners",
            "locations",
            "for-providers",
            "contact",
          ],
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
  defineType({
    name: "partner",
    title: "Hospital partners",
    type: "document",
    fields: [
      text("name"),
      media("logo"),
      defineField({ name: "description", type: "text" }),
      url("website"),
    ],
  }),
  defineType({
    name: "location",
    title: "Care locations",
    type: "document",
    fields: [
      text("name"),
      text("city"),
      text("state"),
      text("address"),
      defineField({ name: "phone", type: "string" }),
      url("website"),
    ],
  }),
  defineType({
    name: "opportunity",
    title: "Provider opportunities",
    type: "document",
    fields: [
      text("title"),
      text("location"),
      paragraph("description"),
      url("applicationUrl"),
    ],
  }),
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

// Shared editorial template for nested pages and reviewable content families.
schemaTypes.push(
  defineType({
    name: "editorialPage",
    title: "Site pages and articles",
    type: "document",
    fields: [
      defineField({
        name: "slug",
        type: "string",
        description:
          "Path without leading or trailing slash, for example partnership/operating-model",
        validation: (r) => r.required().regex(/^[a-z0-9-]+(?:\/[a-z0-9-]+)*$/),
      }),
      text("title"),
      text("eyebrow"),
      paragraph("description"),
      defineField({
        name: "kind",
        type: "string",
        options: {
          list: [
            "page",
            "resource",
            "education",
            "story",
            "location",
            "person",
            "job",
            "legal",
          ],
        },
        initialValue: "page",
        validation: (r) => r.required(),
      }),
      defineField({ name: "category", type: "string" }),
      defineField({
        name: "sections",
        type: "array",
        of: [
          {
            type: "object",
            fields: [
              text("title"),
              paragraph("body"),
              defineField({
                name: "points",
                type: "array",
                of: [{ type: "string" }],
              }),
            ],
          },
        ],
        validation: (r) => r.required().min(1),
      }),
      defineField({
        name: "links",
        title: "Related page paths",
        type: "array",
        of: [{ type: "string" }],
      }),
      defineField({
        name: "sourceNotes",
        title: "Internal source and verification notes",
        type: "text",
      }),
      defineField({ name: "reviewedBy", type: "string" }),
      defineField({ name: "reviewedAt", type: "date" }),
      defineField({
        name: "sample",
        title: "Illustrative sample",
        type: "boolean",
        initialValue: true,
      }),
      defineField({
        name: "approved",
        title: "Approved for the published site",
        type: "boolean",
        initialValue: false,
        validation: (r) =>
          r.custom((value, context) =>
            value && context.document?.sample
              ? "Sample records cannot be approved. Replace illustrative content first."
              : true,
          ),
      }),
    ],
    preview: { select: { title: "title", subtitle: "slug" } },
  }),
);
