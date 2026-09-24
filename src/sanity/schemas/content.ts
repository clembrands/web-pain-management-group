// Content types edited in Sanity: Pain Education, News, Case Studies, and partner hospitals.
// Everything else on the site is code. Articles are imported from the live site in Phase 7,
// partners in Phase 5, and news in Phase 8, each from the Phase 1 inventory.
import { defineArrayMember, defineField, defineType } from "sanity";
import { educationCategories } from "../../content/legacy/education.ts";
import { partnerStates } from "../../content/legacy/states.ts";

const slugRule = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const slug = (description: string) =>
  defineField({
    name: "slug",
    type: "string",
    description,
    validation: (r) =>
      r
        .required()
        .regex(slugRule, { name: "lowercase words separated by hyphens" }),
  });

const legacyUrl = defineField({
  name: "legacyUrl",
  title: "Legacy WordPress URL",
  type: "string",
  description:
    "Where this lived on the old site. Set by the import; used to verify redirects.",
  readOnly: true,
});

const seo = [
  defineField({
    name: "seoTitle",
    title: "SEO title",
    type: "string",
    validation: (r) => r.max(70),
  }),
  defineField({
    name: "seoDescription",
    title: "Meta description",
    type: "text",
    rows: 3,
    validation: (r) => r.max(170),
  }),
];

// Rich text shared by articles, news, and case studies. ViewMedica videos are kept as
// their exact embed URLs so existing embeds carry over unchanged.
const body = defineField({
  name: "body",
  type: "array",
  of: [
    defineArrayMember({ type: "block" }),
    defineArrayMember({
      type: "image",
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
          description:
            "Describe the image. Leave empty only for decorative images (some migrated posts have none).",
        }),
      ],
    }),
    defineArrayMember({
      name: "viewmedica",
      title: "ViewMedica video",
      type: "object",
      fields: [
        defineField({
          name: "src",
          title: "Embed URL",
          type: "url",
          description:
            "Copied exactly from the live article, e.g. https://ondemand.viewmedica.com/7704/open/A_f28e188b",
          validation: (r) =>
            r
              .required()
              .uri({ scheme: ["https"] })
              .custom((v) =>
                typeof v === "string" &&
                !v.startsWith("https://ondemand.viewmedica.com/")
                  ? "Must be a ViewMedica embed URL"
                  : true,
              ),
        }),
      ],
      preview: {
        select: { title: "src" },
        prepare: ({ title }) => ({
          title: "ViewMedica video",
          subtitle: title,
        }),
      },
    }),
  ],
});

