import { test, expect } from '@playwright/test';

test('has title and creates a schema', async ({ page }) => {
await page.goto('http://localhost:3000/');

// Expect a title "to contain" a substring.
await expect(page).toHaveTitle(/SSI Admin/);

// Expect a button with text "Create new" and click it.
const createNewBtn = await page.waitForSelector('button:text("Create new")');
await createNewBtn.click();

// Expect a Generate button and click it.
const generateBtn = await page.waitForSelector('button:text("Next")');
await generateBtn.click();

// Expect an anchor (link) with text "Download JSON" and click it.
const downloadJSONLink = await page.waitForSelector('button:text("Download and Finish")');
await downloadJSONLink.click();

// Expect an anchor (link) to "/credentials".
const credentials = await page.waitForSelector('a[href="/credentials"]');
await credentials.click();

// Expect a button to Create Credentials
const doneBtn = await page.waitForSelector('button:text("Create Credential")');
await doneBtn.click();

});