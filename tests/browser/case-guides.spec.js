import { test, expect } from '@playwright/test';
import { caseGuides } from '../../src/content/index.js';

const cases = {
  mianownik: 'Mianownik',
  dopelniacz: 'Dopełniacz',
  celownik: 'Celownik',
  biernik: 'Biernik',
  narzednik: 'Narzędnik',
  miejscownik: 'Miejscownik',
  wolacz: 'Wołacz',
};

test('all seven case guides show questions, analyzed examples and sources in both languages', async ({
  page,
}, testInfo) => {
  test.setTimeout(60000);
  await page.goto('/');
  for (const [id, title] of Object.entries(cases)) {
    await page.getByRole('button', { name: title, exact: true }).click();
    const questions = page.getByRole('region', { name: 'Pytania i użycie' });
    await expect(questions).toContainText(caseGuides[id].pl.nounQuestions);
    await expect(questions).toContainText(caseGuides[id].pl.adjectiveQuestions);
    const analysis = page.getByRole('region', { name: 'Analiza zdań' });
    await expect(analysis.locator('mark')).toHaveCount(caseGuides[id].pl.examples.length);
    await expect(analysis.locator('.source-list a')).toHaveCount(caseGuides[id].sources.length);
    expect(await page.locator('.lesson').innerText()).not.toMatch(/[\u0400-\u04ff]/u);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
    ).toBeTruthy();
    if (id === 'biernik')
      await page.screenshot({ path: testInfo.outputPath('biernik-guide.png'), fullPage: true });
    await page.getByLabel('Language / Język').selectOption('uk');
    await expect(page.getByRole('region', { name: 'Питання та вживання' })).toContainText(
      caseGuides[id].uk.howToAsk,
    );
    await expect(page.getByRole('region', { name: 'Розбір речень' })).toContainText(
      caseGuides[id].uk.examples[0].explanation,
    );
    await page.getByLabel('Language / Język').selectOption('pl');
  }
});

test('sourced case reference remains available inside the practice rule dialog', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Dopełniacz', exact: true }).click();
  await page.getByRole('button', { name: 'Ćwicz ten temat' }).click();
  await page.getByRole('button', { name: 'Rozpocznij sesję' }).click();
  await page.getByRole('button', { name: 'Otwórz regułę' }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog.getByRole('region', { name: 'Pytania i użycie' })).toContainText(
    caseGuides.dopelniacz.pl.nounQuestions,
  );
  await expect(dialog.getByRole('region', { name: 'Analiza zdań' }).locator('mark')).toHaveCount(3);
  await expect(dialog.locator('.source-list a').first()).toHaveAttribute('href', /^https:\/\//);
});
