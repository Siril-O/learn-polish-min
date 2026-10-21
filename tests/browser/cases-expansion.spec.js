import { test, expect } from '@playwright/test';

test('all cases support fifty-question sessions in each main answer mode', async ({ page }) => {
  await page.goto('/#practice');
  for (const topic of [
    'mianownik',
    'dopelniacz',
    'celownik',
    'biernik',
    'narzednik',
    'miejscownik',
    'wolacz',
  ]) {
    await page.getByLabel('Temat', { exact: true }).selectOption(topic);
    for (const level of ['choice', 'write', 'sentence']) {
      await page.getByLabel('Poziom', { exact: true }).selectOption(level);
      await page.getByLabel('Zadań w sesji').selectOption('50');
      await page.getByRole('button', { name: 'Rozpocznij sesję', exact: true }).click();
      await expect(page.getByRole('progressbar')).toHaveAttribute('aria-valuemax', '50');
      if (level === 'choice') await expect(page.getByRole('radio')).toHaveCount(5);
      else await expect(page.getByLabel('Twoja odpowiedź po polsku')).toBeVisible();
      await page.getByRole('button', { name: 'Zakończ sesję', exact: true }).click();
    }
  }
});
