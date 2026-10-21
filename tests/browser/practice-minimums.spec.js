import { test, expect } from '@playwright/test';

test('previously small subsections can start twenty-question sessions', async ({ page }) => {
  await page.goto('/#practice');
  for (const topic of ['miejscownik', 'wolacz', 'culture', 'history']) {
    await page.getByLabel('Temat', { exact: true }).selectOption(topic);
    const groups = topic === 'history' ? ['places', 'history', 'holidays'] : [null];
    for (const group of groups) {
      if (group) await page.getByLabel('Zestaw dat', { exact: true }).selectOption(group);
      await page.getByLabel('Zadań w sesji').selectOption('20');
      await page.getByRole('button', { name: 'Rozpocznij sesję', exact: true }).click();
      await expect(page.getByRole('progressbar')).toHaveAttribute('aria-valuemax', '20');
      await expect(page.getByRole('radio')).toHaveCount(5);
      await page.getByRole('button', { name: 'Zakończ sesję', exact: true }).click();
    }
  }
});
