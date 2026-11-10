import { test, expect } from '@playwright/test';

test('about page is bilingual and links to learning without replacing the default', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.about-page')).toBeVisible();
  await page.getByRole('button', { name: 'czas', exact: true }).click();
  await expect(page.locator('.about-demo-feedback')).toContainText('Poprawna forma: czasu');
  await page.getByRole('button', { name: 'czasu', exact: true }).click();
  await expect(page.locator('.about-demo-feedback')).toContainText('Tak, czasu!');
  await page.goto('/#about');
  await expect(page.getByRole('heading', { name: 'Polski Praktyka', exact: true })).toBeVisible();
  await expect(page.locator('.main-nav')).toHaveCount(0);
  await expect(page.locator('.about-preview')).toHaveCount(0);
  await expect(page.locator('.about-faq details')).toHaveCount(3);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.screenshot({ path: test.info().outputPath('about.png'), fullPage: true });
  await page.getByRole('link', { name: 'Zacznij naukę' }).click();
  await expect(page).toHaveURL(/#plan$/);
  await expect(page.locator('.main-nav')).toBeVisible();
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Plan nauki', exact: true })).toBeVisible();
  await page.goto('/#about');
  await page.getByLabel('Language / Język').selectOption('uk');
  await expect(page.getByRole('link', { name: 'Почати навчання' })).toBeVisible();
  await page.getByRole('link', { name: 'Карта поляка', exact: true }).click();
  await expect(page).toHaveURL(/#karta$/);
});
