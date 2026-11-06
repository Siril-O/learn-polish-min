import { test, expect } from '@playwright/test';

test('learning plan switches levels and opens rules and practice', async ({ page }) => {
  await page.goto('/#plan');
  await expect(page.getByRole('heading', { name: 'Plan nauki' })).toBeVisible();
  await page.getByRole('button', { name: 'B1', exact: true }).click();
  await expect(page.getByText('Tryb przypuszczający: zrobiłbym, gdybym')).toBeVisible();
  const row = page.locator('.list-group-item').filter({ hasText: 'Formy -no/-to' });
  await expect(page.getByRole('button', { name: 'Reguły', exact: true })).toHaveCount(0);
  await row.click({ position: { x: 8, y: 8 } });
  await expect(page.locator('.lesson h2')).toHaveText('Konstrukcje bezosobowe');
  await page.getByLabel('Poziom CEFR', { exact: true }).selectOption('A1');
  await expect(
    page.getByRole('button', { name: 'Konstrukcje bezosobowe', exact: true }),
  ).toHaveCount(0);
  await page.getByLabel('Poziom CEFR', { exact: true }).selectOption('B1');
  await expect(
    page.getByRole('button', { name: 'Konstrukcje bezosobowe', exact: true }),
  ).toBeVisible();
  await page.goto('/#plan');
  await page.getByRole('button', { name: 'A2', exact: true }).click();
  await page
    .locator('.list-group-item')
    .filter({ hasText: 'Trzeba, można, warto' })
    .getByRole('button', { name: 'Ćwicz' })
    .click();
  await expect(page.getByLabel('Temat', { exact: true })).toHaveValue('impersonal');
  await page.goto('/#plan');
  await page.getByLabel('Language / Język').selectOption('uk');
  await expect(page.getByRole('heading', { name: 'План навчання' })).toBeVisible();
  await expect(page.locator('body')).not.toContainText('Brak materiału');
  await page.screenshot({ path: test.info().outputPath('plan.png'), fullPage: true });
});
