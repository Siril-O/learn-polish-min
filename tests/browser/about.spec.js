import { test, expect } from '@playwright/test';

test('about page is bilingual and links to learning without replacing the default', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.about-page')).toBeVisible();
  await page.goto('/#about');
  await expect(page.getByRole('heading', { name: 'Polski Praktyka', exact: true })).toBeVisible();
  await expect(page.locator('.about-preview img')).toBeVisible();
  expect(await page.locator('.about-preview img').evaluate((img) => img.complete && img.naturalWidth > 0)).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.screenshot({ path: test.info().outputPath('about.png'), fullPage: true });
  await page.getByRole('link', { name: 'Zacznij naukę' }).click();
  await expect(page).toHaveURL(/#plan$/);
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Plan nauki', exact: true })).toBeVisible();
  await page.goto('/#about');
  await page.getByLabel('Language / Język').selectOption('uk');
  await expect(page.getByRole('link', { name: 'Почати навчання' })).toBeVisible();
  await page.getByRole('link', { name: 'Практикуватися', exact: true }).click();
  await expect(page).toHaveURL(/#practice$/);
});
