import { test, expect } from '@playwright/test';

test('both pagination controls scroll to the beginning of the new history page', async ({
  page,
}) => {
  await page.goto('/#karta');
  await page.getByLabel('Zestaw dat', { exact: true }).selectOption('chronology');
  const firstTitle = await page.locator('.history-item h2').first().innerText();
  for (const position of ['last', 'first']) {
    await page.getByRole('button', { name: 'Następna strona', exact: true })[position]().click();
    await expect(page.locator('.history-item h2').first()).not.toHaveText(firstTitle);
    await expect
      .poll(async () =>
        page
          .locator('.history-list')
          .evaluate((element) => Math.abs(element.getBoundingClientRect().top)),
      )
      .toBeLessThan(2);
    await expect(page.locator('.history-item h2').first()).toBeInViewport();
    await page.getByRole('button', { name: 'Poprzednia strona', exact: true })[position]().click();
    await expect(page.locator('.history-item h2').first()).toHaveText(firstTitle);
    await expect
      .poll(async () =>
        page
          .locator('.history-list')
          .evaluate((element) => Math.abs(element.getBoundingClientRect().top)),
      )
      .toBeLessThan(2);
  }
});
