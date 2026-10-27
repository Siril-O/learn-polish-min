import { test, expect } from '@playwright/test';

test('mixed case practice conceals case names until an answer is checked', async ({ page }) => {
  await page.goto('/#practice');
  await page.getByLabel('Temat', { exact: true }).selectOption('cases');
  await page.getByRole('button', { name: 'Rozpocznij sesję', exact: true }).click();
  await expect(page.getByText('Ćwiczenia mieszane', { exact: true })).toBeVisible();
  await expect(page.locator('.question')).not.toContainText(
    /mianownik|dopełniacz|celownik|biernik|narzędnik|miejscownik|wołacz/iu,
  );
  await expect(page.getByRole('button', { name: 'Otwórz regułę', exact: true })).toHaveCount(0);
  await page.getByRole('radio').first().check();
  await page.getByRole('button', { name: 'Sprawdź', exact: true }).click();
  await expect(page.getByText('Ćwiczenia mieszane', { exact: true })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Otwórz regułę', exact: true })).toBeVisible();
  await expect(page.getByRole('status')).toBeVisible();
  await page.getByRole('button', { name: 'Dalej', exact: true }).click();
  await expect(page.getByText('Ćwiczenia mieszane', { exact: true })).toBeVisible();
});

test('single case practice keeps its topic label and rule link', async ({ page }) => {
  await page.goto('/#practice');
  await page.getByLabel('Temat', { exact: true }).selectOption('wolacz');
  await page.getByRole('button', { name: 'Rozpocznij sesję', exact: true }).click();
  await expect(page.getByText('Ćwiczenia mieszane', { exact: true })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Otwórz regułę', exact: true })).toBeVisible();
});
