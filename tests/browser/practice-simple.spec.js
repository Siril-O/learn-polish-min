import { test, expect } from '@playwright/test';

test('simple setup preserves category, format, count and date filtering', async ({ page }) => {
  await page.goto('/#practice');
  await expect(page.locator('#practice-count')).not.toBeVisible();
  await page.getByRole('button', { name: 'Karta Polaka', exact: true }).click();
  await expect(page.locator('#practice-history-from')).not.toBeVisible();
  await page.getByRole('button', { name: 'Dostosuj sesję' }).click();
  await page.locator('#practice-history-from').selectOption('1226');
  await page.locator('#practice-history-to').selectOption('1226');
  await expect(page.locator('#practice-count')).toBeVisible();
  await page.getByRole('button', { name: 'Rozpocznij sesję', exact: true }).click();
  await expect(page.locator('.question')).toContainText('Konrad');
  await expect(page.getByRole('radio')).toHaveCount(5);
  await page.goto('/#grammar');
  await page.goto('/#practice');
  await page.getByRole('button', { name: 'Słownictwo', exact: true }).click();
  await expect(page.locator('#practice-topic')).toHaveValue('vocabulary');
  await page.screenshot({ path: test.info().outputPath('setup.png'), fullPage: true });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
