import { test, expect } from '@playwright/test';
import { verbs, grammarExercises, exerciseTranslations } from '../../src/content/index.js';

test('verb reference searches, switches past gender, handles irregular forms and localizes', async ({
  page,
}, testInfo) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Tabele czasowników', exact: true }).click();
  await expect(page.getByLabel('Czasownik', { exact: true }).locator('option')).toHaveCount(20);
  await expect(page.locator('.verb-forms')).toContainText('czytam');
  await page.getByText('Żeński / niemęskoosobowy', { exact: true }).click();
  await expect(page.locator('.verb-forms tbody tr').first()).toContainText('czytałam');
  await page.getByLabel('Znajdź czasownik', { exact: true }).fill('iść');
  await expect(page.locator('.verb-forms tbody tr').first()).toContainText('szłam');
  await page.getByText('Męski / męskoosobowy', { exact: true }).click();
  await expect(page.locator('.verb-forms tbody tr').first()).toContainText('szedłem');
  await page.getByLabel('Znajdź czasownik', { exact: true }).fill('not-a-verb-xyz');
  await expect(page.getByText('Nie znaleziono czasowników.', { exact: true }).last()).toBeVisible();
  await page.getByLabel('Znajdź czasownik', { exact: true }).fill('');
  await page
    .getByLabel('Czasownik', { exact: true })
    .selectOption(verbs.find((verb) => verb.infinitive === 'pomagać').id);
  await expect(page.getByRole('region', { name: 'Łączliwość i przypadki' })).toContainText('komu');
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
  ).toBeTruthy();
  await page.screenshot({ path: testInfo.outputPath('verb-reference.png'), fullPage: true });
  await page.getByLabel('Language / Język').selectOption('uk');
  await expect(
    page.getByRole('columnheader', { name: 'Теперішній час', exact: true }),
  ).toBeVisible();
});

test('practice filters to selected verb and rule dialog opens its reference', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Tabele czasowników', exact: true }).click();
  const verb = verbs.find((item) => item.infinitive === 'iść');
  await page.getByLabel('Czasownik', { exact: true }).selectOption(verb.id);
  await page.getByRole('button', { name: 'Ćwicz ten czasownik', exact: true }).click();
  await expect(page.getByLabel('Czasownik', { exact: true })).toHaveValue(verb.id);
  await page.getByLabel('Poziom').selectOption('write');
  await page.getByRole('button', { name: 'Rozpocznij sesję' }).click();
  const prompt = await page.locator('.question').innerText();
  const item = grammarExercises.find(
    (exercise) =>
      exercise.verbId === verb.id &&
      exercise.level === 'write' &&
      exerciseTranslations.pl[exercise.id].prompt === prompt,
  );
  expect(item).toBeTruthy();
  await page.getByRole('button', { name: 'Otwórz regułę' }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog.getByLabel('Czasownik', { exact: true })).toHaveValue(verb.id);
  await page.keyboard.press('Escape');
  await page.getByLabel('Twoja odpowiedź po polsku').fill(item.answers[0]);
  await page.getByRole('button', { name: 'Sprawdź', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('Poprawnie');
});