export const contentTypes = [
  defineType({
    name: "article",
    title: "Pain Education articles",
    type: "document",
    fields: [
      defineField({
        name: "title",
        type: "string",
        validation: (r) => r.required(),
      }),
      slug(
        "Must match the live URL exactly: /pain-education/<slug>/. Never change the slug of a published article.",
      ),
      defineField({
        name: "category",
        type: "string",
        description: "Navigation only. The category never appears in the URL.",
        options: { list: educationCategories, layout: "radio" },
        validation: (r) => r.required(),
      }),
      body,
      defineField({
        name: "medicalReviewer",
        title: "Medical reviewer",
        type: "object",
        description:
          "Leave empty until PMG names a reviewer. When empty, the article's schema lists PMG as author and publisher only.",
        fields: [
          defineField({
            name: "name",
            type: "string",
            validation: (r) => r.required(),
          }),
          defineField({
            name: "credentials",
            type: "string",
            description: "For example MD, DO",
          }),
          defineField({
            name: "reviewedAt",
            title: "Date reviewed",
            type: "date",
            validation: (r) => r.required(),
          }),
        ],
      }),
      ...seo,
      legacyUrl,
    ],
    orderings: [
      {
        title: "Title",
        name: "title",
        by: [{ field: "title", direction: "asc" }],
      },
    ],
    preview: { select: { title: "title", subtitle: "category" } },
  }),

  defineType({
    name: "newsPost",
    title: "News",
    type: "document",
    fields: [
      defineField({
        name: "title",
        type: "string",
        validation: (r) => r.required(),
      }),
      slug(
        "Published at /news/<slug>/. Migrated posts keep their WordPress slug.",
      ),
      defineField({
        name: "publishedAt",
        title: "Date",
        type: "date",
        validation: (r) => r.required(),
      }),
      defineField({
        name: "kind",
        type: "string",
        options: { list: ["Award", "Press", "Company news"], layout: "radio" },
        initialValue: "Company news",
      }),
      defineField({ name: "excerpt", type: "text", rows: 3 }),
      body,
      ...seo,
      legacyUrl,
    ],
    orderings: [
      {
        title: "Newest",
        name: "newest",
        by: [{ field: "publishedAt", direction: "desc" }],
      },
    ],
    preview: { select: { title: "title", subtitle: "publishedAt" } },
  }),

  defineType({
    name: "partner",
    title: "Partner hospitals",
    type: "document",
    fields: [
      defineField({
        name: "name",
        type: "string",
        description:
          "Display name as approved by PMG. Imported names are kept exactly as the live site shows them.",
        validation: (r) => r.required(),
      }),
      defineField({
        name: "state",
        type: "string",
        options: {
          list: partnerStates.map((s) => ({ title: s.name, value: s.slug })),
        },
        validation: (r) => r.required(),
      }),
      defineField({
        name: "city",
        type: "string",
        description:
          "Leave empty until PMG confirms it. Partners without a city show name and state only.",
      }),
      defineField({ name: "address", type: "text", rows: 3 }),
      defineField({ name: "phone", type: "string" }),
      defineField({
        name: "website",
        type: "url",
        validation: (r) => r.uri({ scheme: ["http", "https"] }),
      }),
      defineField({
        name: "logo",
        type: "image",
        fields: [
          defineField({
            name: "alt",
            title: "Alternative text",
            type: "string",
          }),
        ],
      }),
      defineField({
        name: "toConfirm",
        title: "Open questions for PMG",
        type: "text",
        rows: 2,
        description:
          "Internal. From deliverables/partners-to-confirm.csv. Clear once PMG answers.",
      }),
      legacyUrl,
    ],
    orderings: [
      {
        title: "State, then name",
        name: "state",
        by: [
          { field: "state", direction: "asc" },
          { field: "name", direction: "asc" },
        ],
      },
    ],
    preview: { select: { title: "name", subtitle: "state" } },
  }),

  defineType({
    name: "caseStudy",
    title: "Case studies",
    type: "document",
    fields: [
      defineField({
        name: "title",
        type: "string",
        validation: (r) => r.required(),
      }),
      slug("Published at /results/case-studies/<slug>/."),
      defineField({
        name: "partner",
        type: "reference",
        to: [{ type: "partner" }],
      }),
      defineField({
        name: "summary",
        type: "text",
        rows: 3,
        validation: (r) => r.required(),
      }),
      defineField({
        name: "figures",
        title: "Results figures",
        type: "array",
        description:
          "Every figure needs a source and PMG's confirmation before the case study can be published.",
        of: [
          defineArrayMember({
            type: "object",
            fields: [
              defineField({
                name: "label",
                type: "string",
                validation: (r) => r.required(),
              }),
              defineField({
                name: "value",
                type: "string",
                validation: (r) => r.required(),
              }),
              defineField({
                name: "source",
                type: "string",
                validation: (r) => r.required(),
              }),
              defineField({
                name: "confirmedByPmg",
                title: "Confirmed by PMG",
                type: "boolean",
                initialValue: false,
                validation: (r) =>
                  r.custom((v) =>
                    v ? true : "PMG must confirm this figure before publishing",
                  ),
              }),
            ],
            preview: { select: { title: "value", subtitle: "label" } },
          }),
        ],
      }),
      body,
      ...seo,
    ],
    preview: { select: { title: "title", subtitle: "summary" } },
  }),
];
