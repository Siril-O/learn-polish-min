import { test, expect } from '@playwright/test';
import { grammarExercises } from '../../src/grammar.js';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('polski-praktyka:language', 'uk'));
});

test('case overview is a persistent topic with highlighted identification practice', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Сім відмінків разом', exact: true }).click();
  await page.reload();
  await expect(
    page.getByRole('heading', { name: 'Сім відмінків разом', exact: true }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Практикувати тему' }).click();
  await expect(page.getByLabel('Складність')).toHaveValue('identify');
  await page.getByRole('button', { name: 'Почати сесію' }).click();
  await expect(page.getByRole('radio')).toHaveCount(7);
  const prompt = await page.locator('.question').innerText();
  const exercise = grammarExercises.find((q) => q.level === 'identify' && q.prompt === prompt);
  await expect(page.locator('.question mark')).toHaveText(exercise.targetWord);
  await page.locator(`input[type="radio"][value="${exercise.answers[0]}"]`).check();
  await page.getByRole('button', { name: 'Перевірити', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('Правильно');
  await page.getByRole('button', { name: 'Відкрити правило' }).click();
  await expect(page.getByRole('dialog')).toContainText('Сім відмінків разом');
});

test('grammar navigation, case comparison, search, and responsive layout', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Граматика', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Dopełniacz · Родовий', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Dopełniacz · Родовий' })).toBeVisible();
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Dopełniacz · Родовий' })).toBeVisible();
  await page.getByRole('button', { name: 'Таблиця відмінків' }).click();
  await expect(page.getByRole('heading', { name: 'Сім відмінків разом' })).toBeVisible();
  await page.getByRole('button', { name: 'Dopełniacz · Родовий', exact: true }).click();
  await page.getByRole('textbox', { name: 'Знайти тему' }).fill('no matching topic xyz');
  await expect(page.getByText('Тем не знайдено.')).toBeVisible();
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
  ).toBeTruthy();
  expect(errors).toEqual([]);
});

test('written quiz records mistakes, opens rule, accepts answers, and reviews mistakes', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Практикувати тему' }).click();
  await page.getByLabel('Складність').selectOption('write');
  await page.getByLabel('Завдань у сесії').selectOption('5');
  await page.getByRole('button', { name: 'Почати сесію' }).click();
  await page.getByLabel('Твоя відповідь польською').fill('wrong answer');
  await page.getByRole('button', { name: 'Перевірити', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('Спробуй запам’ятати');
  await page.getByRole('button', { name: 'Відкрити правило' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  while (await page.getByRole('button', { name: 'Далі', exact: true }).count()) {
    await page.getByRole('button', { name: 'Далі', exact: true }).click();
    await page.getByLabel('Твоя відповідь польською').fill('wrong answer');
    await page.getByRole('button', { name: 'Перевірити', exact: true }).click();
  }
  await page.getByRole('button', { name: 'Результат', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Сесію завершено' })).toBeVisible();
  await page.getByRole('button', { name: 'Повторити помилки', exact: true }).click();
  await expect(page.getByText(/Завдання 1 з/)).toBeVisible();
  const state = await page.evaluate(() => JSON.parse(localStorage.getItem('polski-praktyka:v1')));
  expect(state.mistakes.length).toBeGreaterThan(0);
});

test('vocabulary can be saved, persisted, searched, and used as flashcards', async ({ page }) => {
  await page.goto('/#vocabulary');
  await page.getByLabel('Знайти слово').fill('przyjmować');
  await page.getByRole('button', { name: 'Зберегти: przyjmować', exact: true }).click();
  await page.reload();
  await page.getByLabel('Відбір слів').selectOption('saved');
  await expect(page.getByText('przyjmować', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Картки', exact: true }).click();
  await page.getByRole('button', { name: 'Показати переклад' }).click();
  await expect(page.getByText('приймати', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Знаю', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Картки завершено' })).toBeVisible();
  const state = await page.evaluate(() => JSON.parse(localStorage.getItem('polski-praktyka:v1')));
  expect(state.saved).toHaveLength(1);
  expect(state.known).toHaveLength(1);
});

test('Karta sections and date practice work', async ({ page }) => {
  await page.goto('/#karta');
  await page.getByLabel('Знайти історичну подію').fill('1999');
  await expect(page.getByRole('heading', { name: 'Polska w NATO' })).toBeVisible();
  await page.getByText('Український переклад', { exact: true }).click();
  await expect(page.getByText('12 березня 1999 року Польща вступила до НАТО.')).toBeVisible();
  await page.getByRole('button', { name: 'Співбесіда', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Proszę opowiedzieć o sobie.' })).toBeVisible();
  await page.getByRole('button', { name: 'Культура і традиції' }).click();
  await page.getByRole('button', { name: 'Перевірити знання' }).click();
  await page.getByRole('button', { name: 'Почати сесію' }).click();
  await expect(page.getByRole('radio')).toHaveCount(3);
});

test('backup round trip and invalid file do not lose data', async ({ page }) => {
  await page.goto('/#settings');
  await page.getByLabel('Імпорт копії').setInputFiles({
    name: 'backup.json',
    mimeType: 'application/json',
    buffer: Buffer.from(
      JSON.stringify({
        version: 1,
        topic: 'biernik',
        lastView: 'grammar',
        saved: ['word-0'],
        known: ['word-0'],
        mistakes: [],
      }),
    ),
  });
  await expect(page.getByRole('status')).toContainText('Резервну копію відновлено.');
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Експорт копії' }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toMatch(/\.json$/);
  const before = await page.evaluate(() => localStorage.getItem('polski-praktyka:v1'));
  await page.getByLabel('Імпорт копії').setInputFiles({
    name: 'bad.json',
    mimeType: 'application/json',
    buffer: Buffer.from('{oops'),
  });
  await expect(page.getByRole('status')).toContainText('JSON');
  expect(await page.evaluate(() => localStorage.getItem('polski-praktyka:v1'))).toEqual(before);
});

test('storage denial and corruption leave app usable', async ({ page }) => {
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => {
      throw new Error('Storage disabled');
    };
    Storage.prototype.setItem = () => {
      throw new Error('Storage disabled');
    };
  });
  await page.goto('/');
  await page.getByLabel('Language / Język').selectOption('uk');
  await expect(page.getByRole('heading', { name: 'Граматика', exact: true })).toBeVisible();
  await expect(page.getByRole('status')).toBeVisible();
  await page.getByRole('button', { name: 'Практикувати тему' }).click();
  await page.getByRole('button', { name: 'Почати сесію' }).click();
  await expect(page.getByRole('radio')).toHaveCount(3);
});

test('production assets and hash navigation work in a GitHub Pages subdirectory', async ({
  page,
}) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('response', (response) => {
    if (response.status() >= 400) errors.push(response.url());
  });
  await page.goto('http://127.0.0.1:4179/learn_pollish_minimalistic/');
  await expect(page.getByRole('heading', { name: 'Граматика', exact: true })).toBeVisible();
  await page.getByRole('link', { name: 'Словник', exact: true }).click();
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Словник', exact: true })).toBeVisible();
  expect(errors).toEqual([]);
});

test('capture main views and check that content fits the viewport', async ({ page }, testInfo) => {
  for (const view of ['grammar', 'practice', 'karta', 'vocabulary', 'settings']) {
    await page.goto(`/#${view}`);
    await expect(page.locator('main h1')).toBeVisible();
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBeTruthy();
    await page.screenshot({ path: testInfo.outputPath(`${view}.png`), fullPage: true });
  }
});

test('correct sentence variants complete a session without mistakes', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Практикувати тему' }).click();
  await page.getByLabel('Складність').selectOption('sentence');
  await page.getByLabel('Завдань у сесії').selectOption('5');
  await page.getByRole('button', { name: 'Почати сесію' }).click();
  for (let index = 0; index < 4; index++) {
    const prompt = await page.locator('.question').innerText();
    const item = grammarExercises.find(
      (q) => q.topic === 'byc' && q.level === 'sentence' && q.prompt === prompt,
    );
    expect(item).toBeTruthy();
    await page
      .getByLabel('Твоя відповідь польською')
      .fill(`  ${item.answers.at(-1).toUpperCase()}  `);
    await page.getByRole('button', { name: 'Перевірити', exact: true }).click();
    await expect(page.getByRole('status')).toContainText('Правильно');
    await page
      .getByRole('button', { name: index === 3 ? 'Результат' : 'Далі', exact: true })
      .click();
  }
  await expect(page.getByText('Усі відповіді правильні.')).toBeVisible();
  await expect(page.locator('.result-score')).toHaveText('4 / 4');
  const state = await page.evaluate(() => JSON.parse(localStorage.getItem('polski-praktyka:v1')));
  expect(state.mistakes).toEqual([]);
});

test('unknown flashcards are requeued and do not become known prematurely', async ({ page }) => {
  await page.goto('/#vocabulary');
  await page.getByLabel('Знайти слово').fill('przyjmować');
  await page.getByRole('button', { name: 'Картки', exact: true }).click();
  await page.getByRole('button', { name: 'Показати переклад' }).click();
  await page.getByRole('button', { name: 'Ще вчу', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'przyjmować', exact: true })).toBeVisible();
  const state = await page.evaluate(() => JSON.parse(localStorage.getItem('polski-praktyka:v1')));
  expect(state.known).toEqual([]);
  await page.getByRole('button', { name: 'Показати переклад' }).click();
  await page.getByRole('button', { name: 'Знаю', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Картки завершено' })).toBeVisible();
});
