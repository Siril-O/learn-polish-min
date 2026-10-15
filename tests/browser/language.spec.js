import { test, expect } from '@playwright/test';
import {
  topics,
  lessonTranslations,
  grammarExercises,
  exerciseTranslations,
} from '../../src/content/index.js';

test('all grammar lessons show Polish first and switch all teaching fields to Ukrainian', async ({
  page,
}) => {
  test.setTimeout(60000);
  await page.goto('/');
  const links = page.locator('.topic-nav .topic-link');
  await expect(links).toHaveCount(topics.length);
  for (let index = 0; index < topics.length; index++) {
    await links.nth(index).click();
    const id = await page.evaluate(
      () => JSON.parse(localStorage.getItem('polski-praktyka:v1')).topic,
    );
    const topic = topics.find((item) => item.id === id);
    if (id === 'verb-tables') {
      await expect(page.locator('.verb-forms')).toBeVisible();
      expect(await page.locator('.lesson').innerText()).not.toMatch(/[\u0400-\u04ff]/u);
      await page.getByLabel('Language / Język').selectOption('uk');
      await expect(page.locator('.verb-forms')).toBeVisible();
      await page.getByLabel('Language / Język').selectOption('pl');
      continue;
    }
    await expect(page.locator('.rule-list li')).toHaveText(lessonTranslations.pl[id].rules);
    expect(await page.locator('.lesson').innerText()).not.toMatch(/[\u0400-\u04ff]/u);
    await page.getByLabel('Language / Język').selectOption('uk');
    await expect(page.locator('.rule-list li')).toHaveText(topic.rules);
    await expect(page.locator('.topic-subtitle')).toHaveText(topic.subtitle);
    await page.getByLabel('Language / Język').selectOption('pl');
    await expect(page.locator('.topic-subtitle')).toHaveText(lessonTranslations.pl[id].subtitle);
  }
});

test('switching teaching language preserves the active answer and shows localized feedback', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Ćwicz ten temat' }).click();
  await page.getByLabel('Poziom').selectOption('write');
  await page.getByRole('button', { name: 'Rozpocznij sesję' }).click();
  const prompt = await page.locator('.question').innerText();
  const exercise = grammarExercises.find(
    (item) =>
      item.topic === 'byc' &&
      item.level === 'write' &&
      (exerciseTranslations.pl[item.id].prompt ?? item.prompt) === prompt,
  );
  await page.getByLabel('Twoja odpowiedź po polsku').fill(exercise.answers[0]);
  await page.getByLabel('Language / Język').selectOption('uk');
  await expect(page.getByLabel('Твоя відповідь польською')).toHaveValue(exercise.answers[0]);
  await page.getByLabel('Language / Język').selectOption('pl');
  await page.getByRole('button', { name: 'Sprawdź', exact: true }).click();
  await expect(page.getByRole('status')).toContainText(
    exerciseTranslations.pl[exercise.id].explanation,
  );
  await page.getByLabel('Language / Język').selectOption('uk');
  await expect(page.getByRole('status')).toContainText(exercise.explanation);
  await page.getByLabel('Language / Język').selectOption('pl');
  await expect(page.getByRole('status')).toContainText('Poprawnie');
  await page.getByRole('button', { name: 'Otwórz regułę' }).click();
  await expect(page.getByRole('dialog')).toContainText(lessonTranslations.pl.byc.rules[0]);
});

test('Mianownik lesson rules and tables follow the selected language', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Mianownik', exact: true }).click();
  await expect(page.locator('.topic-subtitle')).toHaveText(
    lessonTranslations.pl.mianownik.subtitle,
  );
  await expect(page.locator('.rule-list')).toContainText(lessonTranslations.pl.mianownik.rules[0]);
  await expect(
    page.getByRole('columnheader', { name: 'Liczba pojedyncza', exact: true }),
  ).toBeVisible();
  await expect(page.locator('.rule-image figcaption')).toContainText('Liczba mnoga.');
  await expect(
    page.locator('.example-list').getByText('Студент читає.', { exact: true }),
  ).not.toBeVisible();
  await page.getByLabel('Language / Język').selectOption('uk');
  await expect(page.locator('.rule-list')).toContainText('Початкова форма слова');
  await expect(page.getByRole('columnheader', { name: 'Однина', exact: true })).toBeVisible();
  await page.getByLabel('Language / Język').selectOption('pl');
  await page.getByRole('button', { name: 'Ćwicz ten temat' }).click();
  await page.getByRole('button', { name: 'Rozpocznij sesję' }).click();
  await page.getByRole('button', { name: 'Otwórz regułę' }).click();
  await expect(page.getByRole('dialog')).toContainText(lessonTranslations.pl.mianownik.rules[0]);
});

test('Polish is the initial interface language and Ukrainian preference persists', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Gramatyka', exact: true })).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('lang', 'pl');
  await expect(page.getByRole('link', { name: 'Ćwiczenia', exact: true })).toBeVisible();
  await page.getByLabel('Language / Język').selectOption('uk');
  await expect(page.getByRole('heading', { name: 'Граматика', exact: true })).toBeVisible();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'uk');
  await page.getByLabel('Language / Język').selectOption('pl');
  await page.getByRole('link', { name: 'Ćwiczenia', exact: true }).click();
  await expect(page.getByLabel('Poziom')).toBeVisible();
  await page.getByRole('button', { name: 'Rozpocznij sesję' }).click();
  await expect(page.getByRole('button', { name: 'Sprawdź', exact: true })).toBeVisible();
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
  ).toBeTruthy();
});

test('Polish vocabulary filters retain their data identifiers', async ({ page }) => {
  await page.goto('/#vocabulary');
  await expect(page.getByRole('heading', { name: 'Słownik', exact: true })).toBeVisible();
  await page.getByLabel('Część mowy').selectOption({ label: 'Czasownik' });
  await expect(page.locator('.vocabulary-table .word-kind').first()).toHaveText('Czasownik');
  await page.getByLabel('Language / Język').selectOption('uk');
  await expect(page.getByLabel('Частина мови')).toHaveValue('Дієслово');
});
