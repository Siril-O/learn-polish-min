import { test, expect } from '@playwright/test';
import {
  impersonalExercises,
  impersonalExerciseTranslations,
} from '../../src/content/impersonal.js';

test('impersonal lesson has Polish tables, Ukrainian translation and source links', async ({
  page,
}) => {
  await page.goto('/#grammar');
  await page.getByRole('button', { name: 'Konstrukcje bezosobowe', exact: true }).click();
  await expect(page.locator('.lesson')).toContainText('trzeba było czekać');
  await expect(page.locator('.lesson')).toContainText('będzie się czytać');
  await page.screenshot({ path: test.info().outputPath('impersonal-lesson.png'), fullPage: true });
  await expect(
    page.locator('.lesson a[href="https://polski.info/grammar/verbs?hl=pl"]'),
  ).toBeVisible();
  await page.getByLabel('Language / Język').selectOption('uk');
  await expect(page.locator('.lesson')).toContainText('Безособові конструкції');
  await expect(page.locator('.lesson')).toContainText('Теперішній');
});

test('impersonal exercises work in choice and written modes', async ({ page }) => {
  for (const level of ['choice', 'write']) {
    await page.goto('/#practice');
    await page.getByLabel('Temat', { exact: true }).selectOption('impersonal');
    await page.locator('#practice-level').selectOption(level);
    await page.getByRole('button', { name: 'Rozpocznij sesję', exact: true }).click();
    if (level === 'choice') {
      await expect(page.getByRole('radio')).toHaveCount(5);
      await page.getByRole('radio').first().check();
      await page.getByRole('button', { name: 'Sprawdź', exact: true }).click();
      await expect(page.getByRole('button', { name: 'Dalej', exact: true })).toBeVisible();
    } else {
      await expect(page.locator('.question')).toContainText('___');
      const prompt = await page.locator('.question').innerText();
      const exercise = impersonalExercises.find(
        (item) =>
          item.level === 'write' && impersonalExerciseTranslations.pl[item.id].prompt === prompt,
      );
      await page
        .getByRole('textbox', { name: 'Twoja odpowiedź po polsku' })
        .fill(exercise.answers[0]);
      await page.getByRole('button', { name: 'Sprawdź', exact: true }).click();
      await expect(page.getByRole('button', { name: 'Dalej', exact: true })).toBeVisible();
    }
    await page.reload();
  }
});
