import assert from "node:assert/strict";
import { test } from "node:test";
import { inquirySchema } from "../src/lib/inquiry-validation.ts";

const valid = {
  name: "Test Person",
  title: "Chief Executive Officer",
  organization: "Example Hospital",
  email: "person@example.com",
  phone: "(419) 555-0100",
  state: "Ohio",
  message: "We would like to discuss a partnership.",
};

test("inquiry accepts valid fields and strips unexpected properties", () => {
  assert.deepEqual(
    inquirySchema.parse({
      ...valid,
      _type: "siteSettings",
      token: "unexpected",
    }),
    valid,
  );
});

test("phone is optional; an empty phone is dropped", () => {
  const withoutPhone = inquirySchema.parse({ ...valid, phone: "" });
  assert.equal(withoutPhone.phone, undefined);
  assert.equal(
    inquirySchema.safeParse({ ...valid, phone: undefined }).success,
    true,
  );
});

test("inquiry rejects bad or missing required fields", () => {
  for (const input of [
    { ...valid, email: "bad" },
    { ...valid, state: "Ontario" },
    { ...valid, title: "" },
    { ...valid, organization: " " },
    { ...valid, phone: "call me" },
    { ...valid, message: "x".repeat(3001) },
    { ...valid, message: "short" },
  ])
    assert.equal(
      inquirySchema.safeParse(input).success,
      false,
      JSON.stringify(input),
    );
  assert.equal(inquirySchema.safeParse({}).success, false);
});

test("inquiry trims whitespace", () => {
  assert.equal(
    inquirySchema.parse({ ...valid, name: "  Test Person  " }).name,
    "Test Person",
  );
});
