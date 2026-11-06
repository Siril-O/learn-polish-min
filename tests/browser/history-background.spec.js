import { test, expect } from '@playwright/test';

test('historical context loads on demand without changing original texts', async ({ page }) => {
  const chunks = [];
  page.on('request', (request) => {
    if (request.url().includes('history-background.js')) chunks.push(request.url());
  });
  await page.goto('/#karta');
  const first = page.locator('.history-item').first();
  const original = await first.locator('.history-polish').innerText();
  expect(chunks).toHaveLength(0);
  await first.locator('.history-background summary').click();
  await expect
    .poll(() => first.locator('.history-background-body > p').count())
    .toBeGreaterThanOrEqual(2);
  await expect(first.locator('.history-background-body a').first()).toHaveAttribute(
    'href',
    /^https:\/\//,
  );
  await expect(first.locator('.history-polish')).toHaveText(original);
  const polish = await first.locator('.history-background-body').innerText();
  await page.getByLabel('Language / Język').selectOption('uk');
  await expect(first.locator('.history-background summary')).toHaveText(
    'Історичний контекст і зв’язки',
  );
  await expect(first.locator('.history-background-body')).not.toHaveText(polish);
  await expect(first.locator('.history-background-body')).toHaveAttribute('lang', 'uk');
  await first.locator('.history-background').scrollIntoViewIfNeeded();
  await page.screenshot({
    path: test.info().outputPath('history-background.png'),
    fullPage: false,
  });
});
