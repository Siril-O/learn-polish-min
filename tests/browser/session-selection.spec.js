import { test, expect } from '@playwright/test';
import * as content from '../../src/content/index.js';
import { localizeExercise } from '../../src/content-localization.js';

test('completed exercise IDs persist and sessions prioritize a new context over recent variants', async ({
  page,
}) => {
  const target = content.grammarExercises.find(
    (item) => item.topic === 'biernik' && item.level === 'write',
  );
  const completed = content.allExercises
    .filter((item) => item.familyId !== target.familyId)
    .map((item) => item.id);
  await page.addInitScript(
    ({ completed }) => {
      if (!localStorage.getItem('polski-praktyka:v1'))
        localStorage.setItem(
          'polski-praktyka:v1',
          JSON.stringify({
            version: 1,
            topic: 'biernik',
            lastView: 'practice',
            saved: [],
            known: [],
            mistakes: [],
            completed,
          }),
        );
    },
    { completed },
  );
  await page.goto('/#practice');
  await page.getByLabel('Temat', { exact: true }).selectOption('biernik');
  await page.getByLabel('Poziom').selectOption('write');
  await page.getByRole('button', { name: 'Rozpocznij sesję' }).click();
  await expect(page.locator('.question')).toHaveText(
    localizeExercise(target, 'pl', content).prompt,
  );
  await page.getByLabel('Twoja odpowiedź po polsku').fill(target.answers[0]);
  await page.getByRole('button', { name: 'Sprawdź', exact: true }).click();
  let state = await page.evaluate(() => JSON.parse(localStorage.getItem('polski-praktyka:v1')));
  expect(state.completed.at(-1)).toBe(target.id);
  expect(state.completed.filter((id) => id === target.id)).toHaveLength(1);
  await page.reload();
  await page.getByLabel('Temat', { exact: true }).selectOption('biernik');
  await page.getByLabel('Poziom').selectOption('write');
  await page.getByRole('button', { name: 'Rozpocznij sesję' }).click();
  await expect(page.locator('.question')).not.toHaveText(
    localizeExercise(target, 'pl', content).prompt,
  );
  await page.getByLabel('Twoja odpowiedź po polsku').fill('wrong answer');
  await page.getByRole('button', { name: 'Sprawdź', exact: true }).click();
  state = await page.evaluate(() => JSON.parse(localStorage.getItem('polski-praktyka:v1')));
  expect(state.mistakes).toContain(state.completed.at(-1));
  await page.goto('/#settings');
  await expect(page.getByText('Wykonane ćwiczenia', { exact: true })).toBeVisible();
});
