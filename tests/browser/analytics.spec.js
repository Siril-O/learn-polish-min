import { test, expect } from '@playwright/test';

test('localhost never loads analytics', async ({ page }) => {
  const requests = [];
  page.on('request', (request) => {
    if (/google-analytics|googletagmanager/.test(request.url())) requests.push(request.url());
  });
  await page.goto('/#grammar');
  await expect(page.getByRole('button', { name: 'Zezwól na analitykę' })).toHaveCount(0);
  expect(requests).toEqual([]);
});

test('production requires consent, tracks sections and supports withdrawal', async ({ page }) => {
  let tagRequests = 0;
  await page.route('https://www.googletagmanager.com/**', (route) => {
    tagRequests++;
    return route.fulfill({ contentType: 'application/javascript', body: '' });
  });
  await page.route('https://siril-o.github.io/learn-polish-min/**', async (route) => {
    const url = new URL(route.request().url());
    const response = await page.request.get(
      `http://127.0.0.1:4179${url.pathname.replace('/learn-polish-min/', '/learn_pollish_minimalistic/')}`,
    );
    await route.fulfill({ response });
  });
  await page.goto('https://siril-o.github.io/learn-polish-min/#grammar');
  expect(tagRequests).toBe(0);
  await page.getByRole('button', { name: 'Odrzuć', exact: true }).click();
  await page.reload();
  expect(tagRequests).toBe(0);
  await page.goto('https://siril-o.github.io/learn-polish-min/#settings');
  await page.getByRole('button', { name: 'Zezwól na analitykę' }).click();
  await expect.poll(() => tagRequests).toBe(1);
  await page.getByRole('link', { name: 'Gramatyka', exact: true }).click();
  const events = await page.evaluate(() =>
    window.dataLayer.map((value) => Array.from(value)).filter((value) => value[0] === 'event'),
  );
  expect(events.map((event) => event[2].page_location)).toEqual([
    'https://siril-o.github.io/learn-polish-min/#settings',
    'https://siril-o.github.io/learn-polish-min/#grammar',
  ]);
  await page.getByRole('link', { name: 'Ustawienia', exact: true }).click();
  await page.getByRole('button', { name: 'Wycofaj zgodę' }).click();
  await expect(page.getByText('Analityka wyłączona')).toBeVisible();
  expect(tagRequests).toBe(1);
});
