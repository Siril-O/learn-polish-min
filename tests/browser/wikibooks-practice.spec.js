import { test, expect } from '@playwright/test';
import { allExercises } from '../../src/content/index.js';

test('adapted examples appear in normal practice with source and license links', async ({
  page,
}) => {
  const target = allExercises.find((item) => item.id === 'wikibooks-biernik-song-choice');
  const completed = allExercises
    .filter((item) => item.familyId !== target.familyId)
    .map((item) => item.id);
  await page.addInitScript(
    ({ completed }) => {
      localStorage.setItem(
        'polski-praktyka:v1',
        JSON.stringify({
          version: 1,
          topic: 'biernik',
          saved: [],
          known: [],
          mistakes: [],
          completed,
          lastView: 'practice',
        }),
      );
    },
    { completed },
  );
  await page.goto('/#practice');
  await page.getByLabel('Temat', { exact: true }).selectOption('biernik');
  await page.getByRole('button', { name: 'Rozpocznij sesję', exact: true }).click();
  await expect(page.locator('.question')).toHaveText(target.prompt);
  await expect(page.getByRole('radio')).toHaveCount(5);
  const attribution = page.locator('.exercise-attribution');
  await expect(attribution.getByRole('link', { name: 'CC BY-SA 4.0' })).toHaveAttribute(
    'href',
    target.attribution.licenseUrl,
  );
  await expect(attribution.getByRole('link', { name: 'Wikibooks contributors' })).toHaveAttribute(
    'href',
    target.attribution.authorsUrl,
  );
  await expect(attribution).toContainText('Adaptacja');
  await page.locator(`input[type="radio"][value="${target.answers[0]}"]`).check();
  await page.getByRole('button', { name: 'Sprawdź', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('Poprawnie');
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
  ).toBeTruthy();
});
