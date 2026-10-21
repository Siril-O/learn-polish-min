import { test, expect } from '@playwright/test';

test('selected session size is used for 5, 10, 20 and 50 exercises', async ({ page }) => {
  await page.goto('/#practice');
  await page.getByLabel('Temat', { exact: true }).selectOption('verb-tables');
  for (const count of [5, 10, 20, 50]) {
    await page.getByLabel('Zadań w sesji').selectOption(String(count));
    await expect(page.locator('.session-start')).toContainText(`W sesji: ${count}`);
    await page.getByRole('button', { name: 'Rozpocznij sesję' }).click();
    await expect(page.getByRole('progressbar')).toHaveAttribute('aria-valuemax', String(count));
    await page.getByRole('button', { name: 'Zakończ sesję', exact: true }).click();
  }
});

test('small topic pools show their real limit instead of silently shortening sessions', async ({
  page,
}) => {
  await page.goto('/#practice');
  await page.getByLabel('Temat', { exact: true }).selectOption('verb-tables');
  await page.getByLabel('Zadań w sesji').selectOption('50');
  await page.getByLabel('Temat', { exact: true }).selectOption('byc');
  await page.getByLabel('Poziom').selectOption('sentence');
  await expect(page.getByLabel('Zadań w sesji')).toHaveValue('30');
  await expect(page.getByLabel('Zadań w sesji').locator('option')).toHaveCount(4);
  await expect(page.locator('.session-start')).toContainText('W sesji: 30');
  await page.getByRole('button', { name: 'Rozpocznij sesję' }).click();
  await expect(page.getByRole('progressbar')).toHaveAttribute('aria-valuemax', '30');
});
