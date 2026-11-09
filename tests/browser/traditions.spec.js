import { test, expect } from '@playwright/test';

test('expanded culture pool supports a full session with five choices', async ({ page }) => {
  await page.goto('/#practice');
  await page.getByLabel('Temat', { exact: true }).selectOption('culture');
  await expect(page.getByText(/Dostępne: 60 zadań/)).toBeVisible();
  await page.getByRole('button', { name: 'Rozpocznij sesję', exact: true }).click();
  await expect(page.getByRole('radio')).toHaveCount(5);
  await page.getByRole('radio').first().check();
  await page.getByRole('button', { name: 'Sprawdź', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Dalej', exact: true })).toBeVisible();
});
