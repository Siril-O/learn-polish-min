import { test, expect } from '@playwright/test';

test('a previously uncovered date offers two distinct context questions', async ({ page }) => {
  await page.goto('/#practice');
  await page.getByLabel('Temat', { exact: true }).selectOption('history');
  await page.getByLabel('Typ testu', { exact: true }).selectOption('context');
  await page.locator('#practice-history-group').selectOption('chronology');
  await page.getByLabel('Rok od', { exact: true }).selectOption('1791');
  await page.getByLabel('Rok do', { exact: true }).selectOption('1791');
  await expect(page.locator('#practice-count')).toHaveValue('2');
  await page.getByRole('button', { name: 'Rozpocznij sesję', exact: true }).click();
  const firstPrompt = await page.locator('.question').innerText();
  await expect(page.getByRole('radio')).toHaveCount(5);
  await page.getByRole('radio').first().check();
  await page.getByRole('button', { name: 'Sprawdź', exact: true }).click();
  await page.getByRole('button', { name: 'Dalej', exact: true }).click();
  await expect(page.locator('.question')).not.toHaveText(firstPrompt);
  await expect(page.getByRole('radio')).toHaveCount(5);
});

test('written context questions ask for a Polish answer rather than a date', async ({ page }) => {
  await page.goto('/#practice');
  await page.getByLabel('Temat', { exact: true }).selectOption('history');
  await page.getByLabel('Typ testu', { exact: true }).selectOption('context');
  await page.locator('#practice-level').selectOption('write');
  await page.getByRole('button', { name: 'Rozpocznij sesję', exact: true }).click();
  await expect(page.getByLabel('Twoja odpowiedź po polsku', { exact: true })).toBeVisible();
});

test('history practice filters dates with inclusive year boundaries', async ({ page }) => {
  await page.goto('/#practice');
  await page.getByLabel('Temat', { exact: true }).selectOption('history');
  await page.locator('#practice-history-group').selectOption('chronology');
  await page.getByLabel('Rok od', { exact: true }).selectOption('966');
  await page.getByLabel('Rok do', { exact: true }).selectOption('966');
  await page.getByRole('button', { name: 'Rozpocznij sesję', exact: true }).click();
  await expect(page.locator('.question')).toContainText(/Mieszko|chrzest/iu);
  await expect(page.getByRole('radio')).toHaveCount(5);
});

test('invalid history range prevents starting a session', async ({ page }) => {
  await page.goto('/#practice');
  await page.getByLabel('Temat', { exact: true }).selectOption('history');
  await page.getByLabel('Rok od', { exact: true }).selectOption('2005');
  await page.getByLabel('Rok do', { exact: true }).selectOption('966');
  await expect(page.getByRole('alert')).toContainText('Podaj poprawne lata');
  await expect(page.getByRole('button', { name: 'Rozpocznij sesję', exact: true })).toBeDisabled();
});

test('context questions offer five answers and use the selected period', async ({ page }) => {
  await page.goto('/#practice');
  await page.getByLabel('Temat', { exact: true }).selectOption('history');
  await page.getByLabel('Typ testu', { exact: true }).selectOption('context');
  await page.getByLabel('Rok od', { exact: true }).selectOption('966');
  await page.getByLabel('Rok do', { exact: true }).selectOption('966');
  await page.getByRole('button', { name: 'Rozpocznij sesję', exact: true }).click();
  await expect(page.getByRole('radio')).toHaveCount(5);
  await expect(page.locator('.question')).not.toContainText('Jaka data');
});
