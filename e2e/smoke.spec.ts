import { expect, test } from "@playwright/test";

test("landing smoke: home page loads", async ({ page }) => {
  const response = await page.goto("/");
  expect(response?.ok()).toBeTruthy();

  await expect(page).toHaveURL(/\/(en|de)(\/)?$/);
  await expect(page.locator("#main-content")).toBeVisible();
});
