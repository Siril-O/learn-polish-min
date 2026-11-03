import { test, expect } from '@playwright/test';

test('logo and title both return to the home view', async ({ page }) => {
  for (const target of ['.brand-mark', '.brand > div']) {
    await page.goto('/#practice');
    await page.locator(target).click();
    await expect(page).toHaveURL(/#grammar$/u);
    await expect(page.locator('.main-nav a[href="#grammar"]')).toHaveAttribute(
      'aria-current',
      'page',
    );
  }
});

test('brand link supports keyboard navigation', async ({ page }) => {
  await page.goto('/#settings');
  await page.getByRole('link', { name: 'Polski Praktyka', exact: true }).focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#grammar$/u);
});
