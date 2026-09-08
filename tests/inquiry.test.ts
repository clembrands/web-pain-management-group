import assert from "node:assert/strict";
import { test } from "node:test";
import { inquirySchema } from "../src/lib/inquiry-validation.ts";
const valid = {
  name: "Test Person",
  email: "person@example.com",
  organization: "Example Hospital",
  interest: "Hospital partnership",
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
test("inquiry rejects invalid email, unknown interest, and oversized content", () => {
  for (const input of [
    { ...valid, email: "bad" },
    { ...valid, interest: "Unexpected" },
    { ...valid, message: "x".repeat(3001) },
    { ...valid, name: " " },
    { ...valid, message: "short" },
  ])
    assert.equal(inquirySchema.safeParse(input).success, false);
});
test("inquiry trims whitespace and rejects missing fields", () => {
  assert.equal(
    inquirySchema.parse({ ...valid, name: "  Test Person  " }).name,
    "Test Person",
  );
  assert.equal(inquirySchema.safeParse({}).success, false);
});
