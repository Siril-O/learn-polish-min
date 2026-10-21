import { test, expect } from '@playwright/test';
import * as content from '../../src/content/index.js';
import { localizeExercise } from '../../src/content-localization.js';

test('Narzędnik translation mode exposes fifty-seven sentences and can start a fifty-item session', async ({
  page,
}) => {
  await page.goto('/#practice');
  await page.getByLabel('Temat', { exact: true }).selectOption('narzednik');
  const level = page.getByLabel('Poziom');
  await expect(level.locator('option[value="sentence"]')).toContainText('(57)');
  await level.selectOption('sentence');
  await page.getByLabel('Zadań w sesji').selectOption('50');
  await page.getByRole('button', { name: 'Rozpocznij sesję' }).click();
  await expect(page.getByRole('progressbar')).toHaveAttribute('aria-valuemax', '50');
  const prompt = await page.locator('.question').innerText();
  const item = content.grammarExercises.find(
    (entry) => entry.topic === 'narzednik' && entry.level === 'sentence' && entry.prompt === prompt,
  );
  expect(item).toBeTruthy();
  await page.getByLabel('Twoja odpowiedź po polsku').fill(item.answers[0]);
  await page.getByRole('button', { name: 'Sprawdź', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('Poprawnie');
});

test('new declension data works with written practice, rule lookup and stored attempts', async ({
  page,
}) => {
  const item = content.declensionExercises.find(
    (entry) => entry.topic === 'miejscownik' && entry.level === 'write',
  );
  const completed = content.allExercises
    .filter((entry) => entry.familyId !== item.familyId)
    .map((entry) => entry.id);
  await page.addInitScript(
    ({ completed }) =>
      localStorage.setItem(
        'polski-praktyka:v1',
        JSON.stringify({
          version: 1,
          topic: 'miejscownik',
          lastView: 'practice',
          saved: [],
          known: [],
          mistakes: [],
          completed,
        }),
      ),
    { completed },
  );
  await page.goto('/#practice');
  await page.getByLabel('Temat', { exact: true }).selectOption('miejscownik');
  await page.getByLabel('Poziom').selectOption('write');
  await page.getByRole('button', { name: 'Rozpocznij sesję' }).click();
  await expect(page.locator('.question')).toHaveText(localizeExercise(item, 'pl', content).prompt);
  await page.getByRole('button', { name: 'Otwórz regułę' }).click();
  await expect(page.getByRole('dialog')).toContainText('Miejscownik');
  await page.keyboard.press('Escape');
  await page.getByLabel('Twoja odpowiedź po polsku').fill(item.answers[0]);
  await page.getByRole('button', { name: 'Sprawdź', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('Poprawnie');
  const state = await page.evaluate(() => JSON.parse(localStorage.getItem('polski-praktyka:v1')));
  expect(state.completed.at(-1)).toBe(item.id);
});
