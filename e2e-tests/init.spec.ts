import { test, expect } from '@playwright/test';

test('has title and creates a schema', async ({ page }) => {
await page.goto('http://localhost:3000/');

// Expect a title "to contain" a substring.
await expect(page).toHaveTitle(/SSI Admin/);

// Expect a button with text "Create new" and click it.
const createNewBtn = await page.waitForSelector('button:text("Create new")');
await createNewBtn.click();

// Expect a Generate button and click it.
const generateBtn = await page.waitForSelector('button:text("Generate")');
await generateBtn.click();

// Expect an anchor (link) with text "Download JSON" and click it.
const downloadJSONLink = await page.waitForSelector('a:text("Download JSON")');
await downloadJSONLink.click();

// Expect a Done button and click it.
const doneBtn = await page.waitForSelector('button:text("Done")');
await doneBtn.click();

// Expect an anchor (link) to "/schemas".
const schemas = await page.waitForSelector('a[href="/schemas"]');
await schemas.click();

});