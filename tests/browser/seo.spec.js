import { test, expect } from '@playwright/test';

const production = 'http://127.0.0.1:4179/learn_pollish_minimalistic/';
test('production landing is readable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  const response = await page.goto(production);
  expect(response.status()).toBe(200);
  await expect(page.getByRole('heading', { name: 'Polski Praktyka', exact: true })).toBeVisible();
  await expect(page.getByText('Chcę poprawić polski')).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://siril-o.github.io/learn-polish-min/');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Bezpłatne ćwiczenia/);
  await context.close();
});

test('prerendered landing starts React and preserves direct routes', async ({ page }) => {
  await page.goto(production);
  await page.getByRole('button', { name: 'czasu', exact: true }).click();
  await expect(page.locator('.about-demo-feedback')).toContainText('Tak, czasu!');
  await expect(page.locator('h1')).toHaveCount(1);
  await page.goto(`${production}#grammar`);
  await expect(page.locator('.main-nav')).toBeVisible();
  await expect(page.locator('.about-page')).toHaveCount(0);
  const sitemap = await page.request.get(`${production}sitemap.xml`);
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).toContain('<loc>https://siril-o.github.io/learn-polish-min/</loc>');
});
