import { test, expect } from '@playwright/test';

test('Miejscownik shows one hundred available questions per mode and starts fifty-question sessions', async ({
  page,
}) => {
  await page.goto('/#practice');
  await page.getByLabel('Temat', { exact: true }).selectOption('miejscownik');
  for (const level of ['choice', 'write', 'sentence']) {
    await page.getByLabel('Poziom', { exact: true }).selectOption(level);
    await expect(page.getByLabel('Poziom').locator(`option[value="${level}"]`)).toContainText(
      '(100)',
    );
    await page.getByLabel('Zadań w sesji').selectOption('50');
    await expect(page.locator('.session-start')).toContainText('Dostępne: 100');
    await page.getByRole('button', { name: 'Rozpocznij sesję', exact: true }).click();
    await expect(page.getByRole('progressbar')).toHaveAttribute('aria-valuemax', '50');
    if (level === 'choice') await expect(page.getByRole('radio')).toHaveCount(5);
    await page.getByRole('button', { name: 'Zakończ sesję', exact: true }).click();
  }
});
