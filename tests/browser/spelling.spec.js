import { test, expect } from '@playwright/test';
import { spellingExercises, spellingExerciseTranslations } from '../../src/content/spelling.js';

test('spelling reference opens targeted writing practice and grades exact letters', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Litery i podobne głoski', exact: true }).click();
  await expect(page.locator('.lesson')).toContainText('cz / ć / c');
  await page.getByRole('button', { name: 'Ćwicz ten temat', exact: true }).click();
  await page.getByLabel('Poziom').selectOption('write');
  await page.getByRole('button', { name: 'Rozpocznij sesję' }).click();
  const prompt = await page.locator('.question').innerText();
  const item = spellingExercises.find(
    (exercise) =>
      exercise.level === 'write' && spellingExerciseTranslations.pl[exercise.id].prompt === prompt,
  );
  expect(item).toBeTruthy();
  await page.getByLabel('Twoja odpowiedź po polsku').fill(item.answers[0]);
  await page.getByRole('button', { name: 'Sprawdź', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('Poprawnie');
});
