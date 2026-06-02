import { describe, expect, it } from "vitest";
import { cn, validateWorkEmail } from "@/lib/utils";

describe("utils smoke", () => {
  it("merges class names with tailwind precedence", () => {
    expect(cn("px-2", "px-4")).toContain("px-4");
  });

  it("accepts a work email", () => {
    expect(validateWorkEmail("dev@voatomy.com")).toBeNull();
  });
});
