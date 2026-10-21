import { test, expect } from '@playwright/test';

test('five answer choices fit the quiz and remain selectable', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Ćwicz ten temat', exact: true }).click();
  await page.getByRole('button', { name: 'Rozpocznij sesję', exact: true }).click();
  const answers = page.getByRole('radio');
  await expect(answers).toHaveCount(5);
  for (const answer of await answers.all()) await expect(answer).toBeVisible();
  await answers.last().check();
  await page.getByRole('button', { name: 'Sprawdź', exact: true }).click();
  await expect(answers.last()).toBeDisabled();
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
  ).toBeTruthy();
});
