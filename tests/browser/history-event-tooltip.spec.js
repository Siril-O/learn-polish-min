import { test, expect } from '@playwright/test';
import { historyBackground } from '../../src/content/history-background.js';

async function startDatePractice(page) {
  await page.goto('/#practice');
  await page.getByLabel('Temat', { exact: true }).selectOption('history');
  await page.locator('#practice-history-group').selectOption('chronology');
  await page.getByLabel('Rok od', { exact: true }).selectOption('1226');
  await page.getByLabel('Rok do', { exact: true }).selectOption('1226');
  await page.getByRole('button', { name: 'Rozpocznij sesję', exact: true }).click();
}

test('event details open by tap or keyboard, close with Escape, and follow language', async ({
  page,
}) => {
  await startDatePractice(page);
  const button = page.getByRole('button', { name: 'Więcej o wydarzeniu', exact: true });
  await expect(page.getByRole('tooltip')).toHaveCount(0);
  await button.click();
  const tooltip = page.getByRole('tooltip');
  await expect(tooltip.locator('.history-background-body > p')).toHaveText(historyBackground['history-1226'].pl);
  await expect(tooltip).toContainText('Prusów');
  const bounds = await tooltip.boundingBox();
  const viewport = page.viewportSize();
  expect(bounds.x).toBeGreaterThanOrEqual(0);
  expect(bounds.x + bounds.width).toBeLessThanOrEqual(viewport.width);
  await page.keyboard.press('Escape');
  await expect(tooltip).toHaveCount(0);
  await page.getByLabel('Language / Język').focus();
  await page.getByLabel('Language / Język').selectOption('uk');
  await page.getByRole('button', { name: 'Докладніше про подію', exact: true }).focus();
  await expect(tooltip).toHaveAttribute('lang', 'uk');
  await expect(tooltip.locator('.history-background-body > p')).toHaveText(historyBackground['history-1226'].uk);
  await page.locator('.quiz-top').click();
  await expect(tooltip).toHaveCount(0);
});

test('event details open on hover and close when the pointer leaves', async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, 'Touch uses the tap interaction.');
  await startDatePractice(page);
  await page.getByRole('button', { name: 'Więcej o wydarzeniu', exact: true }).hover();
  await expect(page.getByRole('tooltip')).toBeVisible();
  await page.mouse.move(0, 0);
  await expect(page.getByRole('tooltip')).toHaveCount(0);
});
