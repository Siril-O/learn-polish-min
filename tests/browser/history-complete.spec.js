import { test, expect } from '@playwright/test';
import * as content from '../../src/content/index.js';
import { localizeExercise } from '../../src/content-localization.js';
const { history, historyExercises } = content;

test('complete chronology includes separate original translations and both 2005 records', async ({
  page,
}, testInfo) => {
  await page.goto('/#karta');
  await page.getByLabel('Zestaw dat', { exact: true }).selectOption('chronology');
  await expect(page.locator('.history-item')).toHaveCount(20);
  await expect(page.getByRole('navigation', { name: 'Strony materiałów' }).first()).toContainText(
    '54',
  );
  await page.getByRole('button', { name: 'Następna strona', exact: true }).first().click();
  await page.getByRole('button', { name: 'Następna strona', exact: true }).first().click();
  await expect(page.locator('.history-item')).toHaveCount(14);
  const entry = history.find((item) => item.originalKey === '1990');
  await page.getByLabel('Znajdź wydarzenie', { exact: true }).fill(entry.title);
  const card = page.locator('.history-item');
  await expect(card).toHaveCount(1);
  await expect(card.locator('.history-polish')).toContainText('1995');
  await expect(card.locator('.history-polish')).toContainText('SLD');
  await expect(card.locator('.history-polish')).toHaveText(entry.original);
  await expect(card.locator('.simplified-text')).not.toBeVisible();
  await card.getByText('Tłumaczenie oryginału na ukraiński', { exact: true }).click();
  await expect(card.locator('[lang="uk"]').first()).toHaveText(entry.originalUk);
  await card.getByText('Prostszy tekst · pełna treść', { exact: true }).click();
  await expect(card.locator('.simplified-text')).toHaveText(entry.pl);
  await page.screenshot({
    path: testInfo.outputPath('history-original-translation.png'),
    fullPage: true,
  });
  await page.getByLabel('Znajdź wydarzenie', { exact: true }).fill('2005');
  await expect(
    page.getByRole('heading', { name: 'Śmierć Jana Pawła II', exact: true }),
  ).toBeVisible();
  const election = history.find((item) => item.originalKey === '2005');
  await expect(page.getByRole('heading', { name: election.title, exact: true })).toBeVisible();
});

test('additional date groups filter content and carry into targeted practice', async ({ page }) => {
  await page.goto('/#karta');
  for (const category of ['people', 'places', 'holidays', 'history']) {
    await page.getByLabel('Zestaw dat', { exact: true }).selectOption(category);
    await expect(page.locator('.history-item')).toHaveCount(
      Math.min(20, history.filter((item) => item.category === category).length),
    );
  }
  await page.getByLabel('Zestaw dat', { exact: true }).selectOption('holidays');
  await page.getByRole('button', { name: 'Test dat i wydarzeń' }).click();
  await expect(page.getByLabel('Zestaw dat', { exact: true })).toHaveValue('holidays');
  await page.getByLabel('Poziom').selectOption('write');
  await page.getByRole('button', { name: 'Rozpocznij sesję' }).click();
  const prompt = await page.locator('.question').innerText();
  const exercise = historyExercises.find(
    (item) =>
      item.level === 'write' &&
      item.historyCategory === 'holidays' &&
      localizeExercise(item, 'pl', content).prompt === prompt,
  );
  expect(exercise).toBeTruthy();
  await page.getByLabel('Data', { exact: true }).fill(exercise.answers[0]);
  await page.getByRole('button', { name: 'Sprawdź', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('Poprawnie');
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
  ).toBeTruthy();
});
